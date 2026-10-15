<script setup lang="ts">
import { computed, inject } from 'vue'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbTabbarItem' })

const props = withDefaults(
  defineProps<{
    name?: string | number
    text?: string
    icon?: string
    badge?: string | number
    dot?: boolean
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    name: '',
    text: '',
    icon: '',
    badge: '',
    dot: false,
    customStyle: '',
    customClass: '',
  },
)

interface TabbarContext {
  active: { value: string | number }
  setActive: (name: string | number) => void
}

const ctx = inject<TabbarContext>('rbTabbar')!
const active = computed(() => ctx.active.value === props.name)

function onClick() {
  ctx.setActive(props.name)
}
</script>

<template>
  <view
    class="rb-tabbar-item"
    :class="[bem('rb-tabbar-item', active && 'active'), customClass]"
    :style="normalizeStyle(customStyle)"
    @click="onClick"
  >
    <view class="rb-tabbar-item__icon-wrap">
      <text class="rb-tabbar-item__icon">{{ icon }}</text>
      <view v-if="dot" class="rb-tabbar-item__dot" />
      <view v-else-if="badge" class="rb-tabbar-item__badge">{{ badge }}</view>
    </view>
    <text class="rb-tabbar-item__text">{{ text }}</text>
  </view>
</template>
