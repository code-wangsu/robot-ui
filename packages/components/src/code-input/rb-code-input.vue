<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { addUnit } from '@robot-ui/utils'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbCodeInput' })

const props = withDefaults(
  defineProps<{
    modelValue?: string
    maxlength?: number
    dot?: boolean
    mode?: 'box' | 'line'
    space?: string | number
    fontSize?: string | number
    disabled?: boolean
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    modelValue: '',
    maxlength: 6,
    dot: false,
    mode: 'box',
    space: 16,
    fontSize: 36,
    disabled: false,
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  finish: [value: string]
  change: [value: string]
}>()

const focused = ref(false)
const cells = computed(() => Array.from({ length: props.maxlength }, (_, i) => i))

const itemStyle = computed(() => ({
  marginRight: addUnit(props.space),
  fontSize: addUnit(props.fontSize),
}))

watch(
  () => props.modelValue,
  (val) => {
    emit('change', val)
    if (val.length >= props.maxlength) {
      emit('finish', val)
    }
  },
)

function onInput(event: Event) {
  const raw = (event as unknown as { detail: { value: string } }).detail.value
  const value = raw.slice(0, props.maxlength)
  emit('update:modelValue', value)
}

function focusInput() {
  if (props.disabled) return
  focused.value = true
}
</script>

<template>
  <view
    class="rb-code-input"
    :class="[bem('rb-code-input', mode), customClass]"
    :style="normalizeStyle(customStyle)"
    @click="focusInput"
  >
    <view class="rb-code-input__cells">
      <view
        v-for="index in cells"
        :key="index"
        class="rb-code-input__cell"
        :class="{ 'rb-code-input__cell--active': modelValue.length === index && focused }"
        :style="itemStyle"
      >
        <text v-if="!dot && modelValue[index]">{{ modelValue[index] }}</text>
        <view v-else-if="dot && modelValue[index]" class="rb-code-input__dot" />
      </view>
    </view>
    <input
      class="rb-code-input__hidden"
      type="number"
      :value="modelValue"
      :maxlength="maxlength"
      :disabled="disabled"
      :focus="focused"
      @input="onInput"
      @blur="focused = false"
    />
  </view>
</template>
