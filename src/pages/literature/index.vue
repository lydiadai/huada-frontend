<script setup>
import { ref, reactive, inject, unref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from '@/http/axios.js'

const router = useRouter()
const showChat = inject('showChat')

const query = reactive({
  title: '',
  author: '',
  abstract: '',
})

const literatureList = ref([])

const searchDocuments = async () => {
  axios.defaults.baseURL = '/api'
  const res = await axios.post('/searchDocument', unref(query))
  console.log('query res is : ', res)
  literatureList.value = res
}

const searchHandler = async () => {
  await searchDocuments()
}

onMounted(async () => {
  await searchDocuments()
})

const viewPdfHandler = (literature) => {
  router.push(`/literature/preview?url=${encodeURIComponent(literature.url)}&doi=${encodeURIComponent(literature.doi)}`)
}
</script>

<template>
  <div class="main-container">
    <div class="search-container">
      <ElForm
        class="search-form container"
        :class="{ short: showChat }"
        label-position="left"
        label-width="90px"
      >
        <ElFormItem class="input" label="主题：">
          <ElInput v-model="query.title"></ElInput>
        </ElFormItem>
        <ElFormItem class="input" label="作者：">
          <ElInput v-model="query.author"></ElInput>
        </ElFormItem>
        <ElFormItem class="input" label="文献来源：">
          <ElInput v-model="query.source"></ElInput>
        </ElFormItem>
        <ElButton round class="query-button" @click="searchHandler">搜索</ElButton>
      </ElForm>
    </div>
    <div class="literature-list container">
      <div
        class="literature container cursor-pointer"
        v-for="literature in literatureList"
        :key="literature.id"
        @click="viewPdfHandler(literature)"
      >
        <div class="title">{{ literature.title }}</div>
        <div class="author">作者：{{ literature.author }}</div>
        <div class="abstract">DOI：{{ literature.doi }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="stylus">
.main-container {
  width 100%
  height 100%

  .search-form {
    display grid
    grid-template-columns 400px 1fr
    grid-column-gap 2rem
    transition all 0.3s ease

    background-color $color-white

    .input {
      width 400px
    }

    .query-button {
      width fit-content
      padding 1rem 2rem
      color $color-primary
    }

    &.short {
      grid-template-columns 1fr !important

      .input {
        width 400px
      }
    }
  }

  .literature-list {

    .literature {

      .title {
        font-size $size-16
        font-weight bold
      }
    }
  }
}
</style>
