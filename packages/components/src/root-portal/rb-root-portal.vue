<script setup>
/**
 * 跨端根节点传送：
 * - H5 → teleport to body
 * - 微信 / 支付宝 → 原生 root-portal
 * - App / 其他 → 原位（App 建议业务侧挂页面根；避免 renderjs 与 script setup 语言冲突）
 */
defineOptions({
  name: 'RbRootPortal',
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})
</script>

<template>
  <!-- #ifdef H5 -->
  <teleport to="body">
    <slot />
  </teleport>
  <!-- #endif -->

  <!-- #ifdef MP-WEIXIN || MP-ALIPAY -->
  <root-portal>
    <slot />
  </root-portal>
  <!-- #endif -->

  <!-- #ifndef H5 || MP-WEIXIN || MP-ALIPAY -->
  <slot />
  <!-- #endif -->
</template>
