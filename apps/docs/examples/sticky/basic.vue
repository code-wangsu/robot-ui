<script setup lang="ts">
import { ref } from 'vue'
const scrollTop = ref(0)
</script>

<template>
<view style="height:160px;overflow:auto" @scroll="(e) => (scrollTop = e.target.scrollTop)">
  <view style="height:40px" />
  <rb-sticky :scroll-top="scrollTop">
    <view style="padding:10px;background:#3c9cff;color:#fff">吸顶内容</view>
  </rb-sticky>
  <view style="height:240px;padding:12px">向下滚动查看吸顶</view>
</view>
</template>
