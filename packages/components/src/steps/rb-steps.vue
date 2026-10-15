<script setup lang="ts">
import { computed, provide } from 'vue'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbSteps' })

const props = withDefaults(
  defineProps<{
    current?: number
    direction?: 'row' | 'column'
    activeColor?: string
    inactiveColor?: string
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    current: 0,
    direction: 'row',
    activeColor: '',
    inactiveColor: '',
    customStyle: '',
    customClass: '',
  },
)

provide('rbSteps', {
  current: computed(() => props.current),
  activeColor: props.activeColor,
  inactiveColor: props.inactiveColor,
  direction: props.direction,
})
</script>

<template>
  <view
    class="rb-steps"
    :class="[bem('rb-steps', direction), customClass]"
    :style="normalizeStyle(customStyle)"
  >
    <slot />
  </view>
</template>
