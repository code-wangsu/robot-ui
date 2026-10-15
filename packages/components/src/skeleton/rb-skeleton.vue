<script setup lang="ts">
import { computed } from 'vue'
import { addUnit } from '@robot-ui/utils'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbSkeleton' })

const props = withDefaults(
  defineProps<{
    loading?: boolean
    rows?: number
    title?: boolean
    avatar?: boolean
    rowHeight?: string | number
    avatarSize?: string | number
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    loading: true,
    rows: 3,
    title: true,
    avatar: false,
    rowHeight: 32,
    avatarSize: 80,
    customStyle: '',
    customClass: '',
  },
)

const rowHeightStyle = computed(() => addUnit(props.rowHeight))
const avatarSizeStyle = computed(() => ({
  width: addUnit(props.avatarSize),
  height: addUnit(props.avatarSize),
}))
</script>

<template>
  <view v-if="loading" class="rb-skeleton" :class="[bem('rb-skeleton'), customClass]" :style="normalizeStyle(customStyle)">
    <view v-if="avatar" class="rb-skeleton__avatar" :style="avatarSizeStyle" />
    <view class="rb-skeleton__content">
      <view v-if="title" class="rb-skeleton__title" />
      <view
        v-for="i in rows"
        :key="i"
        class="rb-skeleton__row"
        :style="{ height: rowHeightStyle }"
      />
    </view>
  </view>
  <slot v-else />
</template>
