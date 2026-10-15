<script setup lang="ts">
import { ref } from 'vue'
const on = ref(true)
</script>

<template>
<rb-switch v-model="on" />
</template>
