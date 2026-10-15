<script setup lang="ts">
import { computed } from 'vue'
import { addUnit } from '@robot-ui/utils'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbLayout' })

/**
 * 移动端布局容器（对齐 Element Plus Container 思路）
 * direction=vertical：上中下（header / default / footer）
 * direction=horizontal：左中右（aside / default）
 */
const props = withDefaults(
  defineProps<{
    direction?: 'vertical' | 'horizontal'
    /** 整页高度，默认 100vh；传数字按 rpx */
    height?: string | number
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    direction: 'vertical',
    height: '100%',
    customStyle: '',
    customClass: '',
  },
)

const rootClass = computed(() => bem('rb-layout', props.direction))

const rootStyle = computed(() => {
  const style: Record<string, string | number> = {
    height: typeof props.height === 'number' ? addUnit(props.height) : props.height,
  }
  const extra = normalizeStyle(props.customStyle)
  if (extra && typeof extra === 'object') Object.assign(style, extra)
  return style
})
</script>

<template>
  <view class="rb-layout" :class="[rootClass, customClass]" :style="rootStyle">
    <view v-if="$slots.header" class="rb-layout__header">
      <slot name="header" />
    </view>
    <view v-if="$slots.aside" class="rb-layout__aside">
      <slot name="aside" />
    </view>
    <view class="rb-layout__main">
      <slot />
    </view>
    <view v-if="$slots.footer" class="rb-layout__footer">
      <slot name="footer" />
    </view>
  </view>
</template>
