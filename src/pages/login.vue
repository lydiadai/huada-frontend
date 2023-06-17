<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { loginBySSO, code2Session, getSessionInfo } from '@/services/auth.js'
import { getQuery, clearQuery } from '@assets/utils/util'
import { useMainStore } from '@/store/mainStore.js'

const mainStore = useMainStore()
const router = useRouter()
const logging = ref(true)
const loginText = ref('Logging in')
let count = 0

const updateLoginText = () => {
  const textArr = ['Logging in']
  for (let i = 0; i < count; i++) {
    textArr.push('.')
  }
  count = (count + 1) % 4
  loginText.value = textArr.join('')
}
const intervalId = setInterval(updateLoginText, 500)

const init = async () => {
  clearInterval(intervalId)
  const sessionInfo = await getSessionInfo()
  if (sessionInfo.error) {
    await router.push('/error/401')
  } else {
    // await mainStore.initStore()
    // await router.push(mainStore.menuList[0].route)
  }
}

const login = async () => {
  const query = getQuery(window.location.search.substring(1))
  if (query.code) {
    clearQuery()
    const loginRes = await code2Session(query.code)
    if (loginRes.state === 0) {
      mainStore.sessionInfo = undefined
      await getSessionInfo()
      await init()
    }
  } else {
    await loginBySSO()
  }
}

const checkLogin = async () => {
  const sessionInfo = await getSessionInfo()
  if (sessionInfo.error) {
    await login()
  } else {
    await init()
  }
}

onMounted(checkLogin)
</script>

<template class="main-container">
  <div id="login-container">
    <div id="login-dialog" v-loading="logging"></div>
  </div>
</template>

<style scoped lang="stylus">
#login-container
  position absolute
  top 0
  left 0

  setFlex(row, center, center)

  width 100%
  height 100%
  background-color $color-g1

#login-dialog
  width 200px
  height 200px
  background-color $color-white
</style>
