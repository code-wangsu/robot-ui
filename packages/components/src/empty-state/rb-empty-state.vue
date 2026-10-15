<script setup lang="ts">
/**
 * @deprecated 请使用 RbEmpty（默认已带暂无数据插画）。
 * 本组件仅做旧 API 兼容映射。
 */
import RbEmpty from '../empty/rb-empty.vue'

defineOptions({ name: 'RbEmptyState' })

withDefaults(
  defineProps<{
    text?: string
    description?: string
    image?: string
    compact?: boolean
  }>(),
  {
    text: '暂无数据',
    description: '',
    image: undefined,
    compact: false,
  },
)
</script>

<template>
  <RbEmpty
    :text="text"
    :description="description"
    :image="image"
    :compact="compact"
  />
</template>
