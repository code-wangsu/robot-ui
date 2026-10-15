<script setup lang="ts">
import { computed, ref, useSlots } from 'vue'

const props = withDefaults(
  defineProps<{
    title?: string
    rawSource?: string
  }>(),
  {
    title: '',
    rawSource: '',
  },
)

const slots = useSlots()
const sourceVisible = ref(false)
const copied = ref(false)

const hasCode = computed(() => Boolean(slots.code || props.rawSource))

async function copyCode() {
  const text = props.rawSource || ''
  if (!text) return
  try {
    await navigator.clipboard.writeText(text)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 1200)
  } catch {
    copied.value = false
  }
}
</script>

<template>
  <div class="demo-block" :class="{ 'is-expanded': sourceVisible }">
    <div class="demo-block__preview">
      <div v-if="title" class="demo-block__title">{{ title }}</div>
      <div class="demo-block__source-preview">
        <slot />
      </div>
    </div>

    <div v-if="hasCode" class="demo-block__control">
      <span v-if="copied" class="demo-block__tip">已复制</span>
      <button
        type="button"
        class="demo-block__icon-btn"
        title="复制代码"
        aria-label="复制代码"
        @click="copyCode"
      >
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <path
            fill="currentColor"
            d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
          />
        </svg>
      </button>
      <button
        type="button"
        class="demo-block__icon-btn"
        :class="{ 'is-active': sourceVisible }"
        :title="sourceVisible ? '隐藏代码' : '查看源代码'"
        :aria-label="sourceVisible ? '隐藏代码' : '查看源代码'"
        @click="sourceVisible = !sourceVisible"
      >
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <path
            fill="currentColor"
            d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"
          />
        </svg>
      </button>
    </div>

    <div v-show="sourceVisible" class="demo-block__meta">
      <slot name="code">
        <pre v-if="rawSource" class="demo-block__pre"><code>{{ rawSource }}</code></pre>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.demo-block {
  margin: 16px 0 32px;
  border: 1px solid var(--rb-demo-border, #dcdfe6);
  border-radius: var(--rb-demo-radius, 4px);
  background: var(--vp-c-bg, #fff);
  transition: border-color 0.2s;
}

.demo-block:hover {
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.04);
}

.demo-block__preview {
  padding: 24px;
}

.demo-block__title {
  margin-bottom: 16px;
  font-size: 14px;
  color: var(--vp-c-text-2, #606266);
}

.demo-block__source-preview {
  min-height: 32px;
}

.demo-block__control {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  height: 44px;
  padding: 0 12px;
  border-top: 1px solid var(--rb-demo-border, #dcdfe6);
  background: var(--vp-c-bg, #fff);
}

.demo-block__tip {
  margin-right: 8px;
  font-size: 12px;
  color: var(--vp-c-brand-1, #3c9cff);
}

.demo-block__icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border: none;
  border-radius: 4px;
  background: transparent;
  color: var(--vp-c-text-3, #909399);
  cursor: pointer;
  transition: color 0.2s, background 0.2s;
}

.demo-block__icon-btn:hover,
.demo-block__icon-btn.is-active {
  color: var(--vp-c-brand-1, #3c9cff);
  background: var(--vp-c-brand-soft, rgba(60, 156, 255, 0.12));
}

.demo-block__meta {
  border-top: 1px solid var(--rb-demo-border, #dcdfe6);
  background: var(--vp-code-block-bg, #fafafa);
}

.demo-block__meta :deep(pre),
.demo-block__pre {
  margin: 0;
  padding: 20px 24px;
  overflow: auto;
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-1, #303133);
  background: transparent;
}

.demo-block__meta :deep(div[class*='language-']) {
  margin: 0;
  border-radius: 0;
  background: transparent !important;
}

.demo-block__meta :deep(div[class*='language-'] code) {
  color: var(--vp-c-text-1, #303133);
  background: transparent;
}

.demo-block__meta :deep(.lang),
.demo-block__meta :deep(.copy) {
  display: none;
}
</style>
