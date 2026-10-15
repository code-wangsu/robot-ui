<script setup lang="ts">
import { ref } from 'vue'
const checked = ref(true)
</script>

<template>
<rb-checkbox v-model="checked" label="同意协议" />
</template>
