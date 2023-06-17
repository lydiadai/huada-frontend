<script setup>
import { ref, onMounted } from 'vue'
import VuePdfEmbed from 'vue-pdf-embed'

const source = ref('https://cggptsc.blob.core.windows.net/gptfiles/main.pdf')
const scale = ref(1) // 缩放比例
const pageNum = ref(1) // 当前页面

onMounted(() => {
  document.addEventListener('selectionchange', () => {})
  document.onselectionchange = () => {
    const selection = document.getSelection()
    this.text = selection.toString()
    console.log(this.text)
  }
})
</script>

<template>
  <div class="page-container">
    <VuePdfEmbed
      :source="source"
      :style="scale"
      class="vue-pdf-embed"
      :page="pageNum"
    />
  </div>
</template>

<style scoped lang="stylus">
.vue-pdf-embed {
  text-align: center;
  width: 515px;
  border: 1px solid #e5e5e5;
  margin: 0 auto;
  box-sizing: border-box;
}
</style>
