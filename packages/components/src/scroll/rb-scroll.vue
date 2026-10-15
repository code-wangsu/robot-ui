<script setup lang="ts">
import { computed } from 'vue'
import { addUnit } from '@robot-ui/utils'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbScroll' })

/**
 * uni-app scroll-view 封装，便于基础滚动场景复用。
 */
const props = withDefaults(
  defineProps<{
    /** 纵向滚动 */
    scrollY?: boolean
    /** 横向滚动 */
    scrollX?: boolean
    /** 容器高度，数字默认 rpx；横向滚动时常配合固定高度 */
    height?: string | number
    /** 距底部/右边多远触发 scrolltolower */
    lowerThreshold?: number
    upperThreshold?: number
    /** 下拉刷新（App / 微信等） */
    refresherEnabled?: boolean
    refresherTriggered?: boolean
    /** 是否显示滚动条 */
    showScrollbar?: boolean
    /** 是否启用弹性滚动（iOS） */
    bounces?: boolean
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    scrollY: true,
    scrollX: false,
    height: '',
    lowerThreshold: 50,
    upperThreshold: 50,
    refresherEnabled: false,
    refresherTriggered: false,
    showScrollbar: false,
    bounces: true,
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  scroll: [event: unknown]
  scrolltolower: [event: unknown]
  scrolltoupper: [event: unknown]
  refresherrefresh: [event: unknown]
  'update:refresherTriggered': [value: boolean]
}>()

const rootStyle = computed(() => {
  const style: Record<string, string | number> = {}
  if (props.height !== '' && props.height !== undefined) {
    style.height = typeof props.height === 'number' ? addUnit(props.height) : props.height
  }
  const extra = normalizeStyle(props.customStyle)
  if (extra && typeof extra === 'object') Object.assign(style, extra)
  return style
})

function onRefresherRefresh(event: unknown) {
  emit('update:refresherTriggered', true)
  emit('refresherrefresh', event)
}
</script>

<template>
  <scroll-view
    class="rb-scroll"
    :class="[bem('rb-scroll', scrollX && 'x', scrollY && 'y'), customClass]"
    :style="rootStyle"
    :scroll-y="scrollY"
    :scroll-x="scrollX"
    :lower-threshold="lowerThreshold"
    :upper-threshold="upperThreshold"
    :refresher-enabled="refresherEnabled"
    :refresher-triggered="refresherTriggered"
    :show-scrollbar="showScrollbar"
    :bounces="bounces"
    @scroll="emit('scroll', $event)"
    @scrolltolower="emit('scrolltolower', $event)"
    @scrolltoupper="emit('scrolltoupper', $event)"
    @refresherrefresh="onRefresherRefresh"
  >
    <slot />
  </scroll-view>
</template>
