<script setup lang="ts">
import { computed, ref } from 'vue'
import { addUnit } from '@robot-ui/utils'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbSearch' })

const props = withDefaults(
  defineProps<{
    modelValue?: string
    placeholder?: string
    disabled?: boolean
    showAction?: boolean
    actionText?: string
    shape?: 'square' | 'round'
    bgColor?: string
    height?: string | number
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    modelValue: '',
    placeholder: '请输入搜索关键词',
    disabled: false,
    showAction: false,
    actionText: '搜索',
    shape: 'round',
    bgColor: '',
    height: 64,
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  search: [value: string]
  clear: []
  custom: []
}>()

const focused = ref(false)

const rootClass = computed(() =>
  bem('rb-search', props.shape, focused.value && 'focus', props.disabled && 'disabled'),
)

const barStyle = computed(() => ({
  height: addUnit(props.height),
  backgroundColor: props.bgColor || undefined,
}))

function onInput(event: Event) {
  const value = (event as unknown as { detail: { value: string } }).detail.value
  emit('update:modelValue', value)
}

function onSearch() {
  emit('search', props.modelValue)
}

function onClear() {
  emit('update:modelValue', '')
  emit('clear')
}
</script>

<template>
  <view
    class="rb-search"
    :class="[rootClass, customClass]"
    :style="normalizeStyle(customStyle)"
  >
    <view class="rb-search__content" :style="barStyle">
      <text class="rb-search__icon">⌕</text>
      <input
        class="rb-search__input"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        confirm-type="search"
        @input="onInput"
        @focus="focused = true"
        @blur="focused = false"
        @confirm="onSearch"
      />
      <text v-if="modelValue" class="rb-search__clear" @click="onClear">×</text>
    </view>
    <text
      v-if="showAction"
      class="rb-search__action"
      @click="emit('custom'); onSearch()"
    >
      {{ actionText }}
    </text>
  </view>
</template>
