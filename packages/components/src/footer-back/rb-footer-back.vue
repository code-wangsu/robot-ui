<script setup lang="ts">
import RbIconFont from '../icon-font/rb-icon-font.vue'

defineOptions({ name: 'RbFooterBack' })

withDefaults(
  defineProps<{
    text?: string
    icon?: string
    iconSize?: string | number
  }>(),
  {
    text: '返回',
    icon: 'fanhuishouye',
    iconSize: '12rpx',
  },
)

defineEmits<{
  click: []
}>()
</script>

<template>
  <view class="footer-back-btn" @click="$emit('click')">
    <slot name="icon">
      <rb-icon-font :name="icon" :size="iconSize" class="footer-back-btn__icon" />
    </slot>
    <text class="footer-back-btn__text">{{ text }}</text>
  </view>
</template>

<style lang="scss" scoped>
.footer-back-btn {
  min-height: 36rpx;
  padding: 0 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6rpx;
  border-radius: 7rpx;
  font-size: 11rpx;
  font-weight: 700;
  background: #fff;
  border: 1rpx solid #d7e1ec;
  color: #075eb8;
}

.footer-back-btn__icon {
  line-height: 1;
}

.footer-back-btn__text {
  line-height: 1;
}
</style>
