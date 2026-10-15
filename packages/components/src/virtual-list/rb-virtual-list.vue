<script setup lang="ts">
import { computed, ref } from 'vue'
import { addUnit, calcVirtualRange, rpxToPx, throttle } from '@robot-ui/utils'
import { bem, normalizeStyle } from '../composables/useBem'
import { useSelectorQuery } from '../composables/useSelectorQuery'

defineOptions({ name: 'RbVirtualList' })

/**
 * 固定行高虚拟滚动列表（uni-app 安卓端）。
 * itemHeight / height 均按 rpx；内部用 uni.upx2px 与 scrollTop(px) 对齐计算。
 */
const props = withDefaults(
  defineProps<{
    list: unknown[]
    /** 行高，单位 rpx */
    itemHeight: number
    /** 容器高度，数字默认 rpx */
    height?: string | number
    buffer?: number
    keyField?: string
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    height: '100%',
    buffer: 5,
    keyField: '',
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  scroll: [payload: { scrollTop: number }]
}>()

const { getRect } = useSelectorQuery()
const scrollTopPx = ref(0)
const viewportHeightPx = ref(0)

const itemHeightPx = computed(() => rpxToPx(props.itemHeight))
const itemHeightStyle = computed(() => addUnit(props.itemHeight))

const containerStyle = computed(() => {
  const style: Record<string, string | number> = {}
  if (props.height !== '100%') {
    style.height = addUnit(props.height)
  } else {
    style.height = '100%'
  }
  if (typeof props.customStyle === 'object') {
    Object.assign(style, props.customStyle)
  }
  return normalizeStyle(style)
})

const totalHeightStyle = computed(() => addUnit(props.list.length * props.itemHeight))

const range = computed(() =>
  calcVirtualRange(
    scrollTopPx.value,
    props.list.length,
    itemHeightPx.value,
    viewportHeightPx.value || rpxToPx(800),
    props.buffer,
  ),
)

const visibleList = computed(() => {
  const slice = props.list.slice(range.value.start, range.value.end)
  return slice.map((item, i) => ({
    item,
    index: range.value.start + i,
  }))
})

const windowStyle = computed(() => ({
  transform: `translateY(${range.value.offset}px)`,
}))

const onScroll = throttle((event: { detail: { scrollTop: number } }) => {
  scrollTopPx.value = event.detail.scrollTop
  emit('scroll', { scrollTop: event.detail.scrollTop })
}, 16)

function onScrollRaw(event: { detail: { scrollTop: number } }) {
  onScroll(event)
}

function resolveKey(item: unknown, index: number): string | number {
  if (props.keyField && item && typeof item === 'object') {
    const value = (item as Record<string, unknown>)[props.keyField]
    if (typeof value === 'string' || typeof value === 'number') {
      return value
    }
  }
  return index
}

async function measureViewport() {
  const rect = await getRect('.rb-virtual-list__scroll')
  if (rect?.height) {
    viewportHeightPx.value = rect.height
  }
}

measureViewport()
</script>

<template>
  <view
    class="rb-virtual-list"
    :class="[bem('rb-virtual-list'), customClass]"
    :style="containerStyle"
  >
    <scroll-view
      class="rb-virtual-list__scroll"
      scroll-y
      :style="{ height: '100%' }"
      @scroll="onScrollRaw"
    >
      <view class="rb-virtual-list__phantom" :style="{ height: totalHeightStyle }">
        <view class="rb-virtual-list__window" :style="windowStyle">
          <view
            v-for="entry in visibleList"
            :key="resolveKey(entry.item, entry.index)"
            class="rb-virtual-list__item"
            :style="{ height: itemHeightStyle }"
          >
            <slot :item="entry.item" :index="entry.index" />
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>
