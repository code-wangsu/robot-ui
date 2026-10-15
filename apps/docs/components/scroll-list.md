<script setup lang="ts">
import BasicDemo from '../examples/scroll-list/basic.vue'

const basicSource = `<template>
<rb-scroll-list>
  <view v-for="i in 8" :key="i" style="padding:12px 16px;margin-right:8px;background:#ecf5ff;border-radius:8px;white-space:nowrap">项{{ i }}</view>
</rb-scroll-list>
<\/template>
`
</script>

# ScrollList 横向滚动

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<template>
<rb-scroll-list>
  <view v-for="i in 8" :key="i" style="padding:12px 16px;margin-right:8px;background:#ecf5ff;border-radius:8px;white-space:nowrap">项{{ i }}</view>
</rb-scroll-list>
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| height | height | `string | number` | 200 |
| indicator | indicator | `boolean` | false |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| scroll | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **ScrollList** 测试按钮即可验证。
