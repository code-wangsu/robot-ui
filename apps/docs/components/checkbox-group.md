<script setup lang="ts">
import BasicDemo from '../examples/checkbox-group/basic.vue'

const basicSource = `<script setup lang="ts">
import { ref } from 'vue'
const list = ref(['a'])
<\/script>

<template>
<rb-checkbox-group v-model="list">
  <rb-checkbox name="a" label="选项 A" />
  <rb-checkbox name="b" label="选项 B" />
</rb-checkbox-group>
<\/template>
`
</script>

# CheckboxGroup 复选组

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<script setup lang="ts">
import { ref } from 'vue'
const list = ref(['a'])
</script>

<template>
<rb-checkbox-group v-model="list">
  <rb-checkbox name="a" label="选项 A" />
  <rb-checkbox name="b" label="选项 B" />
</rb-checkbox-group>
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | modelValue | `unknown[]` | [] |
| disabled | disabled | `boolean` | false |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| update:modelValue | - |
| change | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **CheckboxGroup** 测试按钮即可验证。
