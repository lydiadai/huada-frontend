<script setup>
import { ref, watch, inject } from 'vue'
import { useRoute } from 'vue-router'
import { resizeMouseDownEventHandler } from '@assets/utils/resize.js'
import ChatBox from '@comp/chat-box.vue'

const route = useRoute()
const props = defineProps({
  show: {
    type: Boolean,
    default: () => false,
  },
  chatHandler: {
    type: Function,
    default: () => {},
  },
})

const boxWidth = ref(400)
const boxWidthStyle = ref(props.show ? '400px' : '0')
const transitionStr = ref('width 0.2s ease')
const resizeStartHandler = (event) => {
  transitionStr.value = ''
  const max = window.innerWidth / 2
  resizeMouseDownEventHandler(
    'l',
    event.clientX,
    (delta) => {
      const width = boxWidth.value + delta
      if (width < 300) {
        boxWidthStyle.value = '300px'
      } else if (width > max) {
        boxWidthStyle.value = `${max}px`
      } else {
        boxWidthStyle.value = `${width}px`
      }
    },
    () => {
      transitionStr.value = 'width 0.2s ease'
    }
  )
}
watch(
  () => props.show,
  (show) => {
    if (show) {
      boxWidthStyle.value = '400px'
    } else {
      boxWidthStyle.value = '0'
    }
  }
)

const showChat = inject('showChat')
const showBotHandler = () => {
  if (route.fullPath.endsWith('doi')) {
    showChat.value = false
  } else {
    showChat.value = !showChat.value
  }
}

const closeBotHandler = () => {
  showChat.value = false
}

const chatBox = ref()
defineExpose({
  pushMessage: chatBox?.value?.pushMessage,
})
</script>

<template>
  <div
    class="bot-container"
    :style="{ width: boxWidthStyle, transition: transitionStr }"
  >
    <ChatBox ref="chatBox" :ask-fn="chatHandler"></ChatBox>
    <div class="close" @click="closeBotHandler">></div>
    <div class="resize-bar" @mousedown="resizeStartHandler"></div>
  </div>
  <div
    v-if="!showChat && !route.path.endsWith('doi') && !route.path.endsWith('preview')"
    class="bot iconfont icon-openai"
    @click="showBotHandler"
  ></div>
</template>

<style scoped lang="stylus">
.bot-container {
  position relative

  height 100%

  overflow hidden
}

.resize-bar {
  position absolute
  top 0
  left 0

  width 4px
  height 100%

  &:hover {
    cursor ew-resize
  }
}

.close {
  @extends .cursor-pointer

  position absolute
  top calc(50% - 20px)
  left 0

  setFlex(column, center, center)

  width 15px
  height 40px

  border-top-right-radius 8px
  border-bottom-right-radius 8px

  box-shadow 1px 0 10px $color-g5
}

.bot {
  @extend .cursor-pointer

  position fixed

  right -25px
  bottom 60px

  font-size 50px !important
}
</style>
