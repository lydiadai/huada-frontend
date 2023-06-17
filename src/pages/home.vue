<script setup>
import { useMainStore } from '@store/mainStore.js'

const mainStore = useMainStore()
</script>

<template>
  <h1>Home Page</h1>
  <h2>Hello: {{ mainStore.getUserName }}</h2>
</template>

<style scoped lang="stylus"></style>
