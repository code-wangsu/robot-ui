<script setup lang="ts">
import { computed, provide, ref, watch } from 'vue'
import { addUnit } from '@robot-ui/utils'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbTabbar' })

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    fixed?: boolean
    safeAreaInsetBottom?: boolean
    border?: boolean
    height?: string | number
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    modelValue: 0,
    fixed: true,
    safeAreaInsetBottom: true,
    border: true,
    height: 100,
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  change: [value: string | number]
}>()

const active = ref(props.modelValue)

watch(
  () => props.modelValue,
  (val) => {
    active.value = val
  },
)

provide('rbTabbar', {
  active,
  setActive: (name: string | number) => {
    active.value = name
    emit('update:modelValue', name)
    emit('change', name)
  },
})

const barStyle = computed(() => {
  const style: Record<string, string | number> = {
    height: addUnit(props.height),
  }
  const extra = normalizeStyle(props.customStyle)
  if (extra && typeof extra !== 'string') {
    Object.assign(style, extra)
  }
  return style
})
</script>

<template>
  <view
    class="rb-tabbar"
    :class="[
      bem('rb-tabbar', fixed && 'fixed', border && 'border', safeAreaInsetBottom && 'safe-bottom'),
      customClass,
    ]"
    :style="barStyle"
  >
    <slot />
  </view>
</template>
