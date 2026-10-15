<script setup lang="ts">
import { computed } from 'vue'
import { addUnit } from '@robot-ui/utils'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbSwiper' })

const props = withDefaults(
  defineProps<{
    list?: string[]
    height?: string | number
    autoplay?: boolean
    interval?: number
    circular?: boolean
    indicatorDots?: boolean
    current?: number
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    list: () => [],
    height: 300,
    autoplay: true,
    interval: 3000,
    circular: true,
    indicatorDots: true,
    current: 0,
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  change: [index: number]
  'update:current': [index: number]
}>()

const innerCurrent = computed({
  get: () => props.current,
  set: (val: number) => emit('update:current', val),
})

const swiperStyle = computed(() => {
  const style: Record<string, string | number> = {
    height: addUnit(props.height),
  }
  const extra = normalizeStyle(props.customStyle)
  if (extra && typeof extra !== 'string') {
    Object.assign(style, extra)
  }
  return style
})

function onChange(event: { detail: { current: number } }) {
  innerCurrent.value = event.detail.current
  emit('change', event.detail.current)
}
</script>

<template>
  <swiper
    class="rb-swiper"
    :class="[bem('rb-swiper'), customClass]"
    :style="swiperStyle"
    :autoplay="autoplay"
    :interval="interval"
    :circular="circular"
    :indicator-dots="indicatorDots"
    :current="innerCurrent"
    @change="onChange"
  >
    <swiper-item v-for="(item, index) in list" :key="index" class="rb-swiper__item">
      <slot :item="item" :index="index">
        <image class="rb-swiper__image" :src="item" mode="aspectFill" />
      </slot>
    </swiper-item>
    <slot v-if="!list.length" />
  </swiper>
</template>
