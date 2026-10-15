<script setup lang="ts">
/**
 * VitePress 预览用：始终 teleport 到 body，避免 uni 条件编译注释导致多重渲染。
 */
defineOptions({ name: 'RbRootPortal' })
</script>

<template>
  <teleport to="body">
    <slot />
  </teleport>
</template>
