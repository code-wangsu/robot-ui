<script setup lang="ts">
import BasicDemo from '../examples/icon/basic.vue'

const basicSource = `<template>
<div style="display:flex;gap:16px;align-items:center">
  <rb-icon name="shuaxin" :size="28" />
  <rb-icon name="rili" :size="28" color="#3c9cff" />
  <rb-icon name="shuaxin" :size="28" spin />
</div>
<\/template>
`
</script>

# Icon 图标

robot-ui 图标基于 iconfont，API 参考 [Element Plus Icon](https://element-plus.org/zh-CN/component/icon.html)：支持 `name` 用法，也支持从 `@robot-ui/icons` 具名导入组件。

## 安装与引入

字体与元数据在 `@robot-ui/assets`，具名图标组件在 `@robot-ui/icons`。

```bash
pnpm add @robot-ui/icons
```

```ts
// 全量引入字体样式（使用具名图标或文档演示时）
import '@robot-ui/assets/iconfont.css'
// 或
import '@robot-ui/icons'
```

在 uni-app 中使用组件库时，`rb-icon` 会自动引入字体样式。

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<template>
<div style="display:flex;gap:16px;align-items:center">
  <rb-icon name="shuaxin" :size="28" />
  <rb-icon name="rili" :size="28" color="#3c9cff" />
  <rb-icon name="shuaxin" :size="28" spin />
</div>
</template>
```

  </template>
</DemoBlock>


## 具名组件（对齐 Element Plus）

```vue
<template>
  <Shuaxin :size="40" color="#3c9cff" />
  <Rili :size="40" />
  <Shangchuan :size="40" />
  <Fanhuishouye :size="40" />
</template>
```

## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| name | iconfont 的 `font_class` | `string` | `''` |
| size | 图标大小（数字默认 rpx） | `string \| number` | `32` |
| color | 图标颜色 | `string` | `''` |
| spin | 是否旋转 | `boolean` | `false` |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| click | 点击图标 |

## 图标集合

点击图标可复制 `name`。完整列表也可在 Playground → **Icon 图标库** 中浏览。

<IconGallery />

## 相关包

| 包名 | 说明 |
|------|------|
| `@robot-ui/assets` | iconfont 字体文件 + `iconList` / `RbIconName` |
| `@robot-ui/icons` | Element Plus 风格具名导出（如 `Shuaxin`） |
| `rb-icon` | 业务侧推荐用法 |
| `rb-icon-font` | 历史兼容，内部转发到 `rb-icon` |

更新 iconfont 资源后，在仓库根目录执行：

```bash
pnpm icons:gen
```
