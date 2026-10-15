<script setup lang="ts">
import { computed, ref } from 'vue'
import { iconList } from '@robot-ui/assets'
import '@robot-ui/assets/iconfont.css'

const keyword = ref('')
const copied = ref('')

const filtered = computed(() => {
  const q = keyword.value.trim().toLowerCase()
  if (!q) return iconList
  return iconList.filter(
    (item) =>
      item.name.toLowerCase().includes(q) ||
      item.title.toLowerCase().includes(q) ||
      item.componentName.toLowerCase().includes(q),
  )
})

async function onCopy(name: string) {
  try {
    await navigator.clipboard.writeText(name)
    copied.value = name
    setTimeout(() => {
      if (copied.value === name) copied.value = ''
    }, 1200)
  } catch {
    copied.value = ''
  }
}
</script>

<template>
  <div class="icon-gallery">
    <div class="icon-gallery__toolbar">
      <input
        v-model="keyword"
        class="icon-gallery__search"
        type="search"
        placeholder="搜索名称 / 中文 / 组件名"
      />
      <span class="icon-gallery__count">{{ filtered.length }} / {{ iconList.length }}</span>
    </div>

    <div class="icon-gallery__grid">
      <button
        v-for="item in filtered"
        :key="item.name"
        type="button"
        class="icon-gallery__item"
        :title="`点击复制 ${item.name}`"
        @click="onCopy(item.name)"
      >
        <i class="iconfont" :class="item.className" />
        <span class="icon-gallery__name">{{ item.name }}</span>
        <span class="icon-gallery__title">{{ item.title }}</span>
        <span v-if="copied === item.name" class="icon-gallery__copied">已复制</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.icon-gallery {
  margin: 16px 0 32px;
}

.icon-gallery__toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.icon-gallery__search {
  flex: 1;
  height: 36px;
  padding: 0 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.icon-gallery__count {
  font-size: 13px;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.icon-gallery__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 8px;
}

.icon-gallery__item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 16px 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  cursor: pointer;
  transition: border-color 0.2s, transform 0.15s;
}

.icon-gallery__item:hover {
  border-color: #3c9cff;
  transform: translateY(-1px);
}

.icon-gallery__item :deep(.iconfont),
.icon-gallery__item .iconfont {
  font-size: 28px;
  color: var(--vp-c-text-1);
  line-height: 1;
}

.icon-gallery__name {
  max-width: 100%;
  font-size: 12px;
  color: var(--vp-c-text-1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.icon-gallery__title {
  max-width: 100%;
  font-size: 11px;
  color: var(--vp-c-text-2);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.icon-gallery__copied {
  position: absolute;
  top: 6px;
  right: 6px;
  font-size: 10px;
  color: #3c9cff;
}
</style>
