<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { bem, normalizeStyle } from '../composables/useBem'
import RbDatetimePanel from '../datetime-panel/rb-datetime-panel.vue'
import RbDatetimePicker from '../datetime-picker/rb-datetime-picker.vue'
import RbPopup from '../popup/rb-popup.vue'

defineOptions({ name: 'RbDatePicker' })

/** 对齐 Element Plus DatePicker / TimePicker 常用 type */
export type RbDatePickerType = 'date' | 'time' | 'datetime'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    type?: RbDatePickerType
    placeholder?: string
    title?: string
    disabled?: boolean
    clearable?: boolean
    format?: string
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    modelValue: '',
    type: 'date',
    placeholder: '',
    title: '',
    disabled: false,
    clearable: false,
    format: '',
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
  confirm: [value: string]
  clear: []
  'visible-change': [visible: boolean]
}>()

const visible = ref(false)
const draft = ref('')

const resolvedPlaceholder = computed(() => {
  if (props.placeholder) return props.placeholder
  if (props.type === 'time') return '请选择时间'
  if (props.type === 'datetime') return '请选择日期时间'
  return '请选择日期'
})

const resolvedTitle = computed(() => {
  if (props.title) return props.title
  if (props.type === 'time') return '选择时间'
  if (props.type === 'datetime') return '选择日期和时间'
  return '选择日期'
})

const displayText = computed(() => props.modelValue || '')

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function nowTime() {
  const d = new Date()
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`
}

function nowDate() {
  const d = new Date()
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

function normalizeDraft(value: string) {
  const text = (value || '').trim()
  if (props.type === 'time') {
    if (/^\d{1,2}:\d{2}$/.test(text)) return text.padStart(5, '0')
    return nowTime()
  }
  if (props.type === 'date') {
    if (/^\d{4}-\d{2}-\d{2}/.test(text)) return text.slice(0, 10)
    return nowDate()
  }
  if (/^\d{4}-\d{2}-\d{2}\s+\d{1,2}:\d{2}/.test(text)) {
    const [datePart, timePart] = text.split(/\s+/)
    return `${datePart} ${String(timePart).padStart(5, '0')}`
  }
  if (/^\d{4}-\d{2}-\d{2}/.test(text)) return `${text.slice(0, 10)} ${nowTime()}`
  return `${nowDate()} ${nowTime()}`
}

function open() {
  if (props.disabled) return
  draft.value = normalizeDraft(props.modelValue)
  visible.value = true
  emit('visible-change', true)
}

function close() {
  visible.value = false
  emit('visible-change', false)
}

function commit(value: string) {
  emit('update:modelValue', value)
  emit('change', value)
  emit('confirm', value)
  close()
}

function onClear(event: Event) {
  event.stopPropagation?.()
  emit('update:modelValue', '')
  emit('change', '')
  emit('clear')
}

watch(
  () => props.modelValue,
  (val) => {
    if (val) draft.value = normalizeDraft(val)
  },
  { immediate: true },
)
</script>

<template>
  <view
    class="rb-date-picker"
    :class="[bem('rb-date-picker', type, disabled && 'disabled'), customClass]"
    :style="normalizeStyle(customStyle)"
    @click="open"
  >
    <text :class="displayText ? 'rb-date-picker__value' : 'rb-date-picker__placeholder'">
      {{ displayText || resolvedPlaceholder }}
    </text>
    <view class="rb-date-picker__suffix">
      <text
        v-if="clearable && displayText && !disabled"
        class="rb-date-picker__clear"
        @click="onClear"
      >
        ×
      </text>
      <text class="rb-date-picker__arrow">›</text>
    </view>
  </view>

  <!-- time：独立时间弹窗 -->
  <rb-datetime-picker
    v-if="type === 'time'"
    v-model:show="visible"
    v-model="draft"
    mode="time"
    :title="resolvedTitle"
    @confirm="commit"
    @cancel="close"
  />

  <!-- date / datetime：左日历 +（可选）右时间滚轮 -->
  <rb-popup
    v-else
    v-model:show="visible"
    mode="center"
    :round="16"
    :close-on-click-overlay="true"
    :z-index="10080"
  >
    <rb-datetime-panel
      v-model="draft"
      :title="resolvedTitle"
      :show-time="type === 'datetime'"
      @confirm="commit"
      @cancel="close"
    />
  </rb-popup>
</template>
