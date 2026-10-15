<script setup lang="ts">
import { ref } from 'vue'
const show = ref(true)
</script>

<template>
<rb-button :text="show ? '隐藏' : '显示'" @click="show = !show" />
<rb-transition :show="show" mode="fade">
  <view style="margin-top:12px;padding:16px;background:#ecf5ff;border-radius:8px">过渡内容</view>
</rb-transition>
</template>
