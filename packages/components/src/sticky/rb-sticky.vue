<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, onUnmounted, ref, watch } from 'vue'
import { addUnit, toPx } from '@robot-ui/utils'
import { bem, normalizeStyle } from '../composables/useBem'
import { useSelectorQuery } from '../composables/useSelectorQuery'

defineOptions({ name: 'RbSticky' })

const props = withDefaults(
  defineProps<{
    /** 吸顶偏移，数字默认 rpx */
    offsetTop?: string | number
    zIndex?: number
    /** 是否启用吸顶 */
    enabled?: boolean
    /**
     * 页面 / scroll-view 的 scrollTop（px）。
     * 在 onPageScroll 或 @scroll 中传入即可驱动吸顶判断。
     */
    scrollTop?: number
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    offsetTop: 0,
    zIndex: 970,
    enabled: true,
    scrollTop: undefined,
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  change: [fixed: boolean]
  fixed: []
  unfixed: []
}>()

const uid = `rb-sticky-${Math.random().toString(36).slice(2, 9)}`
const fixed = ref(false)
const height = ref(0)
const width = ref(0)
const { getRect } = useSelectorQuery()
const instance = getCurrentInstance()

let observer: UniNamespace.IntersectionObserver | null = null
let h5Listening = false

const stickyStyle = computed(() => {
  const style: Record<string, string | number> = {}
  if (fixed.value) {
    style.position = 'fixed'
    style.top = addUnit(props.offsetTop)
    style.left = 0
    style.right = 0
    style.zIndex = props.zIndex
    if (width.value) style.width = `${width.value}px`
  }
  const extra = normalizeStyle(props.customStyle)
  if (extra && typeof extra !== 'string') Object.assign(style, extra)
  return style
})

const placeholderStyle = computed(() => ({
  height: fixed.value && height.value ? `${height.value}px` : undefined,
}))

function setFixed(next: boolean) {
  if (fixed.value === next) return
  fixed.value = next
  emit('change', next)
  emit(next ? 'fixed' : 'unfixed')
}

async function check() {
  if (!props.enabled) {
    setFixed(false)
    return
  }
  const rect = await getRect(`#${uid}`)
  if (!rect) return

  if (!fixed.value) {
    if (rect.height) height.value = rect.height
    if (rect.width) width.value = rect.width
  }

  const offsetPx = toPx(props.offsetTop)
  // 用占位根节点相对视口 top 判断是否越过吸顶线
  setFixed((rect.top ?? 0) <= offsetPx)
}

/** 兼容旧 API：外部可在滚动回调里调用 */
function onScroll(_scrollTop?: number) {
  void check()
}

function bindIntersectionObserver() {
  if (typeof uni === 'undefined' || typeof uni.createIntersectionObserver !== 'function') return
  try {
    const offsetPx = toPx(props.offsetTop)
    observer = uni.createIntersectionObserver(instance?.proxy)
    observer.relativeToViewport({ top: -offsetPx }).observe(`#${uid}-sentinel`, (res) => {
      if (!props.enabled) return
      // sentinel 离开视口上方 → 需要吸顶
      setFixed(res.intersectionRatio <= 0 && (res.boundingClientRect?.top ?? 0) < offsetPx)
      void refreshSize()
    })
  } catch {
    observer = null
  }
}

async function refreshSize() {
  const rect = await getRect(`#${uid}-inner`)
  if (rect?.height) height.value = rect.height
  if (rect?.width) width.value = rect.width
}

function bindH5Scroll() {
  if (typeof window === 'undefined') return
  h5Listening = true
  window.addEventListener('scroll', check, { passive: true })
  window.addEventListener('resize', check)
}

function unbind() {
  observer?.disconnect()
  observer = null
  if (h5Listening && typeof window !== 'undefined') {
    window.removeEventListener('scroll', check)
    window.removeEventListener('resize', check)
    h5Listening = false
  }
}

watch(
  () => props.scrollTop,
  () => {
    void check()
  },
)

watch(
  () => [props.offsetTop, props.enabled] as const,
  () => {
    unbind()
    bindIntersectionObserver()
    void check()
  },
)

onMounted(async () => {
  await refreshSize()
  bindIntersectionObserver()
  bindH5Scroll()
  await check()
})

onUnmounted(unbind)

defineExpose({ check, onScroll, fixed })
</script>

<template>
  <view :id="uid" class="rb-sticky" :class="[bem('rb-sticky', fixed && 'fixed'), customClass]" :style="placeholderStyle">
    <!-- 哨兵：用于 IntersectionObserver 判断是否越过吸顶线 -->
    <view :id="`${uid}-sentinel`" class="rb-sticky__sentinel" />
    <view
      :id="`${uid}-inner`"
      class="rb-sticky__wrap"
      :class="bem('rb-sticky', fixed && 'fixed')"
      :style="stickyStyle"
    >
      <slot />
    </view>
  </view>
</template>
