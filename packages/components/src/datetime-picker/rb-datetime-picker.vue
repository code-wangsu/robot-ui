<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { bem, normalizeStyle } from '../composables/useBem'
import RbPopup from '../popup/rb-popup.vue'

defineOptions({ name: 'RbDatetimePicker' })

const props = withDefaults(
  defineProps<{
    show?: boolean
    modelValue?: string
    mode?: 'date' | 'time' | 'datetime'
    title?: string
    minDate?: string
    maxDate?: string
    cancelText?: string
    confirmText?: string
    duration?: number
    closeOnClickOverlay?: boolean
    safeAreaInsetBottom?: boolean
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    show: false,
    modelValue: '',
    mode: 'datetime',
    title: '选择时间',
    minDate: '1970-01-01',
    maxDate: '2099-12-31',
    cancelText: '取消',
    confirmText: '确认选择',
    duration: 300,
    closeOnClickOverlay: true,
    safeAreaInsetBottom: true,
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  'update:show': [value: boolean]
  'update:modelValue': [value: string]
  confirm: [value: string]
  cancel: []
  change: [value: string]
  close: []
}>()

const innerShow = computed({
  get: () => props.show,
  set: (val: boolean) => emit('update:show', val),
})

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function parseDate(input: string): Date {
  if (!input) return new Date()
  if (/^\d{1,2}:\d{2}$/.test(input)) {
    const now = new Date()
    const [h, m] = input.split(':').map(Number)
    now.setHours(h, m, 0, 0)
    return now
  }
  const normalized = input.replace(/-/g, '/').replace('T', ' ')
  const d = new Date(normalized)
  return Number.isNaN(d.getTime()) ? new Date() : d
}

function daysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate()
}

function formatValue(date: Date, mode: typeof props.mode) {
  const y = date.getFullYear()
  const mo = pad(date.getMonth() + 1)
  const d = pad(date.getDate())
  const h = pad(date.getHours())
  const mi = pad(date.getMinutes())
  if (mode === 'date') return `${y}-${mo}-${d}`
  if (mode === 'time') return `${h}:${mi}`
  return `${y}-${mo}-${d} ${h}:${mi}`
}

const isTimeMode = computed(() => props.mode === 'time')

const min = computed(() => parseDate(props.minDate))
const max = computed(() =>
  parseDate(props.maxDate.includes(':') ? props.maxDate : `${props.maxDate} 23:59`),
)

const years = computed(() => {
  const list: number[] = []
  for (let y = min.value.getFullYear(); y <= max.value.getFullYear(); y++) list.push(y)
  return list
})

const selected = ref({
  year: new Date().getFullYear(),
  month: 1,
  day: 1,
  hour: 0,
  minute: 0,
})

function syncFromModel(value: string) {
  const date = parseDate(value || formatValue(new Date(), props.mode))
  let clamped = date
  if (clamped < min.value) clamped = new Date(min.value)
  if (clamped > max.value) clamped = new Date(max.value)
  selected.value = {
    year: clamped.getFullYear(),
    month: clamped.getMonth() + 1,
    day: clamped.getDate(),
    hour: clamped.getHours(),
    minute: clamped.getMinutes(),
  }
}

watch(
  () => [props.modelValue, props.show, props.mode] as const,
  () => {
    if (props.show || props.modelValue) syncFromModel(props.modelValue)
  },
  { immediate: true },
)

const months = computed(() => {
  const list: number[] = []
  const y = selected.value.year
  let start = 1
  let end = 12
  if (y === min.value.getFullYear()) start = min.value.getMonth() + 1
  if (y === max.value.getFullYear()) end = max.value.getMonth() + 1
  for (let m = start; m <= end; m++) list.push(m)
  return list
})

const days = computed(() => {
  const { year, month } = selected.value
  const list: number[] = []
  let start = 1
  let end = daysInMonth(year, month)
  if (year === min.value.getFullYear() && month === min.value.getMonth() + 1) {
    start = min.value.getDate()
  }
  if (year === max.value.getFullYear() && month === max.value.getMonth() + 1) {
    end = max.value.getDate()
  }
  for (let d = start; d <= end; d++) list.push(d)
  return list
})

