<script setup lang="ts">
/**
 * @deprecated 请使用 RbTag（Element Plus 风格）。
 * 本组件仅做旧 API 兼容映射。
 */
import { computed } from 'vue'
import RbTag from '../tag/rb-tag.vue'
import type { RbTagEffect, RbTagSize, RbTagType } from '../tag/rb-tag.vue'

defineOptions({ name: 'RbAppTag' })

const props = withDefaults(
  defineProps<{
    text?: string
    type?: string
    variant?: 'soft' | 'solid'
    size?: 'sm' | 'md'
  }>(),
  {
    text: '',
    type: 'default',
    variant: 'soft',
    size: 'sm',
  },
)

const emit = defineEmits<{
  click: [event?: Event]
}>()

const mappedType = computed<RbTagType>(() => {
  const map: Record<string, RbTagType> = {
    blue: 'primary',
    primary: 'primary',
    green: 'success',
    success: 'success',
    orange: 'warning',
    warning: 'warning',
    red: 'danger',
    error: 'danger',
    danger: 'danger',
    gray: 'info',
    grey: 'info',
    info: 'info',
    default: 'info',
  }
  return map[props.type] || 'primary'
})

const mappedEffect = computed<RbTagEffect>(() =>
  props.variant === 'solid' ? 'dark' : 'light',
)

const mappedSize = computed<RbTagSize>(() =>
  props.size === 'md' ? 'default' : 'small',
)
</script>

<template>
  <rb-tag
    :text="text"
    :type="mappedType"
    :effect="mappedEffect"
    :size="mappedSize"
    @click="emit('click', $event)"
  >
    <slot>{{ text }}</slot>
  </rb-tag>
</template>
