<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import RbPopup from '../popup/rb-popup.vue'
import RbSoftKeyboard from '../soft-keyboard/rb-soft-keyboard.vue'
import {
  registerSoftKeyboardDismiss,
  unregisterSoftKeyboardDismiss,
} from '../composables/useSoftKeyboardDismiss'

defineOptions({ name: 'RbSoftKeyboardInput' })

const props = withDefaults(
  defineProps<{
    modelValue?: string
    placeholder?: string
    placeholderClass?: string
    mode?: 'login' | 'ip' | string
    maxlength?: number | string
    max?: number | string
    confirmType?: string
    inputClass?: string
    inputStyle?: string | Record<string, string | number>
    multiline?: boolean
    blockLayout?: boolean
    focus?: boolean
    focusOnly?: boolean
  }>(),
  {
    modelValue: '',
    placeholder: '',
    placeholderClass: '',
    mode: 'login',
    maxlength: 200,
    max: 200,
    confirmType: 'search',
    inputClass: '',
    inputStyle: '',
    multiline: false,
    blockLayout: false,
    focus: false,
    focusOnly: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  focus: []
  blur: []
  confirm: []
}>()

const showKeyboard = ref(false)

const noopTouchEvent = () => {}

const dismissSelf = () => {
  showKeyboard.value = false
}

const keyboardValue = computed({
  get() {
    return props.modelValue
  },
  set(val: string) {
    emit('update:modelValue', val)
  },
})

const openKeyboard = () => {
  registerSoftKeyboardDismiss(dismissSelf)
  showKeyboard.value = true
}

function onUserActivate() {
  emit('focus')
  openKeyboard()
}

function onInputFocus() {
  emit('focus')
  if (!props.focusOnly) {
    openKeyboard()
  }
}

const closeKeyboard = () => {
  showKeyboard.value = false
  unregisterSoftKeyboardDismiss(dismissSelf)
  emit('blur')
}

const onKeyboardConfirm = () => {
  emit('confirm')
  closeKeyboard()
}

function onPopupUpdate(show: boolean) {
  showKeyboard.value = show
  if (!show) {
    unregisterSoftKeyboardDismiss(dismissSelf)
    emit('blur')
  }
}

defineExpose({ closeKeyboard, openKeyboard })

onBeforeUnmount(() => {
  unregisterSoftKeyboardDismiss(dismissSelf)
})

const onNativeInput = (event: { detail?: { value?: string } }) => {
  emit('update:modelValue', event.detail?.value ?? '')
}
</script>

<template>
  <view class="soft-keyboard-input" :class="{ block: blockLayout }" @tap.stop="noopTouchEvent">
    <textarea
      v-if="multiline"
      :class="inputClass"
      :style="inputStyle"
      :value="modelValue"
      inputmode="none"
      :placeholder="placeholder"
      :placeholder-class="placeholderClass"
      :maxlength="Number(maxlength)"
      :focus="focus"
      @focus="onInputFocus"
      @tap="onUserActivate"
      @input="onNativeInput"
    />
    <input
      v-else
      :class="inputClass"
      :style="inputStyle"
      :value="modelValue"
      inputmode="none"
      :placeholder="placeholder"
      :placeholder-class="placeholderClass"
      :maxlength="Number(maxlength)"
      :confirm-type="confirmType"
      :focus="focus"
      @focus="onInputFocus"
      @tap="onUserActivate"
      @input="onNativeInput"
    />
    <rb-popup
      :show="showKeyboard"
      mode="bottom"
      :overlay="true"
      :overlay-opacity="0"
      :z-index="200"
      :close-on-click-overlay="true"
      :safe-area-inset-bottom="false"
      @update:show="onPopupUpdate"
    >
      <view class="soft-keyboard-panel" @tap.stop="noopTouchEvent" @touchmove.stop.prevent="noopTouchEvent">
        <rb-soft-keyboard v-model="keyboardValue" :mode="mode" :max="max" @confirm="onKeyboardConfirm" />
      </view>
    </rb-popup>
  </view>
</template>

<style lang="scss" scoped>
.soft-keyboard-input {
  flex: 1;
  min-width: 0;
  &.block {
    width: 100%;
    flex: none;
  }
}

.soft-keyboard-panel {
  width: 100%;
}
</style>
