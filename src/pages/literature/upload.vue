<script setup>
import { ref, reactive, unref, watch } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import { BlobServiceClient } from '@azure/storage-blob'
import axios from '@/http/axios.js'

const currentStep = ref(0)

const beforeUploadHandler = (file) => {
  console.log(file, 'before upload')
}

const uploading = ref(false)
const fileUrl = ref('')
const fileName = ref('')
const uploadFileHandler = async ({ file }) => {
  uploading.value = true
  const containerName = `gptfiles`
  const sasToken =
    'sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2025-05-29T15:09:48Z&st=2023-05-29T07:09:48Z&spr=https,http&sig=Mxa5vzLwIJ0tFojo8jZ3rSkNgNud3EwP2NmN9yyICpQ%3D'
  const storageAccountName = 'cggptsc'
  const uploadUrl = `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
  console.log(uploadUrl)
  const blobService = new BlobServiceClient(uploadUrl)
  const containerClient = blobService.getContainerClient(containerName)

  console.log('upload file is : ', file)
  const name = file.name.toString().split('.')
  name[0] = `${name[0]}-${Date.now()}`
  fileName.value = name.join('.')
  const f = {
    ...file,
    name: fileName.value,
  }
  // create blobClient for container
  const blobClient = containerClient.getBlockBlobClient(f.name)

  // set mimetype as determined from browser with file upload control
  const options = { blobHTTPHeaders: { blobContentType: f.type } }

  // upload file
  await blobClient.uploadData(f, options)
  fileUrl.value = `https://cggptsc.blob.core.windows.net/gptfiles/${f.name}`

  currentStep.value = currentStep.value + 1
}

const fileInfo = reactive({
  title: '',
  author: '',
  doi: '',
  file_name: '',
})

const submitFileInfoHandler = async () => {
  const data = unref(fileInfo)
  data.url = encodeURIComponent(fileUrl.value)
  data.user_id = '123'
  data.file_name = fileName.value
  const res = await axios.post('/web/file/upload', data)
  console.log('add Document res is : ', res)
}
</script>

<template>
  <div class="page-container container">
    <div class="steps-container">
      <ElSteps :active="currentStep" align-center>
        <ElStep title="上传文件" />
        <ElStep title="文件基础信息" />
      </ElSteps>
    </div>

    <div class="main-content">
      <template v-if="currentStep === 0">
        <ElUpload
          v-loading="uploading"
          class="upload"
          action="#"
          :show-file-list="false"
          drag
          :disabled="uploading"
          :before-upload="beforeUploadHandler"
          :http-request="uploadFileHandler"
        >
          <el-icon class="el-icon--upload"><UploadFilled /></el-icon>
          <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
          </div>
          <!--
          <template #tip>
            <div class="el-upload__tip">
              jpg/png files with a size less than 500kb
            </div>
          </template>
          -->
        </ElUpload>
      </template>
      <template v-if="currentStep === 1">
        <ElForm>
          <ElFormItem label="题目">
            <ElInput v-model="fileInfo.title"></ElInput>
          </ElFormItem>
          <ElFormItem label="作者">
            <ElInput v-model="fileInfo.author"></ElInput>
          </ElFormItem>
          <ElFormItem label="DOI">
            <ElInput v-model="fileInfo.doi"></ElInput>
          </ElFormItem>
          <ElButton @click="submitFileInfoHandler">提交</ElButton>
        </ElForm>
      </template>
    </div>
  </div>
</template>

<style scoped lang="stylus">
.page-container {
  width 80%
  height 80%

  margin 5% auto
  padding 8% 2%

  background-color $color-white
}

.main-content {
  setFlex(row, center, center)

  width 100%
  height calc(100% - 60px)
}

.upload {
  width 50%
}

.progress {
  width 80%
}
</style>
