<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbTooltip' })

type Placement = 'top' | 'bottom' | 'left' | 'right'
type Trigger = 'click' | 'longpress' | 'touch'

const props = withDefaults(
  defineProps<{
    text?: string
    placement?: Placement
    /** 受控显隐；不传则组件内部维护 */
    show?: boolean
    trigger?: Trigger
    disabled?: boolean
    showDelay?: number
    hideDelay?: number
    arrow?: boolean
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    text: '',
    placement: 'top',
    show: undefined,
    trigger: 'click',
    disabled: false,
    showDelay: 0,
    hideDelay: 150,
    arrow: true,
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  'update:show': [value: boolean]
  open: []
  close: []
}>()

const uncontrolled = ref(false)
let showTimer: ReturnType<typeof setTimeout> | null = null
let hideTimer: ReturnType<typeof setTimeout> | null = null

const isControlled = computed(() => props.show !== undefined)

const visible = computed(() => (isControlled.value ? Boolean(props.show) : uncontrolled.value))

const rootClass = computed(() =>
  bem('rb-tooltip', props.placement, visible.value && 'open', props.disabled && 'disabled'),
)

function clearTimers() {
  if (showTimer) {
    clearTimeout(showTimer)
    showTimer = null
  }
  if (hideTimer) {
    clearTimeout(hideTimer)
    hideTimer = null
  }
}

function setVisible(next: boolean) {
  if (props.disabled) return
  clearTimers()
  const delay = next ? props.showDelay : props.hideDelay
  const apply = () => {
    if (isControlled.value) {
      emit('update:show', next)
    } else {
      uncontrolled.value = next
    }
    emit(next ? 'open' : 'close')
  }
  if (delay > 0) {
    const timer = setTimeout(apply, delay)
    if (next) showTimer = timer
    else hideTimer = timer
  } else {
    apply()
  }
}

function toggle() {
  setVisible(!visible.value)
}

function onClick() {
  if (props.trigger === 'click') toggle()
}

function onLongPress() {
  if (props.trigger === 'longpress') setVisible(true)
}

function onTouchStart() {
  if (props.trigger === 'touch') setVisible(true)
}

function onTouchEnd() {
  if (props.trigger === 'touch') setVisible(false)
}

watch(
  () => props.show,
  (val) => {
    if (val === undefined) return
    // 受控同步时清理延迟，避免竞态
    clearTimers()
  },
)

onUnmounted(clearTimers)

defineExpose({
  open: () => setVisible(true),
  close: () => setVisible(false),
  toggle,
})
</script>

<template>
  <view
    class="rb-tooltip"
    :class="[rootClass, customClass]"
    :style="normalizeStyle(customStyle)"
    @click.stop="onClick"
    @longpress="onLongPress"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
    @touchcancel="onTouchEnd"
  >
    <view class="rb-tooltip__reference">
      <slot />
    </view>
    <view v-if="visible" class="rb-tooltip__popper" @click.stop>
      <view v-if="arrow" class="rb-tooltip__arrow" />
      <view class="rb-tooltip__content">
        <slot name="content">{{ text }}</slot>
      </view>
    </view>
  </view>
</template>
