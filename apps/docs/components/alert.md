<script setup lang="ts">
import BasicDemo from '../examples/alert/basic.vue'

const basicSource = `<template>
<rb-alert type="warning" title="注意" description="请检查输入" />
<\/template>
`
</script>

# Alert 警告提示

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<template>
<rb-alert type="warning" title="注意" description="请检查输入" />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | title | `string` | '' |
| description | description | `string` | '' |
| type | type | `RbType` | 'info' |
| showIcon | showIcon | `boolean` | true |
| closable | closable | `boolean` | false |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| close | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Alert** 测试按钮即可验证。
