<script setup lang="ts">
import { computed, getCurrentInstance, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { addUnit } from '@robot-ui/utils'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbVideo' })

export type RbVideoObjectFit = 'contain' | 'fill' | 'cover'

const props = withDefaults(
  defineProps<{
    src?: string
    poster?: string
    title?: string
    width?: string | number
    height?: string | number
    /** 是否显示默认播放控件 */
    controls?: boolean
    autoplay?: boolean
    loop?: boolean
    muted?: boolean
    /** 指定视频初始播放位置，单位 s */
    initialTime?: number
    /** contain / fill / cover */
    objectFit?: RbVideoObjectFit
    showCenterPlayBtn?: boolean
    showFullscreenBtn?: boolean
    showPlayBtn?: boolean
    enableProgressGesture?: boolean
    /** 是否显示静音按钮（部分端） */
    showMuteBtn?: boolean
    /**
     * 未播放时只显示封面，点击后再挂载原生 video。
     * App 端原生 video 层级极高，默认开启可避免遮挡弹层/侧栏/其它组件。
     */
    lazy?: boolean
    /** 容器层级，默认 0，避免盖住弹层 */
    zIndex?: number
    /** 自定义 video id，便于 createVideoContext */
    videoId?: string
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    src: '',
    poster: '',
    title: '',
    width: '100%',
    height: 420,
    controls: true,
    autoplay: false,
    loop: false,
    muted: false,
    initialTime: 0,
    objectFit: 'contain',
    showCenterPlayBtn: true,
    showFullscreenBtn: true,
    showPlayBtn: true,
    enableProgressGesture: true,
    showMuteBtn: false,
    lazy: true,
    zIndex: 0,
    videoId: '',
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  play: [event: Event]
  pause: [event: Event]
  ended: [event: Event]
  error: [event: Event]
  timeupdate: [event: Event]
  waiting: [event: Event]
  fullscreenchange: [event: Event]
  loadedmetadata: [event: Event]
  controlstoggle: [event: Event]
}>()

const instance = getCurrentInstance()
const innerId = `rb-video-${Math.random().toString(36).slice(2, 9)}`
const resolvedId = computed(() => props.videoId || innerId)
const videoCtx = ref<UniApp.VideoContext | null>(null)
/** 是否已挂载原生 video（lazy 模式下点播后才为 true） */
const activated = ref(!props.lazy || props.autoplay)

const rootStyle = computed(() => {
  const style: Record<string, string | number> = {
    width: addUnit(props.width),
    height: addUnit(props.height),
    zIndex: props.zIndex,
  }
  const extra = normalizeStyle(props.customStyle)
  if (extra && typeof extra === 'object') {
    Object.assign(style, extra)
  }
  return style
})

function bindContext() {
  try {
    videoCtx.value = uni.createVideoContext(resolvedId.value, instance?.proxy as any)
  } catch {
    videoCtx.value = null
  }
}

watch(activated, async (val) => {
  if (!val) {
    videoCtx.value = null
    return
  }
  await nextTick()
  bindContext()
  if (props.lazy) {
    setTimeout(() => {
      videoCtx.value?.play()
    }, 50)
  }
})

onMounted(async () => {
  if (!activated.value) {
    return
  }
  await nextTick()
  bindContext()
})

onBeforeUnmount(() => {
  try {
    videoCtx.value?.pause()
    videoCtx.value?.stop()
  } catch {
    // ignore
  }
  videoCtx.value = null
})

function activate() {
  activated.value = true
}

function play() {
  if (!activated.value) {
    activate()
    return
  }
  videoCtx.value?.play()
}

function pause() {
  videoCtx.value?.pause()
}

function stop() {
  videoCtx.value?.stop()
}

function seek(position: number) {
  videoCtx.value?.seek(position)
}

function requestFullScreen(direction?: 0 | 90 | -90) {
  videoCtx.value?.requestFullScreen({ direction: direction ?? 0 })
}

function exitFullScreen() {
  videoCtx.value?.exitFullScreen()
}

/** 销毁原生 video，回到封面（弹层打开时可调用，避免挡层） */
function deactivate() {
  try {
    videoCtx.value?.pause()
    videoCtx.value?.stop()
  } catch {
    // ignore
  }
  if (props.lazy) {
    activated.value = false
  }
  videoCtx.value = null
}

defineExpose({
  play,
  pause,
  stop,
  seek,
  requestFullScreen,
  exitFullScreen,
  deactivate,
  getContext: () => videoCtx.value,
})
</script>

<template>
  <view
    class="rb-video"
    :class="[bem('rb-video', !activated && 'poster'), customClass]"
    :style="rootStyle"
  >
    <video
      v-if="activated"
      :id="resolvedId"
      class="rb-video__player"
      :src="src"
      :poster="poster"
      :title="title"
      :controls="controls"
      :autoplay="autoplay || lazy"
      :loop="loop"
      :muted="muted"
      :initial-time="initialTime"
      :object-fit="objectFit"
      :show-center-play-btn="showCenterPlayBtn"
      :show-fullscreen-btn="showFullscreenBtn"
      :show-play-btn="showPlayBtn"
      :enable-progress-gesture="enableProgressGesture"
      :show-mute-btn="showMuteBtn"
      @play="emit('play', $event)"
      @pause="emit('pause', $event)"
      @ended="emit('ended', $event)"
      @error="emit('error', $event)"
      @timeupdate="emit('timeupdate', $event)"
      @waiting="emit('waiting', $event)"
      @fullscreenchange="emit('fullscreenchange', $event)"
      @loadedmetadata="emit('loadedmetadata', $event)"
      @controlstoggle="emit('controlstoggle', $event)"
    />

    <view v-else class="rb-video__cover" @click="activate">
      <image
        v-if="poster"
        class="rb-video__poster"
        :src="poster"
        mode="aspectFill"
      />
      <view v-else class="rb-video__poster rb-video__poster--empty" />
      <view class="rb-video__play">
        <view class="rb-video__play-icon" />
      </view>
    </view>
  </view>
</template>
