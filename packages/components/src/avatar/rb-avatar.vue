<script setup lang="ts">
import { computed, inject } from 'vue'
import { addUnit } from '@robot-ui/utils'
import { bem, normalizeStyle } from '../composables/useBem'
import { AVATAR_GROUP_KEY } from '../composables/useAvatarGroup'

defineOptions({ name: 'RbAvatar' })

const props = withDefaults(
  defineProps<{
    src?: string
    text?: string
    size?: string | number
    shape?: 'circle' | 'square'
    bgColor?: string
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    src: '',
    text: '',
    size: 80,
    shape: 'circle',
    bgColor: '',
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  click: [event: Event]
}>()

const group = inject(AVATAR_GROUP_KEY, null)

const resolvedSize = computed(() => group?.size.value ?? props.size)

const avatarStyle = computed(() => {
  const style: Record<string, string | number> = {
    width: addUnit(resolvedSize.value),
    height: addUnit(resolvedSize.value),
  }
  if (props.bgColor) style.backgroundColor = props.bgColor
  const extra = normalizeStyle(props.customStyle)
  if (extra && typeof extra !== 'string') Object.assign(style, extra)
  return style
})
</script>

<template>
  <view
    class="rb-avatar"
    :class="[bem('rb-avatar', shape), customClass]"
    :style="avatarStyle"
    @click="emit('click', $event)"
  >
    <image v-if="src" class="rb-avatar__image" :src="src" mode="aspectFill" />
    <text v-else class="rb-avatar__text">
      <slot>{{ text }}</slot>
    </text>
  </view>
</template>
