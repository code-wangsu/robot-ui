<script setup lang="ts">
import { computed } from 'vue'
import type { RbType } from '../types'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbAlert' })

const props = withDefaults(
  defineProps<{
    title?: string
    description?: string
    type?: RbType
    showIcon?: boolean
    closable?: boolean
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    title: '',
    description: '',
    type: 'info',
    showIcon: true,
    closable: false,
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  close: []
}>()

const visible = defineModel<boolean>('show', { default: true })

const rootClass = computed(() => bem('rb-alert', props.type))

function onClose() {
  visible.value = false
  emit('close')
}
</script>

<template>
  <view
    v-if="visible"
    class="rb-alert"
    :class="[rootClass, customClass]"
    :style="normalizeStyle(customStyle)"
  >
    <text v-if="showIcon" class="rb-alert__icon">!</text>
    <view class="rb-alert__body">
      <text v-if="title || $slots.title" class="rb-alert__title">
        <slot name="title">{{ title }}</slot>
      </text>
      <text v-if="description || $slots.default" class="rb-alert__desc">
        <slot>{{ description }}</slot>
      </text>
    </view>
    <text v-if="closable" class="rb-alert__close" @click="onClose">×</text>
  </view>
</template>
