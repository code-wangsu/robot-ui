<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
</script>

<template>
<rb-button text="软键盘" type="primary" @click="show = true" />
<rb-soft-keyboard v-model:show="show" />
</template>
