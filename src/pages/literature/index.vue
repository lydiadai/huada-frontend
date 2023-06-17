<script setup>
import { ref, reactive, inject } from 'vue'

const showChat = inject('showChat')

const query = reactive({
  title: '',
  author: '',
  abstract: '',
  timeRange: [],
})

const literatureList = ref([
  {
    title: 'Title Title Title Title Title Title Title Title Title ',
    author: 'Super Guo',
    abstract:
      'abstract abstract abstract abstract abstract abstract abstract abstract abstract abstract abstract abstract abstract abstract abstract abstract abstract abstract abstract abstract abstract abstract abstract abstract ',
  },
])
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
        <ElFormItem class="input" label="时间范围：">
          <ElDatePicker
            v-model="query.timeRange"
            clearable
            type="daterange"
          ></ElDatePicker>
        </ElFormItem>
        <ElButton round class="query-button">搜索</ElButton>
      </ElForm>
    </div>
    <div class="literature-list container">
      <div
        class="literature container"
        v-for="(literature, index) in literatureList"
        :key="index"
      >
        <div class="title">{{ literature.title }}</div>
        <div class="author">作者：{{ literature.author }}</div>
        <div class="abstract">摘要：{{ literature.abstract }}</div>
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
