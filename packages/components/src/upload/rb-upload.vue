<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { addUnit } from '@robot-ui/utils'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbUpload' })

/** 对齐 Element Plus UploadFile.status */
export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'fail'

export interface UploadFileItem {
  /** 唯一标识 */
  uid?: string | number
  name?: string
  url?: string
  /** 本地临时路径（选图后 / 上传前） */
  path?: string
  size?: number
  status?: UploadFileStatus
  percent?: number
  /** 服务端响应原文或解析后的对象 */
  response?: unknown
  /** 失败信息 */
  error?: string
}

export type UploadListType = 'text' | 'picture' | 'picture-card'
export type UploadAccept = 'image' | 'video' | 'media'

export interface UploadRawFile {
  path: string
  name: string
  size: number
  type: 'image' | 'video'
}

export interface UploadRequestOptions {
  action: string
  filePath: string
  name: string
  file: UploadFileItem
  data: Record<string, unknown>
  headers: Record<string, string>
  onProgress: (percent: number) => void
  onSuccess: (response: unknown) => void
  onError: (error: Error) => void
}

const props = withDefaults(
  defineProps<{
    /** v-model:file-list */
    fileList?: UploadFileItem[]
    /** 上传地址，对齐 Element Plus action；空则只选文件不上传 */
    action?: string
    /** 上传的文件字段名，对齐 name，对应 uni.uploadFile.name */
    name?: string
    /** 额外 formData，对齐 data */
    data?: Record<string, unknown>
    /** 请求头，对齐 headers */
    headers?: Record<string, string>
    /** 是否在选取后自动上传 */
    autoUpload?: boolean
    /** 是否显示已上传文件列表 */
    showFileList?: boolean
    /** 文件列表类型 */
    listType?: UploadListType
    /** 是否禁用 */
    disabled?: boolean
    /** 最大允许上传个数，对齐 limit */
    limit?: number
    /** 是否支持多选（图片） */
    multiple?: boolean
    /**
     * 选择媒体类型：image | video | media
     * App/Android：image → chooseImage；video → chooseVideo
     */
    accept?: UploadAccept
    /** 图片压缩：original / compressed */
    sizeType?: Array<'original' | 'compressed'>
    /** album / camera */
    sourceType?: Array<'album' | 'camera'>
    /** 视频最长秒数 */
    maxDuration?: number
    /** 预览卡片尺寸 */
    previewSize?: string | number
    /** 上传按钮文案 */
    tip?: string
    /** 从响应中解析 url 的字段名 */
    urlField?: string
    /**
     * 上传前钩子，返回 false / Promise.reject 则停止
     * 对齐 Element Plus before-upload
     */
    beforeUpload?: (file: UploadRawFile) => boolean | Promise<boolean>
    /** 删除前钩子 */
    beforeRemove?: (file: UploadFileItem, fileList: UploadFileItem[]) => boolean | Promise<boolean>
    /**
     * 覆盖默认上传，对齐 http-request
     * 需自行调用 options.onSuccess / onError
     */
    httpRequest?: (options: UploadRequestOptions) => void | Promise<void>
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    fileList: () => [],
    action: '',
    name: 'file',
    data: () => ({}),
    headers: () => ({}),
    autoUpload: true,
    showFileList: true,
    listType: 'picture-card',
    disabled: false,
    limit: 9,
    multiple: true,
    accept: 'image',
    sizeType: () => ['original', 'compressed'],
    sourceType: () => ['album', 'camera'],
    maxDuration: 60,
    previewSize: 160,
    tip: '上传',
    urlField: 'url',
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  'update:fileList': [list: UploadFileItem[]]
  /** 文件状态改变时，对齐 on-change */
  change: [file: UploadFileItem, fileList: UploadFileItem[]]
  /** 上传成功 */
  success: [response: unknown, file: UploadFileItem, fileList: UploadFileItem[]]
  /** 上传失败 */
  error: [error: Error, file: UploadFileItem, fileList: UploadFileItem[]]
  /** 上传进度 */
  progress: [percent: number, file: UploadFileItem, fileList: UploadFileItem[]]
  /** 删除文件 */
  remove: [file: UploadFileItem, fileList: UploadFileItem[]]
  /** 点击已上传文件预览 */
  preview: [file: UploadFileItem]
  /** 超出 limit */
  exceed: [files: UploadRawFile[], fileList: UploadFileItem[]]
  /** 选取完成（尚未/即将上传） */
  afterRead: [files: UploadFileItem[], fileList: UploadFileItem[]]
}>()

const uploadingMap = ref<Record<string, UniApp.UploadTask | null>>({})
/** 内部列表，避免选图后立即上传时 props 尚未回写 */
const innerList = ref<UploadFileItem[]>([...props.fileList])

watch(
  () => props.fileList,
  (list) => {
    innerList.value = [...list]
  },
  { deep: true },
)

const previewStyle = computed(() => ({
  width: addUnit(props.previewSize),
  height: addUnit(props.previewSize),
}))

const canUpload = computed(() => !props.disabled && innerList.value.length < props.limit)

const isCard = computed(() => props.listType === 'picture-card')
const isPicture = computed(() => props.listType === 'picture' || props.listType === 'picture-card')

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function fileDisplayUrl(file: UploadFileItem) {
  return file.url || file.path || ''
}

function updateList(next: UploadFileItem[]) {
  innerList.value = next
  emit('update:fileList', next)
}

function patchFile(uidValue: string | number | undefined, patch: Partial<UploadFileItem>) {
  const next = innerList.value.map((item) =>
    item.uid === uidValue ? { ...item, ...patch } : item,
  )
  updateList(next)
  const file = next.find((item) => item.uid === uidValue)
  if (file) emit('change', file, next)
  return next
}

function pickUrlFromResponse(response: unknown): string {
  if (!response) return ''
  if (typeof response === 'string') {
    try {
      return pickUrlFromResponse(JSON.parse(response))
    } catch {
      return response
    }
  }
  if (typeof response === 'object') {
    const obj = response as Record<string, unknown>
    const field = props.urlField
    if (typeof obj[field] === 'string') return obj[field] as string
    if (typeof obj.data === 'string') return obj.data
    if (obj.data && typeof obj.data === 'object') {
      const data = obj.data as Record<string, unknown>
      if (typeof data[field] === 'string') return data[field] as string
      if (typeof data.url === 'string') return data.url
    }
    if (typeof obj.url === 'string') return obj.url
  }
  return ''
}

async function runBeforeUpload(file: UploadRawFile) {
  if (!props.beforeUpload) return true
  try {
    const result = await props.beforeUpload(file)
    return result !== false
  } catch {
    return false
  }
}

function defaultHttpRequest(options: UploadRequestOptions) {
  if (!options.action) {
    options.onError(new Error('缺少 action 上传地址'))
    return
  }

  const formData: Record<string, any> = {}
  Object.keys(options.data || {}).forEach((key) => {
    const val = options.data[key]
    if (val === undefined || val === null) return
    formData[key] = typeof val === 'object' ? JSON.stringify(val) : String(val)
  })

  const task = uni.uploadFile({
    url: options.action,
    filePath: options.filePath,
    name: options.name,
    header: options.headers,
    formData,
    success: (res) => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        let body: unknown = res.data
        try {
          body = typeof res.data === 'string' ? JSON.parse(res.data) : res.data
        } catch {
          body = res.data
        }
        options.onSuccess(body)
      } else {
        options.onError(new Error(`上传失败(${res.statusCode})`))
      }
    },
    fail: (err) => {
      options.onError(new Error(err.errMsg || '上传失败'))
    },
  })

  if (options.file.uid != null) {
    uploadingMap.value[String(options.file.uid)] = task
  }

  task.onProgressUpdate?.((e) => {
    options.onProgress(e.progress)
  })
}

