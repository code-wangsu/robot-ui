<script setup lang="ts">
import { computed, watch } from 'vue'
import RbPopup from '../popup/rb-popup.vue'
import { dismissActiveSoftKeyboard } from '../composables/useSoftKeyboardDismiss'

defineOptions({ name: 'RbAppDialog' })

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    title?: string
    width?: number
    large?: boolean
    maxHeight?: number
    maskClosable?: boolean
    showClose?: boolean
    interceptClose?: boolean
    closeText?: string
  }>(),
  {
    modelValue: false,
    title: '',
    width: 620,
    large: false,
    maxHeight: 0,
    maskClosable: false,
    showClose: true,
    interceptClose: false,
    closeText: '关闭',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
}>()

const resolvedWidth = computed(() => {
  if (props.large && props.width === 620) return 640
  return props.width
})

const dialogStyle = computed(() => {
  const style: Record<string, string> = { width: `${resolvedWidth.value}rpx` }
  if (!props.maxHeight) return style

  try {
    const sys = uni.getSystemInfoSync()
    const windowWidth = Number(sys.windowWidth) || Number(sys.screenWidth) || 750
    const windowHeight = Number(sys.windowHeight) || Number(sys.screenHeight) || 0
    const byProp = props.maxHeight * (windowWidth / 750)
    const byViewport = windowHeight > 0 ? windowHeight * 0.8 : byProp
    style.maxHeight = `${Math.min(byProp, byViewport)}px`
  } catch {
    style.maxHeight = `${props.maxHeight}rpx`
  }
  return style
})

function closeDialog() {
  if (props.interceptClose) {
    emit('close')
    return
  }
  emit('update:modelValue', false)
}

function onUpdateShow(show: boolean) {
  emit('update:modelValue', show)
  if (!show && !props.interceptClose) {
    emit('close')
  }
}

watch(
  () => props.modelValue,
  (visible) => {
    if (visible) dismissActiveSoftKeyboard()
  },
)
</script>

<template>
  <rb-popup
    :show="modelValue"
    mode="center"
    :overlay="true"
    :close-on-click-overlay="maskClosable"
    :round="16"
    @update:show="onUpdateShow"
  >
    <view
      class="app-dialog"
      :class="{
        'app-dialog--bounded': maxHeight,
        'app-dialog--large': large,
      }"
      :style="dialogStyle"
      @tap="dismissActiveSoftKeyboard"
    >
      <view class="app-dialog__header">
        <text class="app-dialog__title">{{ title }}</text>
        <view v-if="showClose" class="app-dialog__close" @click="closeDialog">
          <text class="app-dialog__close-text">{{ closeText }}</text>
        </view>
      </view>
      <scroll-view v-if="maxHeight" class="app-dialog__body app-dialog__body--scroll" scroll-y>
        <slot />
      </scroll-view>
      <view v-else class="app-dialog__body">
        <slot />
      </view>
      <view v-if="$slots.footer || $slots.actions" class="app-dialog__footer">
        <slot name="footer" />
        <slot name="actions" />
      </view>
    </view>
  </rb-popup>
</template>

<style lang="scss" scoped>
.app-dialog {
  overflow: hidden;
  border-radius: 16rpx;
  background: #ffffff;
  box-shadow: 0 16rpx 48rpx rgba(18, 53, 90, 0.18);
}

.app-dialog--bounded {
  display: flex;
  flex-direction: column;
}

.app-dialog--bounded .app-dialog__header,
.app-dialog--bounded .app-dialog__footer {
  flex-shrink: 0;
}

.app-dialog--bounded .app-dialog__body {
  flex: 1;
  min-height: 0;
}

.app-dialog--bounded .app-dialog__body--scroll {
  overflow: hidden;
}

.app-dialog__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16rpx;
  min-height: 88rpx;
  padding: 0 28rpx;
  border-bottom: 1rpx solid #ebeef5;
}

.app-dialog__title {
  flex: 1;
  color: #303133;
  font-size: 30rpx;
  font-weight: 600;
  line-height: 1.4;
}

.app-dialog__close {
  flex-shrink: 0;
  padding: 8rpx 4rpx;
}

.app-dialog__close-text {
  color: #3c9cff;
  font-size: 26rpx;
  line-height: 1;
}

.app-dialog__body {
  padding: 28rpx;
  color: #606266;
  font-size: 26rpx;
  line-height: 1.6;
  box-sizing: border-box;
}

.app-dialog__footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  gap: 16rpx;
  padding: 20rpx 28rpx 28rpx;
  border-top: 1rpx solid #ebeef5;
  background: #fafafa;
}
</style>
