<script setup lang="ts">
import KeyButton from './key-button.vue'

defineOptions({ name: 'RbSoftKeyboardNumberRow' })

defineProps<{
  chars: string | string[]
}>()

defineEmits<{
  'key-click': [event: Event]
}>()
</script>

<template>
  <view class="keyboard__row">
    <view v-for="el in chars" :key="el" class="keyboard__cell">
      <KeyButton :value="el" @click="$emit('key-click', $event)" />
    </view>
  </view>
</template>

<style lang="scss">
@use './keyboard.scss' as *;
</style>
