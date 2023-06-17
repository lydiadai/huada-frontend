<script setup>
import { dateFormatter } from '@assets/utils/util.js'

defineProps({
  message: {
    type: Object,
    default: () => ({
      type: 'bot',
      avatar: '',
      time: new Date(),
      content: '欢迎使用',
    }),
  },
})
</script>

<template>
  <div
    class="message-wrapper"
    :class="{ 'align-right': message.type === 'user' }"
  >
    <div v-if="message.type === 'bot'" class="iconfont icon-openai"></div>
    <div class="content-container">
      <div class="time">{{ dateFormatter(message.time) }}</div>
      <div class="content" v-html="message.content"></div>
    </div>
    <!--
    <div v-if="message.type === 'user'" class="avatar">
      <img :src="message.avatar" alt="avatar" />
    </div>
    -->
  </div>
</template>

<style scoped lang="stylus">
.message-wrapper {
  display grid
  grid-template-columns 40px 1fr
  grid-column-gap 1rem

  width 100%

  & + & {
    margin-top 2rem
  }

  &.align-right {
    setFlex(row, flex-end, flex-start)

    .content-container {
      setFlex(column, flex-start, flex-end)
    }
  }

  .iconfont.icon-openai {
    setFlex(row, center, flex-start)

    font-size 40px
    color $color-primary
  }

  .time {
    font-size $size-10
    color $color-g5
  }

  .content {
    padding 0.7rem 1rem
    border-radius: 8px
    width fit-content

    background-color $color-primary
  }
}
</style>
