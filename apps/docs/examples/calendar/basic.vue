<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
const date = ref('')
</script>

<template>
<rb-button text="打开日历" type="primary" @click="show = true" />
<view style="margin-top:8px">{{ date || '未选择' }}</view>
<rb-calendar v-model:show="show" @confirm="(v) => { date = String(v); show = false }" />
</template>
