<script setup lang="ts">
import BasicDemo from '../examples/action-sheet/basic.vue'

const basicSource = `<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
const actions = [{ name: '拍照' }, { name: '从相册选择' }]
<\/script>

<template>
<rb-button text="打开动作面板" type="primary" @click="show = true" />
<rb-action-sheet v-model:show="show" :actions="actions" />
<\/template>
`
</script>

# ActionSheet 动作面板

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
const actions = [{ name: '拍照' }, { name: '从相册选择' }]
</script>

<template>
<rb-button text="打开动作面板" type="primary" @click="show = true" />
<rb-action-sheet v-model:show="show" :actions="actions" />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| show | show | `boolean` | false |
| title | title | `string` | '' |
| actions | actions | `ActionSheetItem[]` | [] |
| cancelText | cancelText | `string` | '取消' |
| closeOnClickOverlay | closeOnClickOverlay | `boolean` | true |
| safeAreaInsetBottom | safeAreaInsetBottom | `boolean` | true |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| select | - |
| cancel | - |
| close | - |
| update:show | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **ActionSheet** 测试按钮即可验证。
