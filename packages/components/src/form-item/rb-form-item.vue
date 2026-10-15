<script setup lang="ts">
import { computed, onMounted, onUnmounted, watch } from 'vue'
import { get } from 'lodash-es'
import { bem, normalizeStyle } from '../composables/useBem'
import {
  runFormRules,
  useFormInject,
  useFormItemState,
  type FormRule,
} from '../composables/useForm'

defineOptions({ name: 'RbFormItem' })

const props = withDefaults(
  defineProps<{
    prop?: string
    label?: string
    required?: boolean
    rules?: FormRule[]
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    prop: '',
    label: '',
    required: false,
    rules: () => [],
    customStyle: '',
    customClass: '',
  },
)

const form = useFormInject()
const { message, showError } = useFormItemState()

const mergedRules = computed((): FormRule[] => {
  const fromForm = form && props.prop ? (form.rules.value[props.prop] ?? []) : []
  const local = [...props.rules]
  if (props.required && !fromForm.some((r) => r.required) && !local.some((r) => r.required)) {
    local.unshift({ required: true, message: '请填写此项' })
  }
  return [...fromForm, ...local]
})

const isRequired = computed(() => mergedRules.value.some((rule) => rule.required))

const labelPosition = computed(() => form?.labelPosition.value ?? 'left')

async function runRules(): Promise<boolean> {
  if (!props.prop) return true
  const value = form ? get(form.model.value, props.prop) : undefined
  const result = await runFormRules(value, mergedRules.value)
  message.value = result.message
  showError.value = !result.valid
  return result.valid
}

function resetValidation() {
  message.value = ''
  showError.value = false
}

onMounted(() => {
  if (form && props.prop) {
    form.registerItem({ prop: props.prop, validate: runRules, resetValidation })
  }
})

onUnmounted(() => {
  if (form && props.prop) {
    form.unregisterItem(props.prop)
  }
})

watch(
  () => (form && props.prop ? get(form.model.value, props.prop) : undefined),
  () => {
    if (showError.value) {
      runRules()
    }
  },
  { deep: true },
)

defineExpose({ validate: runRules, resetValidation })
</script>

<template>
  <view
    class="rb-form-item"
    :class="[bem('rb-form-item', labelPosition, showError && 'error'), customClass]"
    :style="normalizeStyle(customStyle)"
  >
    <view v-if="label || $slots.label" class="rb-form-item__label">
      <text v-if="isRequired" class="rb-form-item__required">*</text>
      <slot name="label">{{ label }}</slot>
    </view>
    <view class="rb-form-item__content">
      <slot />
      <text v-if="showError && message" class="rb-form-item__message">{{ message }}</text>
    </view>
  </view>
</template>
