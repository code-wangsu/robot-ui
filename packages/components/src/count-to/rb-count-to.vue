<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbCountTo' })

const props = withDefaults(
  defineProps<{
    startVal?: number
    endVal?: number
    duration?: number
    decimals?: number
    separator?: string
    autoplay?: boolean
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    startVal: 0,
    endVal: 0,
    duration: 2000,
    decimals: 0,
    separator: '',
    autoplay: true,
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  finish: []
}>()

const current = ref(props.startVal)
let rafId = 0
let startTime = 0

/** App 端可能没有 requestAnimationFrame，回退到 setTimeout */
const hasRaf = typeof requestAnimationFrame === 'function'
const raf = hasRaf
  ? (cb: (ts: number) => void) => requestAnimationFrame(cb)
  : (cb: (ts: number) => void) => setTimeout(() => cb(Date.now()), 16) as unknown as number

const caf = hasRaf
  ? (id: number) => cancelAnimationFrame(id)
  : (id: number) => clearTimeout(id)

function formatNumber(num: number) {
  const fixed = num.toFixed(props.decimals)
  if (!props.separator) {
    return fixed
  }
  const [intPart, decPart] = fixed.split('.')
  const withSep = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, props.separator)
  return decPart ? `${withSep}.${decPart}` : withSep
}

const displayText = computed(() => formatNumber(current.value))

function cancel() {
  if (rafId) {
    caf(rafId)
    rafId = 0
  }
}

function animate(timestamp: number) {
  if (!startTime) {
    startTime = timestamp
  }
  const progress = Math.min((timestamp - startTime) / props.duration, 1)
  current.value = props.startVal + (props.endVal - props.startVal) * progress
  if (progress < 1) {
    rafId = raf(animate) as unknown as number
  } else {
    current.value = props.endVal
    emit('finish')
  }
}

function start() {
  cancel()
  startTime = 0
  current.value = props.startVal
  rafId = raf(animate) as unknown as number
}

watch(
  () => [props.startVal, props.endVal],
  () => {
    if (props.autoplay) {
      start()
    }
  },
  { immediate: props.autoplay },
)

onBeforeUnmount(cancel)

defineExpose({ start })
</script>

<template>
  <text
    class="rb-count-to"
    :class="[bem('rb-count-to'), customClass]"
    :style="normalizeStyle(customStyle)"
  >
    <slot>{{ displayText }}</slot>
  </text>
</template>
