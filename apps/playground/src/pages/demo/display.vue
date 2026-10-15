<script setup lang="ts">
import { ref } from 'vue'

definePage({
  style: { navigationBarTitleText: '展示组件' },
})

const urls = [
  'https://picsum.photos/seed/a1/200',
  'https://picsum.photos/seed/a2/200',
  'https://picsum.photos/seed/a3/200',
]
const swiperList = [
  'https://picsum.photos/seed/s1/800/400',
  'https://picsum.photos/seed/s2/800/400',
  'https://picsum.photos/seed/s3/800/400',
]
const album = [
  'https://picsum.photos/seed/al1/400',
  'https://picsum.photos/seed/al2/400',
  'https://picsum.photos/seed/al3/400',
  'https://picsum.photos/seed/al4/400',
]
const swipeButtons = [
  { text: '删除', color: '#f56c6c' },
]
</script>

<template>
  <view class="demo">
    <view class="demo__section">
      <text class="demo__label">测试按钮 · Avatar / AvatarGroup</text>
      <view class="demo__row">
        <rb-avatar :src="urls[0]" />
        <rb-avatar text="UI" />
        <rb-avatar-group :urls="urls" />
      </view>
    </view>

    <view class="demo__section">
      <text class="demo__label">测试按钮 · Swiper</text>
      <rb-swiper :list="swiperList" height="280rpx" />
    </view>

    <view class="demo__section">
      <text class="demo__label">测试按钮 · Grid / GridItem</text>
      <rb-grid :col="4" :gap="12">
        <rb-grid-item v-for="i in 8" :key="i">
          <view class="grid-cell">宫格{{ i }}</view>
        </rb-grid-item>
      </rb-grid>
    </view>

    <view class="demo__section">
      <text class="demo__label">测试按钮 · Album</text>
      <rb-album :urls="album" />
    </view>

    <view class="demo__section">
      <text class="demo__label">测试按钮 · SwipeAction</text>
      <rb-swipe-action>
        <rb-swipe-action-item name="1" :buttons="swipeButtons">
          <view class="swipe-row">左滑删除 · 行内容</view>
        </rb-swipe-action-item>
      </rb-swipe-action>
    </view>

    <view class="demo__section">
      <text class="demo__label">测试按钮 · Divider / Gap / Line / ScrollList</text>
      <rb-divider text="分割线" />
      <rb-gap height="16" />
      <rb-line />
      <view class="gap" />
      <rb-scroll-list>
        <view v-for="i in 12" :key="i" class="scroll-chip">项 {{ i }}</view>
      </rb-scroll-list>
    </view>

    <view class="demo__section">
      <text class="demo__label">测试按钮 · AppTag / Empty / NoNetwork</text>
      <view class="demo__row">
        <rb-app-tag text="旧标签" />
        <rb-tag text="新标签" type="success" effect="light" />
      </view>
      <view class="gap" />
      <rb-empty text="空状态占位" description="可传 description / compact" compact />
      <view class="gap" />
      <rb-no-network />
    </view>
  </view>
</template>

<style lang="scss" scoped>
.demo { padding: 24rpx; background: #f5f6f8; min-height: 100vh; box-sizing: border-box; }
.demo__section { margin-bottom: 24rpx; padding: 24rpx; border-radius: 12rpx; background: #fff; }
.demo__label { display: block; margin-bottom: 16rpx; font-size: 28rpx; font-weight: 600; color: #303133; }
.demo__row { display: flex; flex-wrap: wrap; gap: 16rpx; align-items: center; }
.gap { height: 20rpx; }
.swipe-row { padding: 28rpx 20rpx; background: #f5f7fa; border-radius: 8rpx; }
.scroll-chip {
  flex-shrink: 0;
  margin-right: 12rpx;
  padding: 16rpx 24rpx;
  border-radius: 999rpx;
  background: #ecf5ff;
  color: #3c9cff;
  font-size: 24rpx;
}

.grid-cell {
  padding: 28rpx 0;
  border-radius: 12rpx;
  background: #ecf5ff;
  color: #3c9cff;
  text-align: center;
  font-size: 24rpx;
}
</style>
