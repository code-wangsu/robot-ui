<script setup lang="ts">
import { computed } from 'vue'
import { addUnit } from '@robot-ui/utils'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbLineProgress' })

const props = withDefaults(
  defineProps<{
    percent?: number
    height?: string | number
    activeColor?: string
    inactiveColor?: string
    showText?: boolean
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    percent: 0,
    height: 12,
    activeColor: '',
    inactiveColor: '',
    showText: false,
    customStyle: '',
    customClass: '',
  },
)

const safePercent = computed(() => Math.min(100, Math.max(0, props.percent)))

const trackStyle = computed(() => {
  const style: Record<string, string | number> = {
    height: addUnit(props.height),
  }
  if (props.inactiveColor) {
    style.backgroundColor = props.inactiveColor
  }
  const extra = normalizeStyle(props.customStyle)
  if (extra && typeof extra !== 'string') {
    Object.assign(style, extra)
  }
  return style
})

const barStyle = computed(() => {
  const style: Record<string, string | number> = {
    width: `${safePercent.value}%`,
  }
  if (props.activeColor) {
    style.backgroundColor = props.activeColor
  }
  return style
})
</script>

<template>
  <view class="rb-line-progress" :class="[bem('rb-line-progress'), customClass]">
    <view class="rb-line-progress__track" :style="trackStyle">
      <view class="rb-line-progress__bar" :style="barStyle" />
    </view>
    <text v-if="showText" class="rb-line-progress__text">{{ safePercent }}%</text>
  </view>
</template>
