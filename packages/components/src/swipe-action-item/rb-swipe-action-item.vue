<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { addUnit } from '@robot-ui/utils'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbSwipeActionItem' })

export interface SwipeActionButton {
  text: string
  style?: Record<string, string>
  color?: string
}

const props = withDefaults(
  defineProps<{
    name?: string | number
    buttons?: SwipeActionButton[]
    disabled?: boolean
    threshold?: number
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    name: '',
    buttons: () => [],
    disabled: false,
    threshold: 30,
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  click: [index: number]
  open: []
  close: []
}>()

interface SwipeActionContext {
  activeName: { value: string | number }
  autoClose: boolean
  open: (name: string | number) => void
  close: () => void
}

const ctx = inject<SwipeActionContext>('rbSwipeAction')!
const offsetX = ref(0)
const startX = ref(0)
const btnWidth = computed(() => props.buttons.length * 120)

const isOpen = computed(() => ctx.activeName.value === props.name)

const contentStyle = computed(() => ({
  transform: `translateX(${addUnit(offsetX.value)})`,
}))

function onTouchStart(event: TouchEvent) {
  if (props.disabled) {
    return
  }
  startX.value = event.touches[0].clientX
}

function onTouchMove(event: TouchEvent) {
  if (props.disabled) {
    return
  }
  const delta = event.touches[0].clientX - startX.value
  const max = -btnWidth.value
  offsetX.value = Math.max(max, Math.min(0, isOpen.value ? max + delta : delta))
}

function onTouchEnd() {
  if (props.disabled) {
    return
  }
  if (Math.abs(offsetX.value) > props.threshold) {
    offsetX.value = -btnWidth.value
    ctx.open(props.name)
    emit('open')
  } else {
    offsetX.value = 0
    ctx.close()
    emit('close')
  }
}

function onButtonClick(index: number) {
  emit('click', index)
  if (ctx.autoClose) {
    offsetX.value = 0
    ctx.close()
  }
}
</script>

<template>
  <view
    class="rb-swipe-action-item"
    :class="[bem('rb-swipe-action-item', disabled && 'disabled'), customClass]"
    :style="normalizeStyle(customStyle)"
  >
    <view
      class="rb-swipe-action-item__content"
      :style="contentStyle"
      @touchstart="onTouchStart"
      @touchmove.stop.prevent="onTouchMove"
      @touchend="onTouchEnd"
    >
      <slot />
    </view>
    <view class="rb-swipe-action-item__buttons">
      <view
        v-for="(btn, index) in buttons"
        :key="index"
        class="rb-swipe-action-item__btn"
        :style="{ backgroundColor: btn.color || '#f56c6c', ...(btn.style || {}) }"
        @click="onButtonClick(index)"
      >
        {{ btn.text }}
      </view>
    </view>
  </view>
</template>
