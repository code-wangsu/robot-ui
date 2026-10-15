<script setup lang="ts">
import { computed, watch } from 'vue'
import { bem } from '../composables/useBem'
import RbPopup from '../popup/rb-popup.vue'
import RbButton from '../button/rb-button.vue'

defineOptions({ name: 'RbImageViewer' })

const props = withDefaults(
  defineProps<{
    show?: boolean
    urlList?: string[]
    /** 初始索引，对齐 Element Plus initial-index */
    initialIndex?: number
    /** 点击遮罩是否关闭 */
    hideOnClickModal?: boolean
    zIndex?: number
  }>(),
  {
    show: false,
    urlList: () => [],
    initialIndex: 0,
    hideOnClickModal: true,
    zIndex: 20000,
  },
)

const emit = defineEmits<{
  'update:show': [value: boolean]
  close: []
  switch: [index: number]
}>()

const index = defineModel<number>('index', { default: 0 })

const total = computed(() => props.urlList.length)
const currentUrl = computed(() => props.urlList[index.value] || '')
const hasMulti = computed(() => total.value > 1)
const canPrev = computed(() => hasMulti.value)
const canNext = computed(() => hasMulti.value)

const popupContentStyle = {
  maxWidth: '100%',
  width: '100%',
  height: '100%',
  backgroundColor: 'transparent',
  overflow: 'visible',
}

watch(
  () => props.show,
  (visible) => {
    if (visible) {
      const start = Math.min(Math.max(props.initialIndex, 0), Math.max(total.value - 1, 0))
      index.value = start
      emit('switch', start)
    }
  },
)

function close() {
  emit('update:show', false)
  emit('close')
}

function onUpdateShow(val: boolean) {
  emit('update:show', val)
  if (!val) emit('close')
}

function prev() {
  if (!hasMulti.value) return
  index.value = (index.value - 1 + total.value) % total.value
  emit('switch', index.value)
}

function next() {
  if (!hasMulti.value) return
  index.value = (index.value + 1) % total.value
  emit('switch', index.value)
}

function onMaskClick() {
  if (props.hideOnClickModal) close()
}
</script>

<template>
  <rb-popup
    :show="show"
    mode="center"
    :overlay="true"
    :overlay-opacity="0.85"
    :close-on-click-overlay="hideOnClickModal"
    :z-index="zIndex"
    :round="0"
    bg-color="transparent"
    :safe-area-inset-bottom="false"
    :custom-style="popupContentStyle"
    custom-class="rb-image-viewer-popup"
    @update:show="onUpdateShow"
  >
    <view class="rb-image-viewer" :class="bem('rb-image-viewer')" @click.stop="onMaskClick">
      <view class="rb-image-viewer__toolbar" @click.stop>
        <text class="rb-image-viewer__counter">{{ index + 1 }} / {{ total || 1 }}</text>
        <rb-button
          class="rb-image-viewer__close-btn"
          size="small"
          type="info"
          plain
          text="关闭"
          @click="close"
        />
      </view>

      <view class="rb-image-viewer__canvas" @click.stop>
        <view
          v-if="canPrev"
          class="rb-image-viewer__nav rb-image-viewer__nav--prev"
          @click="prev"
        >
          <rb-button size="small" type="info" round text="‹" />
        </view>

        <image
          v-if="currentUrl"
          class="rb-image-viewer__img"
          :src="currentUrl"
          mode="aspectFit"
          @click.stop
        />

        <view
          v-if="canNext"
          class="rb-image-viewer__nav rb-image-viewer__nav--next"
          @click="next"
        >
          <rb-button size="small" type="info" round text="›" />
        </view>
      </view>
    </view>
  </rb-popup>
</template>
