<script setup lang="ts">
import { computed } from 'vue'
import { addUnit } from '@robot-ui/utils'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbGap' })

const props = withDefaults(
  defineProps<{
    height?: string | number
    bgColor?: string
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    height: 20,
    bgColor: '',
    customStyle: '',
    customClass: '',
  },
)

const gapStyle = computed(() => {
  const style: Record<string, string | number> = {
    height: addUnit(props.height),
  }
  if (props.bgColor) {
    style.backgroundColor = props.bgColor
  }
  const extra = normalizeStyle(props.customStyle)
  if (extra && typeof extra !== 'string') {
    Object.assign(style, extra)
  }
  return style
})
</script>

<template>
  <view class="rb-gap" :class="[bem('rb-gap'), customClass]" :style="gapStyle" />
</template>
