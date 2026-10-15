<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
</script>

<template>
<rb-soft-keyboard-input v-model="value" placeholder="软键盘输入" />
</template>
