<script setup lang="ts">
import { computed, ref } from 'vue'
import { addUnit } from '@robot-ui/utils'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbTextarea' })

const props = withDefaults(
  defineProps<{
    modelValue?: string
    placeholder?: string
    disabled?: boolean
    maxlength?: number
    height?: string | number
    autoHeight?: boolean
    count?: boolean
    border?: 'surround' | 'bottom' | 'none'
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    modelValue: '',
    placeholder: '请输入',
    disabled: false,
    maxlength: -1,
    height: 160,
    autoHeight: false,
    count: false,
    border: 'surround',
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  input: [value: string]
  focus: [event: Event]
  blur: [event: Event]
}>()

const focused = ref(false)

const rootClass = computed(() =>
  bem('rb-textarea', props.border, props.disabled && 'disabled', focused.value && 'focus'),
)

const areaStyle = computed(() => ({
  minHeight: addUnit(props.height),
}))

const charCount = computed(() => String(props.modelValue).length)

function onInput(event: Event) {
  const detail = (event as unknown as { detail: { value: string } }).detail
  const value = detail?.value ?? ''
  emit('update:modelValue', value)
  emit('input', value)
}
</script>

<template>
  <view
    class="rb-textarea"
    :class="[rootClass, customClass]"
    :style="normalizeStyle(customStyle)"
  >
    <textarea
      class="rb-textarea__inner"
      :style="areaStyle"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="maxlength > 0 ? maxlength : undefined"
      :auto-height="autoHeight"
      @input="onInput"
      @focus="focused = true; emit('focus', $event)"
      @blur="focused = false; emit('blur', $event)"
    />
    <text v-if="count && maxlength > 0" class="rb-textarea__count">
      {{ charCount }}/{{ maxlength }}
    </text>
  </view>
</template>
