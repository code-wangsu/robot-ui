<script setup lang="ts">
import { computed } from 'vue'
import { bem, normalizeStyle } from '../composables/useBem'
import RbPopup from '../popup/rb-popup.vue'
import RbButton from '../button/rb-button.vue'

defineOptions({ name: 'RbModal' })

const props = withDefaults(
  defineProps<{
    show?: boolean
    title?: string
    content?: string
    showCancelButton?: boolean
    cancelText?: string
    confirmText?: string
    closeOnClickOverlay?: boolean
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    show: false,
    title: '提示',
    content: '',
    showCancelButton: true,
    cancelText: '取消',
    confirmText: '确定',
    closeOnClickOverlay: false,
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  confirm: []
  cancel: []
  'update:show': [value: boolean]
}>()

const innerShow = computed({
  get: () => props.show,
  set: (val: boolean) => emit('update:show', val),
})

function onConfirm() {
  emit('confirm')
  innerShow.value = false
}

function onCancel() {
  emit('cancel')
  innerShow.value = false
}
</script>

<template>
  <rb-popup
    v-model:show="innerShow"
    mode="center"
    :round="16"
    :close-on-click-overlay="closeOnClickOverlay"
    :custom-class="customClass"
    :custom-style="customStyle"
  >
    <view class="rb-modal" :class="bem('rb-modal')">
      <view v-if="title || $slots.title" class="rb-modal__title">
        <slot name="title">{{ title }}</slot>
      </view>
      <view v-if="content || $slots.default" class="rb-modal__content">
        <slot>{{ content }}</slot>
      </view>
      <view class="rb-modal__footer">
        <rb-button
          v-if="showCancelButton"
          class="rb-modal__btn"
          type="info"
          plain
          :text="cancelText"
          @click="onCancel"
        />
        <rb-button class="rb-modal__btn" type="primary" :text="confirmText" @click="onConfirm" />
      </view>
    </view>
  </rb-popup>
</template>
