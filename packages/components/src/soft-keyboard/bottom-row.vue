<script setup lang="ts">
import { computed } from 'vue'
import KeyButton from './key-button.vue'

defineOptions({ name: 'RbSoftKeyboardBottomRow' })

const props = withDefaults(
  defineProps<{
    enableSymbols?: boolean
    enableSpace?: boolean
    caseToggleIcon: string
    symbolToggleKey: string
    numberToggleKey: string
    /** ??????? vue-i18n? */
    labels?: {
      space?: string
      clear?: string
      confirm?: string
      back?: string
      symbol?: string
    }
  }>(),
  {
    enableSymbols: true,
    enableSpace: true,
    labels: () => ({}),
  },
)

defineEmits<{
  'toggle-case': []
  'key-click': [event: Event]
  space: [event: Event]
  clear: []
  confirm: []
}>()

const confirmStyle = computed(() => ({
  background: 'linear-gradient(156deg, #02c6e4 0%, #0e53fe 100%)',
  color: '#ffffff',
}))

function controlKeyLabel(key: string) {
  if (key === '123' || key === 'ABC') return key
  if (key === '??') return props.labels.back ?? '??'
  if (key === '?') return props.labels.symbol ?? '?'
  return key
}
</script>

<template>
  <view class="keyboard__row keyboard__row--bottom">
    <view class="keyboard__cell keyboard__cell--mode">
      <KeyButton v-if="enableSymbols" :value="symbolToggleKey" @click="$emit('key-click', $event)">
        {{ controlKeyLabel(symbolToggleKey) }}
      </KeyButton>
      <KeyButton v-else @click="$emit('toggle-case')">
        <image
          v-if="caseToggleIcon"
          class="keyboard__case-icon"
          :src="caseToggleIcon"
          mode="aspectFit"
        />
        <text v-else>?</text>
      </KeyButton>
    </view>
    <view class="keyboard__cell keyboard__cell--mode">
      <KeyButton :value="numberToggleKey" @click="$emit('key-click', $event)">
        {{ controlKeyLabel(numberToggleKey) }}
      </KeyButton>
    </view>
    <view v-if="enableSpace" class="keyboard__cell keyboard__cell--space">
      <KeyButton value="space" @click="$emit('space', $event)">
        {{ labels.space ?? '??' }}
      </KeyButton>
    </view>
    <view class="keyboard__cell keyboard__cell--action">
      <KeyButton value="del" @click="$emit('key-click', $event)" @longpress="$emit('clear')">
        {{ labels.clear ?? '??' }}
      </KeyButton>
    </view>
    <view class="keyboard__cell keyboard__cell--action">
      <KeyButton :btn-style="confirmStyle" @click="$emit('confirm')">
        {{ labels.confirm ?? '??' }}
      </KeyButton>
    </view>
  </view>
</template>

<style lang="scss">
@use './keyboard.scss' as *;
</style>
