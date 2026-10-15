<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbTransition' })

type TransitionMode = 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'zoom'

const props = withDefaults(
  defineProps<{
    show?: boolean
    mode?: TransitionMode
    duration?: number
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    show: false,
    mode: 'fade',
    duration: 300,
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  'before-enter': []
  enter: []
  'after-enter': []
  'before-leave': []
  leave: []
  'after-leave': []
  click: [event: Event]
}>()

const inited = ref(false)
const visible = ref(false)
let enterTimer: ReturnType<typeof setTimeout> | null = null
let leaveTimer: ReturnType<typeof setTimeout> | null = null

function clearTimers() {
  if (enterTimer) {
    clearTimeout(enterTimer)
    enterTimer = null
  }
  if (leaveTimer) {
    clearTimeout(leaveTimer)
    leaveTimer = null
  }
}

const rootClass = computed(() =>
  bem(
    'rb-transition',
    props.mode,
    visible.value ? 'enter' : 'leave',
    visible.value && 'show',
  ),
)

const rootStyle = computed(() => {
  const base: Record<string, string | number> = {
    transitionDuration: `${props.duration}ms`,
    transitionTimingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)',
  }
  const extra = normalizeStyle(props.customStyle)
  if (extra && typeof extra !== 'string') {
    Object.assign(base, extra)
  }
  return base
})

function vueEnter() {
  clearTimers()
  emit('before-enter')
  inited.value = true
  visible.value = false
  // H5 需短暂延迟才能触发 CSS transition（对齐 uView sleep(20)）
  enterTimer = setTimeout(() => {
    visible.value = true
    emit('enter')
    enterTimer = setTimeout(() => {
      emit('after-enter')
    }, props.duration)
  }, 20)
}

function vueLeave() {
  if (!inited.value) return
  clearTimers()
  emit('before-leave')
  visible.value = false
  emit('leave')
  leaveTimer = setTimeout(() => {
    inited.value = false
    emit('after-leave')
  }, props.duration)
}

watch(
  () => props.show,
  (val) => {
    if (val) vueEnter()
    else vueLeave()
  },
  { immediate: true },
)

function onClick(event: Event) {
  emit('click', event)
}
</script>

<template>
  <view
    v-if="inited"
    class="rb-transition"
    :class="[rootClass, customClass]"
    :style="rootStyle"
    @click="onClick"
  >
    <slot />
  </view>
</template>
