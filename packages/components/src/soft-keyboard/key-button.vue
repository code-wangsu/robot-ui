<script setup lang="ts">
defineOptions({ name: 'RbSoftKeyButton' })

withDefaults(
  defineProps<{
    value?: string
    btnStyle?: string | Record<string, string | number>
  }>(),
  {
    value: '',
    btnStyle: '',
  },
)

const emit = defineEmits<{
  click: [event: Event]
  longpress: [event: Event]
}>()
</script>

<template>
  <button
    size="default"
    type="default"
    class="keyboard__btn"
    hover-class="keyboard__btn--hover"
    :data-index="value"
    :style="btnStyle"
    @click.stop="emit('click', $event)"
    @longpress.stop="emit('longpress', $event)"
  >
    <slot>{{ value }}</slot>
  </button>
</template>

<style lang="scss">
@use './keyboard.scss' as *;
</style>
