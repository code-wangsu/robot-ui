<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue'
import { bem, normalizeStyle } from '../composables/useBem'
import RbTransition from '../transition/rb-transition.vue'
import {
  hideToast,
  useToastState,
  type ToastPosition,
  type ToastType,
} from './toast'

defineOptions({ name: 'RbToast' })

const props = withDefaults(
  defineProps<{
    /** 声明式显隐；未传时跟随命令式 useToastState */
    show?: boolean
    message?: string
    title?: string
    type?: ToastType
    duration?: number
    position?: ToastPosition
    showClose?: boolean
    /** true 时优先消费全局命令式状态 */
    global?: boolean
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    show: undefined,
    message: '',
    title: '',
    type: 'info',
    duration: 3000,
    position: 'top-right',
    showClose: true,
    global: false,
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  close: []
  'update:show': [value: boolean]
}>()

const { show: globalShow, options: globalOptions } = useToastState()
const localTimer = ref<ReturnType<typeof setTimeout> | null>(null)

const useGlobal = computed(() => props.global || props.show === undefined)

const visible = computed(() =>
  useGlobal.value ? globalShow.value : Boolean(props.show),
)

const displayMessage = computed(
  () => (useGlobal.value ? globalOptions.value.message : props.message) ?? '',
)

const displayType = computed<ToastType>(() => {
  const type = (useGlobal.value ? globalOptions.value.type : props.type) ?? 'info'
  return type === 'default' ? 'info' : type
})

const displayPosition = computed<ToastPosition>(
  () =>
    (useGlobal.value ? globalOptions.value.position : props.position) ?? 'top-right',
)

const displayDuration = computed(() => {
  if (useGlobal.value) {
    return globalOptions.value.duration ?? 3000
  }
  return props.duration
})

const displayShowClose = computed(() => {
  if (useGlobal.value) {
    return globalOptions.value.showClose ?? true
  }
  return props.showClose
})

const displayTitle = computed(() => {
  const custom = useGlobal.value ? globalOptions.value.title : props.title
  if (custom) return custom
  const map: Record<ToastType, string> = {
    default: '提示',
    info: '提示',
    success: '成功',
    warning: '警告',
    error: '错误',
    loading: '加载中',
  }
  return map[displayType.value]
})

const iconText = computed(() => {
  const map: Record<ToastType, string> = {
    default: 'i',
    info: 'i',
    success: '✓',
    warning: '!',
    error: '×',
    loading: '',
  }
  return map[displayType.value]
})

const rootClass = computed(() =>
  bem('rb-toast', displayType.value, displayPosition.value),
)

const contentClass = computed(() =>
  bem('rb-toast__panel', displayType.value),
)

function clearLocalTimer() {
  if (localTimer.value) {
    clearTimeout(localTimer.value)
    localTimer.value = null
  }
}

function close() {
  clearLocalTimer()
  if (useGlobal.value) {
    hideToast()
  } else {
    emit('update:show', false)
  }
  emit('close')
}

watch(
  [visible, displayDuration, displayType],
  ([isVisible, duration, type]) => {
    clearLocalTimer()
    if (!useGlobal.value && isVisible && type !== 'loading' && duration > 0) {
      localTimer.value = setTimeout(() => {
        close()
      }, duration)
    }
  },
  { immediate: true },
)

onUnmounted(() => {
  clearLocalTimer()
})
</script>

<template>
  <view class="rb-toast" :class="[rootClass, customClass]">
    <rb-transition :show="visible" mode="slide-left" :duration="320">
      <view
        class="rb-toast__panel"
        :class="contentClass"
        :style="normalizeStyle(customStyle)"
      >
        <view class="rb-toast__icon" :class="bem('rb-toast__icon', displayType)">
          <view v-if="displayType === 'loading'" class="rb-toast__spinner" />
          <text v-else class="rb-toast__icon-text">{{ iconText }}</text>
        </view>

        <view class="rb-toast__body">
          <text class="rb-toast__title">{{ displayTitle }}</text>
          <text class="rb-toast__message">
            <slot>{{ displayMessage }}</slot>
          </text>
        </view>

        <view
          v-if="displayShowClose && displayType !== 'loading'"
          class="rb-toast__close"
          @click.stop="close"
        >
          <text class="rb-toast__close-text">×</text>
        </view>
      </view>
    </rb-transition>
  </view>
</template>
