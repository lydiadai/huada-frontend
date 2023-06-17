module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    "vue/setup-compiler-macros": true,
  },
  extends: ['plugin:vue/vue3-essential', 'standard', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['vue'],
  rules: {
    'vue/no-multiple-template-root': 'off', // 关闭vue文件template单根节点校验
    'vue/multi-word-component-names': 'off', // 关闭vue组件名称多单词校验
    'linebreak-style': ['error', 'unix'], // 设置文件换行格式为Unix风格[LF]
  },
}
