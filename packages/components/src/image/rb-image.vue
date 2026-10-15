<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { addUnit } from '@robot-ui/utils'
import { bem, normalizeStyle } from '../composables/useBem'
import RbImageViewer from '../image-viewer/rb-image-viewer.vue'

defineOptions({ name: 'RbImage' })

/** 对齐 Element Plus fit → uni-app image mode */
export type RbImageFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'

const FIT_MODE_MAP: Record<RbImageFit, string> = {
  fill: 'scaleToFill',
  contain: 'aspectFit',
  cover: 'aspectFill',
  none: 'center',
  'scale-down': 'aspectFit',
}

const props = withDefaults(
  defineProps<{
    src?: string
    /** uni-app 原生 mode，优先于 fit */
    mode?: string
    /** 对齐 Element Plus object-fit */
    fit?: RbImageFit
    width?: string | number
    height?: string | number
    radius?: string | number
    lazyLoad?: boolean
    showLoading?: boolean
    showError?: boolean
    /**
     * 预览图列表，对齐 Element Plus preview-src-list
     * 有值时点击可预览；为空则不预览
     */
    previewSrcList?: string[]
    /** 预览初始索引，对齐 initial-index */
    initialIndex?: number
    /** 是否允许预览（需配合 previewSrcList） */
    preview?: boolean
    /** 点击遮罩关闭预览，对齐 hide-on-click-modal */
    hideOnClickModal?: boolean
    /**
     * 使用系统 previewImage（无自定义左右按钮）
     * 默认 false，使用组件内预览器（含左右切换）
     */
    nativePreview?: boolean
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    src: '',
    mode: '',
    fit: 'cover',
    width: '100%',
    height: 'auto',
    radius: 0,
    lazyLoad: false,
    showLoading: true,
    showError: true,
    previewSrcList: () => [],
    initialIndex: 0,
    preview: true,
    hideOnClickModal: true,
    nativePreview: false,
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  click: [event: Event]
  load: [event: Event]
  error: [event: Event]
  show: []
  close: []
  switch: [index: number]
}>()

const loading = ref(Boolean(props.src))
const errored = ref(false)
const viewerVisible = ref(false)
const viewerIndex = ref(0)

watch(
  () => props.src,
  (val) => {
    loading.value = Boolean(val)
    errored.value = false
  },
)

const imageMode = computed(() => props.mode || FIT_MODE_MAP[props.fit] || 'aspectFill')

const canPreview = computed(
  () => props.preview && props.previewSrcList.length > 0 && Boolean(props.src) && !errored.value,
)

const rootStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.width) style.width = addUnit(props.width)
  if (props.height) style.height = addUnit(props.height)
  if (props.radius) style.borderRadius = addUnit(props.radius)
  const extra = normalizeStyle(props.customStyle)
  if (extra && typeof extra === 'object') {
    Object.assign(style, extra)
  }
  return style
})

function resolveStartIndex(): number {
  const list = props.previewSrcList
  if (props.src) {
    const bySrc = list.indexOf(props.src)
    if (bySrc >= 0) return bySrc
  }
  if (props.initialIndex >= 0 && props.initialIndex < list.length) {
    return props.initialIndex
  }
  return 0
}

function openPreview() {
  if (!canPreview.value) return
  const start = resolveStartIndex()
  emit('show')
  emit('switch', start)

  if (props.nativePreview) {
    uni.previewImage({
      urls: props.previewSrcList,
      current: props.previewSrcList[start],
    })
    return
  }

  viewerIndex.value = start
  viewerVisible.value = true
}

function onViewerClose() {
  viewerVisible.value = false
  emit('close')
}

function onViewerSwitch(i: number) {
  viewerIndex.value = i
  emit('switch', i)
}

function onClick(event: Event) {
  emit('click', event)
  openPreview()
}

function onLoad(event: Event) {
  loading.value = false
  emit('load', event)
}

function onError(event: Event) {
  loading.value = false
  errored.value = true
  emit('error', event)
}
</script>

<template>
  <view
    class="rb-image"
    :class="[bem('rb-image', canPreview && 'preview'), customClass]"
    :style="rootStyle"
    @click="onClick"
  >
    <image
      v-if="src && !errored"
      class="rb-image__img"
      :src="src"
      :mode="imageMode"
      :lazy-load="lazyLoad"
      @load="onLoad"
      @error="onError"
    />
    <view v-if="showLoading && loading && src" class="rb-image__loading">
      <view class="rb-image__spinner" />
    </view>
    <view v-if="showError && errored" class="rb-image__error">
      <slot name="error">
        <text class="rb-image__error-text">加载失败</text>
      </slot>
    </view>
    <view v-if="canPreview" class="rb-image__mask">
      <slot name="placeholder" />
    </view>

    <rb-image-viewer
      v-if="!nativePreview"
      v-model:show="viewerVisible"
      v-model:index="viewerIndex"
      :url-list="previewSrcList"
      :initial-index="viewerIndex"
      :hide-on-click-modal="hideOnClickModal"
      @close="onViewerClose"
      @switch="onViewerSwitch"
    />
  </view>
</template>
