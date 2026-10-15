<script setup lang="ts">
import { computed, provide, ref } from 'vue'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbIndexList' })

const props = withDefaults(
  defineProps<{
    indexList?: string[]
    sticky?: boolean
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    indexList: () => [],
    sticky: true,
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  select: [index: string]
}>()

const scrollIntoView = ref('')

provide('rbIndexList', {
  scrollTo: (index: string) => {
    scrollIntoView.value = `rb-index-${index}`
    emit('select', index)
  },
})

const sidebarStyle = computed(() => normalizeStyle(props.customStyle))
</script>

<template>
  <view class="rb-index-list" :class="[bem('rb-index-list'), customClass]">
    <scroll-view
      class="rb-index-list__scroll"
      scroll-y
      :scroll-into-view="scrollIntoView"
      scroll-with-animation
    >
      <slot />
    </scroll-view>
    <view class="rb-index-list__sidebar" :style="sidebarStyle">
      <text
        v-for="item in indexList"
        :key="item"
        class="rb-index-list__index"
        @click="scrollIntoView = `rb-index-${item}`; emit('select', item)"
      >
        {{ item }}
      </text>
    </view>
  </view>
</template>
