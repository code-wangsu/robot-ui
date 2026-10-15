<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
const actions = [{ name: '拍照' }, { name: '从相册选择' }]
</script>

<template>
<rb-button text="打开动作面板" type="primary" @click="show = true" />
<rb-action-sheet v-model:show="show" :actions="actions" />
</template>
