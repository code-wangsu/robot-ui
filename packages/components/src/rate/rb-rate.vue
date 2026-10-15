<script setup lang="ts">
import { computed } from 'vue'
import { addUnit } from '@robot-ui/utils'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbRate' })

const props = withDefaults(
  defineProps<{
    modelValue?: number
    count?: number
    disabled?: boolean
    readonly?: boolean
    size?: string | number
    activeColor?: string
    inactiveColor?: string
    allowHalf?: boolean
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    modelValue: 0,
    count: 5,
    disabled: false,
    readonly: false,
    size: 36,
    activeColor: '',
    inactiveColor: '',
    allowHalf: false,
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: number]
  change: [value: number]
}>()

const stars = computed(() => Array.from({ length: props.count }, (_, i) => i + 1))

const iconStyle = computed(() => ({
  fontSize: addUnit(props.size),
}))

function setValue(index: number) {
  if (props.disabled || props.readonly) return
  emit('update:modelValue', index)
  emit('change', index)
}

function isActive(index: number) {
  return index <= props.modelValue
}
</script>

<template>
  <view
    class="rb-rate"
    :class="[bem('rb-rate', disabled && 'disabled'), customClass]"
    :style="normalizeStyle(customStyle)"
  >
    <text
      v-for="index in stars"
      :key="index"
      class="rb-rate__star"
      :class="{ 'rb-rate__star--active': isActive(index) }"
      :style="{
        ...iconStyle,
        color: isActive(index) ? (activeColor || undefined) : (inactiveColor || undefined),
      }"
      @click="setValue(index)"
    >
      ★
    </text>
  </view>
</template>
