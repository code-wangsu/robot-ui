<script setup lang="ts">
import { ref } from 'vue'
const active = ref(['1'])
</script>

<template>
<rb-collapse v-model="active">
  <rb-collapse-item name="1" title="面板一">内容 A</rb-collapse-item>
  <rb-collapse-item name="2" title="面板二">内容 B</rb-collapse-item>
</rb-collapse>
</template>
