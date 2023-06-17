<script setup></script>

<template>
  <div class="top-bar">
    <div class="system-name">华大GBI</div>
    <ElMenu class="menu" mode="horizontal" :ellipsis="false" router>
      <ElMenuItem index="/literature">科研资源库</ElMenuItem>
      <ElMenuItem index="/literature/upload">文献上传</ElMenuItem>
      <ElMenuItem index="/literature/doi">智能DOI检索</ElMenuItem>
    </ElMenu>
  </div>
</template>

<style scoped lang="stylus">
.top-bar {
  setFlex(row, flex-start, center)

  height 60px
  background-color $color-white
  border-bottom 1px solid #bbb

  .system-name {
    margin-right 2rem

    font-size 3rem
    color $color-primary
    font-weight bold
  }

  .menu {
    width auto

    border-bottom 0
  }
}
</style>
