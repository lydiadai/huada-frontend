/**
 * 利用webpack自动导出所有模块
 */
const arr = []
const files = require.context('./common', false, /\.vue$/)
files.keys().forEach((fileName) => {
  // 获取组件配置
  const config = files(fileName)
  const componentName = fileName.substring(2).replace(/\.\w+$/, '')
  // 全局注册组件
  arr.push({ key: componentName, val: config.default || config })
})

const filesLayout = require.context('./layout', false, /\.vue$/)
filesLayout.keys().forEach((fileName) => {
  // 获取组件配置
  const config = filesLayout(fileName)
  const componentName = fileName.substring(2).replace(/\.\w+$/, '')
  // 全局注册组件
  arr.push({ key: componentName, val: config.default || config })
})

export default {
  install(app) {
    arr.forEach((v) => {
      app.component(v.key, v.val)
    })
  },
}
