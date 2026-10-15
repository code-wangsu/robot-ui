<script setup lang="ts">
import { ref } from 'vue'

definePage({
  style: { navigationBarTitleText: '表单扩展' },
})

const checked = ref(true)
const checks = ref(['a'])
const radio = ref('1')
const rate = ref(3)
const slider = ref(40)
const count = ref(1)
const keyword = ref('')
const code = ref('')
const showKeyboard = ref(false)
const calendarValue = ref('')
</script>

<template>
  <view class="demo">
    <view class="demo__section">
      <text class="demo__label">测试按钮 · Checkbox / Radio / Switch</text>
      <view class="demo__row">
        <rb-checkbox v-model="checked" label="同意协议" />
      </view>
      <rb-checkbox-group v-model="checks">
        <view class="demo__row">
          <rb-checkbox name="a" label="选项 A" />
          <rb-checkbox name="b" label="选项 B" />
        </view>
      </rb-checkbox-group>
      <rb-radio-group v-model="radio">
        <view class="demo__row">
          <rb-radio name="1" label="单选 1" />
          <rb-radio name="2" label="单选 2" />
        </view>
      </rb-radio-group>
      <rb-switch v-model="checked" />
    </view>

    <view class="demo__section">
      <text class="demo__label">测试按钮 · Rate / Slider / NumberBox / Search</text>
      <rb-rate v-model="rate" />
      <view class="gap" />
      <rb-slider v-model="slider" />
      <view class="gap" />
      <rb-number-box v-model="count" :min="0" :max="99" />
      <view class="gap" />
      <rb-search v-model="keyword" placeholder="搜索关键字" />
    </view>

    <view class="demo__section">
      <text class="demo__label">测试按钮 · Textarea / CodeInput / Code</text>
      <rb-textarea v-model="keyword" placeholder="多行输入" />
      <view class="gap" />
      <rb-code-input v-model="code" :maxlength="4" />
      <view class="gap" />
      <rb-code :seconds="60" />
    </view>

    <view class="demo__section">
      <text class="demo__label">测试按钮 · Calendar / Keyboard</text>
      <view class="demo__row">
        <rb-button size="small" type="info" text="数字键盘" @click="showKeyboard = true" />
      </view>
      <rb-calendar v-model="calendarValue" @confirm="(v) => (calendarValue = String(v))" />
      <text class="demo__meta">日历：{{ calendarValue || '未选择' }}</text>
    </view>

    <rb-keyboard v-model:show="showKeyboard" @change="(v) => (keyword = String(v))" />
  </view>
</template>

<style lang="scss" scoped>
.demo { padding: 24rpx; background: #f5f6f8; min-height: 100vh; box-sizing: border-box; }
.demo__section { margin-bottom: 24rpx; padding: 24rpx; border-radius: 12rpx; background: #fff; }
.demo__label { display: block; margin-bottom: 16rpx; font-size: 28rpx; font-weight: 600; color: #303133; }
.demo__row { display: flex; flex-wrap: wrap; gap: 16rpx; align-items: center; margin-bottom: 12rpx; }
.demo__meta { display: block; margin-top: 12rpx; color: #909399; font-size: 22rpx; }
.gap { height: 20rpx; }
</style>
