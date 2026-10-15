<script setup lang="ts">
import { computed, ref, toRef } from 'vue'
import { addUnit } from '@robot-ui/utils'
import { bem, normalizeStyle } from '../composables/useBem'
import { provideForm, type FormItemExpose, type FormRule } from '../composables/useForm'

defineOptions({ name: 'RbForm' })

const props = withDefaults(
  defineProps<{
    model: Record<string, unknown>
    rules?: Record<string, FormRule[]>
    labelWidth?: string | number
    labelPosition?: 'left' | 'top'
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    rules: () => ({}),
    labelWidth: 160,
    labelPosition: 'left',
    customStyle: '',
    customClass: '',
  },
)

const items = ref(new Map<string, FormItemExpose>())

provideForm({
  model: toRef(props, 'model'),
  rules: toRef(props, 'rules'),
  labelWidth: toRef(props, 'labelWidth'),
  labelPosition: toRef(props, 'labelPosition'),
  registerItem(item) {
    items.value.set(item.prop, item)
  },
  unregisterItem(prop) {
    items.value.delete(prop)
  },
})

const labelWidthStyle = computed(() => addUnit(props.labelWidth))

async function validate(prop?: string | string[]): Promise<boolean> {
  const list = Array.from(items.value.values())
  const targets = prop
    ? list.filter((item) =>
        Array.isArray(prop) ? prop.includes(item.prop) : item.prop === prop,
      )
    : list
  const results = await Promise.all(targets.map((item) => item.validate()))
  return results.every(Boolean)
}

function resetValidation(prop?: string | string[]) {
  const list = Array.from(items.value.values())
  const targets = prop
    ? list.filter((item) =>
        Array.isArray(prop) ? prop.includes(item.prop) : item.prop === prop,
      )
    : list
  targets.forEach((item) => item.resetValidation())
}

defineExpose({ validate, resetValidation })
</script>

<template>
  <view
    class="rb-form"
    :class="[bem('rb-form', `label-${labelPosition}`), customClass]"
    :style="normalizeStyle(customStyle)"
  >
    <slot />
  </view>
</template>

<style lang="scss">
.rb-form {
  --rb-form-label-width: v-bind(labelWidthStyle);
}
</style>
