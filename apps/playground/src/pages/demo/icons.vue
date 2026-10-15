<script setup lang="ts">
import { computed, ref } from 'vue'
import { iconList, type RbIconMeta } from '@robot-ui/icons'

definePage({
  style: {
    navigationBarTitleText: 'Icon 图标库',
  },
})

const keyword = ref('')
const current = ref<RbIconMeta | null>(null)

const filtered = computed(() => {
  const q = keyword.value.trim().toLowerCase()
  if (!q) {
    return iconList
  }
  return iconList.filter(
    (item) =>
      item.name.toLowerCase().includes(q) ||
      item.title.toLowerCase().includes(q) ||
      item.componentName.toLowerCase().includes(q),
  )
})

function onSelect(item: RbIconMeta) {
  current.value = item
  uni.setClipboardData({
    data: item.name,
    success: () => {
      uni.showToast({ title: `已复制 ${item.name}`, icon: 'none' })
    },
  })
}
</script>

<template>
  <view class="page">
    <view class="hero">
      <text class="hero__title">Icon 图标库</text>
      <text class="hero__desc">
        共 {{ iconList.length }} 个图标 · 点击复制 name · 对齐 Element Plus 具名导出
      </text>
      <rb-search v-model="keyword" placeholder="搜索名称 / 中文 / 组件名" :show-action="false" />
    </view>

    <view class="demo__section">
      <text class="demo__label">基础用法</text>
      <view class="demo__row">
        <rb-icon name="shuaxin" :size="48" color="#3c9cff" />
        <rb-icon name="rili" :size="48" color="#5ac725" />
        <rb-icon name="shangchuan" :size="48" color="#f9ae3d" />
        <rb-icon name="fanhuishouye" :size="48" />
        <rb-icon name="shuaxin" :size="48" spin color="#3c9cff" />
      </view>
      <text class="demo__code">&lt;rb-icon name="shuaxin" :size="48" color="#3c9cff" /&gt;</text>
    </view>

    <view v-if="current" class="demo__section">
      <text class="demo__label">当前选中</text>
      <view class="current">
        <rb-icon :name="current.name" :size="72" color="#3c9cff" />
        <view class="current__meta">
          <text>name: {{ current.name }}</text>
          <text>title: {{ current.title }}</text>
          <text>组件: {{ current.componentName }}</text>
        </view>
      </view>
    </view>

    <view class="demo__section">
      <text class="demo__label">全部图标（{{ filtered.length }}）</text>
      <view class="grid">
        <view
          v-for="item in filtered"
          :key="item.name"
          class="grid__item"
          @click="onSelect(item)"
        >
          <rb-icon :name="item.name" :size="44" color="#303133" />
          <text class="grid__name">{{ item.name }}</text>
          <text class="grid__title">{{ item.title }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  padding: 24rpx;
  background: #f5f6f8;
  box-sizing: border-box;
}

.hero {
  margin-bottom: 24rpx;
  padding: 28rpx;
  border-radius: 16rpx;
  background: #fff;
}

.hero__title {
  display: block;
  font-size: 36rpx;
  font-weight: 700;
  color: #303133;
}

.hero__desc {
  display: block;
  margin: 10rpx 0 20rpx;
  font-size: 24rpx;
  color: #909399;
  line-height: 1.5;
}

.demo__section {
  margin-bottom: 24rpx;
  padding: 24rpx;
  border-radius: 12rpx;
  background: #fff;
}

.demo__label {
  display: block;
  margin-bottom: 16rpx;
  font-size: 28rpx;
  font-weight: 600;
  color: #303133;
}

.demo__row {
  display: flex;
  flex-wrap: wrap;
  gap: 24rpx;
  align-items: center;
}

.demo__code {
  display: block;
  margin-top: 16rpx;
  padding: 12rpx 16rpx;
  border-radius: 8rpx;
  background: #f5f7fa;
  color: #606266;
  font-size: 22rpx;
}

.current {
  display: flex;
  align-items: center;
  gap: 24rpx;
}

.current__meta {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
  font-size: 24rpx;
  color: #606266;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -8rpx;
}

.grid__item {
  width: 33.33%;
  padding: 20rpx 8rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rpx;
}

.grid__name {
  max-width: 100%;
  font-size: 20rpx;
  color: #303133;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.grid__title {
  max-width: 100%;
  font-size: 18rpx;
  color: #909399;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
