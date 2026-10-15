<script setup lang="ts">
import { computed } from 'vue'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbCard' })

export type RbCardType = 'success' | 'warning' | 'error' | 'info' | 'primary'

const props = withDefaults(
  defineProps<{
    /** 头部标题 */
    title?: string
    /** 头部右侧附加信息（如时间） */
    extra?: string
    /** 头部主题色 */
    type?: RbCardType
    /** 是否显示头部 */
    showHeader?: boolean
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    title: '',
    extra: '',
    type: 'success',
    showHeader: true,
    customStyle: '',
    customClass: '',
  },
)

const rootClass = computed(() =>
  bem('rb-card', props.type, !props.showHeader && 'plain'),
)
</script>

<template>
  <view
    class="rb-card"
    :class="[rootClass, customClass]"
    :style="normalizeStyle(customStyle)"
  >
    <view v-if="showHeader" class="rb-card__header" :class="bem('rb-card__header', type)">
      <slot name="header">
        <text class="rb-card__title">{{ title }}</text>
        <text v-if="extra || $slots.extra" class="rb-card__extra">
          <slot name="extra">{{ extra }}</slot>
        </text>
      </slot>
    </view>
    <view class="rb-card__body">
      <slot />
    </view>
    <view v-if="$slots.footer" class="rb-card__footer">
      <slot name="footer" />
    </view>
  </view>
</template>
