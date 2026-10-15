<script setup lang="ts">
import { computed, inject } from 'vue'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbStepsItem' })

const props = withDefaults(
  defineProps<{
    index?: number
    title?: string
    desc?: string
    icon?: string
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    index: 0,
    title: '',
    desc: '',
    icon: '',
    customStyle: '',
    customClass: '',
  },
)

interface StepsContext {
  current: { value: number }
  activeColor?: string
  inactiveColor?: string
  direction: 'row' | 'column'
}

const ctx = inject<StepsContext>('rbSteps')!

const status = computed(() => {
  if (props.index < ctx.current.value) {
    return 'finish'
  }
  if (props.index === ctx.current.value) {
    return 'process'
  }
  return 'wait'
})
</script>

<template>
  <view
    class="rb-steps-item"
    :class="[bem('rb-steps-item', status), customClass]"
    :style="normalizeStyle(customStyle)"
  >
    <view class="rb-steps-item__icon">
      <slot name="icon">{{ icon || props.index + 1 }}</slot>
    </view>
    <view class="rb-steps-item__content">
      <text class="rb-steps-item__title">
        <slot name="title">{{ title }}</slot>
      </text>
      <text v-if="desc || $slots.desc" class="rb-steps-item__desc">
        <slot name="desc">{{ desc }}</slot>
      </text>
    </view>
  </view>
</template>
