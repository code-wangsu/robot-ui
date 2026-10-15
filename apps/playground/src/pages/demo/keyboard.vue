<script setup lang="ts">
import { ref } from 'vue'

definePage({
  style: {
    navigationBarTitleText: '软键盘',
  },
})

const account = ref('')
const softValue = ref('')
</script>

<template>
  <view class="demo">
    <view class="demo__section">
      <text class="demo__label">SoftKeyboardInput（点击输入框弹全键盘）</text>
      <rb-soft-keyboard-input
        v-model="account"
        mode="login"
        block-layout
        :enable-space="false"
        input-class="kb-input"
        placeholder="请输入账号"
      />
      <text class="demo__value">当前值：{{ account || '（空）' }}</text>
    </view>

    <view class="demo__section">
      <text class="demo__label">内嵌 SoftKeyboard</text>
      <rb-input v-model="softValue" placeholder="同步到键盘" />
      <view class="keyboard-wrap">
        <rb-soft-keyboard v-model="softValue" mode="login" :enable-space="false" />
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.demo {
  padding: 24rpx;
  padding-bottom: 40rpx;
}

.demo__section {
  margin-bottom: 32rpx;
  padding: 24rpx;
  border-radius: 12rpx;
  background: #fff;
}

.demo__label {
  display: block;
  margin-bottom: 20rpx;
  font-size: 26rpx;
  font-weight: 600;
  color: #606266;
}

.demo__value {
  display: block;
  margin-top: 16rpx;
  font-size: 24rpx;
  color: #909193;
}

:deep(.kb-input) {
  width: 100%;
  height: 72rpx;
  padding: 0 20rpx;
  box-sizing: border-box;
  border: 1rpx solid #dadbde;
  border-radius: 8rpx;
  font-size: 28rpx;
  background: #f8f9fb;
}

.keyboard-wrap {
  margin-top: 24rpx;
  border-radius: 12rpx;
  overflow: hidden;
}
</style>
