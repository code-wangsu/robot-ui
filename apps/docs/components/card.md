<script setup lang="ts">
import BasicDemo from '../examples/card/basic.vue'

const basicSource = `<template>
<rb-card title="标题" type="success">内容</rb-card>
<\/template>
`
</script>

# Card 卡片

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<template>
<rb-card title="标题" type="success">内容</rb-card>
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 头部标题 | `string` | '' |
| extra | 头部右侧附加信息（如时间） | `string` | '' |
| type | 头部主题色 | `RbCardType` | 'success' |
| showHeader | 是否显示头部 | `boolean` | true |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Card** 测试按钮即可验证。
