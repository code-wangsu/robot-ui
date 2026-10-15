<script setup lang="ts">
import BasicDemo from '../examples/list-item/basic.vue'

const basicSource = `<template>
<rb-list-item title="标题" note="说明" />
<\/template>
`
</script>

# ListItem 列表项

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<template>
<rb-list-item title="标题" note="说明" />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | title | `string` | '' |
| note | note | `string` | '' |
| arrow | arrow | `boolean` | false |
| disabled | disabled | `boolean` | false |
| padding | padding | `string | number` | 24 |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| click | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **ListItem** 测试按钮即可验证。
