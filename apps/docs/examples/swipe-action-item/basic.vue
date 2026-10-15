<script setup lang="ts">
const options = [{ text: '删除', style: { background: '#f56c6c', color: '#fff' } }]
</script>

<template>
<rb-swipe-action>
  <rb-swipe-action-item :options="options">
    <view style="padding:16px;background:#fff;border:1px solid #eee">滑动项</view>
  </rb-swipe-action-item>
</rb-swipe-action>
</template>
