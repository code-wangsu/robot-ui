<script setup lang="ts">
definePage({
  type: 'home',
  style: {
    navigationBarTitleText: 'robot-ui 组件测试',
  },
})

const menus = [
  { title: '组件测试目录', desc: '全部组件入口按钮（推荐）', url: '/pages/demo/catalog' },
  { title: 'Icon 图标库', desc: 'iconfont 全量图标 · 点击复制', url: '/pages/demo/icons' },
  { title: '基础组件', desc: 'Button / Color / Tag / Cell / Loading', url: '/pages/demo/basic' },
  { title: '表单组件', desc: 'Form / DatePicker / Upload / Picker', url: '/pages/demo/form' },
  { title: '表单扩展', desc: 'Checkbox / Radio / Rate / Calendar / Code', url: '/pages/demo/form-extra' },
  { title: '媒体组件', desc: 'Image 预览 / Video / Upload / Album', url: '/pages/demo/media' },
  { title: '反馈组件', desc: 'Toast / Popup / Modal / ActionSheet / Alert', url: '/pages/demo/feedback' },
  { title: '数据展示', desc: 'Card / List / Loadmore / Skeleton / Progress', url: '/pages/demo/data' },
  { title: '表格分页', desc: 'Table / Pagination', url: '/pages/demo/table' },
  { title: '布局导航', desc: 'Tabs / Sticky / PageFooter', url: '/pages/demo/layout' },
  { title: '导航组件', desc: 'Navbar / Tabbar / Steps / IndexList', url: '/pages/demo/navigation' },
  { title: '展示组件', desc: 'Avatar / Swiper / Grid / SwipeAction', url: '/pages/demo/display' },
  { title: '软键盘', desc: 'SoftKeyboard / SoftKeyboardInput', url: '/pages/demo/keyboard' },
]

function go(url: string) {
  uni.navigateTo({ url })
}
</script>

<template>
  <view class="page">
    <view class="hero">
      <text class="hero__title">robot-ui</text>
      <text class="hero__desc">uni-app 组件库 Playground · 覆盖 packages/components 全部组件测试入口</text>
    </view>

    <view
      v-for="item in menus"
      :key="item.url"
      class="menu-item"
      @click="go(item.url)"
    >
      <view class="menu-item__main">
        <text class="menu-item__title">{{ item.title }}</text>
        <text class="menu-item__desc">{{ item.desc }}</text>
      </view>
      <text class="menu-item__arrow">›</text>
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
  padding: 36rpx 28rpx;
  border-radius: 16rpx;
  background: linear-gradient(135deg, #3c9cff 0%, #398ade 100%);
}

.hero__title {
  display: block;
  color: #fff;
  font-size: 40rpx;
  font-weight: 700;
}

.hero__desc {
  display: block;
  margin-top: 12rpx;
  color: rgba(255, 255, 255, 0.92);
  font-size: 24rpx;
  line-height: 1.5;
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16rpx;
  padding: 28rpx 24rpx;
  border-radius: 14rpx;
  background: #fff;
}

.menu-item__title {
  display: block;
  color: #303133;
  font-size: 30rpx;
  font-weight: 600;
}

.menu-item__desc {
  display: block;
  margin-top: 8rpx;
  color: #909399;
  font-size: 22rpx;
}

.menu-item__arrow {
  color: #c0c4cc;
  font-size: 36rpx;
}
</style>
