<script setup lang="ts">
import { computed } from 'vue'
import { addUnit } from '@robot-ui/utils'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbListItem' })

const props = withDefaults(
  defineProps<{
    title?: string
    note?: string
    arrow?: boolean
    disabled?: boolean
    padding?: string | number
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    title: '',
    note: '',
    arrow: false,
    disabled: false,
    padding: 24,
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  click: [event: Event]
}>()

const itemStyle = computed(() => {
  const style: Record<string, string | number> = {
    padding: addUnit(props.padding),
  }
  const extra = normalizeStyle(props.customStyle)
  if (extra && typeof extra !== 'string') {
    Object.assign(style, extra)
  }
  return style
})

function onClick(event: Event) {
  if (props.disabled) {
    return
  }
  emit('click', event)
}
</script>

<template>
  <view
    class="rb-list-item"
    :class="[bem('rb-list-item', disabled && 'disabled'), customClass]"
    :style="itemStyle"
    @click="onClick"
  >
    <view class="rb-list-item__main">
      <text v-if="title || $slots.title" class="rb-list-item__title">
        <slot name="title">{{ title }}</slot>
      </text>
      <text v-if="note || $slots.note" class="rb-list-item__note">
        <slot name="note">{{ note }}</slot>
      </text>
    </view>
    <view v-if="$slots.extra" class="rb-list-item__extra">
      <slot name="extra" />
    </view>
    <text v-if="arrow" class="rb-list-item__arrow">›</text>
  </view>
</template>
