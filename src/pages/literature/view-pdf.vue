<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import VuePdfEmbed from 'vue-pdf-embed'
import ChatBox from '@comp/chat-box.vue'
import axios from '@/http/axios.js'

const route = useRoute()

const url = computed(() => decodeURIComponent(route.query.url))
const doi = computed(() => decodeURIComponent(route.query.doi))

const pageNum = ref(1) // 当前页面

const askFn = async (question) => {
  const res = await axios.post('/web/search/documents', {
    doi: doi.value,
    question,
  })
  return {
    type: 'bot',
    content: res.message.replace('\n', '<br />'),
    time: new Date(),
  }
}

const selectedText = ref('')
const selectionMenu = reactive({
  x: -10000,
  y: 0,
  show: true,
})
onMounted(() => {
  document.onmouseup = () => {
    try {
      const selection = document.getSelection()
      const selectionRange = selection.getRangeAt(0)
      const { x, y, width } = selectionRange.getBoundingClientRect()
      if (!width || width <= 0) {
        selectionMenu.show = false
        return
      }

      selectionMenu.x = x + width + 20
      selectionMenu.y = y
      selectedText.value = selection.toString()
      selectionMenu.show = true
    } catch (e) {
      selectionMenu.show = false
      console.log(e)
    }
  }
})

onBeforeUnmount(() => {
  document.onmouseup = null
})

const chatBox = ref()

const searchSelectionHandler = async () => {
  chatBox.value.thinking = true
  const res = await axios.post('/web/article/overview/analysis', {
    content: selectedText.value,
    type: 'analysis',
  })
  chatBox.value.thinking = false
  chatBox.value.pushMessage({
    type: 'bot',
    content: res.message.replace('\n', '<br />'),
    time: new Date(),
  })
}
const translateSelectionHandler = async () => {
  chatBox.value.thinking = true
  const res = await axios.post('/web/article/overview/analysis', {
    content: selectedText.value,
    type: 'translate',
  })
  chatBox.value.pushMessage({
    type: 'bot',
    content: res.message.replace('\n', '<br />'),
    time: new Date(),
  })
  chatBox.value.thinking = false
}
</script>

<template>
  <div class="page-container">
    <div class="pdf-container">
      <VuePdfEmbed ref="pdf" :source="url" class="vue-pdf-embed" />
    </div>
    <div
      v-show="selectionMenu.show"
      :style="{
        left: `${selectionMenu.x}px`,
        top: `${selectionMenu.y}px`,
      }"
      class="selection-menu"
    >
      <div>
        <ElButton @click="searchSelectionHandler" size="small">搜索</ElButton>
      </div>
      <div>
        <ElButton @click="translateSelectionHandler" size="small"
          >翻译</ElButton
        >
      </div>
    </div>
    <ChatBox ref="chatBox" :ask-fn="askFn"></ChatBox>
  </div>
</template>

<style scoped lang="stylus">
.selection-menu {
  position fixed
  top 0
  left -100%


  display grid
  grid-template-rows r0px 40px

  width 100px

  & > div + div {
    margin-top 1rem
  }
}
.page-container {
  setFlex(row, space-between, flex-start)

  width 100%
  height 100%
}

.pdf-container {
  position relative

  width 70%
  height 100%

  overflow auto

  .scale-btn {
    position fixed

    top 70px
    right 32%
  }
}

.vue-pdf-embed {
  text-align: center;
  border: 1px solid #e5e5e5;
  margin: 0 auto;
  box-sizing: border-box;
}

.chat-box {
  width 30%
  height 100%

  box-shadow 0 0 10px $color-g5
}
</style>
