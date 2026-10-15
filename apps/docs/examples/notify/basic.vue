<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
</script>

<template>
<rb-button text="打开通知" type="primary" @click="show = true" />
<rb-notify v-model:show="show" type="primary" message="这是一条通知" />
</template>
