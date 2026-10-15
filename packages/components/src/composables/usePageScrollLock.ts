import {
  computed,
  onBeforeUnmount,
  ref,
  toValue,
  watch,
  type MaybeRefOrGetter,
} from 'vue'

/**
 * 跨端页面滚动锁。
 * - H5：写 document.body.overflow（官方主方案外的端内可行做法）
 * - App / 微信：由调用方挂 page-meta，一页仅一个 host 渲染
 * 多弹层共用计数，避免后关的弹层误解除滚动锁。
 */
const activeIds = ref<number[]>([])
let seq = 0

function getUniPlatform(): string | undefined {
  // uni-app 编译期注入；VitePress / 纯浏览器无 process
  if (typeof process === 'undefined') return undefined
  return process.env?.UNI_PLATFORM
}

function syncBodyOverflow(locked: boolean) {
  // App-vue webview 也有 document，必须用编译期平台变量，不能靠 typeof document
  const platform = getUniPlatform()
  if (platform && platform !== 'h5') return
  if (typeof document === 'undefined') return
  document.body.style.overflow = locked ? 'hidden' : ''
}

export function usePageScrollLock(
  show: MaybeRefOrGetter<boolean>,
  enabled: MaybeRefOrGetter<boolean> = true,
) {
  const id = ++seq

  const apply = () => {
    const on = Boolean(toValue(show) && toValue(enabled))
    const has = activeIds.value.includes(id)
    if (on && !has) {
      activeIds.value = [...activeIds.value, id]
    } else if (!on && has) {
      activeIds.value = activeIds.value.filter((item) => item !== id)
    }
  }

  watch([() => toValue(show), () => toValue(enabled)], apply, { immediate: true })

  onBeforeUnmount(() => {
    activeIds.value = activeIds.value.filter((item) => item !== id)
  })

  watch(
    activeIds,
    (ids) => {
      syncBodyOverflow(ids.length > 0)
    },
    { deep: true, immediate: true },
  )

  return {
    /** 仅 host 渲染 page-meta，满足「一页一个」 */
    isLockHost: computed(() => activeIds.value[0] === id),
    pageStyle: computed(() =>
      activeIds.value.length > 0 ? 'overflow:hidden' : 'overflow:visible',
    ),
  }
}
