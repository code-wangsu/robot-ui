<script setup lang="ts">
import { computed } from 'vue'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbLoadmore' })

export type LoadmoreStatus = 'loadmore' | 'loading' | 'nomore'

const props = withDefaults(
  defineProps<{
    status?: LoadmoreStatus
    loadmoreText?: string
    loadingText?: string
    nomoreText?: string
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    status: 'loadmore',
    loadmoreText: '上拉加载更多',
    loadingText: '正在加载...',
    nomoreText: '没有更多了',
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  loadmore: []
}>()

const text = computed(() => {
  if (props.status === 'loading') return props.loadingText
  if (props.status === 'nomore') return props.nomoreText
  return props.loadmoreText
})

function onTap() {
  if (props.status === 'loadmore') {
    emit('loadmore')
  }
}
</script>

<template>
  <view
    class="rb-loadmore"
    :class="[bem('rb-loadmore', status), customClass]"
    :style="normalizeStyle(customStyle)"
    @click="onTap"
  >
    <view v-if="status !== 'nomore'" class="rb-loadmore__line" />
    <view v-if="status === 'loading'" class="rb-loadmore__dot" />
    <text>{{ text }}</text>
    <view v-if="status !== 'nomore'" class="rb-loadmore__line" />
  </view>
</template>
