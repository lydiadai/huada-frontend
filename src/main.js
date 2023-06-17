import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import router from '@/router'

import { createPinia } from 'pinia'

import axios from '@/http/axios.js'

import { ElLoading } from 'element-plus'
import 'element-plus/theme-chalk/el-loading.css'
import 'element-plus/theme-chalk/el-notification.css'
import 'element-plus/theme-chalk/el-message.css'
import '@assets/styles/theme.css'
import '@assets/iconfont/iconfont.css'

const app = createApp(App)

app.use(router)

app.use(createPinia())

app.directive('loading', ElLoading.directive)

app.provide('$http', axios)

app.mount('#app')
