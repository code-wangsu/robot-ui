<script setup lang="ts">
import { computed } from 'vue'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbCell' })

const props = withDefaults(
  defineProps<{
    title?: string
    label?: string
    value?: string
    isLink?: boolean
    clickable?: boolean
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    title: '',
    label: '',
    value: '',
    isLink: false,
    clickable: false,
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  click: [event: Event]
}>()

const rootClass = computed(() =>
  bem('rb-cell', (props.clickable || props.isLink) && 'clickable'),
)

function onClick(event: Event) {
  emit('click', event)
}
</script>

<template>
  <view
    class="rb-cell"
    :class="[rootClass, customClass]"
    :style="normalizeStyle(customStyle)"
    @click="onClick"
  >
    <view class="rb-cell__body">
      <view class="rb-cell__title">
        <slot name="title">{{ title }}</slot>
      </view>
      <view v-if="label || $slots.label" class="rb-cell__label">
        <slot name="label">{{ label }}</slot>
      </view>
    </view>
    <view v-if="value || $slots.value" class="rb-cell__value">
      <slot name="value">{{ value }}</slot>
    </view>
    <view v-if="isLink" class="rb-cell__right">›</view>
  </view>
</template>
