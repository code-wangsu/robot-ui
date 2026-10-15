<script setup lang="ts">
import BasicDemo from '../examples/upload/basic.vue'

const basicSource = `<script setup lang="ts">
import { ref } from 'vue'
const fileList = ref([])
<\/script>

<template>
<rb-upload v-model:file-list="fileList" :auto-upload="false" />
<\/template>
`
</script>

# Upload 上传

::: tip
App/Android 使用 `uni.chooseImage` + `uni.uploadFile`。
:::

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<script setup lang="ts">
import { ref } from 'vue'
const fileList = ref([])
</script>

<template>
<rb-upload v-model:file-list="fileList" :auto-upload="false" />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| fileList | v-model:file-list | `UploadFileItem[]` | [] |
| action | 上传地址，对齐 Element Plus action；空则只选文件不上传 | `string` | '' |
| name | 上传的文件字段名，对齐 name，对应 uni.uploadFile.name | `string` | 'file' |
| data | 额外 formData，对齐 data | `Record&lt;string, unknown&gt;` | () => … |
| headers | 请求头，对齐 headers | `Record&lt;string, string&gt;` | () => … |
| autoUpload | 是否在选取后自动上传 | `boolean` | true |
| showFileList | 是否显示已上传文件列表 | `boolean` | true |
| listType | 文件列表类型 | `UploadListType` | 'picture-card' |
| disabled | 是否禁用 | `boolean` | false |
| limit | 最大允许上传个数，对齐 limit | `number` | 9 |
| multiple | 是否支持多选（图片） | `boolean` | true |
| accept | 选择媒体类型：image / video / media | `UploadAccept` | 'image' |
| sizeType | 图片压缩：original / compressed | `Array&lt;'original' \| 'compressed'&gt;` | `['original', 'compressed']` |
| sourceType | album / camera | `Array&lt;'album' \| 'camera'&gt;` | `['album', 'camera']` |
| maxDuration | 视频最长秒数 | `number` | 60 |
| previewSize | 预览卡片尺寸 | `string \| number` | 160 |
| tip | 上传按钮文案 | `string` | '上传' |
| urlField | 从响应中解析 url 的字段名 | `string` | 'url' |
| beforeUpload | 上传前钩子，返回 false / Promise.reject 则停止 | `(file) => boolean \| Promise&lt;boolean&gt;` | — |
| beforeRemove | 删除前钩子 | `(file, fileList) => boolean \| Promise&lt;boolean&gt;` | — |
| httpRequest | 覆盖默认上传，需自行调用 onSuccess / onError | `(options) => void \| Promise&lt;void&gt;` | — |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| update:fileList | - |
| change | 文件状态改变时，对齐 on-change |
| success | 上传成功 |
| error | 上传失败 |
| progress | 上传进度 |
| remove | 删除文件 |
| preview | 点击已上传文件预览 |
| exceed | 超出 limit |
| afterRead | 选取完成（尚未/即将上传） |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Upload** 测试按钮即可验证。
