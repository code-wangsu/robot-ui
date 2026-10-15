<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import RbCalendarHeader from '../calendar/rb-calendar-header.vue'

defineOptions({ name: 'RbDatetimePanel' })

const props = withDefaults(
  defineProps<{
    modelValue?: string
    title?: string
    /** 是否显示时间列；false 时仅日期 */
    showTime?: boolean
    cancelText?: string
    confirmText?: string
  }>(),
  {
    modelValue: '',
    title: '选择日期和时间',
    showTime: true,
    cancelText: '取消',
    confirmText: '确认选择',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  confirm: [value: string]
  cancel: []
  change: [value: string]
}>()

const WEEK_LABELS = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
const WEEKDAY_SHORT = ['日', '一', '二', '三', '四', '五', '六']

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function parseValue(input: string) {
  const now = new Date()
  const text = (input || '').trim()
  let date = now
  let hour = now.getHours()
  let minute = now.getMinutes()

  const match = text.match(/^(\d{4})-(\d{2})-(\d{2})(?:\s+(\d{1,2}):(\d{2}))?/)
  if (match) {
    date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
    if (match[4] != null) hour = Number(match[4])
    if (match[5] != null) minute = Number(match[5])
  }
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour,
    minute,
  }
}

const selected = ref(parseValue(props.modelValue))
const viewYear = ref(selected.value.year)
const viewMonth = ref(selected.value.month)

watch(
  () => props.modelValue,
  (val) => {
    selected.value = parseValue(val)
    viewYear.value = selected.value.year
    viewMonth.value = selected.value.month
  },
)

const headerTitle = computed(() => `${viewYear.value}年 ${viewMonth.value}月`)

const hours = computed(() => Array.from({ length: 24 }, (_, i) => i))
const minutes = computed(() => Array.from({ length: 60 }, (_, i) => i))

const pickerIndexes = computed(() => [
  Math.max(0, hours.value.indexOf(selected.value.hour)),
  Math.max(0, minutes.value.indexOf(selected.value.minute)),
])

type DayCell = {
  label: string
  date: string
  inMonth: boolean
  selected: boolean
}

const days = computed(() => {
  const y = viewYear.value
  const m = viewMonth.value
  const first = new Date(y, m - 1, 1)
  // 周一起：把周日(0)映射为 6，周一(1)为 0
  const startOffset = (first.getDay() + 6) % 7
  const total = new Date(y, m, 0).getDate()
  const prevTotal = new Date(y, m - 1, 0).getDate()
  const list: DayCell[] = []

  for (let i = 0; i < startOffset; i += 1) {
    const d = prevTotal - startOffset + i + 1
    const py = m === 1 ? y - 1 : y
    const pm = m === 1 ? 12 : m - 1
    const date = `${py}-${pad(pm)}-${pad(d)}`
    list.push({
      label: String(d),
      date,
      inMonth: false,
      selected: false,
    })
  }

  for (let d = 1; d <= total; d += 1) {
    const date = `${y}-${pad(m)}-${pad(d)}`
    list.push({
      label: String(d),
      date,
      inMonth: true,
      selected:
        selected.value.year === y &&
        selected.value.month === m &&
        selected.value.day === d,
    })
  }

  const rest = 42 - list.length
  for (let d = 1; d <= rest; d += 1) {
    const ny = m === 12 ? y + 1 : y
    const nm = m === 12 ? 1 : m + 1
    const date = `${ny}-${pad(nm)}-${pad(d)}`
    list.push({
      label: String(d),
      date,
      inMonth: false,
      selected: false,
    })
  }

  return list
})

const summaryText = computed(() => {
  const s = selected.value
  const date = new Date(s.year, s.month - 1, s.day, s.hour, s.minute)
  const week = WEEKDAY_SHORT[date.getDay()]
  const datePart = `${s.year}年${s.month}月${s.day}日（周${week}）`
  if (!props.showTime) return `已选：${datePart}`
  return `已选：${datePart} ${pad(s.hour)}:${pad(s.minute)}`
})

