<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
const value = ref('')
</script>

<template>
<rb-button text="打开键盘" type="primary" @click="show = true" />
<view style="margin-top:12px">{{ value || '待输入' }}</view>
<rb-keyboard v-model:show="show" @change="(v) => (value = value + v)" />
</template>
