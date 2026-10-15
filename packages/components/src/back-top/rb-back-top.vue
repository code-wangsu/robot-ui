<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { addUnit } from '@robot-ui/utils'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbBackTop' })

const props = withDefaults(
  defineProps<{
    /** 受控显示；不传则根据 scrollTop / top 自动判断 */
    show?: boolean
    /** 页面滚动距离（px），通常来自 onPageScroll */
    scrollTop?: number
    /** 滚动超过该阈值后显示，数字默认 rpx */
    top?: string | number
    bottom?: string | number
    right?: string | number
    zIndex?: number
    duration?: number
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    show: undefined,
    scrollTop: 0,
    top: 400,
    bottom: 120,
    right: 40,
    zIndex: 999,
    duration: 300,
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  click: []
}>()

const innerShow = ref(false)

function resolveTopPx(value: string | number): number {
  if (typeof value === 'number') {
    return typeof uni !== 'undefined' && uni.upx2px ? uni.upx2px(value) : (value / 750) * 375
  }
  const str = String(value)
  if (str.endsWith('px')) return Number.parseFloat(str)
  if (str.endsWith('rpx')) {
    const n = Number.parseFloat(str)
    return typeof uni !== 'undefined' && uni.upx2px ? uni.upx2px(n) : (n / 750) * 375
  }
  return Number.parseFloat(str) || 0
}

const autoVisible = computed(() => props.scrollTop >= resolveTopPx(props.top))

const visible = computed(() => (props.show !== undefined ? props.show : autoVisible.value || innerShow.value))

watch(autoVisible, (val) => {
  if (props.show === undefined) innerShow.value = val
})

const topStyle = computed(() => {
  const style: Record<string, string | number> = {
    bottom: addUnit(props.bottom),
    right: addUnit(props.right),
    zIndex: props.zIndex,
  }
  const extra = normalizeStyle(props.customStyle)
  if (extra && typeof extra !== 'string') Object.assign(style, extra)
  return style
})

function onClick() {
  if (typeof uni !== 'undefined' && typeof uni.pageScrollTo === 'function') {
    uni.pageScrollTo({ scrollTop: 0, duration: props.duration })
  } else if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: props.duration > 0 ? 'smooth' : 'auto' })
  }
  emit('click')
}

defineExpose({
  show: () => {
    innerShow.value = true
  },
  hide: () => {
    innerShow.value = false
  },
})
</script>

<template>
  <view
    v-if="visible"
    class="rb-back-top"
    :class="[bem('rb-back-top'), customClass]"
    :style="topStyle"
    @click="onClick"
  >
    <slot>
      <text class="rb-back-top__icon">↑</text>
    </slot>
  </view>
</template>
