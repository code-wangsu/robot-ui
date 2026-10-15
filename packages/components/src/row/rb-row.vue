<script setup lang="ts">
import { computed, provide, toRef } from 'vue'
import { addUnit } from '@robot-ui/utils'
import { bem, normalizeStyle } from '../composables/useBem'
import { ROW_GUTTER_KEY } from '../composables/useRow'

defineOptions({ name: 'RbRow' })

const props = withDefaults(
  defineProps<{
    gutter?: string | number
    justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between'
    align?: 'top' | 'center' | 'bottom'
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    gutter: 0,
    justify: 'start',
    align: 'top',
    customStyle: '',
    customClass: '',
  },
)

provide(ROW_GUTTER_KEY, toRef(props, 'gutter'))

const rootClass = computed(() =>
  bem('rb-row', `justify-${props.justify}`, `align-${props.align}`),
)

const rootStyle = computed(() => {
  const style: Record<string, string> = {}
  const gutter = Number(props.gutter)
  if (gutter) {
    style.marginLeft = addUnit(-gutter / 2)
    style.marginRight = addUnit(-gutter / 2)
  }
  const extra = normalizeStyle(props.customStyle)
  if (extra && typeof extra === 'object') {
    Object.assign(style, extra)
  }
  return style
})

</script>

<template>
  <view class="rb-row" :class="[rootClass, customClass]" :style="rootStyle">
    <slot />
  </view>
</template>
