<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbCode' })

const props = withDefaults(
  defineProps<{
    seconds?: number
    startText?: string
    changeText?: string
    endText?: string
    disabled?: boolean
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    seconds: 60,
    startText: '获取验证码',
    changeText: 'X秒重新获取',
    endText: '重新获取',
    disabled: false,
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  click: []
  start: []
  end: []
  change: [text: string]
}>()

const counting = ref(false)
const finished = ref(false)
const remain = ref(props.seconds)
let timer: ReturnType<typeof setInterval> | null = null

const displayText = computed(() => {
  if (counting.value) {
    return props.changeText.replace('X', String(remain.value))
  }
  if (finished.value) {
    return props.endText
  }
  return props.startText
})

const canClick = computed(() => !counting.value && !props.disabled)

function clearTimer() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

function start() {
  if (!canClick.value) return
  emit('click')
  emit('start')
  finished.value = false
  counting.value = true
  remain.value = props.seconds
  emit('change', displayText.value)
  timer = setInterval(() => {
    remain.value -= 1
    emit('change', displayText.value)
    if (remain.value <= 0) {
      clearTimer()
      counting.value = false
      finished.value = true
      remain.value = props.seconds
      emit('end')
      emit('change', props.endText)
    }
  }, 1000)
}

onUnmounted(clearTimer)

defineExpose({ start })
</script>

<template>
  <text
    class="rb-code"
    :class="[bem('rb-code', canClick && 'active', disabled && 'disabled'), customClass]"
    :style="normalizeStyle(customStyle)"
    @click="start"
  >
    {{ displayText }}
  </text>
</template>