function emitChange() {
  const s = selected.value
  const value = props.showTime
    ? `${s.year}-${pad(s.month)}-${pad(s.day)} ${pad(s.hour)}:${pad(s.minute)}`
    : `${s.year}-${pad(s.month)}-${pad(s.day)}`
  emit('change', value)
  return value
}

function prevMonth() {
  if (viewMonth.value === 1) {
    viewMonth.value = 12
    viewYear.value -= 1
  } else {
    viewMonth.value -= 1
  }
}

function nextMonth() {
  if (viewMonth.value === 12) {
    viewMonth.value = 1
    viewYear.value += 1
  } else {
    viewMonth.value += 1
  }
}

function selectDay(item: DayCell) {
  const [y, m, d] = item.date.split('-').map(Number)
  selected.value.year = y!
  selected.value.month = m!
  selected.value.day = d!
  viewYear.value = y!
  viewMonth.value = m!
  emitChange()
}

function onPickerChange(event: { detail: { value: number[] } }) {
  const indexes = event.detail.value || []
  selected.value.hour = hours.value[indexes[0] ?? 0] ?? 0
  selected.value.minute = minutes.value[indexes[1] ?? 0] ?? 0
  emitChange()
}

function onCancel() {
  emit('cancel')
}

function onConfirm() {
  const value = emitChange()
  emit('update:modelValue', value)
  emit('confirm', value)
}
</script>

<template>
  <view class="rb-datetime-panel" :class="{ 'rb-datetime-panel--date-only': !showTime }">
    <view class="rb-datetime-panel__title">{{ title }}</view>

    <view class="rb-datetime-panel__body">
      <view class="rb-datetime-panel__left">
        <rb-calendar-header
          :title="headerTitle"
          @prev="prevMonth"
          @next="nextMonth"
        />
        <view class="rb-datetime-panel__week">
          <text
            v-for="label in WEEK_LABELS"
            :key="label"
            class="rb-datetime-panel__week-item"
          >
            {{ label }}
          </text>
        </view>
        <view class="rb-datetime-panel__days">
          <view
            v-for="(item, index) in days"
            :key="index"
            class="rb-datetime-panel__day"
            :class="{
              'rb-datetime-panel__day--muted': !item.inMonth,
              'rb-datetime-panel__day--selected': item.selected,
            }"
            @click="selectDay(item)"
          >
            <text>{{ item.label }}</text>
          </view>
        </view>
      </view>

      <view v-if="showTime" class="rb-datetime-panel__right">
        <text class="rb-datetime-panel__time-title">选择时间</text>
        <picker-view
          class="rb-datetime-panel__picker"
          :value="pickerIndexes"
          indicator-style="height: 72rpx;"
          @change="onPickerChange"
        >
          <picker-view-column>
            <view
              v-for="hour in hours"
              :key="`h-${hour}`"
              class="rb-datetime-panel__picker-item"
            >
              {{ pad(hour) }}
            </view>
          </picker-view-column>
          <picker-view-column>
            <view
              v-for="minute in minutes"
              :key="`m-${minute}`"
              class="rb-datetime-panel__picker-item"
            >
              {{ pad(minute) }}
            </view>
          </picker-view-column>
        </picker-view>
      </view>
    </view>

    <view class="rb-datetime-panel__summary">
      <text>{{ summaryText }}</text>
    </view>

    <view class="rb-datetime-panel__footer">
      <view class="rb-datetime-panel__btn rb-datetime-panel__btn--cancel" @click="onCancel">
        <text>{{ cancelText }}</text>
      </view>
      <view class="rb-datetime-panel__btn rb-datetime-panel__btn--confirm" @click="onConfirm">
        <text>{{ confirmText }}</text>
      </view>
    </view>
  </view>
</template>
