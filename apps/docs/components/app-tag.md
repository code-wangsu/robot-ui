<script setup lang="ts">
import BasicDemo from '../examples/app-tag/basic.vue'

const basicSource = `<template>
<rb-app-tag text="标签" />
<\/template>
`
</script>

# AppTag 业务标签

::: tip
兼容旧 API，新项目推荐使用 `RbTag`。
:::

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<template>
<rb-app-tag text="标签" />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| text | text | `string` | '' |
| type | type | `string` | 'default' |
| variant | variant | `'soft' | 'solid'` | 'soft' |
| size | size | `'sm' | 'md'` | 'sm' |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| click | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **AppTag** 测试按钮即可验证。
