<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
</script>

<template>
<rb-date-picker v-model="value" type="datetime" placeholder="请选择日期时间" />
</template>
