<script setup lang="ts">
import BasicDemo from '../examples/tag/basic.vue'

const basicSource = `<template>
<rb-tag text="标签" type="primary" />
<rb-tag text="成功" type="success" effect="light" />
<\/template>
`
</script>

# Tag 标签

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<template>
<rb-tag text="标签" type="primary" />
<rb-tag text="成功" type="success" effect="light" />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| text | 标签文案；也可用默认插槽 | `string` | '' |
| type | type | `RbTagType` | 'primary' |
| effect | dark 实心 / light 浅底 / plain 描边 | `RbTagEffect` | 'light' |
| size | size | `RbTagSize` | 'default' |
| closable | 是否可关闭 | `boolean` | false |
| round | 是否圆角胶囊 | `boolean` | false |
| hit | 是否有边框描边强调（hit） | `boolean` | false |
| color | 自定义颜色（设置后覆盖 type 色板） | `string` | '' |
| disabled | disabled | `boolean` | false |
| plain | @deprecated 请用 effect="plain" | `boolean` | false |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| click | - |
| close | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Tag** 测试按钮即可验证。
