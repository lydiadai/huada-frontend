<script setup>
import { ref, onMounted, computed, nextTick } from 'vue'
import { resizeMouseDownEventHandler } from '@assets/utils/resize.js'
import Message from '@comp/chat-box-message.vue'

const props = defineProps({
  askFn: {
    type: Function,
    default: () => ({
      type: 'bot',
      content: '欢迎使用',
      time: new Date(),
    }),
  },
  inputResizeable: {
    type: Boolean,
    default: false,
  },
})
defineEmits(['change'])

const messageList = ref([
  {
    type: 'bot',
    content: '欢迎使用',
    time: new Date(),
  },
])
const inputValue = ref('')

const sendHandler = async () => {
  const value = inputValue.value
  inputValue.value = ''
  pushMessage({
    type: 'user',
    content: value,
    time: new Date(),
  })
  const answer = await props.askFn(value)
  pushMessage(answer)
}

const messageContainer = ref()
const pushMessage = (message) => {
  messageList.value.push(message)
  nextTick(() => {
    messageContainer.value.scrollTop = messageContainer.value.scrollTopMax
  })
}

const inputRow = ref()
const initHeight = ref()
const inputRowHeight = ref(60)
const inputRowHeightStyle = ref('auto')
const resizeStartHandler = (event) => {
  inputRowHeight.value = inputRow.value.clientHeight
  resizeMouseDownEventHandler(
    't',
    event.clientY,
    (delta) => {
      console.log('delta is : ', delta)
      const height = inputRowHeight.value + delta
      const max = initHeight.value * 3
      console.log(max, initHeight.value)
      if (height > max.value) {
        inputRowHeightStyle.value = `${max}px`
      } else if (height < initHeight.value) {
        inputRowHeightStyle.value = `${initHeight.value}px`
      } else {
        inputRowHeightStyle.value = `${height}px`
      }
    },
    () => {}
  )
}

const chatBox = ref()
const messageContainerHeightStyle = computed(
  () => chatBox.value?.clientHeight - inputRow.value?.clientHeight
)
onMounted(() => {
  setTimeout(() => {
    initHeight.value = inputRow.value.clientHeight
  }, 200)
})
</script>

<template>
  <div class="chat-box" ref="chatBox">
    <div
      ref="messageContainer"
      class="message-container container"
      :style="{ height: messageContainerHeightStyle }"
    >
      <template v-for="message in messageList" :key="message.time">
        <Message :message="message" />
      </template>
    </div>
    <div
      class="input-row"
      ref="inputRow"
      :style="{ height: inputRowHeightStyle }"
    >
      <div
        v-if="inputResizeable"
        class="resize-bar"
        @mousedown="resizeStartHandler"
      ></div>
      <ElInput
        v-model="inputValue"
        resize="none"
        @keydown.enter="sendHandler"
      />
      <ElButton class="send-btn" @click="sendHandler">发送</ElButton>
    </div>
  </div>
</template>

<style scoped lang="stylus">
.chat-box {
  setFlex(column, space-between, flex-start)

  width 100%
  height 100%

  overflow hidden

  .message-container {
    width 100%
    overflow-y auto
  }

  .input-row {
    @extends .container

    position relative

    setFlex(row, space-between, center)

    width 100%
    box-shadow 1px -2px 5px -3px $color-g5

    .send-btn {
      margin-inline-start 1rem
    }

    .resize-bar {
      position absolute
      top 0
      left 0
      width 100%
      height 4px

      &:hover {
        cursor ns-resize
      }
    }
  }
}
</style>
