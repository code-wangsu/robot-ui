<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { bem, normalizeStyle } from '../composables/useBem'
import { useRadioGroupInject } from '../composables/useRadioGroup'

defineOptions({ name: 'RbRadio' })

const props = withDefaults(
  defineProps<{
    modelValue?: string | number | boolean
    name?: string | number | boolean
    label?: string
    disabled?: boolean
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    modelValue: '',
    name: '',
    label: '',
    disabled: false,
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string | number | boolean]
  change: [value: string | number | boolean]
}>()

const group = useRadioGroupInject()
const checked = ref(props.modelValue === props.name)

watch(
  () => props.modelValue,
  (val) => {
    checked.value = val === props.name
  },
)

const isSelected = computed(() => {
  if (group) {
    return group.isSelected(props.name)
  }
  return checked.value
})

const isDisabled = computed(() => props.disabled || group?.disabled.value)

const rootClass = computed(() =>
  bem('rb-radio', isSelected.value && 'checked', isDisabled.value && 'disabled'),
)

function select() {
  if (isDisabled.value) return
  if (group) {
    group.select(props.name)
    return
  }
  checked.value = true
  emit('update:modelValue', props.name)
  emit('change', props.name)
}
</script>

<template>
  <view
    class="rb-radio"
    :class="[rootClass, customClass]"
    :style="normalizeStyle(customStyle)"
    @click="select"
  >
    <view class="rb-radio__icon">
      <view v-if="isSelected" class="rb-radio__dot" />
    </view>
    <text v-if="label || $slots.default" class="rb-radio__label">
      <slot>{{ label }}</slot>
    </text>
  </view>
</template>
