<script setup lang="ts">
import { computed, ref, toRef, watch } from 'vue'
import { bem, normalizeStyle } from '../composables/useBem'
import { provideCheckboxGroup } from '../composables/useCheckboxGroup'

defineOptions({ name: 'RbCheckboxGroup' })

const props = withDefaults(
  defineProps<{
    modelValue?: unknown[]
    disabled?: boolean
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    modelValue: () => [],
    disabled: false,
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: unknown[]]
  change: [value: unknown[]]
}>()

const innerValue = ref<unknown[]>([...props.modelValue])

watch(
  () => props.modelValue,
  (val) => {
    innerValue.value = [...val]
  },
)

function toggle(value: unknown) {
  if (props.disabled) return
  const index = innerValue.value.indexOf(value)
  if (index > -1) {
    innerValue.value.splice(index, 1)
  } else {
    innerValue.value.push(value)
  }
  const next = [...innerValue.value]
  emit('update:modelValue', next)
  emit('change', next)
}

provideCheckboxGroup({
  modelValue: innerValue,
  disabled: toRef(props, 'disabled'),
  toggle,
  isChecked: (value) => innerValue.value.includes(value),
})
</script>

<template>
  <view
    class="rb-checkbox-group"
    :class="[bem('rb-checkbox-group'), customClass]"
    :style="normalizeStyle(customStyle)"
  >
    <slot />
  </view>
</template>
