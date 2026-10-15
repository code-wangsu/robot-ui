<script setup lang="ts">
import BasicDemo from '../examples/link/basic.vue'

const basicSource = `<template>
<rb-link href="https://example.com" text="打开链接" />
<\/template>
`
</script>

# Link 链接

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<template>
<rb-link href="https://example.com" text="打开链接" />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| text | text | `string` | '' |
| href | 页面路径，内部走 uni.navigateTo；外链请自行在 click 处理 | `string` | '' |
| type | type | `RbType | 'default'` | 'default' |
| underline | 是否显示下划线（对齐 Element Plus underline） | `boolean` | true |
| disabled | disabled | `boolean` | false |
| icon | 图标文案（简单字符，避免强依赖字体图标） | `string` | '' |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| click | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Link** 测试按钮即可验证。
