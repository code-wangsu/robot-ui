<script setup lang="ts">
import { computed } from 'vue'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbCellGroup' })

const props = withDefaults(
  defineProps<{
    title?: string
    border?: boolean
    inset?: boolean
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    title: '',
    border: true,
    inset: false,
    customStyle: '',
    customClass: '',
  },
)

const rootClass = computed(() =>
  bem('rb-cell-group', props.border && 'border', props.inset && 'inset'),
)
</script>

<template>
  <view
    class="rb-cell-group"
    :class="[rootClass, customClass]"
    :style="normalizeStyle(customStyle)"
  >
    <view v-if="title || $slots.title" class="rb-cell-group__title">
      <slot name="title">{{ title }}</slot>
    </view>
    <view class="rb-cell-group__body">
      <slot />
    </view>
  </view>
</template>
