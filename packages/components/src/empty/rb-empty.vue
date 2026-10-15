<script setup lang="ts">
import { computed } from 'vue'
import { bem, normalizeStyle } from '../composables/useBem'
import defaultEmptyImage from '../assets/common/icon_nodata.png'

defineOptions({ name: 'RbEmpty' })

const props = withDefaults(
  defineProps<{
    text?: string
    description?: string
    /** 字符图标；仅在 icon 模式或自定义 #icon 时使用 */
    icon?: string
    /**
     * 插画地址。默认使用内置暂无数据图；
     * 传空字符串可退回字符图标模式。
     */
    image?: string
    compact?: boolean
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    text: '暂无数据',
    description: '',
    icon: '',
    compact: false,
    customStyle: '',
    customClass: '',
  },
)

const resolvedImage = computed(() => {
  if (props.image === '') return ''
  return props.image || defaultEmptyImage
})

const useImage = computed(() => Boolean(resolvedImage.value))

const rootClass = computed(() =>
  [
    bem('rb-empty', props.compact && 'compact', useImage.value && 'image'),
    props.customClass,
  ]
    .filter(Boolean)
    .join(' '),
)
</script>

<template>
  <view class="rb-empty" :class="rootClass" :style="normalizeStyle(customStyle)">
    <view class="rb-empty__media">
      <slot name="icon">
        <image
          v-if="useImage"
          class="rb-empty__image"
          :src="resolvedImage"
          mode="aspectFit"
        />
        <view v-else class="rb-empty__glyph">
          <text>{{ icon || '∅' }}</text>
        </view>
      </slot>
    </view>
    <text class="rb-empty__text">
      <slot>{{ text }}</slot>
    </text>
    <text v-if="description" class="rb-empty__description">{{ description }}</text>
    <view v-if="$slots.extra" class="rb-empty__extra">
      <slot name="extra" />
    </view>
  </view>
</template>
