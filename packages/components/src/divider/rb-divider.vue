<script setup lang="ts">
import { computed } from 'vue'
import { addUnit } from '@robot-ui/utils'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbDivider' })

const props = withDefaults(
  defineProps<{
    text?: string
    dashed?: boolean
    hairline?: boolean
    contentPosition?: 'left' | 'center' | 'right'
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    text: '',
    dashed: false,
    hairline: true,
    contentPosition: 'center',
    customStyle: '',
    customClass: '',
  },
)

const rootClass = computed(() =>
  bem(
    'rb-divider',
    props.dashed && 'dashed',
    props.hairline && 'hairline',
    props.text && `content-${props.contentPosition}`,
  ),
)
</script>

<template>
  <view
    class="rb-divider"
    :class="[rootClass, customClass]"
    :style="normalizeStyle(customStyle)"
  >
    <text v-if="text || $slots.default" class="rb-divider__text">
      <slot>{{ text }}</slot>
    </text>
  </view>
</template>
