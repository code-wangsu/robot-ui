<script setup lang="ts">
import { ref } from 'vue'
import type { UploadFileItem } from '@robot-ui/components'

definePage({
  style: {
    navigationBarTitleText: '媒体组件',
  },
})

const previewList = [
  'https://picsum.photos/seed/rb1/800/600',
  'https://picsum.photos/seed/rb2/800/600',
  'https://picsum.photos/seed/rb3/800/600',
]

const fileList = ref<UploadFileItem[]>([])
const videoFileList = ref<UploadFileItem[]>([])

/** 演示：无 action 时仅选择本地文件（App 选图后拿到 tempFilePath） */
const localOnlyList = ref<UploadFileItem[]>([])

/**
 * 真实上传时填写后端地址，内部走 uni.uploadFile
 * action / name / header / formData 对齐 Element Plus + uni-app Android
 */
const uploadAction = ''

function onUploadSuccess(response: unknown, file: UploadFileItem) {
  console.log('upload success', response, file)
}

function onUploadError(error: Error, file: UploadFileItem) {
  console.log('upload error', error.message, file)
}
</script>

<template>
  <view class="demo">
    <view class="demo__section">
      <text class="demo__label">Image · 点击预览（preview-src-list）</text>
      <view class="demo__row">
        <rb-image
          v-for="(src, index) in previewList"
          :key="src"
          :src="src"
          :preview-src-list="previewList"
          :initial-index="index"
          fit="cover"
          width="200rpx"
          height="200rpx"
          radius="12"
        />
      </view>
      <text class="demo__meta">多图预览带左右切换与关闭按钮（size=small）；也可设 native-preview 走系统预览</text>
    </view>

    <view class="demo__section">
      <text class="demo__label">Video（默认封面懒加载，降低 App 原生层级遮挡）</text>
      <rb-video
        src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/uni-app/%E7%9F%A5%E8%AF%86%E6%98%9F%E7%90%83.mp4"
        poster="https://picsum.photos/seed/poster/800/450"
        width="100%"
        :height="360"
        object-fit="contain"
      />
      <text class="demo__meta">点击封面再挂载 video；弹层打开时可调用 ref.deactivate()</text>
    </view>

    <view class="demo__section">
      <text class="demo__label">Upload · picture-card（本地选图）</text>
      <rb-upload
        v-model:file-list="localOnlyList"
        :limit="6"
        tip="上传图片"
        :auto-upload="false"
      />
      <text class="demo__meta">未配置 action 时只选图，不调用 uploadFile</text>
    </view>

    <view class="demo__section">
      <text class="demo__label">Upload · 自动上传（需配置 action）</text>
      <rb-upload
        v-model:file-list="fileList"
        :action="uploadAction"
        name="file"
        :headers="{ Authorization: 'Bearer demo-token' }"
        :data="{ biz: 'robot-ui' }"
        :limit="3"
        list-type="picture-card"
        tip="拍照/相册"
        url-field="url"
        @success="onUploadSuccess"
        @error="onUploadError"
      />
      <text class="demo__meta">
        内部：uni.chooseImage → uni.uploadFile({ url, filePath, name, header, formData })
      </text>
    </view>

    <view class="demo__section">
      <text class="demo__label">Upload · 视频</text>
      <rb-upload
        v-model:file-list="videoFileList"
        accept="video"
        :auto-upload="false"
        :limit="2"
        tip="上传视频"
      />
    </view>
  </view>
</template>

<style scoped>
.demo {
  padding: 24rpx;
}

.demo__section {
  margin-bottom: 40rpx;
}

.demo__label {
  display: block;
  margin-bottom: 20rpx;
  color: #303133;
  font-size: 30rpx;
  font-weight: 600;
}

.demo__row {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.demo__meta {
  display: block;
  margin-top: 16rpx;
  color: #909193;
  font-size: 22rpx;
  line-height: 1.5;
}
</style>
