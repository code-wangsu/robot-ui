<script setup lang="ts">
import { ref } from 'vue'
const list = ref(['a'])
</script>

<template>
<rb-checkbox-group v-model="list">
  <rb-checkbox name="a" label="选项 A" />
  <rb-checkbox name="b" label="选项 B" />
</rb-checkbox-group>
</template>
