<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { bem, normalizeStyle } from '../composables/useBem'
import RbCalendarHeader from './rb-calendar-header.vue'
import RbCalendarBody from './rb-calendar-body.vue'

defineOptions({ name: 'RbCalendar' })

const props = withDefaults(
  defineProps<{
    modelValue?: string
    minDate?: string
    maxDate?: string
    showConfirm?: boolean
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    modelValue: '',
    minDate: '',
    maxDate: '',
    showConfirm: true,
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
  confirm: [value: string]
}>()

const today = new Date()
const viewYear = ref(today.getFullYear())
const viewMonth = ref(today.getMonth() + 1)
const selected = ref(props.modelValue)

watch(
  () => props.modelValue,
  (val) => {
    selected.value = val
    if (/^\d{4}-\d{2}-\d{2}/.test(val)) {
      const [y, m] = val.split('-').map(Number)
      if (y) viewYear.value = y
      if (m) viewMonth.value = m
    }
  },
)

const headerTitle = computed(() => `${viewYear.value}年${viewMonth.value}月`)

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

function selectDate(date: string) {
  selected.value = date
  emit('update:modelValue', date)
  emit('change', date)
}

function confirm() {
  emit('confirm', selected.value)
}
</script>

<template>
  <view
    class="rb-calendar"
    :class="[bem('rb-calendar'), customClass]"
    :style="normalizeStyle(customStyle)"
  >
    <rb-calendar-header
      :title="headerTitle"
      @prev="prevMonth"
      @next="nextMonth"
    />
    <rb-calendar-body
      :year="viewYear"
      :month="viewMonth"
      :selected="selected"
      :min-date="minDate"
      :max-date="maxDate"
      @select="selectDate"
    />
    <view v-if="showConfirm" class="rb-calendar__footer">
      <view class="rb-calendar__confirm" @click="confirm">确定</view>
    </view>
  </view>
</template>