function uploadFileItem(file: UploadFileItem) {
  const filePath = file.path || file.url
  if (!filePath) return

  const options: UploadRequestOptions = {
    action: props.action,
    filePath,
    name: props.name,
    file,
    data: { ...props.data },
    headers: { ...props.headers },
    onProgress: (percent) => {
      const current = innerList.value.find((item) => item.uid === file.uid)
      if (!current || current.status === 'success' || current.status === 'fail') return
      const list = patchFile(file.uid, { status: 'uploading', percent })
      const next = list.find((item) => item.uid === file.uid)
      if (next) emit('progress', percent, next, list)
    },
    onSuccess: (response) => {
      if (file.uid != null) delete uploadingMap.value[String(file.uid)]
      const remoteUrl = pickUrlFromResponse(response)
      const list = patchFile(file.uid, {
        status: 'success',
        percent: 100,
        response,
        url: remoteUrl || file.url || file.path,
        error: undefined,
      })
      const current = list.find((item) => item.uid === file.uid)!
      emit('success', response, current, list)
    },
    onError: (error) => {
      if (file.uid != null) delete uploadingMap.value[String(file.uid)]
      const list = patchFile(file.uid, {
        status: 'fail',
        error: error.message,
      })
      const current = list.find((item) => item.uid === file.uid)!
      emit('error', error, current, list)
    },
  }

  patchFile(file.uid, { status: 'uploading', percent: 0 })

  if (props.httpRequest) {
    Promise.resolve(props.httpRequest(options)).catch((err: Error) => {
      options.onError(err instanceof Error ? err : new Error(String(err)))
    })
    return
  }

  defaultHttpRequest(options)
}

