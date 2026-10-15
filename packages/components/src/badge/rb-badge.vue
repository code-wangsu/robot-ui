<script setup lang="ts">
import { computed } from 'vue'
import type { RbType } from '../types'
import { addUnit } from '@robot-ui/utils'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbBadge' })

const props = withDefaults(
  defineProps<{
    value?: string | number
    max?: number
    isDot?: boolean
    showZero?: boolean
    type?: RbType
    offset?: [number, number]
    absolute?: boolean
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    value: '',
    max: 99,
    isDot: false,
    showZero: false,
    type: 'error',
    offset: () => [0, 0],
    absolute: true,
    customStyle: '',
    customClass: '',
  },
)

const displayValue = computed(() => {
  if (props.isDot) return ''
  const num = Number(props.value)
  if (!props.showZero && (props.value === 0 || props.value === '0')) return ''
  if (!Number.isNaN(num) && num > props.max) return `${props.max}+`
  return String(props.value)
})

const showBadge = computed(() => {
  if (props.isDot) return true
  if (props.showZero) return props.value !== '' && props.value !== undefined
  return displayValue.value !== ''
})

const badgeStyle = computed(() => {
  const [x, y] = props.offset
  return {
    transform: `translate(${addUnit(x)}, ${addUnit(y)})`,
  }
})

const rootClass = computed(() =>
  bem('rb-badge', props.type, props.absolute && 'absolute', props.isDot && 'dot'),
)
</script>

<template>
  <view
    class="rb-badge"
    :class="[rootClass, customClass]"
    :style="normalizeStyle(customStyle)"
  >
    <slot />
    <view v-if="showBadge" class="rb-badge__content" :style="badgeStyle">
      <text v-if="!isDot" class="rb-badge__text">{{ displayValue }}</text>
    </view>
  </view>
</template>
