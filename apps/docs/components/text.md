<script setup lang="ts">
import BasicDemo from '../examples/text/basic.vue'

const basicSource = `<template>
<rb-text text="普通文本" />
<rb-text type="primary" text="主题色" />
<\/template>
`
</script>

# Text 文本

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<template>
<rb-text text="普通文本" />
<rb-text type="primary" text="主题色" />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| text | text | `string` | '' |
| type | type | `RbType | 'main' | 'content' | 'tips' | 'default'` | 'default' |
| size | size | `RbSize | number` | 'medium' |
| color | color | `string` | '' |
| bold | bold | `boolean` | false |
| lines | 超出省略行数，0 不限制 | `number` | 0 |
| truncated | 单行省略（对齐 Element Plus truncated） | `boolean` | false |
| align | align | `'left' | 'center' | 'right'` | 'left' |
| copyable | 点击复制全文 | `boolean` | false |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| click | - |
| copy | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Text** 测试按钮即可验证。
