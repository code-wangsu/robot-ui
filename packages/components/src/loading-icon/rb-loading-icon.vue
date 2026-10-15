<script setup lang="ts">
/**
 * 底层旋转图标，一般直接使用 RbLoading。
 */
import { computed } from 'vue'
import { addUnit } from '@robot-ui/utils'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbLoadingIcon' })

const props = withDefaults(
  defineProps<{
    mode?: 'circle' | 'spinner'
    size?: string | number
    color?: string
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    mode: 'circle',
    size: 40,
    color: '',
    customStyle: '',
    customClass: '',
  },
)

const rootClass = computed(() => bem('rb-loading-icon', props.mode))

const iconStyle = computed(() => {
  const style: Record<string, string> = {
    width: addUnit(props.size),
    height: addUnit(props.size),
  }
  if (props.color) {
    style.borderTopColor = props.color
    style.borderColor = `${props.color}33`
  }
  const extra = normalizeStyle(props.customStyle)
  if (extra && typeof extra === 'object') {
    Object.assign(style, extra)
  }
  return style
})
</script>

<template>
  <view
    class="rb-loading-icon"
    :class="[rootClass, customClass]"
    :style="iconStyle"
  />
</template>
