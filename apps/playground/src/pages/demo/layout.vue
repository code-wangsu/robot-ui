<script setup lang="ts">
import { ref } from 'vue'

definePage({
  style: {
    navigationBarTitleText: '布局导航',
  },
})

const current = ref(0)
const tabs = [
  { name: 0, title: '全部' },
  { name: 1, title: '进行中' },
  { name: 2, title: '已完成' },
]

const scrollTop = ref(0)

function onScroll(e: { detail?: { scrollTop?: number } }) {
  scrollTop.value = e.detail?.scrollTop ?? 0
}

function goHome() {
  uni.navigateBack()
}
</script>

<template>
  <rb-page-footer @scroll="onScroll">
    <template #header>
      <rb-sticky :scroll-top="scrollTop" :offset-top="0">
        <view class="sticky-bar">
          <rb-tabs v-model="current" :list="tabs" />
        </view>
      </rb-sticky>
    </template>

    <view class="content">
      <view v-for="i in 20" :key="i" class="card">
        列表项 {{ i }} · 当前 Tab：{{ current }}
      </view>
    </view>

    <template #footer>
      <rb-footer-back text="返回首页" icon="fanhuishouye" @click="goHome" />
    </template>
  </rb-page-footer>
</template>

<style lang="scss" scoped>
.sticky-bar {
  background: #fff;
  border-radius: 12rpx;
  overflow: hidden;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
  padding-top: 16rpx;
}

.card {
  padding: 28rpx 24rpx;
  border-radius: 12rpx;
  background: #fff;
  font-size: 26rpx;
  color: #303133;
}
</style>
