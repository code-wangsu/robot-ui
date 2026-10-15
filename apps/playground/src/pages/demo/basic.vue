<script setup lang="ts">
import { ref } from 'vue'
import type { RbTagEffect, RbTagType } from '@robot-ui/components'

definePage({
  style: {
    navigationBarTitleText: '基础组件',
  },
})

const tags = ref(['标签一', '标签二', '标签三'])
const types: RbTagType[] = ['primary', 'success', 'info', 'warning', 'danger']
const effects: RbTagEffect[] = ['dark', 'light', 'plain']

const palette = [
  { label: 'Primary', color: '#3c9cff' },
  { label: 'Success', color: '#5ac725' },
  { label: 'Warning', color: '#f9ae3d' },
  { label: 'Danger', color: '#f56c6c' },
  { label: 'Info', color: '#909399' },
]

const scrollItems = Array.from({ length: 12 }, (_, i) => `滚动项 ${i + 1}`)
const refreshing = ref(false)

function onClose(index: number) {
  tags.value.splice(index, 1)
}

function onRefresh() {
  refreshing.value = true
  setTimeout(() => {
    refreshing.value = false
  }, 800)
}
</script>

<template>
  <view class="demo">
    <view class="demo__section">
      <text class="demo__label">Button · size</text>
      <view class="demo__row">
        <rb-button size="large" text="large" />
        <rb-button size="default" text="default" />
        <rb-button size="small" text="small" />
        <rb-button size="mini" text="mini" />
      </view>
      <view class="demo__row">
        <rb-button type="primary" text="主要按钮" />
        <rb-button type="success" plain text="朴素成功" />
        <rb-button size="small" loading text="加载中" />
      </view>
    </view>

    <view class="demo__section">
      <text class="demo__label">Color</text>
      <view class="demo__row">
        <rb-color
          v-for="item in palette"
          :key="item.color"
          :color="item.color"
          :label="item.label"
        />
      </view>
    </view>

    <view class="demo__section">
      <text class="demo__label">Layout（Container）</text>
      <rb-layout class="layout-demo" direction="vertical" height="280rpx">
        <template #header>
          <view class="layout-demo__bar">Header</view>
        </template>
        <view class="layout-demo__main">Main Content</view>
        <template #footer>
          <view class="layout-demo__bar">Footer</view>
        </template>
      </rb-layout>
    </view>

    <view class="demo__section">
      <text class="demo__label">Layout 栅格 · Row / Col</text>
      <rb-row :gutter="16">
        <rb-col :span="12">
          <view class="grid-item">span-12</view>
        </rb-col>
        <rb-col :span="12">
          <view class="grid-item">span-12</view>
        </rb-col>
        <rb-col :span="8">
          <view class="grid-item">span-8</view>
        </rb-col>
        <rb-col :span="8">
          <view class="grid-item">span-8</view>
        </rb-col>
        <rb-col :span="8">
          <view class="grid-item">span-8</view>
        </rb-col>
      </rb-row>
    </view>

    <view class="demo__section">
      <text class="demo__label">Link</text>
      <view class="demo__row">
        <rb-link text="默认链接" />
        <rb-link text="Primary" type="primary" />
        <rb-link text="Success" type="success" />
        <rb-link text="无下划线" type="warning" :underline="false" />
        <rb-link text="禁用" type="info" disabled />
      </view>
    </view>

    <view class="demo__section">
      <text class="demo__label">Text</text>
      <view class="demo__stack">
        <rb-text text="主要文本 main" type="main" />
        <rb-text text="次要文本 content" type="content" />
        <rb-text text="提示文本 tips" type="tips" />
        <rb-text text="成功色 Success" type="success" bold />
        <rb-text
          text="这是一段很长的文案，用于演示 truncated 单行省略效果，超出部分显示省略号"
          truncated
          type="content"
        />
        <rb-text text="点击复制这段文字" type="primary" copyable />
      </view>
    </view>

    <view class="demo__section">
      <text class="demo__label">Scroll</text>
      <rb-scroll
        :height="240"
        scroll-y
        :refresher-enabled="true"
        :refresher-triggered="refreshing"
        @refresherrefresh="onRefresh"
      >
        <view v-for="item in scrollItems" :key="item" class="scroll-item">{{ item }}</view>
      </rb-scroll>
    </view>

    <view class="demo__section">
      <text class="demo__label">Tag · effect=dark</text>
      <view class="demo__row">
        <rb-tag text="进行中" type="primary" effect="dark" />
        <rb-tag text="成功" type="success" effect="dark" />
        <rb-tag text="警告" type="warning" effect="dark" />
        <rb-tag text="危险" type="danger" effect="dark" />
        <rb-tag text="信息" type="info" effect="dark" />
      </view>
    </view>

    <view class="demo__section">
      <text class="demo__label">Tag · effect=light / plain</text>
      <view class="demo__row">
        <rb-tag v-for="t in types" :key="`light-${t}`" :text="t" :type="t" effect="light" />
      </view>
      <view class="demo__row demo__row--mt">
        <rb-tag v-for="t in types" :key="`plain-${t}`" :text="t" :type="t" effect="plain" />
      </view>
      <view class="demo__row demo__row--mt">
        <rb-tag
          v-for="(item, index) in tags"
          :key="item"
          :text="item"
          type="info"
          effect="plain"
          closable
          @close="onClose(index)"
        />
        <rb-tag
          v-for="e in effects"
          :key="e"
          :text="e"
          type="primary"
          :effect="e"
          size="small"
        />
      </view>
    </view>

    <view class="demo__section">
      <text class="demo__label">Cell</text>
      <rb-cell title="单元格" value="内容" is-link />
      <rb-cell title="带图标" label="描述信息" value="详情" />
    </view>

    <view class="demo__section">
      <text class="demo__label">Empty / Loading</text>
      <rb-empty text="rb-empty 空状态" />
      <rb-loading text="加载中..." />
    </view>
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
  margin-bottom: 20rpx;
  font-size: 26rpx;
  font-weight: 600;
  color: #606266;
}

.demo__row {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
  align-items: center;
}

.demo__row--mt {
  margin-top: 16rpx;
}

.demo__stack {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.layout-demo {
  border: 1rpx solid #ebeef5;
  border-radius: 12rpx;
  overflow: hidden;
}

.layout-demo__bar {
  padding: 16rpx 20rpx;
  background: #ecf5ff;
  color: #3c9cff;
  font-size: 24rpx;
  font-weight: 600;
}

.layout-demo__main {
  padding: 24rpx 20rpx;
  color: #606266;
  font-size: 24rpx;
}

.grid-item {
  margin-bottom: 16rpx;
  padding: 20rpx 0;
  border-radius: 8rpx;
  background: #ecf5ff;
  color: #3c9cff;
  text-align: center;
  font-size: 24rpx;
}

.scroll-item {
  padding: 20rpx;
  border-bottom: 1rpx solid #ebeef5;
  color: #303133;
  font-size: 26rpx;
}
</style>
