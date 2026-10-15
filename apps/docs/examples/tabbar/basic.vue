<script setup lang="ts">
import { ref } from 'vue'
const current = ref(0)
</script>

<template>
<rb-tabbar v-model="current" :fixed="false" :safe-area-inset-bottom="false">
  <rb-tabbar-item text="首页" />
  <rb-tabbar-item text="消息" />
  <rb-tabbar-item text="我的" />
</rb-tabbar>
</template>
