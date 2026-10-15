<script setup lang="ts">
import BasicDemo from '../examples/root-portal/basic.vue'

const basicSource = `<template>
<rb-root-portal>
  <view style="padding:12px;background:#ecf5ff;border-radius:8px">挂到页面根（文档站为 teleport）</view>
</rb-root-portal>
<\/template>
`
</script>

# RootPortal 根节点传送

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<template>
<rb-root-portal>
  <view style="padding:12px;background:#ecf5ff;border-radius:8px">挂到页面根（文档站为 teleport）</view>
</rb-root-portal>
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| — | 详见源码 props | — | — |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **RootPortal** 测试按钮即可验证。
