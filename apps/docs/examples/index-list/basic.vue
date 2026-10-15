<script setup lang="ts">
const letters = ['A', 'B', 'C']
</script>

<template>
<view style="height:240px;overflow:auto;border:1px solid #eee">
  <rb-index-list :index-list="letters">
    <view v-for="letter in letters" :key="letter">
      <rb-index-anchor :index="letter" />
      <view style="padding:8px 12px">{{ letter }} 分组内容</view>
    </view>
  </rb-index-list>
</view>
</template>
