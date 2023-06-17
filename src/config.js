import router from '@/router/index.js'
import { ElMessage, ElNotification } from 'element-plus'

/**
 * Axios response interceptor
 * @param res
 * @returns {*}
 */
export const responseInterceptor = (res) => {
  try {
    const data = res.data
    if (data.error) {
      switch (data.error.code) {
        case 100: // session expired
          if (!window.location.hash.includes('login')) {
            ElMessage.error('Login expired! Please login again.')
            router.push('/login')
          }
          break
        default:
          console.log(data.error.data.message)
          ElMessage.error(data.error.data.message)
      }
    }
  } catch (err) {
    ElMessage.error('Uncaught error')
    console.error('Uncaught error: ', err)
  }
  return res.config.responseType === 'blob' ? res : res.data
}

/**
 * Axios error interceptor
 * @param error
 */
export const errorInterceptor = (error) => {
  console.error(error)
  if (error.response) {
    // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
    console.log('error with response')
    console.log(error.response.data)
    console.log(error.response.status)
    console.log(error.response.headers)
    if (error.response.status === 500) {
      router.push('/error/500')
    }
  } else if (error.request) {
    // 请求已经成功发起，但没有收到响应
    // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
    // 而在node.js中是 http.ClientRequest 的实例
    console.log('error with request')
    console.log(error.request)
  } else {
    // 发送请求时出了点问题
    console.log('otherwise')
    console.log('Error', error.message)
  }
  console.log(error.config)
  if (error.message.includes('timeout')) {
    ElNotification({
      title: 'Request Timeout',
      message: 'Please check your network and try again later.',
      type: 'error',
      duration: 0,
    })
  }
}

/**
 * Page menu load function
 * @returns {Promise<[{route: string, name: string}]>}
 */
export const loadMenus = async () => {
  return Promise.resolve([
    {
      name: 'Home',
      route: '/home',
    },
  ])
}
