<script setup lang="ts">
import { computed, provide } from 'vue'
import { addUnit } from '@robot-ui/utils'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbGrid' })

const props = withDefaults(
  defineProps<{
    col?: number
    border?: boolean
    gap?: string | number
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    col: 3,
    border: false,
    gap: 0,
    customStyle: '',
    customClass: '',
  },
)

provide('rbGrid', {
  col: props.col,
  border: props.border,
})

const gridStyle = computed(() => {
  const style: Record<string, string | number> = {
    gap: addUnit(props.gap),
  }
  const extra = normalizeStyle(props.customStyle)
  if (extra && typeof extra !== 'string') {
    Object.assign(style, extra)
  }
  return style
})
</script>

<template>
  <view
    class="rb-grid"
    :class="[bem('rb-grid', border && 'border'), customClass]"
    :style="gridStyle"
  >
    <slot />
  </view>
</template>
