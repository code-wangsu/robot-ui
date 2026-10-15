<script setup lang="ts">
import { ref } from 'vue'

definePage({
  style: { navigationBarTitleText: '数据展示' },
})

const collapse = ref<Array<string | number>>(['1'])
const accordion = ref<string | number>('a')
const loadStatus = ref<'loadmore' | 'loading' | 'nomore'>('loadmore')
const refreshing = ref(false)
const progress = ref(65)
const list = Array.from({ length: 8 }, (_, i) => ({ title: `列表项 ${i + 1}`, note: `说明 ${i + 1}` }))

function onLoadmore() {
  loadStatus.value = 'loading'
  setTimeout(() => {
    loadStatus.value = 'nomore'
  }, 800)
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
      <text class="demo__label">测试按钮 · Card</text>
      <rb-card title="卡片标题" type="primary" extra="更多">卡片内容</rb-card>
    </view>

    <view class="demo__section">
      <text class="demo__label">测试按钮 · Collapse 折叠面板</text>
      <rb-collapse v-model="collapse">
        <rb-collapse-item name="1" title="面板一" value="已展开" label="支持多选展开">
          折叠内容 A：可同时展开多个面板。
        </rb-collapse-item>
        <rb-collapse-item name="2" title="面板二">
          折叠内容 B：点击标题即可切换。
        </rb-collapse-item>
        <rb-collapse-item name="3" title="禁用面板" disabled>
          不会展开
        </rb-collapse-item>
      </rb-collapse>
      <view class="gap" />
      <text class="demo__meta">手风琴模式（同时仅一项）</text>
      <rb-collapse v-model="accordion" accordion>
        <rb-collapse-item name="a" title="手风琴 A">内容 A</rb-collapse-item>
        <rb-collapse-item name="b" title="手风琴 B" :lazy-render="true">
          内容 B（首次展开前懒渲染）
        </rb-collapse-item>
        <rb-collapse-item name="c" title="自定义标题">
          <template #title>
            <text style="color: #3c9cff; font-weight: 600">插槽标题</text>
          </template>
          自定义标题插槽内容
        </rb-collapse-item>
      </rb-collapse>
    </view>

    <view class="demo__section">
      <text class="demo__label">测试按钮 · Progress / CountTo / CountDown</text>
      <rb-line-progress :percentage="progress" />
      <view class="gap" />
      <rb-count-to :end-val="1280" :duration="1500" />
      <view class="gap" />
      <rb-count-down :time="75 * 60 * 1000" />
    </view>

    <view class="demo__section">
      <text class="demo__label">测试按钮 · Skeleton / Empty / List</text>
      <rb-skeleton :loading="true" :rows="3" />
      <view class="gap" />
      <rb-empty text="暂无数据" />
      <view class="gap" />
      <rb-list>
        <rb-list-item v-for="item in list" :key="item.title" :title="item.title" :note="item.note" />
      </rb-list>
    </view>

    <view class="demo__section">
      <text class="demo__label">测试按钮 · Loadmore / PullRefresh</text>
      <rb-button size="small" text="触发加载更多" @click="onLoadmore" />
      <rb-loadmore :status="loadStatus" @loadmore="onLoadmore" />
      <view class="gap" />
      <rb-button size="small" type="info" text="触发下拉刷新态" @click="onRefresh" />
      <text class="demo__meta">refreshing: {{ refreshing }}</text>
    </view>

    <view class="demo__section">
      <text class="demo__label">测试按钮 · ReadMore / Parse</text>
      <rb-read-more :show-height="80">
        这是一段很长的说明文字，用于演示展开收起。robot-ui 面向 uni-app 安卓端，组件 API 参考 Element Plus 与 uView。
      </rb-read-more>
      <view class="gap" />
      <rb-parse content="<p>富文本 <strong>Parse</strong> 演示</p>" />
    </view>
  </view>
</template>

<style lang="scss" scoped>
.demo { padding: 24rpx; background: #f5f6f8; min-height: 100vh; box-sizing: border-box; }
.demo__section { margin-bottom: 24rpx; padding: 24rpx; border-radius: 12rpx; background: #fff; }
.demo__label { display: block; margin-bottom: 16rpx; font-size: 28rpx; font-weight: 600; color: #303133; }
.demo__meta { display: block; margin-top: 12rpx; color: #909399; font-size: 22rpx; }
.gap { height: 20rpx; }
</style>
