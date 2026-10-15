<script setup lang="ts">
/**
 * @deprecated 请优先使用 RbIcon（API 对齐 Element Plus 的 el-icon 用法）
 * 保留以兼容历史 `rb-icon-font` / fanhuishouye 等调用。
 */
import RbIcon from '../icon/rb-icon.vue'

defineOptions({ name: 'RbIconFont' })

withDefaults(
  defineProps<{
    name: string
    size?: string | number
    color?: string
  }>(),
  {
    size: 32,
    color: '',
  },
)
</script>

<template>
  <rb-icon :name="name" :size="size" :color="color" />
</template>
