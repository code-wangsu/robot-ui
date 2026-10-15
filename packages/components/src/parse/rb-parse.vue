<script setup lang="ts">
import { computed } from 'vue'
import { extractImageSrcs, sanitizeHtml } from '@robot-ui/utils'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbParse' })

const props = withDefaults(
  defineProps<{
    content?: string
    /** 是否净化 HTML（默认开启） */
    sanitize?: boolean
    selectable?: boolean
    /** 点击图片时预览 */
    previewImg?: boolean
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    content: '',
    sanitize: true,
    selectable: false,
    previewImg: true,
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  linkTap: [href: string]
  imgTap: [src: string]
}>()

const nodes = computed(() => {
  const raw = props.content || ''
  return props.sanitize ? sanitizeHtml(raw) : raw
})

const imageSrcs = computed(() => extractImageSrcs(nodes.value))

function onItemClick(event: { detail?: { node?: { name?: string; attrs?: Record<string, string> }; href?: string } }) {
  const detail = event.detail ?? {}
  const href = detail.href || detail.node?.attrs?.href || ''
  const src = detail.node?.attrs?.src || ''
  const name = detail.node?.name

  if (href || name === 'a') {
    emit('linkTap', href)
    return
  }

  if (src || name === 'img') {
    emit('imgTap', src)
    if (props.previewImg && src && typeof uni !== 'undefined' && uni.previewImage) {
      uni.previewImage({
        current: src,
        urls: imageSrcs.value.length ? imageSrcs.value : [src],
      })
    }
  }
}
</script>

<template>
  <rich-text
    class="rb-parse"
    :class="[bem('rb-parse'), customClass]"
    :style="normalizeStyle(customStyle)"
    :nodes="nodes"
    :selectable="selectable"
    @itemclick="onItemClick"
  />
</template>
