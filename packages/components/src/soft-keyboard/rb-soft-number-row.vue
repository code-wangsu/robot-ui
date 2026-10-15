<script setup lang="ts">
import RbSoftKeyButton from './rb-soft-key-button.vue'

defineOptions({ name: 'RbSoftNumberRow' })

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
      <rb-soft-key-button :value="el" @click="$emit('key-click', $event)" />
    </view>
  </view>
</template>
