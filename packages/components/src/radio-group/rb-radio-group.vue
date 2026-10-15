<script setup lang="ts">
import { ref, toRef, watch } from 'vue'
import { bem, normalizeStyle } from '../composables/useBem'
import { provideRadioGroup } from '../composables/useRadioGroup'

defineOptions({ name: 'RbRadioGroup' })

const props = withDefaults(
  defineProps<{
    modelValue?: string | number | boolean
    disabled?: boolean
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    modelValue: '',
    disabled: false,
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string | number | boolean]
  change: [value: string | number | boolean]
}>()

const innerValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  (val) => {
    innerValue.value = val
  },
)

function select(value: unknown) {
  if (props.disabled) return
  innerValue.value = value as string | number | boolean
  emit('update:modelValue', innerValue.value)
  emit('change', innerValue.value)
}

provideRadioGroup({
  modelValue: innerValue,
  disabled: toRef(props, 'disabled'),
  select,
  isSelected: (value) => innerValue.value === value,
})
</script>

<template>
  <view
    class="rb-radio-group"
    :class="[bem('rb-radio-group'), customClass]"
    :style="normalizeStyle(customStyle)"
  >
    <slot />
  </view>
</template>
