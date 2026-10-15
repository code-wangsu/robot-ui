<script setup lang="ts">
/**
 * Playground 组件测试目录：每个组件一个入口按钮
 */
definePage({
  style: {
    navigationBarTitleText: '组件测试目录',
  },
})

type Item = { name: string; desc: string; url: string }

const groups: Array<{ title: string; items: Item[] }> = [
  {
    title: 'Basic 基础',
    items: [
      { name: 'Icon 图标库', desc: 'iconfont 全量图标检索', url: '/pages/demo/icons' },
      { name: 'Button', desc: '按钮尺寸/类型', url: '/pages/demo/basic' },
      { name: 'Color / Tag / Badge', desc: '色块与标签', url: '/pages/demo/basic' },
      { name: 'Cell / Empty / Loading', desc: '基础展示', url: '/pages/demo/basic' },
      { name: 'Text / Link', desc: '文本与链接', url: '/pages/demo/basic' },
    ],
  },
  {
    title: 'Form 表单',
    items: [
      { name: 'Form / Input', desc: '表单校验', url: '/pages/demo/form' },
      { name: 'MultiSelect 多选弹窗', desc: '搜索+双列多选', url: '/pages/demo/form' },
      { name: 'DatePicker', desc: '日期时间', url: '/pages/demo/form' },
      { name: 'Checkbox / Radio / Rate', desc: '选择类', url: '/pages/demo/form-extra' },
      { name: 'Search / Slider / NumberBox', desc: '输入增强', url: '/pages/demo/form-extra' },
      { name: 'Calendar / Code', desc: '日历验证码', url: '/pages/demo/form-extra' },
    ],
  },
  {
    title: 'Media 媒体',
    items: [
      { name: 'Image / Viewer', desc: '图片预览切换', url: '/pages/demo/media' },
      { name: 'Video / Upload / Album', desc: '视频上传', url: '/pages/demo/media' },
    ],
  },
  {
    title: 'Feedback 反馈',
    items: [
      { name: 'Toast / Modal / Popup', desc: '弹层提示', url: '/pages/demo/feedback' },
      { name: 'ActionSheet / Alert', desc: '动作与警告', url: '/pages/demo/feedback' },
      { name: 'NoticeBar / Notify / Tooltip', desc: '通知提示', url: '/pages/demo/feedback' },
    ],
  },
  {
    title: 'Data 数据',
    items: [
      { name: 'Table / Pagination', desc: '表格分页', url: '/pages/demo/table' },
      { name: 'List / Loadmore / Skeleton', desc: '列表加载', url: '/pages/demo/data' },
      { name: 'Card / Collapse / Progress', desc: '卡片、折叠面板、进度', url: '/pages/demo/data' },
      { name: 'CountDown / CountTo', desc: '数字动画', url: '/pages/demo/data' },
    ],
  },
  {
    title: 'Navigation 导航',
    items: [
      { name: 'Tabs / Sticky / PageFooter', desc: '标签吸顶', url: '/pages/demo/layout' },
      { name: 'Navbar / Tabbar / Steps', desc: '导航步骤', url: '/pages/demo/navigation' },
      { name: 'IndexList / BackTop / Subsection', desc: '索引分段', url: '/pages/demo/navigation' },
    ],
  },
  {
    title: 'Display 展示',
    items: [
      { name: 'Avatar / Swiper / Grid', desc: '头像轮播宫格', url: '/pages/demo/display' },
      { name: 'Parse / ReadMore / SwipeAction', desc: '富文本滑动', url: '/pages/demo/display' },
    ],
  },
  {
    title: 'Keyboard 键盘',
    items: [
      { name: 'SoftKeyboard', desc: '全键盘', url: '/pages/demo/keyboard' },
      { name: 'SystemKeyboardInput', desc: '系统键盘输入', url: '/pages/demo/keyboard' },
    ],
  },
]

function go(url: string) {
  uni.navigateTo({ url })
}
</script>

<template>
  <view class="page">
    <view class="hero">
      <text class="hero__title">组件测试目录</text>
      <text class="hero__desc">覆盖 packages/components 全部组件入口，点击按钮进入演示页</text>
    </view>

    <view v-for="group in groups" :key="group.title" class="group">
      <text class="group__title">{{ group.title }}</text>
      <view class="group__grid">
        <view
          v-for="item in group.items"
          :key="item.name"
          class="btn"
          @click="go(item.url)"
        >
          <text class="btn__name">{{ item.name }}</text>
          <text class="btn__desc">{{ item.desc }}</text>
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
  background: linear-gradient(135deg, #3c9cff 0%, #5cadff 100%);
}

.hero__title {
  display: block;
  color: #fff;
  font-size: 34rpx;
  font-weight: 700;
}

.hero__desc {
  display: block;
  margin-top: 10rpx;
  color: rgba(255, 255, 255, 0.9);
  font-size: 22rpx;
  line-height: 1.5;
}

.group {
  margin-bottom: 24rpx;
  padding: 20rpx;
  border-radius: 16rpx;
  background: #fff;
}

.group__title {
  display: block;
  margin-bottom: 16rpx;
  color: #303133;
  font-size: 28rpx;
  font-weight: 600;
}

.group__grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.btn {
  width: calc(50% - 8rpx);
  padding: 20rpx;
  border-radius: 12rpx;
  background: #f5f7fa;
  box-sizing: border-box;
}

.btn__name {
  display: block;
  color: #3c9cff;
  font-size: 26rpx;
  font-weight: 600;
}

.btn__desc {
  display: block;
  margin-top: 6rpx;
  color: #909399;
  font-size: 20rpx;
}
</style>
