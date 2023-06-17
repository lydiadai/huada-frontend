<script setup>
import { ref } from 'vue'
import { getSessionInfo, loginByPassword } from '@/services/auth'
import { useRouter } from 'vue-router'
import { useMainStore } from '@store/mainStore.js'
import { ElMessage } from 'element-plus'

const router = useRouter()
const mainStore = useMainStore()
const email = ref('')
const password = ref('')
const loginCredentials = [
  {
    label: 'Admin',
    email: 'admin',
    password: 'admin',
  },
]
const logging = ref(false)

const init = async () => {
  const sessionInfo = await getSessionInfo()
  if (sessionInfo.error) {
    await router.push('/error/401')
  } else {
    await mainStore.loadMeta()
    await router.push(mainStore.menuList[0].route)
  }
}

const loginHandler = async () => {
  logging.value = true
  const loginRes = await loginByPassword(email.value, password.value)
  logging.value = false
  if (loginRes) {
    await init()
  } else {
    ElMessage.warning('Login failed')
  }
}

const loginByUser = async (credential) => {
  email.value = credential.email
  password.value = credential.password
  await loginHandler()
}
</script>

<template class="main-container">
  <div class="login-container">
    <div class="login-content">
      <div class="input-row">
        <div class="label">邮箱</div>
        <ElInput v-model="email" />
      </div>
      <div class="input-row">
        <div class="label">密码</div>
        <ElInput
          v-model="password"
          show-password
          @keydown.enter="loginByPassword"
        />
      </div>
      <div class="input-row">
        <ElButton
          type="primary"
          style="width: 100%"
          :loading="logging"
          @click="loginHandler"
          >登录</ElButton
        >
      </div>
      <div class="input-row">
        <ElButton
          v-for="credential in loginCredentials"
          :key="credential.email"
          @click="loginByUser(credential)"
          >{{ credential.label }}
        </ElButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="stylus">
.login-container
  setFlex(row, center, center)
  height 80%

  .login-content
    padding 1.5rem
    background-color $color-white
    border-radius 0.8rem

    .input-row:not(:last-child)
      margin-bottom 1.5rem

      .label
        margin-bottom 0.3rem
</style>
