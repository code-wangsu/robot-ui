<script setup lang="ts">
import { computed, ref } from 'vue'
import { bem, normalizeStyle } from '../composables/useBem'
import RbPopup from '../popup/rb-popup.vue'

defineOptions({ name: 'RbPicker' })

export interface PickerColumn {
  label: string
  value: string | number
}

const props = withDefaults(
  defineProps<{
    show?: boolean
    columns?: PickerColumn[][]
    title?: string
    round?: string | number
    duration?: number
    closeOnClickOverlay?: boolean
    safeAreaInsetBottom?: boolean
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    show: false,
    columns: () => [],
    title: '请选择',
    round: 16,
    duration: 300,
    closeOnClickOverlay: true,
    safeAreaInsetBottom: true,
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  'update:show': [value: boolean]
  confirm: [values: Array<string | number>]
  cancel: []
  change: [values: Array<string | number>]
  close: []
}>()

const selectedIndexes = ref<number[]>([])

const innerShow = computed({
  get: () => props.show,
  set: (val: boolean) => emit('update:show', val),
})

const innerIndexes = computed(() => {
  if (selectedIndexes.value.length === props.columns.length) {
    return selectedIndexes.value
  }
  return props.columns.map(() => 0)
})

function close() {
  innerShow.value = false
}

function onCancel() {
  emit('cancel')
  close()
}

function onConfirm() {
  const values = props.columns.map((col, i) => col[innerIndexes.value[i] ?? 0]?.value)
  emit('confirm', values)
  close()
}

function onOverlayClose() {
  emit('cancel')
  emit('close')
}

function onChange(columnIndex: number, itemIndex: number) {
  const next = [...innerIndexes.value]
  next[columnIndex] = itemIndex
  selectedIndexes.value = next
  const values = props.columns.map((col, i) => col[next[i] ?? 0]?.value)
  emit('change', values)
}

function onPickerChange(event: { detail: { value: number[] } }) {
  event.detail.value.forEach((idx, col) => onChange(col, idx))
}
</script>

<template>
  <rb-popup
    v-model:show="innerShow"
    mode="bottom"
    :round="round"
    :duration="duration"
    :close-on-click-overlay="closeOnClickOverlay"
    :safe-area-inset-bottom="safeAreaInsetBottom"
    bg-color="#fff"
    @close="onOverlayClose"
  >
    <view
      class="rb-picker"
      :class="[bem('rb-picker'), customClass]"
      :style="normalizeStyle(customStyle)"
    >
      <view class="rb-picker__toolbar">
        <text class="rb-picker__cancel" @click="onCancel">取消</text>
        <text class="rb-picker__title">{{ title }}</text>
        <text class="rb-picker__confirm" @click="onConfirm">确定</text>
      </view>
      <picker-view
        class="rb-picker__view"
        :value="innerIndexes"
        @change="onPickerChange"
      >
        <picker-view-column v-for="(column, colIndex) in columns" :key="colIndex">
          <view
            v-for="(item, itemIndex) in column"
            :key="itemIndex"
            class="rb-picker__item"
          >
            {{ item.label }}
          </view>
        </picker-view-column>
      </picker-view>
    </view>
  </rb-popup>
</template>
