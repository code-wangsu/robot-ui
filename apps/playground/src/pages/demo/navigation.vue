<script setup lang="ts">
import { ref } from 'vue'

definePage({
  style: { navigationBarTitleText: '导航组件' },
})

const tab = ref(0)
const sub = ref(0)
const step = ref(1)
const scrollTop = ref(0)
const tabs = [
  { name: 0, title: '首页' },
  { name: 1, title: '消息' },
  { name: 2, title: '我的' },
]
const letters = ['A', 'B', 'C', 'D']
</script>

<template>
  <view class="demo" @scroll="(e: any) => (scrollTop = e.detail?.scrollTop || 0)">
    <view class="demo__section">
      <text class="demo__label">测试按钮 · Navbar</text>
      <rb-navbar title="导航标题" left-text="返回" />
    </view>

    <view class="demo__section">
      <text class="demo__label">测试按钮 · Tabs / Subsection</text>
      <rb-tabs v-model="tab" :list="tabs" />
      <view class="gap" />
      <rb-subsection v-model="sub" :list="['日', '周', '月']" />
    </view>

    <view class="demo__section">
      <text class="demo__label">测试按钮 · Steps</text>
      <rb-steps :current="step">
        <rb-steps-item title="下单" />
        <rb-steps-item title="出库" />
        <rb-steps-item title="签收" />
      </rb-steps>
      <view class="demo__row">
        <rb-button size="mini" text="上一步" @click="step = Math.max(0, step - 1)" />
        <rb-button size="mini" type="primary" text="下一步" @click="step = Math.min(2, step + 1)" />
      </view>
    </view>

    <view class="demo__section">
      <text class="demo__label">测试按钮 · IndexList</text>
      <view class="index-box">
        <rb-index-list :index-list="letters">
          <view v-for="letter in letters" :key="letter">
            <rb-index-anchor :index="letter" />
            <view class="index-item">{{ letter }} 分组内容</view>
          </view>
        </rb-index-list>
      </view>
    </view>

    <view class="demo__section">
      <text class="demo__label">测试按钮 · Tabbar（示意）</text>
      <rb-tabbar v-model="tab">
        <rb-tabbar-item text="首页" />
        <rb-tabbar-item text="消息" />
        <rb-tabbar-item text="我的" />
      </rb-tabbar>
    </view>

    <view class="demo__section">
      <text class="demo__label">测试按钮 · BackTop / FooterBack / StatusBar / SafeBottom</text>
      <rb-status-bar />
      <rb-footer-back text="返回首页" @click="() => uni.navigateBack()" />
      <rb-safe-bottom />
      <rb-back-top :scroll-top="scrollTop" />
    </view>

    <view v-for="i in 12" :key="i" class="pad">占位滚动 {{ i }}</view>
  </view>
</template>

<style lang="scss" scoped>
.demo { padding: 24rpx; background: #f5f6f8; min-height: 100vh; box-sizing: border-box; }
.demo__section { margin-bottom: 24rpx; padding: 24rpx; border-radius: 12rpx; background: #fff; }
.demo__label { display: block; margin-bottom: 16rpx; font-size: 28rpx; font-weight: 600; color: #303133; }
.demo__row { display: flex; gap: 12rpx; margin-top: 16rpx; }
.gap { height: 20rpx; }
.index-box { height: 360rpx; overflow: hidden; }
.index-item { padding: 16rpx 0; color: #606266; font-size: 24rpx; }
.pad { padding: 24rpx; color: #c0c4cc; font-size: 22rpx; }
</style>
