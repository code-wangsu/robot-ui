<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
</script>

<template>
<rb-button text="显示遮罩" type="primary" @click="show = true" />
<rb-overlay :show="show" @click="show = false" />
</template>
