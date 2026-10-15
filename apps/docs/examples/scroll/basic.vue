<script setup lang="ts">
const items = Array.from({ length: 8 }, (_, i) => '滚动项 ' + (i + 1))
</script>

<template>
<rb-scroll height="180" scroll-y>
  <view v-for="item in items" :key="item" style="padding:10px 0;border-bottom:1px solid #f0f0f0">{{ item }}</view>
</rb-scroll>
</template>
