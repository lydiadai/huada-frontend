<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import img401 from '@/assets/svgs/error/401.svg'
import img404 from '@/assets/svgs/error/404.svg'
import img500 from '@/assets/svgs/error/500.svg'
import { getMenu } from '@/services/auth'

const route = useRoute()
const router = useRouter()

const errorConfig = {
  401: {
    img: img401,
    code: '401',
    message: 'YOU DO NOT HAVE PERMISSION TO ACCESS THIS PAGE!',
    subMessage: ['Please contact the server administrator.'],
  },
  404: {
    img: img404,
    code: '404',
    message: "LOOKS LIKE YOU'RE LOST",
    subMessage: ['The page you are looking for is not available now!'],
  },
  500: {
    img: img500,
    code: '500',
    message: 'INTERNAL SERVER ERROR',
    subMessage: [
      'The server been deserted for a while.',
      'Please be patient and try again later',
    ],
  },
}

const errorInfo = ref(errorConfig[route.params.code])

const navigate2Home = async () => {
  const menuList = await getMenu()
  await router.push(menuList[0]?.route)
}
</script>

<template>
  <div class="main-container">
    <div class="error-img">
      <img :src="errorInfo.img" alt="error" />
    </div>
    <div class="message-container">
      <div class="error-code">{{ errorInfo.code }}</div>
      <div class="message">{{ errorInfo.message }}</div>
      <template v-for="subMessage in errorInfo.subMessage" :key="subMessage">
        <div class="sub-message">{{ subMessage }}</div>
      </template>
      <div class="action-container">
        <div class="button cursor-pointer" @click="navigate2Home">
          <div class="button-text">GO TO HOME</div>
          <div class="right-button">
            <img src="@assets/svgs/right.svg" alt="Right" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="stylus">
$size-20 = 1.428571rem
.main-container
  setFlex(row, center, center)

  position absolute
  top 0
  left 0

  width 100%
  height 100%
  background-color $color-g1

  .error-img
    width 35rem
    margin-right 7rem

  .message-container
    .error-code
      font-size 11.428571rem
      color $color-primary
      line-height normal

    .message
      margin-bottom 10px

      font-size $size-20
      font-weight bold
      color #010101

    .sub-message
      font-size $size-20
      font-weight 400
      color #9E9E9E

    .action-container
      setFlex(row, flex-start, center)

      margin-top 70px

      .button
        setFlex(row, flex-start, center)

        padding 4px 8px

        .button-text
          margin-right 20px
          fotn-size $size-20
          font-weight 700
          color #010101

        .right-button
          setFlex(row, center, center)

          padding 4px 8px
          border-radius 20px
          background-color $color-black
</style>
