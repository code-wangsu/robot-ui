<script setup lang="ts">
import { computed, provide, ref, watch } from 'vue'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbCollapse' })

export type RbCollapseName = string | number
export type RbCollapseModelValue = RbCollapseName | RbCollapseName[]

const props = withDefaults(
  defineProps<{
    /** 当前展开面板，手风琴模式为单个 name，否则为 name 数组 */
    modelValue?: RbCollapseModelValue
    /** 是否手风琴（同时仅展开一项） */
    accordion?: boolean
    /** 是否显示外边框 */
    border?: boolean
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    modelValue: () => [],
    accordion: false,
    border: true,
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: RbCollapseModelValue]
  change: [value: RbCollapseModelValue]
}>()

function toNames(val: RbCollapseModelValue | undefined): RbCollapseName[] {
  if (val == null || val === '') {
    return []
  }
  if (Array.isArray(val)) {
    return props.accordion ? val.slice(0, 1) : [...val]
  }
  return [val]
}

function toModelValue(names: RbCollapseName[]): RbCollapseModelValue {
  if (props.accordion) {
    return names[0] ?? ''
  }
  return names
}

const activeNames = ref<RbCollapseName[]>(toNames(props.modelValue))

watch(
  () => [props.modelValue, props.accordion] as const,
  () => {
    activeNames.value = toNames(props.modelValue)
  },
)

function toggle(name: RbCollapseName) {
  let next: RbCollapseName[]
  if (props.accordion) {
    next = activeNames.value.includes(name) ? [] : [name]
  } else {
    const set = new Set(activeNames.value)
    if (set.has(name)) {
      set.delete(name)
    } else {
      set.add(name)
    }
    next = [...set]
  }
  activeNames.value = next
  const value = toModelValue(next)
  emit('update:modelValue', value)
  emit('change', value)
}

provide('rbCollapse', {
  activeNames,
  border: computed(() => props.border),
  accordion: computed(() => props.accordion),
  toggle,
})
</script>

<template>
  <view
    class="rb-collapse"
    :class="[bem('rb-collapse', border && 'border'), customClass]"
    :style="normalizeStyle(customStyle)"
  >
    <slot />
  </view>
</template>
