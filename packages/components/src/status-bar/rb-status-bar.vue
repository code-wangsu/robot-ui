<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { addUnit } from '@robot-ui/utils'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbStatusBar' })

const props = withDefaults(
  defineProps<{
    bgColor?: string
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    bgColor: 'transparent',
    customStyle: '',
    customClass: '',
  },
)

const height = ref(0)

onMounted(() => {
  const info = uni.getSystemInfoSync()
  height.value = info.statusBarHeight || 0
})

const barStyle = computed(() => {
  const style: Record<string, string | number> = {
    height: addUnit(height.value),
    backgroundColor: props.bgColor,
  }
  const extra = normalizeStyle(props.customStyle)
  if (extra && typeof extra !== 'string') {
    Object.assign(style, extra)
  }
  return style
})
</script>

<template>
  <view class="rb-status-bar" :class="[bem('rb-status-bar'), customClass]" :style="barStyle" />
</template>
