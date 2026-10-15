<script setup lang="ts">
import { ref } from 'vue'
import { showToast } from '@robot-ui/components'

definePage({
  style: {
    navigationBarTitleText: '反馈组件',
  },
})

const showPopup = ref(false)
const showModal = ref(false)
const showDialog = ref(false)
const showSheet = ref(false)
const showOverlay = ref(false)
const showNotify = ref(false)

const actions = [
  { name: '拍照' },
  { name: '从相册选择' },
  { name: '删除', color: '#f56c6c' },
]

function openNotify() {
  showNotify.value = true
  setTimeout(() => {
    showNotify.value = false
  }, 2500)
}

function openToast(type: 'default' | 'success' | 'error' | 'loading' | 'warning') {
  const map = {
    default: { title: '提示', message: '这是一条消息通知' },
    success: { title: '成功', message: '操作已成功完成' },
    warning: { title: '警告', message: '请注意检查填写内容' },
    error: { title: '错误', message: '操作失败，请稍后重试' },
    loading: { title: '加载中', message: '正在处理，请稍候' },
  } as const

  showToast({
    ...map[type],
    type: type === 'default' ? 'info' : type,
    duration: type === 'loading' ? 0 : 3000,
    position: 'top-right',
  })
}
</script>

<template>
  <view class="demo">
    <view class="demo__section">
      <text class="demo__label">测试按钮 · Toast</text>
      <view class="demo__row">
        <rb-button size="small" text="默认" @click="openToast('default')" />
        <rb-button size="small" type="success" text="成功" @click="openToast('success')" />
        <rb-button size="small" type="warning" text="警告" @click="openToast('warning')" />
        <rb-button size="small" type="error" text="错误" @click="openToast('error')" />
        <rb-button size="small" type="info" text="Loading" @click="openToast('loading')" />
      </view>
    </view>

    <view class="demo__section">
      <text class="demo__label">测试按钮 · Popup / Modal / AppDialog / Overlay</text>
      <view class="demo__row">
        <rb-button size="small" type="primary" text="Popup" @click="showPopup = true" />
        <rb-button size="small" text="Modal" @click="showModal = true" />
        <rb-button size="small" text="AppDialog" @click="showDialog = true" />
        <rb-button size="small" type="info" text="Overlay" @click="showOverlay = true" />
      </view>
    </view>

    <view class="demo__section">
      <text class="demo__label">测试按钮 · ActionSheet / Notify / Tooltip</text>
      <view class="demo__row">
        <rb-button size="small" text="ActionSheet" @click="showSheet = true" />
        <rb-button size="small" type="warning" text="Notify" @click="openNotify" />
        <rb-tooltip text="这是 Tooltip 提示">
          <rb-button size="small" text="Tooltip" />
        </rb-tooltip>
      </view>
    </view>

    <view class="demo__section">
      <text class="demo__label">测试按钮 · Alert / NoticeBar</text>
      <rb-alert type="warning" title="注意" description="请检查表单填写内容" />
      <view class="gap" />
      <rb-notice-bar text="这是一条滚动通知栏消息，用于演示 NoticeBar 组件。" />
    </view>

    <rb-toast global />

    <rb-popup v-model:show="showPopup" mode="bottom" :round="16">
      <view class="panel">
        <text>底部 Popup 内容</text>
        <rb-button size="small" type="primary" text="关闭" @click="showPopup = false" />
      </view>
    </rb-popup>

    <rb-modal
      v-model:show="showModal"
      title="提示"
      content="确认执行该操作吗？"
      @confirm="showToast('已确认')"
    />

    <rb-app-dialog v-model="showDialog" title="业务弹窗" :max-height="480">
      <view class="dialog-body">这是从 management 迁入的 AppDialog。</view>
      <template #footer>
        <rb-button size="small" plain text="取消" @click="showDialog = false" />
        <rb-button size="small" type="primary" text="确定" @click="showDialog = false" />
      </template>
    </rb-app-dialog>

    <rb-action-sheet
      v-model:show="showSheet"
      title="请选择操作"
      :actions="actions"
      @select="(item) => showToast(item.name)"
    />

    <rb-notify
      v-model:show="showNotify"
      type="primary"
      message="这是一条 Notify 顶部通知"
    />

    <rb-overlay :show="showOverlay" @click="showOverlay = false" />
  </view>
</template>

<style lang="scss" scoped>
.demo {
  padding: 24rpx;
}

.demo__section {
  margin-bottom: 32rpx;
  padding: 24rpx;
  border-radius: 12rpx;
  background: #fff;
}

.demo__label {
  display: block;
  margin-bottom: 12rpx;
  font-size: 26rpx;
  font-weight: 600;
  color: #606266;
}

.demo__row {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.panel {
  padding: 32rpx;
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.dialog-body {
  padding: 12rpx 0;
  font-size: 26rpx;
  color: #606266;
  line-height: 1.5;
}

.gap {
  height: 20rpx;
}
</style>
