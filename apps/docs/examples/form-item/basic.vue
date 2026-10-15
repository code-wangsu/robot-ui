<script setup lang="ts">
import { ref } from 'vue'
const name = ref('')
</script>

<template>
<rb-form-item prop="name" label="姓名">
  <rb-input v-model="name" placeholder="请输入" />
</rb-form-item>
</template>
