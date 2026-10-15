<script setup lang="ts">
import { ref } from 'vue'
const model = ref({ name: '' })
const rules = { name: [{ required: true, message: '请输入姓名' }] }
</script>

<template>
<rb-form :model="model" :rules="rules">
  <rb-form-item prop="name" label="姓名">
    <rb-input v-model="model.name" placeholder="请输入" />
  </rb-form-item>
</rb-form>
</template>
