<script setup lang="ts">
import { clamp } from '@robot-ui/utils'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbSlider' })

const props = withDefaults(
  defineProps<{
    modelValue?: number
    min?: number
    max?: number
    step?: number
    disabled?: boolean
    blockSize?: string | number
    activeColor?: string
    inactiveColor?: string
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    modelValue: 0,
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    blockSize: 28,
    activeColor: '',
    inactiveColor: '',
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: number]
  change: [value: number]
  changing: [value: number]
}>()

function onChanging(event: Event) {
  const value = (event as unknown as { detail: { value: number } }).detail.value
  emit('changing', value)
}

function onChange(event: Event) {
  const raw = (event as unknown as { detail: { value: number } }).detail.value
  const value = clamp(raw, props.min, props.max)
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<template>
  <view
    class="rb-slider"
    :class="[bem('rb-slider', disabled && 'disabled'), customClass]"
    :style="normalizeStyle(customStyle)"
  >
    <slider
      class="rb-slider__native"
      :value="modelValue"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      :block-size="Number(blockSize)"
      :active-color="activeColor"
      :background-color="inactiveColor"
      @changing="onChanging"
      @change="onChange"
    />
  </view>
</template>