const hours = computed(() => Array.from({ length: 24 }, (_, i) => i))
const minutes = computed(() => Array.from({ length: 60 }, (_, i) => i))

const summaryText = computed(() => {
  if (props.mode === 'time') {
    return `${pad(selected.value.hour)}:${pad(selected.value.minute)}`
  }
  return currentFormatted()
})

const columns = computed(() => {
  if (props.mode === 'time') {
    return [
      hours.value.map((h) => ({ label: pad(h), value: h })),
      minutes.value.map((m) => ({ label: pad(m), value: m })),
    ]
  }
  if (props.mode === 'date') {
    return [
      years.value.map((y) => ({ label: `${y}年`, value: y })),
      months.value.map((m) => ({ label: `${pad(m)}月`, value: m })),
      days.value.map((d) => ({ label: `${pad(d)}日`, value: d })),
    ]
  }
  return [
    years.value.map((y) => ({ label: `${y}年`, value: y })),
    months.value.map((m) => ({ label: `${pad(m)}月`, value: m })),
    days.value.map((d) => ({ label: `${pad(d)}日`, value: d })),
    hours.value.map((h) => ({ label: `${pad(h)}时`, value: h })),
    minutes.value.map((m) => ({ label: `${pad(m)}分`, value: m })),
  ]
})

const pickerIndexes = computed(() => {
  const s = selected.value
  if (props.mode === 'time') {
    return [
      Math.max(0, hours.value.indexOf(s.hour)),
      Math.max(0, minutes.value.indexOf(s.minute)),
    ]
  }
  if (props.mode === 'date') {
    return [
      Math.max(0, years.value.indexOf(s.year)),
      Math.max(0, months.value.indexOf(s.month)),
      Math.max(0, days.value.indexOf(s.day)),
    ]
  }
  return [
    Math.max(0, years.value.indexOf(s.year)),
    Math.max(0, months.value.indexOf(s.month)),
    Math.max(0, days.value.indexOf(s.day)),
    Math.max(0, hours.value.indexOf(s.hour)),
    Math.max(0, minutes.value.indexOf(s.minute)),
  ]
})

function currentFormatted() {
  const s = selected.value
  const date = new Date(s.year, s.month - 1, s.day, s.hour, s.minute)
  return formatValue(date, props.mode)
}

function clampDay() {
  const maxDay = daysInMonth(selected.value.year, selected.value.month)
  if (selected.value.day > maxDay) selected.value.day = maxDay
  if (!days.value.includes(selected.value.day) && days.value.length) {
    selected.value.day = days.value[0]!
  }
  if (!months.value.includes(selected.value.month) && months.value.length) {
    selected.value.month = months.value[0]!
  }
}

function emitChange() {
  emit('change', currentFormatted())
}

function selectHour(hour: number) {
  selected.value.hour = hour
  emitChange()
}

function selectMinute(minute: number) {
  selected.value.minute = minute
  emitChange()
}

function onPickerChange(event: { detail: { value: number[] } }) {
  const indexes = event.detail.value
  if (props.mode === 'time') {
    selected.value.hour = hours.value[indexes[0] ?? 0] ?? 0
    selected.value.minute = minutes.value[indexes[1] ?? 0] ?? 0
  } else if (props.mode === 'date') {
    selected.value.year = years.value[indexes[0] ?? 0] ?? selected.value.year
    selected.value.month = months.value[indexes[1] ?? 0] ?? selected.value.month
    clampDay()
    selected.value.day = days.value[indexes[2] ?? 0] ?? selected.value.day
  } else {
    selected.value.year = years.value[indexes[0] ?? 0] ?? selected.value.year
    selected.value.month = months.value[indexes[1] ?? 0] ?? selected.value.month
    clampDay()
    selected.value.day = days.value[indexes[2] ?? 0] ?? selected.value.day
    selected.value.hour = hours.value[indexes[3] ?? 0] ?? 0
    selected.value.minute = minutes.value[indexes[4] ?? 0] ?? 0
  }
  emitChange()
}

function close() {
  innerShow.value = false
}

function onCancel() {
  emit('cancel')
  close()
}

function onConfirm() {
  const value = currentFormatted()
  emit('update:modelValue', value)
  emit('confirm', value)
  close()
}

