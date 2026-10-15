<script setup lang="ts">
import { computed, ref } from 'vue'
import { addUnit } from '@robot-ui/utils'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbInput' })

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    type?: string
    placeholder?: string
    disabled?: boolean
    readonly?: boolean
    clearable?: boolean
    maxlength?: number
    border?: 'surround' | 'bottom' | 'none'
    height?: string | number
    fontSize?: string | number
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    modelValue: '',
    type: 'text',
    placeholder: '请输入',
    disabled: false,
    readonly: false,
    clearable: false,
    maxlength: -1,
    border: 'surround',
    height: 80,
    fontSize: 28,
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  input: [value: string | number]
  focus: [event: Event]
  blur: [event: Event]
  clear: []
}>()

const focused = ref(false)

const rootClass = computed(() =>
  bem('rb-input', props.border, props.disabled && 'disabled', focused.value && 'focus'),
)

const inputStyle = computed(() => ({
  height: addUnit(props.height),
  fontSize: addUnit(props.fontSize),
}))

const showClear = computed(
  () => props.clearable && !props.disabled && !props.readonly && String(props.modelValue).length > 0,
)

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  const value = target?.value ?? (event as unknown as { detail: { value: string } }).detail?.value
  emit('update:modelValue', value)
  emit('input', value)
}

function onClear() {
  emit('update:modelValue', '')
  emit('clear')
}
</script>

<template>
  <view
    class="rb-input"
    :class="[rootClass, customClass]"
    :style="normalizeStyle(customStyle)"
  >
    <view v-if="$slots.prefix" class="rb-input__prefix">
      <slot name="prefix" />
    </view>
    <input
      class="rb-input__inner"
      :style="inputStyle"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength > 0 ? maxlength : undefined"
      @input="onInput"
      @focus="focused = true; emit('focus', $event)"
      @blur="focused = false; emit('blur', $event)"
    />
    <view v-if="showClear" class="rb-input__clear" @click="onClear">×</view>
    <view v-if="$slots.suffix" class="rb-input__suffix">
      <slot name="suffix" />
    </view>
  </view>
</template>
