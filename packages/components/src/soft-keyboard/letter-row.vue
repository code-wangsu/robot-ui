<script setup lang="ts">
import { computed } from 'vue'
import KeyButton from './key-button.vue'

defineOptions({ name: 'RbSoftKeyboardLetterRow' })

const props = withDefaults(
  defineProps<{
    chars: string
    indent?: boolean
  }>(),
  {
    indent: false,
  },
)

defineEmits<{
  'key-click': [event: Event]
}>()

const charList = computed(() => props.chars.split(''))
</script>

<template>
  <view class="keyboard__row">
    <view
      v-for="(el, index) in charList"
      :key="`${el}-${index}`"
      class="keyboard__cell"
    >
      <view
        :style="{
          'padding-left': indent && !index ? '40rpx' : '0',
          'padding-right': indent && index === charList.length - 1 ? '40rpx' : '0',
        }"
      >
        <KeyButton :value="el" @click="$emit('key-click', $event)" />
      </view>
    </view>
  </view>
</template>

<style lang="scss">
@use './keyboard.scss' as *;
</style>
