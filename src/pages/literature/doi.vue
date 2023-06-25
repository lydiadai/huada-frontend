<script setup>
import ChatBox from '@comp/chat-box.vue'
import axios from '@/http/axios.js'

const askHandler = async (question) => {
  const res = await axios.post('/web/chat', {
    question,
  })
  return {
    type: 'bot',
    content: res.message.replace(/\n/g, '<br />'),
    time: new Date(),
  }
}
</script>

<template>
  <ChatBox :ask-fn="askHandler"></ChatBox>
</template>

<style scoped lang="stylus"></style>
