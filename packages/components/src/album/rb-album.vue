<script setup lang="ts">
import { computed } from 'vue'
import { addUnit } from '@robot-ui/utils'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbAlbum' })

const props = withDefaults(
  defineProps<{
    urls?: string[]
    singleSize?: string | number
    multipleSize?: string | number
    space?: string | number
    rowCount?: number
    showMore?: boolean
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    urls: () => [],
    singleSize: 360,
    multipleSize: 160,
    space: 12,
    rowCount: 3,
    showMore: true,
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  click: [index: number]
}>()

const isSingle = computed(() => props.urls.length === 1)

const itemSize = computed(() => addUnit(isSingle.value ? props.singleSize : props.multipleSize))

const gapStyle = computed(() => ({
  gap: addUnit(props.space),
}))

const displayUrls = computed(() => {
  if (!props.showMore || props.urls.length <= props.rowCount) {
    return props.urls.map((url, index) => ({ url, index, more: 0 }))
  }
  const max = props.rowCount
  const list = props.urls.slice(0, max).map((url, index) => ({ url, index, more: 0 }))
  list[max - 1] = {
    url: props.urls[max - 1],
    index: max - 1,
    more: props.urls.length - max,
  }
  return list
})

function preview(index: number) {
  uni.previewImage({
    urls: props.urls,
    current: index,
  })
  emit('click', index)
}
</script>

<template>
  <view
    class="rb-album"
    :class="[bem('rb-album', isSingle && 'single'), customClass]"
    :style="[gapStyle, normalizeStyle(customStyle)]"
  >
    <view
      v-for="item in displayUrls"
      :key="item.index"
      class="rb-album__item"
      :style="{ width: itemSize, height: itemSize }"
      @click="preview(item.index)"
    >
      <image class="rb-album__image" :src="item.url" mode="aspectFill" />
      <view v-if="item.more > 0" class="rb-album__more">+{{ item.more }}</view>
    </view>
  </view>
</template>
