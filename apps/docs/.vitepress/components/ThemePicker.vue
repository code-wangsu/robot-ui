<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  getTheme,
  getThemePresets,
  setPrimaryColor,
  setTheme,
  type RbThemeKey,
} from '@robot-ui/utils'

const presets = getThemePresets()
const current = ref<string>('tech-blue')
const customPrimary = ref('#3c9cff')

onMounted(() => {
  current.value = getTheme()
  const hit = presets.find((p) => p.key === current.value)
  if (hit) customPrimary.value = hit.primary
})

function onPick(key: RbThemeKey) {
  setTheme(key)
  current.value = key
  const hit = presets.find((p) => p.key === key)
  if (hit) customPrimary.value = hit.primary
}

function onCustomPrimary() {
  if (!/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(customPrimary.value)) return
  setPrimaryColor(customPrimary.value)
}
</script>

<template>
  <div class="theme-picker">
    <div class="theme-picker__grid">
      <button
        v-for="item in presets"
        :key="item.key"
        type="button"
        class="theme-picker__item"
        :class="{ 'is-active': current === item.key }"
        @click="onPick(item.key)"
      >
        <span class="theme-picker__swatch" :style="{ background: item.primary }" />
        <span class="theme-picker__label">{{ item.label }}</span>
      </button>
    </div>

    <div class="theme-picker__custom">
      <span class="theme-picker__custom-label">自定义主色</span>
      <input v-model="customPrimary" type="color" class="theme-picker__color" @input="onCustomPrimary" />
      <input
        v-model="customPrimary"
        class="theme-picker__hex"
        placeholder="#3c9cff"
        @change="onCustomPrimary"
      />
    </div>

    <div class="theme-picker__preview">
      <rb-button type="primary" text="主要按钮" />
      <rb-button type="success" text="成功" />
      <rb-tag text="主题标签" type="primary" effect="dark" />
      <rb-tag text="浅底" type="primary" effect="light" />
    </div>
  </div>
</template>

<style scoped>
.theme-picker {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.theme-picker__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(108px, 1fr));
  gap: 10px;
}

.theme-picker__item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  cursor: pointer;
  text-align: left;
}

.theme-picker__item.is-active {
  border-color: var(--vp-c-brand-1, #3c9cff);
  background: var(--vp-c-brand-soft, rgba(60, 156, 255, 0.12));
  box-shadow: none;
}

.theme-picker__btn:hover,
.theme-picker__hex:focus {
  border-color: var(--vp-c-brand-1, #3c9cff);
}


.theme-picker__swatch {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  flex-shrink: 0;
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.theme-picker__label {
  font-size: 13px;
  color: var(--vp-c-text-1);
}

.theme-picker__custom {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.theme-picker__custom-label {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.theme-picker__color {
  width: 36px;
  height: 28px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
}

.theme-picker__hex {
  width: 110px;
  height: 30px;
  padding: 0 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 13px;
}

.theme-picker__preview {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  padding-top: 4px;
}
</style>
