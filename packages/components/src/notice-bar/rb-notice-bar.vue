<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { addUnit } from '@robot-ui/utils'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbNoticeBar' })

const props = withDefaults(
  defineProps<{
    text?: string
    color?: string
    background?: string
    speed?: number
    scrollable?: boolean
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    text: '',
    color: '',
    background: '',
    speed: 60,
    scrollable: true,
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  click: [event: Event]
  close: []
}>()

const visible = ref(true)
const offset = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

const barStyle = computed(() => {
  const style: Record<string, string | number> = {}
  if (props.color) {
    style.color = props.color
  }
  if (props.background) {
    style.backgroundColor = props.background
  }
  const extra = normalizeStyle(props.customStyle)
  if (extra && typeof extra !== 'string') {
    Object.assign(style, extra)
  }
  return style
})

const textStyle = computed(() => ({
  transform: `translateX(${addUnit(-offset.value)})`,
  transitionDuration: props.scrollable ? '0s' : '0.3s',
}))

function startScroll() {
  if (!props.scrollable) {
    return
  }
  timer = setInterval(() => {
    offset.value += 1
    if (offset.value > 600) {
      offset.value = 0
    }
  }, props.speed)
}

function onClose() {
  visible.value = false
  emit('close')
}

onMounted(startScroll)
onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<template>
  <view
    v-if="visible"
    class="rb-notice-bar"
    :class="[bem('rb-notice-bar'), customClass]"
    :style="barStyle"
    @click="emit('click', $event)"
  >
    <view class="rb-notice-bar__wrap">
      <text class="rb-notice-bar__text" :style="textStyle">
        <slot>{{ text }}</slot>
      </text>
    </view>
    <text class="rb-notice-bar__close" @click.stop="onClose">×</text>
  </view>
</template>
