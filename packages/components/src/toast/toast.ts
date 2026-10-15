import { ref } from 'vue'

export type ToastType = 'default' | 'info' | 'success' | 'warning' | 'error' | 'loading'

export type ToastPosition =
  | 'center'
  | 'top'
  | 'bottom'
  | 'top-right'
  | 'top-left'
  | 'bottom-right'

export interface ToastOptions {
  message?: string
  /** 标题，默认按 type 生成（对齐 Element Plus Notification） */
  title?: string
  type?: ToastType
  duration?: number
  position?: ToastPosition
  /** 是否显示关闭按钮 */
  showClose?: boolean
}

const show = ref(false)
const options = ref<ToastOptions>({})

let timer: ReturnType<typeof setTimeout> | null = null

function clearTimer() {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}

export function showToast(opts: ToastOptions | string) {
  const config: ToastOptions = typeof opts === 'string' ? { message: opts } : opts
  options.value = {
    position: 'top-right',
    showClose: true,
    ...config,
  }
  show.value = true
  clearTimer()
  const duration = config.duration ?? 3000
  if (config.type !== 'loading' && duration > 0) {
    timer = setTimeout(() => {
      show.value = false
    }, duration)
  }
}

export function hideToast() {
  clearTimer()
  show.value = false
}

export function useToastState() {
  return { show, options }
}

export default {
  show: showToast,
  hide: hideToast,
}
