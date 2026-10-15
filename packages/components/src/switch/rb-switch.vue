<script setup lang="ts">
import { computed } from 'vue'
import { addUnit } from '@robot-ui/utils'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbSwitch' })

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    disabled?: boolean
    activeColor?: string
    inactiveColor?: string
    size?: string | number
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    modelValue: false,
    disabled: false,
    activeColor: '',
    inactiveColor: '',
    size: 52,
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  change: [value: boolean]
}>()

const rootClass = computed(() =>
  bem('rb-switch', props.modelValue && 'on', props.disabled && 'disabled'),
)

const trackStyle = computed(() => {
  const style: Record<string, string> = {
    width: addUnit(Number(props.size) * 1.8),
    height: addUnit(props.size),
  }
  if (props.modelValue && props.activeColor) {
    style.backgroundColor = props.activeColor
  }
  if (!props.modelValue && props.inactiveColor) {
    style.backgroundColor = props.inactiveColor
  }
  return style
})

const thumbStyle = computed(() => ({
  width: addUnit(Number(props.size) - 8),
  height: addUnit(Number(props.size) - 8),
}))

function toggle() {
  if (props.disabled) return
  const next = !props.modelValue
  emit('update:modelValue', next)
  emit('change', next)
}
</script>

<template>
  <view
    class="rb-switch"
    :class="[rootClass, customClass]"
    :style="normalizeStyle(customStyle)"
    @click="toggle"
  >
    <view class="rb-switch__track" :style="trackStyle">
      <view class="rb-switch__thumb" :style="thumbStyle" />
    </view>
  </view>
</template>
