<script setup lang="ts">
const list = Array.from({ length: 50 }, (_, i) => ({ id: i, text: '行 ' + (i + 1) }))
</script>

<template>
<rb-virtual-list :list="list" :item-height="44" height="200">
  <template #default="{ item }">
    <view style="padding:10px 12px;border-bottom:1px solid #f0f0f0">{{ item.text }}</view>
  </template>
</rb-virtual-list>
</template>
