<script setup lang="ts">
import { ref } from 'vue'
const scrollTop = ref(120)
</script>

<template>
<view style="position:relative;height:120px">
  <rb-back-top :scroll-top="scrollTop" :top="40" />
  <view style="padding:12px;color:#909399">scrollTop &gt; top 时显示回到顶部</view>
</view>
</template>
