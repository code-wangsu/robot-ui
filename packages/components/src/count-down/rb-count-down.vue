<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbCountDown' })

const props = withDefaults(
  defineProps<{
    time?: number
    format?: string
    autoStart?: boolean
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    time: 0,
    format: 'HH:mm:ss',
    autoStart: true,
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  finish: []
  change: [time: number]
}>()

const remain = ref(props.time)
let timer: ReturnType<typeof setInterval> | null = null

function pad(num: number, len = 2) {
  return String(num).padStart(len, '0')
}

function formatTime(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000))
  const hours = Math.floor(total / 3600)
  const minutes = Math.floor((total % 3600) / 60)
  const seconds = total % 60
  return props.format
    .replace('HH', pad(hours))
    .replace('mm', pad(minutes))
    .replace('ss', pad(seconds))
}

const displayText = computed(() => formatTime(remain.value))

function clearTimer() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

function tick() {
  if (remain.value <= 1000) {
    remain.value = 0
    emit('change', remain.value)
    clearTimer()
    emit('finish')
    return
  }
  remain.value -= 1000
  emit('change', remain.value)
}

function start() {
  clearTimer()
  if (remain.value <= 0) {
    return
  }
  timer = setInterval(tick, 1000)
}

function pause() {
  clearTimer()
}

function reset() {
  clearTimer()
  remain.value = props.time
}

watch(
  () => props.time,
  (val) => {
    remain.value = val
    if (props.autoStart) {
      start()
    }
  },
)

onMounted(() => {
  if (props.autoStart) {
    start()
  }
})

onBeforeUnmount(clearTimer)

defineExpose({ start, pause, reset })
</script>

<template>
  <text
    class="rb-count-down"
    :class="[bem('rb-count-down'), customClass]"
    :style="normalizeStyle(customStyle)"
  >
    <slot>{{ displayText }}</slot>
  </text>
</template>