async function appendRawFiles(rawFiles: UploadRawFile[]) {
  if (!rawFiles.length) return

  const remain = props.limit - innerList.value.length
  if (rawFiles.length > remain) {
    emit('exceed', rawFiles, innerList.value)
    rawFiles = rawFiles.slice(0, Math.max(0, remain))
  }
  if (!rawFiles.length) return

  const accepted: UploadFileItem[] = []
  for (const raw of rawFiles) {
    const ok = await runBeforeUpload(raw)
    if (!ok) continue
    accepted.push({
      uid: uid(),
      name: raw.name,
      path: raw.path,
      url: raw.path,
      size: raw.size,
      status: props.autoUpload && props.action ? 'ready' : 'success',
      percent: 0,
    })
  }

  if (!accepted.length) return

  const next = [...innerList.value, ...accepted]
  updateList(next)
  accepted.forEach((file) => emit('change', file, next))
  emit('afterRead', accepted, next)

  if (props.autoUpload && props.action) {
    accepted.forEach((file) => uploadFileItem(file))
  }
}

function chooseImageFiles() {
  const remain = props.limit - innerList.value.length
  if (remain <= 0) {
    emit('exceed', [], innerList.value)
    return
  }

  uni.chooseImage({
    count: props.multiple ? remain : 1,
    sizeType: props.sizeType,
    sourceType: props.sourceType,
    success: (res) => {
      const paths = (res.tempFilePaths || []) as string[]
      const tempFiles = (res.tempFiles || []) as Array<{ path?: string; size?: number; name?: string }>
      const rawFiles: UploadRawFile[] = paths.map((path, index) => {
        const meta = tempFiles[index] || {}
        return {
          path: meta.path || path,
          name: meta.name || path.split('/').pop() || `image-${index}.jpg`,
          size: meta.size || 0,
          type: 'image',
        }
      })
      appendRawFiles(rawFiles)
    },
  })
}

function chooseVideoFile() {
  if (innerList.value.length >= props.limit) {
    emit('exceed', [], innerList.value)
    return
  }

  uni.chooseVideo({
    sourceType: props.sourceType,
    compressed: props.sizeType.includes('compressed'),
    maxDuration: props.maxDuration,
    success: (res) => {
      const path = res.tempFilePath
      appendRawFiles([
        {
          path,
          name: path.split('/').pop() || 'video.mp4',
          size: res.size || 0,
          type: 'video',
        },
      ])
    },
  })
}

