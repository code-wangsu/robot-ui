<script setup lang="ts">
defineOptions({ name: 'RbCalendarHeader' })

defineProps<{
  title: string
}>()

const emit = defineEmits<{
  prev: []
  next: []
}>()
</script>

<template>
  <view class="rb-calendar-header">
    <text class="rb-calendar-header__arrow" @click="emit('prev')">‹</text>
    <text class="rb-calendar-header__title">{{ title }}</text>
    <text class="rb-calendar-header__arrow" @click="emit('next')">›</text>
  </view>
</template>
