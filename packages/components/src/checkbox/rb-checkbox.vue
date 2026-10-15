<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { bem, normalizeStyle } from '../composables/useBem'
import { useCheckboxGroupInject } from '../composables/useCheckboxGroup'

defineOptions({ name: 'RbCheckbox' })

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    name?: string | number
    label?: string
    disabled?: boolean
    shape?: 'square' | 'circle'
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    modelValue: false,
    name: '',
    label: '',
    disabled: false,
    shape: 'square',
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  change: [value: boolean]
}>()

const group = useCheckboxGroupInject()
const checked = ref(props.modelValue)

watch(
  () => props.modelValue,
  (val) => {
    checked.value = val
  },
)

const isChecked = computed(() => {
  if (group) {
    return group.isChecked(props.name)
  }
  return checked.value
})

const isDisabled = computed(() => props.disabled || group?.disabled.value)

const rootClass = computed(() =>
  bem(
    'rb-checkbox',
    props.shape,
    isChecked.value && 'checked',
    isDisabled.value && 'disabled',
  ),
)

function toggle() {
  if (isDisabled.value) return
  if (group) {
    group.toggle(props.name)
    return
  }
  const next = !checked.value
  checked.value = next
  emit('update:modelValue', next)
  emit('change', next)
}
</script>

<template>
  <view
    class="rb-checkbox"
    :class="[rootClass, customClass]"
    :style="normalizeStyle(customStyle)"
    @click="toggle"
  >
    <view class="rb-checkbox__icon">
      <text v-if="isChecked" class="rb-checkbox__tick">✓</text>
    </view>
    <text v-if="label || $slots.default" class="rb-checkbox__label">
      <slot>{{ label }}</slot>
    </text>
  </view>
</template>
