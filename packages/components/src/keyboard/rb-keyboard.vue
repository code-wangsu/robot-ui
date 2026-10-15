<script setup lang="ts">
import { computed } from 'vue'
import { addUnit } from '@robot-ui/utils'
import { bem, normalizeStyle } from '../composables/useBem'
import RbPopup from '../popup/rb-popup.vue'

defineOptions({ name: 'RbKeyboard' })

const props = withDefaults(
  defineProps<{
    show?: boolean
    mode?: 'number' | 'card'
    dotDisabled?: boolean
    random?: boolean
    duration?: number
    closeOnClickOverlay?: boolean
    safeAreaInsetBottom?: boolean
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    show: false,
    mode: 'number',
    dotDisabled: false,
    random: false,
    duration: 300,
    closeOnClickOverlay: true,
    safeAreaInsetBottom: true,
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  'update:show': [value: boolean]
  change: [value: string]
  backspace: []
  confirm: []
  cancel: []
  close: []
}>()

const innerShow = computed({
  get: () => props.show,
  set: (val: boolean) => emit('update:show', val),
})

const baseKeys = computed(() => {
  const keys = props.mode === 'card'
    ? ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'X', '0']
    : ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0']
  if (props.random) {
    const nums = keys.filter((k) => k !== '.' && k !== 'X')
    for (let i = nums.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [nums[i], nums[j]] = [nums[j], nums[i]]
    }
    return props.mode === 'card' ? [...nums.slice(0, 9), 'X', nums[9]] : [...nums.slice(0, 9), '.', nums[9]]
  }
  if (props.dotDisabled && props.mode === 'number') {
    return keys.filter((k) => k !== '.')
  }
  return keys
})

const keyStyle = computed(() => ({
  height: addUnit(88),
}))

function close() {
  innerShow.value = false
}

function onKey(key: string) {
  if (key === 'X') return
  emit('change', key)
}

function onBackspace() {
  emit('backspace')
}

function onConfirm() {
  emit('confirm')
  close()
}

function onCancel() {
  emit('cancel')
  close()
}

function onOverlayClose() {
  emit('cancel')
  emit('close')
}
</script>

<template>
  <rb-popup
    v-model:show="innerShow"
    mode="bottom"
    :round="16"
    :duration="duration"
    :close-on-click-overlay="closeOnClickOverlay"
    :safe-area-inset-bottom="safeAreaInsetBottom"
    bg-color="#f3f4f6"
    @close="onOverlayClose"
  >
    <view
      class="rb-keyboard"
      :class="[bem('rb-keyboard', mode), customClass]"
      :style="normalizeStyle(customStyle)"
    >
      <view class="rb-keyboard__keys">
        <view
          v-for="(key, index) in baseKeys"
          :key="index"
          class="rb-keyboard__key"
          :style="keyStyle"
          @click="onKey(key)"
        >
          {{ key }}
        </view>
        <view class="rb-keyboard__key rb-keyboard__key--gray" :style="keyStyle" @click="onBackspace">
          ⌫
        </view>
      </view>
      <view class="rb-keyboard__bar">
        <view class="rb-keyboard__btn" @click="onCancel">取消</view>
        <view class="rb-keyboard__btn rb-keyboard__btn--primary" @click="onConfirm">完成</view>
      </view>
    </view>
  </rb-popup>
</template>
