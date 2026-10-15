<script setup lang="ts">
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbIndexAnchor' })

const props = withDefaults(
  defineProps<{
    index?: string
    text?: string
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    index: '',
    text: '',
    customStyle: '',
    customClass: '',
  },
)
</script>

<template>
  <view
    :id="`rb-index-${index}`"
    class="rb-index-anchor"
    :class="[bem('rb-index-anchor'), customClass]"
    :style="normalizeStyle(customStyle)"
  >
    <text class="rb-index-anchor__text">
      <slot>{{ text || index }}</slot>
    </text>
  </view>
</template>
