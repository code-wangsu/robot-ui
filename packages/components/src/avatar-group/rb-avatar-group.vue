<script setup lang="ts">
import {
  Comment,
  Fragment,
  Text,
  computed,
  provide,
  useSlots,
  type VNode,
} from 'vue'
import { addUnit } from '@robot-ui/utils'
import { bem, normalizeStyle } from '../composables/useBem'
import { AVATAR_GROUP_KEY } from '../composables/useAvatarGroup'

defineOptions({ name: 'RbAvatarGroup' })

const props = withDefaults(
  defineProps<{
    urls?: string[]
    size?: string | number
    max?: number
    gap?: string | number
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    urls: () => [],
    size: 64,
    max: 5,
    gap: -16,
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  excessClick: [excess: number]
}>()

const slots = useSlots()

provide(AVATAR_GROUP_KEY, {
  size: computed(() => props.size),
})

function flatten(nodes: VNode[] = []): VNode[] {
  const result: VNode[] = []
  nodes.forEach((node) => {
    if (node.type === Fragment && Array.isArray(node.children)) {
      result.push(...flatten(node.children as VNode[]))
      return
    }
    if (node.type === Comment || node.type === Text) return
    result.push(node)
  })
  return result
}

const slotAvatars = computed(() => flatten(slots.default?.() ?? []))
const useUrls = computed(() => props.urls.length > 0)
const displayUrls = computed(() => props.urls.slice(0, props.max))
const total = computed(() => (useUrls.value ? props.urls.length : slotAvatars.value.length))
const excess = computed(() => Math.max(0, total.value - props.max))
const visibleSlots = computed(() => slotAvatars.value.slice(0, props.max))

const itemStyle = computed(() => ({
  marginLeft: addUnit(props.gap),
  width: addUnit(props.size),
  height: addUnit(props.size),
}))

const firstItemStyle = computed(() => ({
  width: addUnit(props.size),
  height: addUnit(props.size),
}))
</script>

<template>
  <view
    class="rb-avatar-group"
    :class="[bem('rb-avatar-group'), customClass]"
    :style="normalizeStyle(customStyle)"
  >
    <template v-if="useUrls">
      <view
        v-for="(url, index) in displayUrls"
        :key="url + index"
        class="rb-avatar-group__item"
        :style="index === 0 ? firstItemStyle : itemStyle"
      >
        <image class="rb-avatar-group__image" :src="url" mode="aspectFill" />
      </view>
    </template>
    <template v-else>
      <view
        v-for="(vnode, index) in visibleSlots"
        :key="index"
        class="rb-avatar-group__item"
        :style="index === 0 ? firstItemStyle : itemStyle"
      >
        <component :is="vnode" />
      </view>
    </template>
    <view
      v-if="excess > 0"
      class="rb-avatar-group__more"
      :style="itemStyle"
      @click="emit('excessClick', excess)"
    >
      +{{ excess }}
    </view>
  </view>
</template>
