<script setup>
import { ref, provide } from 'vue'
import TopBar from '@comp/top-bar.vue'
import AiBot from '@comp/ai-bot.vue'

const showChat = ref(false)
provide('showChat', showChat)
</script>

<template>
  <TopBar></TopBar>
  <div id="router-view-container">
    <div class="router-view-container">
      <RouterView></RouterView>
    </div>
    <AiBot :show="showChat"></AiBot>
  </div>
</template>

<style lang="stylus">
#router-view-container {
  setFlex(row, space-between, flex-start)

  width 100vw
  height calc(100vh - 60px)
  overflow auto

  .router-view-container {
    width 100%
    height 100%
    background-color $color-bg
  }
}
</style>
