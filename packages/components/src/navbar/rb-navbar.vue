<script setup lang="ts">
import { computed } from 'vue'
import { addUnit } from '@robot-ui/utils'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbNavbar' })

const props = withDefaults(
  defineProps<{
    title?: string
    leftText?: string
    rightText?: string
    /** 点击左侧是否自动返回上一页 */
    autoBack?: boolean
    fixed?: boolean
    placeholder?: boolean
    safeAreaInsetTop?: boolean
    height?: string | number
    bgColor?: string
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    title: '',
    leftText: '',
    rightText: '',
    autoBack: false,
    fixed: false,
    placeholder: false,
    safeAreaInsetTop: true,
    height: 88,
    bgColor: '',
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  'click-left': []
  'click-right': []
}>()

const navStyle = computed(() => {
  const style: Record<string, string | number> = {
    height: addUnit(props.height),
  }
  if (props.bgColor) {
    style.backgroundColor = props.bgColor
  }
  const extra = normalizeStyle(props.customStyle)
  if (extra && typeof extra !== 'string') {
    Object.assign(style, extra)
  }
  return style
})

function onClickLeft() {
  emit('click-left')
  if (props.autoBack) {
    uni.navigateBack({ fail: () => undefined })
  }
}
</script>

<template>
  <view class="rb-navbar-wrap">
    <view
      class="rb-navbar"
      :class="[
        bem('rb-navbar', fixed && 'fixed', safeAreaInsetTop && 'safe-top'),
        customClass,
      ]"
      :style="navStyle"
    >
      <view class="rb-navbar__left" @click="onClickLeft">
        <slot name="left">{{ leftText || (autoBack ? '返回' : '') }}</slot>
      </view>
      <view class="rb-navbar__title">
        <slot name="title">{{ title }}</slot>
      </view>
      <view class="rb-navbar__right" @click="emit('click-right')">
        <slot name="right">{{ rightText }}</slot>
      </view>
    </view>
    <view
      v-if="fixed && placeholder"
      class="rb-navbar__placeholder"
      :style="{ height: addUnit(height) }"
    />
  </view>
</template>
