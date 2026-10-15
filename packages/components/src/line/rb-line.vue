<script setup lang="ts">
import { computed } from 'vue'
import { addUnit } from '@robot-ui/utils'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbLine' })

const props = withDefaults(
  defineProps<{
    length?: string | number
    color?: string
    direction?: 'row' | 'col'
    hairline?: boolean
    margin?: string | number
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    length: '100%',
    color: '',
    direction: 'row',
    hairline: false,
    margin: 0,
    customStyle: '',
    customClass: '',
  },
)

const lineStyle = computed(() => {
  const style: Record<string, string | number> = {
    margin: addUnit(props.margin),
  }
  if (props.direction === 'row') {
    style.width = addUnit(props.length)
    style.height = props.hairline ? '1px' : addUnit(2)
  } else {
    style.height = addUnit(props.length)
    style.width = props.hairline ? '1px' : addUnit(2)
  }
  if (props.color) {
    style.backgroundColor = props.color
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
    class="rb-line"
    :class="[bem('rb-line', direction, hairline && 'hairline'), customClass]"
    :style="lineStyle"
  />
</template>
