<script setup lang="ts">
import { computed } from 'vue'
import { addUnit, clamp } from '@robot-ui/utils'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbNumberBox' })

const props = withDefaults(
  defineProps<{
    modelValue?: number
    min?: number
    max?: number
    step?: number
    disabled?: boolean
    disabledInput?: boolean
    buttonSize?: string | number
    inputWidth?: string | number
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    modelValue: 1,
    min: 1,
    max: 999,
    step: 1,
    disabled: false,
    disabledInput: false,
    buttonSize: 56,
    inputWidth: 80,
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: number]
  change: [value: number]
  overlimit: [type: 'minus' | 'plus']
}>()

const btnStyle = computed(() => ({
  width: addUnit(props.buttonSize),
  height: addUnit(props.buttonSize),
}))

const inputStyle = computed(() => ({
  width: addUnit(props.inputWidth),
  height: addUnit(props.buttonSize),
}))

function setValue(next: number) {
  const value = clamp(next, props.min, props.max)
  emit('update:modelValue', value)
  emit('change', value)
}

function minus() {
  if (props.disabled) return
  if (props.modelValue <= props.min) {
    emit('overlimit', 'minus')
    return
  }
  setValue(props.modelValue - props.step)
}

function plus() {
  if (props.disabled) return
  if (props.modelValue >= props.max) {
    emit('overlimit', 'plus')
    return
  }
  setValue(props.modelValue + props.step)
}

function onInput(event: Event) {
  const raw = Number((event as unknown as { detail: { value: string } }).detail.value)
  if (Number.isNaN(raw)) return
  setValue(raw)
}
</script>

<template>
  <view
    class="rb-number-box"
    :class="[bem('rb-number-box', disabled && 'disabled'), customClass]"
    :style="normalizeStyle(customStyle)"
  >
    <view class="rb-number-box__minus" :style="btnStyle" @click="minus">−</view>
    <input
      class="rb-number-box__input"
      :style="inputStyle"
      type="number"
      :value="modelValue"
      :disabled="disabled || disabledInput"
      @input="onInput"
    />
    <view class="rb-number-box__plus" :style="btnStyle" @click="plus">+</view>
  </view>
</template>
