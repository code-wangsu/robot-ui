<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'RbCalendarBody' })

const props = defineProps<{
  year: number
  month: number
  selected: string
  minDate?: string
  maxDate?: string
}>()

const emit = defineEmits<{
  select: [date: string]
}>()

const weekLabels = ['日', '一', '二', '三', '四', '五', '六']

function pad(n: number) {
  return n < 10 ? `0${n}` : String(n)
}

function formatDate(y: number, m: number, d: number) {
  return `${y}-${pad(m)}-${pad(d)}`
}

function isDisabled(date: string) {
  if (props.minDate && date < props.minDate) return true
  if (props.maxDate && date > props.maxDate) return true
  return false
}

const days = computed(() => {
  const firstDay = new Date(props.year, props.month - 1, 1).getDay()
  const total = new Date(props.year, props.month, 0).getDate()
  const list: Array<{ label: string; date: string; current: boolean; disabled: boolean }> = []

  for (let i = 0; i < firstDay; i += 1) {
    list.push({ label: '', date: '', current: false, disabled: true })
  }
  for (let d = 1; d <= total; d += 1) {
    const date = formatDate(props.year, props.month, d)
    list.push({
      label: String(d),
      date,
      current: true,
      disabled: isDisabled(date),
    })
  }
  return list
})

function onSelect(item: (typeof days.value)[number]) {
  if (!item.current || item.disabled) return
  emit('select', item.date)
}
</script>

<template>
  <view class="rb-calendar-body">
    <view class="rb-calendar-body__week">
      <text v-for="label in weekLabels" :key="label" class="rb-calendar-body__week-item">
        {{ label }}
      </text>
    </view>
    <view class="rb-calendar-body__days">
      <view
        v-for="(item, index) in days"
        :key="index"
        class="rb-calendar-body__day"
        :class="{
          'rb-calendar-body__day--selected': item.date && item.date === selected,
          'rb-calendar-body__day--disabled': item.disabled,
          'rb-calendar-body__day--empty': !item.current,
        }"
        @click="onSelect(item)"
      >
        <text v-if="item.label">{{ item.label }}</text>
      </view>
    </view>
  </view>
</template>
