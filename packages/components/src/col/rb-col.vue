<script setup lang="ts">
import { computed, inject } from 'vue'
import { addUnit } from '@robot-ui/utils'
import { bem, normalizeStyle } from '../composables/useBem'
import { ROW_GUTTER_KEY } from '../composables/useRow'

defineOptions({ name: 'RbCol' })

const props = withDefaults(
  defineProps<{
    span?: number
    offset?: number
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    span: 12,
    offset: 0,
    customStyle: '',
    customClass: '',
  },
)

const gutterRef = inject(ROW_GUTTER_KEY, null)

const rootClass = computed(() =>
  bem('rb-col', `span-${props.span}`, props.offset > 0 && `offset-${props.offset}`),
)

const rootStyle = computed(() => {
  const style: Record<string, string> = {}
  const gutter = gutterRef?.value ? Number(gutterRef.value) : 0
  if (gutter) {
    style.paddingLeft = addUnit(gutter / 2)
    style.paddingRight = addUnit(gutter / 2)
  }
  const spanWidth = (props.span / 24) * 100
  style.flex = `0 0 ${spanWidth}%`
  style.maxWidth = `${spanWidth}%`
  if (props.offset) {
    style.marginLeft = `${(props.offset / 24) * 100}%`
  }
  const extra = normalizeStyle(props.customStyle)
  if (extra && typeof extra === 'object') {
    Object.assign(style, extra)
  }
  return style
})
</script>

<template>
  <view class="rb-col" :class="[rootClass, customClass]" :style="rootStyle">
    <slot />
  </view>
</template>
