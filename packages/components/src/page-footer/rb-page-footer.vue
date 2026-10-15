<script setup lang="ts">
import { dismissActiveSoftKeyboard } from '../composables/useSoftKeyboardDismiss'

defineOptions({ name: 'RbPageFooter' })

const props = withDefaults(
  defineProps<{
    refresherEnabled?: boolean
    refresherTriggered?: boolean | string
    lowerThreshold?: number
    /** 点击是否自动收起软键盘 */
    dismissKeyboardOnTap?: boolean
  }>(),
  {
    refresherEnabled: false,
    refresherTriggered: false,
    lowerThreshold: 50,
    dismissKeyboardOnTap: true,
  },
)

const emit = defineEmits<{
  refresherrefresh: [event: Event]
  scroll: [event: Event]
  scrolltolower: [event: Event]
}>()

const onPageTap = () => {
  if (props.dismissKeyboardOnTap) {
    dismissActiveSoftKeyboard()
  }
}
</script>

<template>
  <view class="page-with-footer">
    <view v-if="$slots.header" class="page-with-footer__header">
      <slot name="header" />
    </view>
    <scroll-view
      :class="['page-with-footer__scroll', { 'page-with-footer__scroll--with-header': !!$slots.header }]"
      scroll-y
      :refresher-enabled="refresherEnabled"
      :refresher-triggered="!!refresherTriggered"
      :lower-threshold="lowerThreshold"
      @tap="onPageTap"
      @refresherrefresh="emit('refresherrefresh', $event)"
      @scroll="emit('scroll', $event)"
      @scrolltolower="emit('scrolltolower', $event)"
    >
      <slot />
    </scroll-view>
    <view v-if="$slots.footer" class="page-with-footer__bar" @tap="onPageTap">
      <slot name="footer" />
    </view>
  </view>
</template>

<style lang="scss" scoped>
.page-with-footer {
  flex: 1;
  height: 0;
  display: flex;
  flex-direction: column;
  background: transparent;
}

.page-with-footer__header {
  flex-shrink: 0;
  padding: 12rpx 14rpx 0;
  box-sizing: border-box;
}

.page-with-footer__scroll {
  flex: 1;
  height: 0;
  padding: 12rpx 14rpx;
  box-sizing: border-box;
}

.page-with-footer__scroll--with-header {
  padding-top: 0;
}

.page-with-footer__bar {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12rpx;
  padding: 12rpx 14rpx 16rpx;
  background: #fff;
  border-top: 1rpx solid #d7e1ec;
  box-shadow: 0 -4rpx 12rpx rgba(15, 23, 42, 0.06);
}
</style>
