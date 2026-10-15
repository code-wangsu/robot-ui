<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
</script>

<template>
<rb-button text="打开模态框" type="primary" @click="show = true" />
<rb-modal v-model:show="show" title="提示" content="确认执行该操作？" />
</template>
