<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { addUnit } from '@robot-ui/utils'
import { bem, normalizeStyle } from '../composables/useBem'
import RbLoadmore, { type LoadmoreStatus } from '../loadmore/rb-loadmore.vue'

defineOptions({ name: 'RbPullRefresh' })

/**
 * 基于 uni-app scroll-view 自定义下拉刷新 + 触底加载。
 * 文档：https://uniapp.dcloud.net.cn/component/scroll-view.html
 */
const props = withDefaults(
  defineProps<{
    refreshing?: boolean
    loadStatus?: LoadmoreStatus
    /** 容器高度，数字默认 rpx */
    height?: string | number
    lowerThreshold?: number
    refresherEnabled?: boolean
    refresherThreshold?: number
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    refreshing: false,
    loadStatus: 'loadmore',
    height: '100%',
    lowerThreshold: 80,
    refresherEnabled: true,
    refresherThreshold: 80,
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  refresh: []
  loadmore: []
  scroll: [event: { detail: { scrollTop: number } }]
}>()

const triggered = ref(false)

const rootStyle = computed(() => {
  const style: Record<string, string | number> = {
    height: props.height === '100%' ? '100%' : addUnit(props.height),
  }
  if (typeof props.customStyle === 'object') {
    Object.assign(style, props.customStyle)
  }
  return normalizeStyle(style)
})

watch(
  () => props.refreshing,
  (value) => {
    triggered.value = value
  },
)

function onRefresh() {
  triggered.value = true
  emit('refresh')
}

function onRestore() {
  triggered.value = false
}

function onScrollToLower() {
  if (props.loadStatus === 'loadmore') {
    emit('loadmore')
  }
}
</script>

<template>
  <view
    class="rb-pull-refresh"
    :class="[bem('rb-pull-refresh'), customClass]"
    :style="rootStyle"
  >
    <scroll-view
      class="rb-pull-refresh__scroll"
      scroll-y
      :style="{ height: '100%' }"
      :lower-threshold="lowerThreshold"
      :refresher-enabled="refresherEnabled"
      :refresher-threshold="refresherThreshold"
      :refresher-triggered="triggered"
      refresher-default-style="black"
      @refresherrefresh="onRefresh"
      @refresherrestore="onRestore"
      @scrolltolower="onScrollToLower"
      @scroll="emit('scroll', $event)"
    >
      <slot />
      <rb-loadmore :status="loadStatus" @loadmore="emit('loadmore')" />
    </scroll-view>
  </view>
</template>
