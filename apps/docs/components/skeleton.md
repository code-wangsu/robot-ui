<script setup lang="ts">
import BasicDemo from '../examples/skeleton/basic.vue'

const basicSource = `<template>
<rb-skeleton :loading="true" :rows="3" />
<\/template>
`
</script>

# Skeleton 骨架屏

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<template>
<rb-skeleton :loading="true" :rows="3" />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| loading | loading | `boolean` | true |
| rows | rows | `number` | 3 |
| title | title | `boolean` | true |
| avatar | avatar | `boolean` | false |
| rowHeight | rowHeight | `string | number` | 32 |
| avatarSize | avatarSize | `string | number` | 80 |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Skeleton** 测试按钮即可验证。
