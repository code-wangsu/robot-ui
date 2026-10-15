<script setup lang="ts">
import { computed } from 'vue'
import { bem, normalizeStyle } from '../composables/useBem'
import RbPopup from '../popup/rb-popup.vue'

defineOptions({ name: 'RbActionSheet' })

export interface ActionSheetItem {
  name: string
  subname?: string
  color?: string
  disabled?: boolean
}

const props = withDefaults(
  defineProps<{
    show?: boolean
    title?: string
    actions?: ActionSheetItem[]
    cancelText?: string
    closeOnClickOverlay?: boolean
    safeAreaInsetBottom?: boolean
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    show: false,
    title: '',
    actions: () => [],
    cancelText: '取消',
    closeOnClickOverlay: true,
    safeAreaInsetBottom: true,
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  select: [item: ActionSheetItem, index: number]
  cancel: []
  close: []
  'update:show': [value: boolean]
}>()

const innerShow = computed({
  get: () => props.show,
  set: (val: boolean) => emit('update:show', val),
})

function onSelect(item: ActionSheetItem, index: number) {
  if (item.disabled) {
    return
  }
  emit('select', item, index)
  innerShow.value = false
}

function onCancel() {
  emit('cancel')
  innerShow.value = false
}
</script>

<template>
  <rb-popup
    v-model:show="innerShow"
    mode="bottom"
    :round="16"
    :safe-area-inset-bottom="safeAreaInsetBottom"
    :close-on-click-overlay="closeOnClickOverlay"
    @close="emit('close')"
  >
    <view class="rb-action-sheet" :class="[bem('rb-action-sheet'), customClass]" :style="normalizeStyle(customStyle)">
      <view v-if="title || $slots.title" class="rb-action-sheet__title">
        <slot name="title">{{ title }}</slot>
      </view>
      <view
        v-for="(item, index) in actions"
        :key="index"
        class="rb-action-sheet__item"
        :class="bem('rb-action-sheet__item', item.disabled && 'disabled')"
        :style="item.color ? { color: item.color } : undefined"
        @click="onSelect(item, index)"
      >
        <text class="rb-action-sheet__name">{{ item.name }}</text>
        <text v-if="item.subname" class="rb-action-sheet__subname">{{ item.subname }}</text>
      </view>
      <view class="rb-action-sheet__gap" />
      <view class="rb-action-sheet__cancel" @click="onCancel">{{ cancelText }}</view>
    </view>
  </rb-popup>
</template>
