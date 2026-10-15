<script setup lang="ts">
import { computed } from 'vue'
import { bem, normalizeStyle } from '../composables/useBem'
import RbTransition from '../transition/rb-transition.vue'

defineOptions({ name: 'RbOverlay' })

const props = withDefaults(
  defineProps<{
    show?: boolean
    zIndex?: number
    duration?: number
    opacity?: number
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    show: false,
    zIndex: 10070,
    duration: 300,
    opacity: 0.5,
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  click: [event: Event]
}>()

const overlayStyle = computed(() => {
  const base: Record<string, string | number> = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: props.zIndex,
    backgroundColor: `rgba(0, 0, 0, ${props.opacity})`,
  }
  const extra = normalizeStyle(props.customStyle)
  if (extra && typeof extra !== 'string') {
    Object.assign(base, extra)
  }
  return base
})

function onClick(event: Event) {
  emit('click', event)
}
</script>

<template>
  <rb-transition
    :show="show"
    mode="fade"
    :duration="duration"
    :custom-style="overlayStyle"
    :custom-class="[bem('rb-overlay'), customClass].filter(Boolean).join(' ')"
    @click="onClick"
  >
    <!-- 占满遮罩区域，拦截滚动穿透 -->
    <view class="rb-overlay__block" @touchmove.stop.prevent />
  </rb-transition>
</template>