function openChooser() {
  if (!canUpload.value) return
  if (props.accept === 'video') {
    chooseVideoFile()
    return
  }
  // media：优先图片；需要视频可单独设 accept=video
  chooseImageFiles()
}

async function remove(index: number) {
  if (props.disabled) return
  const file = innerList.value[index]
  if (!file) return

  if (props.beforeRemove) {
    try {
      const ok = await props.beforeRemove(file, innerList.value)
      if (ok === false) return
    } catch {
      return
    }
  }

  if (file.uid != null) {
    const task = uploadingMap.value[String(file.uid)]
    task?.abort?.()
    delete uploadingMap.value[String(file.uid)]
  }

  const next = innerList.value.filter((_, i) => i !== index)
  updateList(next)
  emit('remove', file, next)
  emit('change', file, next)
}

function onPreview(file: UploadFileItem) {
  emit('preview', file)
  const url = fileDisplayUrl(file)
  if (!url) return

  if (props.accept === 'video' || /\.(mp4|mov|m4v|3gp|avi)(\?|$)/i.test(url)) {
    // 视频交给业务处理；picture 列表仍可点击
    return
  }

  const urls = innerList.value
    .map((item) => fileDisplayUrl(item))
    .filter(Boolean)
  uni.previewImage({
    urls,
    current: url,
  })
}

/** 手动触发上传未完成的文件，对齐 submit() */
function submit() {
  innerList.value
    .filter((file) => file.status === 'ready' || file.status === 'fail')
    .forEach((file) => uploadFileItem(file))
}

/** 清空列表 */
function clearFiles(statuses?: UploadFileStatus[]) {
  if (!statuses?.length) {
    updateList([])
    return
  }
  updateList(innerList.value.filter((file) => !statuses.includes(file.status || 'ready')))
}

defineExpose({
  submit,
  clearFiles,
  chooseFile: openChooser,
})
</script>

<template>
  <view
    class="rb-upload"
    :class="[bem('rb-upload', disabled && 'disabled', listType), customClass]"
    :style="normalizeStyle(customStyle)"
  >
    <view v-if="showFileList" class="rb-upload__list">
      <view
        v-for="(item, index) in innerList"
        :key="item.uid ?? item.url ?? index"
        class="rb-upload__item"
        :class="`rb-upload__item--${item.status || 'ready'}`"
        :style="isCard ? previewStyle : undefined"
      >
        <template v-if="isPicture">
          <image
            class="rb-upload__image"
            :src="fileDisplayUrl(item)"
            mode="aspectFill"
            @click="onPreview(item)"
          />
          <view
            v-if="item.status === 'uploading'"
            class="rb-upload__status"
          >
            <view class="rb-upload__spinner" />
            <text class="rb-upload__percent">{{ item.percent || 0 }}%</text>
          </view>
          <view
            v-else-if="item.status === 'fail'"
            class="rb-upload__status rb-upload__status--fail"
            @click="uploadFileItem(item)"
          >
            <text class="rb-upload__status-text">失败重试</text>
          </view>
        </template>
        <template v-else>
          <view class="rb-upload__text-row" @click="onPreview(item)">
            <text class="rb-upload__name">{{ item.name || fileDisplayUrl(item) }}</text>
            <text
              class="rb-upload__state"
              :class="`rb-upload__state--${item.status || 'ready'}`"
            >
              {{ item.status === 'uploading' ? `${item.percent || 0}%` : (item.status || 'ready') }}
            </text>
          </view>
        </template>

        <view
          v-if="!disabled"
          class="rb-upload__delete"
          @click.stop="remove(index)"
        >
          ×
        </view>
      </view>
    </view>

    <view
      v-if="canUpload"
      class="rb-upload__trigger"
      :class="{ 'rb-upload__trigger--card': isCard }"
      :style="isCard ? previewStyle : undefined"
      @click="openChooser"
    >
      <slot>
        <text class="rb-upload__plus">+</text>
        <text class="rb-upload__tip">{{ tip }}</text>
      </slot>
    </view>
  </view>
</template>
