<script setup lang="ts">
import { computed } from 'vue'
import { addUnit } from '@robot-ui/utils'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbSafeBottom' })

const props = withDefaults(
  defineProps<{
    height?: string | number
    bgColor?: string
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    height: 0,
    bgColor: 'transparent',
    customStyle: '',
    customClass: '',
  },
)

const bottomStyle = computed(() => {
  const style: Record<string, string | number> = {
    backgroundColor: props.bgColor,
  }
  if (props.height) {
    style.height = addUnit(props.height)
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
    class="rb-safe-bottom"
    :class="[bem('rb-safe-bottom'), customClass]"
    :style="bottomStyle"
  />
</template>