function onOverlayClose() {
  emit('cancel')
  emit('close')
}
</script>

<template>
  <rb-popup
    v-model:show="innerShow"
    :mode="isTimeMode ? 'center' : 'bottom'"
    :round="16"
    :duration="duration"
    :close-on-click-overlay="closeOnClickOverlay"
    :safe-area-inset-bottom="!isTimeMode && safeAreaInsetBottom"
    :overlay-opacity="0.45"
    :bg-color="isTimeMode ? 'transparent' : '#fff'"
    @close="onOverlayClose"
  >
    <view
      class="rb-datetime-picker"
      :class="[bem('rb-datetime-picker', isTimeMode && 'dialog'), customClass]"
    >
      <!-- 时间模式：居中弹窗（对齐示意图） -->
      <view
        v-if="isTimeMode"
        class="rb-datetime-picker__dialog"
        :style="normalizeStyle(customStyle)"
        @click.stop
      >
        <view class="rb-datetime-picker__header">
          <text class="rb-datetime-picker__title">{{ title }}</text>
          <view class="rb-datetime-picker__close" @click="onCancel">
            <text class="rb-datetime-picker__close-text">×</text>
          </view>
        </view>

        <view class="rb-datetime-picker__summary">
          <text class="rb-datetime-picker__summary-text">{{ summaryText }}</text>
        </view>

        <view class="rb-datetime-picker__columns">
          <view class="rb-datetime-picker__column">
            <text class="rb-datetime-picker__column-label">小时</text>
            <scroll-view scroll-y class="rb-datetime-picker__list" :show-scrollbar="true">
              <view
                v-for="hour in hours"
                :key="hour"
                class="rb-datetime-picker__chip"
                :class="{ 'rb-datetime-picker__chip--active': selected.hour === hour }"
                @click="selectHour(hour)"
              >
                <text
                  class="rb-datetime-picker__chip-text"
                  :class="{ 'rb-datetime-picker__chip-text--active': selected.hour === hour }"
                >
                  {{ pad(hour) }}
                </text>
              </view>
            </scroll-view>
          </view>

          <view class="rb-datetime-picker__column">
            <text class="rb-datetime-picker__column-label">分钟</text>
            <scroll-view scroll-y class="rb-datetime-picker__list" :show-scrollbar="true">
              <view
                v-for="minute in minutes"
                :key="minute"
                class="rb-datetime-picker__chip"
                :class="{ 'rb-datetime-picker__chip--active': selected.minute === minute }"
                @click="selectMinute(minute)"
              >
                <text
                  class="rb-datetime-picker__chip-text"
                  :class="{ 'rb-datetime-picker__chip-text--active': selected.minute === minute }"
                >
                  {{ pad(minute) }}
                </text>
              </view>
            </scroll-view>
          </view>
        </view>

        <view class="rb-datetime-picker__footer">
          <view class="rb-datetime-picker__btn rb-datetime-picker__btn--cancel" @click="onCancel">
            <text>{{ cancelText }}</text>
          </view>
          <view class="rb-datetime-picker__btn rb-datetime-picker__btn--confirm" @click="onConfirm">
            <text>{{ confirmText }}</text>
          </view>
        </view>
      </view>

      <!-- 日期 / 日期时间：底部滚轮 -->
      <view v-else class="rb-datetime-picker__panel" :style="normalizeStyle(customStyle)">
        <view class="rb-datetime-picker__toolbar">
          <text class="rb-datetime-picker__cancel" @click="onCancel">{{ cancelText }}</text>
          <text class="rb-datetime-picker__title">{{ title }}</text>
          <text class="rb-datetime-picker__confirm" @click="onConfirm">确定</text>
        </view>
        <picker-view
          class="rb-datetime-picker__view"
          :value="pickerIndexes"
          @change="onPickerChange"
        >
          <picker-view-column v-for="(column, colIndex) in columns" :key="colIndex">
            <view
              v-for="(item, itemIndex) in column"
              :key="itemIndex"
              class="rb-datetime-picker__item"
            >
              {{ item.label }}
            </view>
          </picker-view-column>
        </picker-view>
      </view>
    </view>
  </rb-popup>
</template>
