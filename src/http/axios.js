import Axios from 'axios'
import { responseInterceptor, errorInterceptor } from '@/config.js'

const axios = Axios.create({
  timeout: 30000000000,
  withCredentials: true,
})

axios.interceptors.response.use(responseInterceptor, errorInterceptor)

export default axios
