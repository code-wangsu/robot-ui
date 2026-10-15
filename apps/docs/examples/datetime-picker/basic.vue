<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
</script>

<template>
<rb-button text="选择时间" type="primary" @click="show = true" />
<rb-datetime-picker v-model:show="show" mode="datetime" />
</template>
