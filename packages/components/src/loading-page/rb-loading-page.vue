<script setup lang="ts">
/**
 * @deprecated 请使用 RbLoading（:fullscreen="true"，局部预览再加 :absolute="true"）。
 * 本组件仅做旧 API 兼容映射。
 */
import { computed } from 'vue'
import RbLoading from '../loading/rb-loading.vue'

defineOptions({ name: 'RbLoadingPage' })

const props = withDefaults(
  defineProps<{
    loading?: boolean
    /** @deprecated 请改用 absolute；false 时相对父级定位 */
    fullscreen?: boolean
    text?: string
    bgColor?: string
    iconSize?: string | number
    color?: string
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    loading: true,
    fullscreen: true,
    text: '加载中...',
    bgColor: 'rgba(255,255,255,0.9)',
    iconSize: 48,
    color: '',
    customStyle: '',
    customClass: '',
  },
)

const absolute = computed(() => !props.fullscreen)
</script>

<template>
  <RbLoading
    :loading="loading"
    fullscreen
    :absolute="absolute"
    :text="text"
    :bg-color="bgColor"
    :size="iconSize"
    :color="color"
    :custom-style="customStyle"
    :custom-class="customClass"
  >
    <slot />
  </RbLoading>
</template>
