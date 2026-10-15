<script setup lang="ts">
defineOptions({ name: 'RbSystemKeyboardInput' })

const props = withDefaults(
  defineProps<{
    modelValue?: string
    placeholder?: string
    placeholderClass?: string
    maxlength?: number | string
    max?: number | string
    confirmType?: string
    inputClass?: string
    inputStyle?: string | Record<string, string | number>
    multiline?: boolean
    blockLayout?: boolean
    focus?: boolean
    focusOnly?: boolean
    mode?: string
  }>(),
  {
    modelValue: '',
    placeholder: '',
    placeholderClass: '',
    maxlength: 200,
    max: 200,
    confirmType: 'search',
    inputClass: '',
    inputStyle: '',
    multiline: false,
    blockLayout: false,
    focus: false,
    focusOnly: false,
    mode: '',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  focus: []
  blur: []
  confirm: [value: string]
}>()

const syncNativeValue = (event: { detail?: { value?: string } }) => {
  if (!event?.detail || !Object.prototype.hasOwnProperty.call(event.detail, 'value')) {
    return props.modelValue ?? ''
  }
  const value = event.detail.value ?? ''
  const maxLength = Number(props.max || props.maxlength)
  const nextValue = maxLength > 0 ? String(value).slice(0, maxLength) : String(value)
  if (nextValue !== props.modelValue) emit('update:modelValue', nextValue)
  return nextValue
}

const onNativeInput = (event: { detail?: { value?: string } }) => {
  syncNativeValue(event)
}

const onFocus = () => {
  emit('focus')
}

const onBlur = (event: { detail?: { value?: string } }) => {
  const raw = event?.detail?.value
  if (raw === '' && props.modelValue) {
    emit('blur')
    return
  }
  syncNativeValue(event)
  emit('blur')
}

const onConfirm = (event: { detail?: { value?: string } }) => {
  const value = syncNativeValue(event)
  emit('confirm', value)
}

const closeKeyboard = () => {
  if (typeof uni !== 'undefined') uni.hideKeyboard?.()
  emit('blur')
}

defineExpose({ closeKeyboard })
</script>

<template>
  <view class="system-keyboard-input" :class="{ block: blockLayout }" @tap.stop>
    <textarea
      v-if="multiline"
      :class="inputClass"
      :style="inputStyle"
      :value="modelValue"
      :placeholder="placeholder"
      :placeholder-class="placeholderClass"
      :maxlength="Number(maxlength)"
      :focus="focus"
      @focus="onFocus"
      @blur="onBlur"
      @input="onNativeInput"
      @confirm="onConfirm"
    />
    <input
      v-else
      :class="inputClass"
      :style="inputStyle"
      :value="modelValue"
      :placeholder="placeholder"
      :placeholder-class="placeholderClass"
      :maxlength="Number(maxlength)"
      :confirm-type="confirmType"
      :focus="focus"
      @focus="onFocus"
      @blur="onBlur"
      @input="onNativeInput"
      @confirm="onConfirm"
    />
  </view>
</template>

<style lang="scss" scoped>
.system-keyboard-input {
  flex: 1;
  min-width: 0;

  &.block {
    width: 100%;
    flex: none;
  }
}
</style>
