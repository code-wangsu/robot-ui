/**
 * 为所有组件文档生成 DemoBlock（预览 + 源码），对齐 Element Plus。
 * 用法：node apps/docs/scripts/generate-demo-docs.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '../../..')
const DOCS_DIR = path.join(ROOT, 'apps/docs/components')
const EXAMPLES_DIR = path.join(ROOT, 'apps/docs/examples')

// 复用组件目录元数据（含 usage）
const require = createRequire(import.meta.url)
// CATALOG 在同目录 generate-component-docs.mjs 内，这里内联读取 usage 映射
const catalogPath = path.join(__dirname, 'generate-component-docs.mjs')
const catalogSrc = fs.readFileSync(catalogPath, 'utf8')
const catalogMatch = catalogSrc.match(/const CATALOG = \{([\s\S]*?)\n\}/)
if (!catalogMatch) throw new Error('无法解析 CATALOG')

/** @type {Record<string, { title: string; usage: string }>} */
const CATALOG = {}
{
  // 用 Function 解析对象字面量（仅本地脚本）
  // eslint-disable-next-line no-new-func
  const obj = new Function(`return {${catalogMatch[1]}\n}`)()
  for (const [k, v] of Object.entries(obj)) {
    CATALOG[k] = { title: v.title, usage: v.usage }
  }
}

/** 需要完整自定义示例的组件（覆盖 CATALOG.usage） */
const CUSTOM = {
  button: {
    script: '',
    template: `<div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
  <rb-button type="primary" text="主要按钮" />
  <rb-button type="success" plain text="朴素按钮" />
  <rb-button size="small" text="小按钮" />
</div>`,
  },
  'multi-select': {
    script: `const value = ref(['电力中断', '现场操作异常', '其他异常'])
const options = [
  '设备故障',
  '系统宕机',
  '网络中断',
  '电力中断',
  '现场操作异常',
  '其他异常',
]`,
    template: `<rb-multi-select
  v-model="value"
  title="选择异常类型"
  placeholder="请选择异常类型"
  :options="options"
  :max-collapse-count="2"
/>`,
  },
  toast: {
    script: `import { showToast } from '../../../../packages/components/src/toast/toast'

function open() {
  showToast({ title: '成功', message: '操作完成', type: 'success' })
}`,
    template: `<rb-button type="primary" text="打开 Toast" @click="open" />
<rb-toast />`,
  },
  form: {
    script: `const model = ref({ name: '' })
const rules = { name: [{ required: true, message: '请输入姓名' }] }`,
    template: `<rb-form :model="model" :rules="rules">
  <rb-form-item prop="name" label="姓名">
    <rb-input v-model="model.name" placeholder="请输入" />
  </rb-form-item>
</rb-form>`,
  },
  'form-item': {
    script: `const name = ref('')`,
    template: `<rb-form-item prop="name" label="姓名">
  <rb-input v-model="name" placeholder="请输入" />
</rb-form-item>`,
  },
  table: {
    script: `const columns = [
  { type: 'selection', fixed: 'left' },
  { type: 'expand', fixed: 'left' },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'post', label: '岗位', width: 140 },
]
const childColumns = [
  { prop: 'task', label: '子任务', width: 160 },
  { prop: 'progress', label: '进度', width: 100 },
]
const list = [
  {
    id: 1,
    name: '刘小北',
    post: '拣货',
    children: [
      { task: 'A区拣货', progress: '80%' },
      { task: '复核打包', progress: '40%' },
    ],
  },
  { id: 2, name: '赵小南', post: '上料', children: [] },
]`,
    template: `<rb-table :columns="columns" :data="list" row-key="id" border :height="360">
  <template #expand="{ row }">
    <rb-table v-if="row.children?.length" :columns="childColumns" :data="row.children" size="small" />
    <rb-empty v-else text="暂无子任务" compact />
  </template>
</rb-table>`,
  },
  picker: {
    script: `const show = ref(false)
const columns = [
  [
    { label: '选项一', value: '1' },
    { label: '选项二', value: '2' },
    { label: '选项三', value: '3' },
  ],
]`,
    template: `<rb-button text="打开选择器" type="primary" @click="show = true" />
<rb-picker v-model:show="show" :columns="columns" />`,
  },
  'datetime-picker': {
    script: `const show = ref(false)`,
    template: `<rb-button text="选择时间" type="primary" @click="show = true" />
<rb-datetime-picker v-model:show="show" mode="datetime" />`,
  },
  keyboard: {
    script: `const show = ref(false)
const value = ref('')`,
    template: `<rb-button text="打开键盘" type="primary" @click="show = true" />
<view style="margin-top:12px">{{ value || '待输入' }}</view>
<rb-keyboard v-model:show="show" @change="(v) => (value = value + v)" />`,
  },
  popup: {
    script: `const show = ref(false)`,
    template: `<rb-button text="打开弹层" type="primary" @click="show = true" />
<rb-popup v-model:show="show" mode="center" :round="16">
  <view style="padding:24px;min-width:200px;text-align:center">弹层内容</view>
</rb-popup>`,
  },
  modal: {
    script: `const show = ref(false)`,
    template: `<rb-button text="打开模态框" type="primary" @click="show = true" />
<rb-modal v-model:show="show" title="提示" content="确认执行该操作？" />`,
  },
  'app-dialog': {
    script: `const show = ref(false)`,
    template: `<rb-button text="打开业务弹窗" type="primary" @click="show = true" />
<rb-app-dialog v-model="show" title="业务弹窗">
  <view style="padding:12px 0">弹窗内容</view>
  <template #footer>
    <rb-button size="small" text="取消" @click="show = false" />
    <rb-button size="small" type="primary" text="确定" @click="show = false" />
  </template>
</rb-app-dialog>`,
  },
  'action-sheet': {
    script: `const show = ref(false)
const actions = [{ name: '拍照' }, { name: '从相册选择' }]`,
    template: `<rb-button text="打开动作面板" type="primary" @click="show = true" />
<rb-action-sheet v-model:show="show" :actions="actions" />`,
  },
  overlay: {
    script: `const show = ref(false)`,
    template: `<rb-button text="显示遮罩" type="primary" @click="show = true" />
<rb-overlay :show="show" @click="show = false" />`,
  },
  transition: {
    script: `const show = ref(true)`,
    template: `<rb-button :text="show ? '隐藏' : '显示'" @click="show = !show" />
<rb-transition :show="show" mode="fade">
  <view style="margin-top:12px;padding:16px;background:#ecf5ff;border-radius:8px">过渡内容</view>
</rb-transition>`,
  },
  notify: {
    script: `const show = ref(false)`,
    template: `<rb-button text="打开通知" type="primary" @click="show = true" />
<rb-notify v-model:show="show" type="primary" message="这是一条通知" />`,
  },
  calendar: {
    script: `const show = ref(false)
const date = ref('')`,
    template: `<rb-button text="打开日历" type="primary" @click="show = true" />
<view style="margin-top:8px">{{ date || '未选择' }}</view>
<rb-calendar v-model:show="show" @confirm="(v) => { date = String(v); show = false }" />`,
  },
  'image-viewer': {
    script: `const show = ref(false)
const list = [
  'https://cdn.jsdelivr.net/gh/edison1105/cdn@main/imgs/1.jpg',
  'https://cdn.jsdelivr.net/gh/edison1105/cdn@main/imgs/2.jpg',
]`,
    template: `<rb-button text="预览图片" type="primary" @click="show = true" />
<rb-image-viewer v-model:show="show" :url-list="list" />`,
  },
  image: {
    script: `const list = [
  'https://cdn.jsdelivr.net/gh/edison1105/cdn@main/imgs/1.jpg',
  'https://cdn.jsdelivr.net/gh/edison1105/cdn@main/imgs/2.jpg',
]`,
    template: `<rb-image
  :src="list[0]"
  :preview-src-list="list"
  fit="cover"
  width="160"
  height="120"
/>`,
  },
  album: {
    script: `const urls = [
  'https://cdn.jsdelivr.net/gh/edison1105/cdn@main/imgs/1.jpg',
  'https://cdn.jsdelivr.net/gh/edison1105/cdn@main/imgs/2.jpg',
  'https://cdn.jsdelivr.net/gh/edison1105/cdn@main/imgs/3.jpg',
]`,
    template: `<rb-album :urls="urls" />`,
  },
  swiper: {
    script: `const images = [
  'https://cdn.jsdelivr.net/gh/edison1105/cdn@main/imgs/1.jpg',
  'https://cdn.jsdelivr.net/gh/edison1105/cdn@main/imgs/2.jpg',
]`,
    template: `<rb-swiper :list="images" height="180" />`,
  },
  avatar: {
    script: '',
    template: `<rb-avatar text="R" size="large" />`,
  },
  'avatar-group': {
    script: `const urls = ['', '', '']`,
    template: `<rb-avatar-group>
  <rb-avatar text="A" />
  <rb-avatar text="B" />
  <rb-avatar text="C" />
</rb-avatar-group>`,
  },
  video: {
    script: '',
    template: `<rb-video
  src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/2minute-demo.mp4"
  :controls="true"
  height="200"
/>`,
  },
  parse: {
    script: `const html = '<p>Hello <strong>robot-ui</strong></p>'`,
    template: `<rb-parse :content="html" />`,
  },
  'read-more': {
    script: '',
    template: `<rb-read-more :show-height="80">
  这是一段很长的演示文案。这是一段很长的演示文案。这是一段很长的演示文案。
  这是一段很长的演示文案。这是一段很长的演示文案。这是一段很长的演示文案。
</rb-read-more>`,
  },
  collapse: {
    script: `const active = ref(['1'])`,
    template: `<rb-collapse v-model="active">
  <rb-collapse-item name="1" title="面板一">内容 A</rb-collapse-item>
  <rb-collapse-item name="2" title="面板二">内容 B</rb-collapse-item>
</rb-collapse>`,
  },
  'collapse-item': {
    script: `const active = ref(['1'])`,
    template: `<rb-collapse v-model="active">
  <rb-collapse-item name="1" title="标题" value="右侧" label="说明">折叠内容</rb-collapse-item>
</rb-collapse>`,
  },
  tabs: {
    script: `const current = ref(0)
const tabs = [{ name: '标签一' }, { name: '标签二' }, { name: '标签三' }]`,
    template: `<rb-tabs v-model="current" :list="tabs" />`,
  },
  subsection: {
    script: `const current = ref(0)
const list = ['待处理', '进行中', '已完成']`,
    template: `<rb-subsection v-model="current" :list="list" />`,
  },
  tabbar: {
    script: `const current = ref(0)`,
    template: `<rb-tabbar v-model="current" :fixed="false" :safe-area-inset-bottom="false">
  <rb-tabbar-item text="首页" />
  <rb-tabbar-item text="消息" />
  <rb-tabbar-item text="我的" />
</rb-tabbar>`,
  },
  'tabbar-item': {
    script: `const current = ref(0)`,
    template: `<rb-tabbar v-model="current" :fixed="false" :safe-area-inset-bottom="false">
  <rb-tabbar-item text="首页" />
  <rb-tabbar-item text="消息" />
</rb-tabbar>`,
  },
  steps: {
    script: '',
    template: `<rb-steps :current="1">
  <rb-steps-item title="步骤一" />
  <rb-steps-item title="步骤二" />
  <rb-steps-item title="步骤三" />
</rb-steps>`,
  },
  'steps-item': {
    script: '',
    template: `<rb-steps :current="0">
  <rb-steps-item title="完成" />
  <rb-steps-item title="进行中" />
</rb-steps>`,
  },
  'swipe-action': {
    script: `const options = [{ text: '删除', style: { background: '#f56c6c', color: '#fff' } }]`,
    template: `<rb-swipe-action>
  <rb-swipe-action-item :options="options">
    <view style="padding:16px;background:#fff;border:1px solid #eee">向左滑动</view>
  </rb-swipe-action-item>
</rb-swipe-action>`,
  },
  'swipe-action-item': {
    script: `const options = [{ text: '删除', style: { background: '#f56c6c', color: '#fff' } }]`,
    template: `<rb-swipe-action>
  <rb-swipe-action-item :options="options">
    <view style="padding:16px;background:#fff;border:1px solid #eee">滑动项</view>
  </rb-swipe-action-item>
</rb-swipe-action>`,
  },
  'index-list': {
    script: `const letters = ['A', 'B', 'C']`,
    template: `<view style="height:240px;overflow:auto;border:1px solid #eee">
  <rb-index-list :index-list="letters">
    <view v-for="letter in letters" :key="letter">
      <rb-index-anchor :index="letter" />
      <view style="padding:8px 12px">{{ letter }} 分组内容</view>
    </view>
  </rb-index-list>
</view>`,
  },
  'index-anchor': {
    script: '',
    template: `<rb-index-anchor index="A" />`,
  },
  'virtual-list': {
    script: `const list = Array.from({ length: 50 }, (_, i) => ({ id: i, text: '行 ' + (i + 1) }))`,
    template: `<rb-virtual-list :list="list" :item-height="44" height="200">
  <template #default="{ item }">
    <view style="padding:10px 12px;border-bottom:1px solid #f0f0f0">{{ item.text }}</view>
  </template>
</rb-virtual-list>`,
  },
  'pull-refresh': {
    script: `const loading = ref(false)
function onRefresh() {
  loading.value = true
  setTimeout(() => { loading.value = false }, 800)
}`,
    template: `<rb-pull-refresh :refreshing="loading" @refresh="onRefresh">
  <view style="padding:16px">下拉刷新演示</view>
</rb-pull-refresh>`,
  },
  loadmore: {
    script: `function onLoad() {}`,
    template: `<rb-loadmore status="loadmore" @loadmore="onLoad" />`,
  },
  pagination: {
    script: `const page = ref(1)`,
    template: `<rb-pagination v-model:current-page="page" :total="100" background />`,
  },
  checkbox: {
    script: `const checked = ref(true)`,
    template: `<rb-checkbox v-model="checked" label="同意协议" />`,
  },
  'checkbox-group': {
    script: `const list = ref(['a'])`,
    template: `<rb-checkbox-group v-model="list">
  <rb-checkbox name="a" label="选项 A" />
  <rb-checkbox name="b" label="选项 B" />
</rb-checkbox-group>`,
  },
  radio: {
    script: `const value = ref('1')`,
    template: `<rb-radio v-model="value" name="1" label="选项一" />
<rb-radio v-model="value" name="2" label="选项二" />`,
  },
  'radio-group': {
    script: `const value = ref('1')`,
    template: `<rb-radio-group v-model="value">
  <rb-radio name="1" label="A" />
  <rb-radio name="2" label="B" />
</rb-radio-group>`,
  },
  switch: {
    script: `const on = ref(true)`,
    template: `<rb-switch v-model="on" />`,
  },
  slider: {
    script: `const value = ref(40)`,
    template: `<rb-slider v-model="value" :min="0" :max="100" />`,
  },
  rate: {
    script: `const value = ref(3)`,
    template: `<rb-rate v-model="value" />`,
  },
  search: {
    script: `const keyword = ref('')`,
    template: `<rb-search v-model="keyword" placeholder="搜索" />`,
  },
  'number-box': {
    script: `const count = ref(1)`,
    template: `<rb-number-box v-model="count" :min="1" :max="99" />`,
  },
  input: {
    script: `const value = ref('')`,
    template: `<rb-input v-model="value" placeholder="请输入" clearable />`,
  },
  textarea: {
    script: `const value = ref('')`,
    template: `<rb-textarea v-model="value" placeholder="请输入" />`,
  },
  upload: {
    script: `const fileList = ref([])`,
    template: `<rb-upload v-model:file-list="fileList" :auto-upload="false" />`,
  },
  code: {
    script: `function onChange() {}`,
    template: `<rb-code :seconds="60" @change="onChange" />`,
  },
  'code-input': {
    script: `const code = ref('')`,
    template: `<rb-code-input v-model="code" :maxlength="6" />`,
  },
  'date-picker': {
    script: `const value = ref('')`,
    template: `<rb-date-picker v-model="value" type="datetime" placeholder="请选择日期时间" />`,
  },
  'datetime-panel': {
    script: `function onConfirm() {}`,
    template: `<rb-datetime-panel show-time @confirm="onConfirm" />`,
  },
  'soft-keyboard': {
    script: `const show = ref(false)`,
    template: `<rb-button text="软键盘" type="primary" @click="show = true" />
<rb-soft-keyboard v-model:show="show" />`,
  },
  'soft-keyboard-input': {
    script: `const value = ref('')`,
    template: `<rb-soft-keyboard-input v-model="value" placeholder="软键盘输入" />`,
  },
  'system-keyboard-input': {
    script: `const value = ref('')`,
    template: `<rb-system-keyboard-input v-model="value" placeholder="系统键盘输入" />`,
  },
  badge: {
    script: '',
    template: `<rb-badge :value="12">
  <rb-button text="消息" />
</rb-badge>`,
  },
  tooltip: {
    script: '',
    template: `<rb-tooltip text="提示文案">
  <rb-button text="悬停查看" />
</rb-tooltip>`,
  },
  row: {
    script: '',
    template: `<rb-row :gutter="16">
  <rb-col :span="12"><view style="padding:12px;background:#ecf5ff;text-align:center">左</view></rb-col>
  <rb-col :span="12"><view style="padding:12px;background:#f0f9eb;text-align:center">右</view></rb-col>
</rb-row>`,
  },
  col: {
    script: '',
    template: `<rb-row :gutter="12">
  <rb-col :span="8"><view style="padding:12px;background:#ecf5ff;text-align:center">列</view></rb-col>
  <rb-col :span="8"><view style="padding:12px;background:#fdf6ec;text-align:center">列</view></rb-col>
  <rb-col :span="8"><view style="padding:12px;background:#fef0f0;text-align:center">列</view></rb-col>
</rb-row>`,
  },
  grid: {
    script: '',
    template: `<rb-grid :col="4">
  <rb-grid-item text="宫格1" />
  <rb-grid-item text="宫格2" />
  <rb-grid-item text="宫格3" />
  <rb-grid-item text="宫格4" />
</rb-grid>`,
  },
  'grid-item': {
    script: '',
    template: `<rb-grid :col="3">
  <rb-grid-item text="项 A" />
  <rb-grid-item text="项 B" />
  <rb-grid-item text="项 C" />
</rb-grid>`,
  },
  cell: {
    script: '',
    template: `<rb-cell-group>
  <rb-cell title="标题" value="内容" is-link />
  <rb-cell title="说明" label="副标题" />
</rb-cell-group>`,
  },
  'cell-group': {
    script: '',
    template: `<rb-cell-group title="分组">
  <rb-cell title="单元格一" />
  <rb-cell title="单元格二" />
</rb-cell-group>`,
  },
  list: {
    script: '',
    template: `<rb-list>
  <rb-list-item title="标题一" note="说明" />
  <rb-list-item title="标题二" note="说明" />
</rb-list>`,
  },
  'list-item': {
    script: '',
    template: `<rb-list-item title="标题" note="说明" />`,
  },
  layout: {
    script: '',
    template: `<rb-layout direction="vertical" height="200">
  <template #header><view style="padding:8px;background:#ecf5ff">Header</view></template>
  <view style="padding:16px">Main</view>
  <template #footer><view style="padding:8px;background:#f0f9eb">Footer</view></template>
</rb-layout>`,
  },
  scroll: {
    script: `const items = Array.from({ length: 8 }, (_, i) => '滚动项 ' + (i + 1))`,
    template: `<rb-scroll height="180" scroll-y>
  <view v-for="item in items" :key="item" style="padding:10px 0;border-bottom:1px solid #f0f0f0">{{ item }}</view>
</rb-scroll>`,
  },
  'scroll-list': {
    script: '',
    template: `<rb-scroll-list>
  <view v-for="i in 8" :key="i" style="padding:12px 16px;margin-right:8px;background:#ecf5ff;border-radius:8px;white-space:nowrap">项{{ i }}</view>
</rb-scroll-list>`,
  },
  sticky: {
    script: `const scrollTop = ref(0)`,
    template: `<view style="height:160px;overflow:auto" @scroll="(e) => (scrollTop = e.target.scrollTop)">
  <view style="height:40px" />
  <rb-sticky :scroll-top="scrollTop">
    <view style="padding:10px;background:#3c9cff;color:#fff">吸顶内容</view>
  </rb-sticky>
  <view style="height:240px;padding:12px">向下滚动查看吸顶</view>
</view>`,
  },
  'page-footer': {
    script: '',
    template: `<rb-page-footer>
  <template #header><view style="padding:8px;background:#f5f7fa">顶栏</view></template>
  <view style="padding:16px">内容区</view>
  <template #footer><view style="padding:8px;background:#f5f7fa">底栏</view></template>
</rb-page-footer>`,
  },
  'root-portal': {
    script: '',
    template: `<rb-root-portal>
  <view style="padding:12px;background:#ecf5ff;border-radius:8px">挂到页面根（文档站为 teleport）</view>
</rb-root-portal>`,
  },
  'back-top': {
    script: `const scrollTop = ref(120)`,
    template: `<view style="position:relative;height:120px">
  <rb-back-top :scroll-top="scrollTop" :top="40" />
  <view style="padding:12px;color:#909399">scrollTop &gt; top 时显示回到顶部</view>
</view>`,
  },
  'footer-back': {
    script: `function goBack() {}`,
    template: `<rb-footer-back text="返回" @click="goBack" />`,
  },
  navbar: {
    script: '',
    template: `<rb-navbar title="标题" left-text="返回" :fixed="false" :safe-area-inset-top="false" />`,
  },
  icon: {
    script: '',
    template: `<div style="display:flex;gap:16px;align-items:center">
  <rb-icon name="shuaxin" :size="28" />
  <rb-icon name="rili" :size="28" color="#3c9cff" />
  <rb-icon name="shuaxin" :size="28" spin />
</div>`,
  },
  'icon-font': {
    script: '',
    template: `<rb-icon-font name="fanhuishouye" :size="28" />`,
  },
  loading: {
    script: '',
    template: `<rb-loading text="加载中" />`,
  },
  empty: {
    script: '',
    template: `<rb-empty text="暂无数据" />`,
  },
  skeleton: {
    script: '',
    template: `<rb-skeleton :loading="true" :rows="3" />`,
  },
  color: {
    script: '',
    template: `<div style="display:flex;gap:12px;flex-wrap:wrap">
  <rb-color color="#3c9cff" label="Primary" />
  <rb-color color="#5ac725" label="Success" />
  <rb-color color="#f9ae3d" label="Warning" />
</div>`,
  },
}

function collectRefsFromTemplate(template) {
  const names = new Set()
  const re = /v-model(?::[\w-]+)?="([a-zA-Z_]\w*)"/g
  let m
  while ((m = re.exec(template))) names.add(m[1])
  ;['show', 'value', 'checked', 'on', 'keyword', 'count', 'page', 'active', 'current', 'list', 'code', 'fileList', 'loading', 'scrollTop'].forEach(
    (n) => {
      if (new RegExp(`\\b${n}\\b`).test(template) && !template.includes(`const ${n}`)) {
        // only auto if used as binding
      }
    },
  )
  return names
}

function defaultInit(name) {
  const map = {
    value: "''",
    show: 'false',
    checked: 'false',
    on: 'false',
    keyword: "''",
    count: '1',
    page: '1',
    active: "['1']",
    one: "'a'",
    current: '0',
    list: '[]',
    code: "''",
    fileList: '[]',
    loading: 'false',
    scrollTop: '0',
    name: "''",
    model: "{ name: '' }",
    html: "'<p>内容</p>'",
    urls: '[]',
    images: '[]',
    columns: '[]',
    actions: '[]',
    options: '[]',
    tabs: '[]',
    letters: "['A', 'B']",
    date: "''",
  }
  return map[name] ?? "''"
}

function buildSfc(key) {
  if (CUSTOM[key]) {
    const { script, template } = CUSTOM[key]
    const needsRef = /\bref\(/.test(script) || /v-model/.test(template) || /\bref\b/.test(script)
    const importRef = script.includes('ref(') || /v-model/.test(template)
    let scriptBody = script
    if (!CUSTOM[key].script && /v-model/.test(template)) {
      const refs = [...collectRefsFromTemplate(template)]
      scriptBody = refs.map((n) => `const ${n} = ref(${defaultInit(n)})`).join('\n')
    } else if (script && /v-model/.test(template) && !script.includes('import') && !script.includes('ref(')) {
      // script may already define refs
    }
    const useRef = importRef || scriptBody.includes('ref(')
    const scriptBlock =
      useRef || scriptBody
        ? `<script setup lang="ts">
${useRef && !scriptBody.includes("from 'vue'") ? "import { ref } from 'vue'\n" : ''}${scriptBody ? scriptBody + '\n' : ''}</script>\n\n`
        : ''
    return `${scriptBlock}<template>
${template}
</template>
`
  }

  const usage = CATALOG[key]?.usage || `<${CATALOG[key] ? '' : ''}>`
  const template = (CATALOG[key]?.usage || '').trim()
  const refs = [...collectRefsFromTemplate(template)]
  // also catch bare identifiers used in bindings like :show="show"
  const bindRe = /(?::|@)[\w.-]+="([a-zA-Z_]\w*)"/g
  let bm
  while ((bm = bindRe.exec(template))) {
    if (!['true', 'false', 'null', 'undefined'].includes(bm[1])) refs.push(bm[1])
  }
  const uniq = [...new Set(refs)].filter((n) => !/^(Number|String|Boolean|Array|Object)$/.test(n))
  const needsScript = uniq.length > 0 || /@\w+="on\w+"/.test(template)
  if (!needsScript) {
    return `<template>
${template}
</template>
`
  }
  const lines = []
  for (const n of uniq) {
    if (/^on[A-Z]/.test(n)) {
      lines.push(`function ${n}() {}`)
    } else {
      lines.push(`const ${n} = ref(${defaultInit(n)})`)
    }
  }
  return `<script setup lang="ts">
import { ref } from 'vue'
${lines.join('\n')}
</script>

<template>
${template}
</template>
`
}

function escapeSourceForMd(source) {
  return source.replace(/<\/script>/g, '<\\/script>').replace(/<\/template>/g, '<\\/template>')
}

function injectDemoIntoMd(key, source) {
  const mdPath = path.join(DOCS_DIR, `${key}.md`)
  if (!fs.existsSync(mdPath)) return false
  let md = fs.readFileSync(mdPath, 'utf8')

  // 去掉旧的 script setup / DemoBlock，保留正文其余部分
  md = md.replace(/^<script setup[\s\S]*?<\/script>\s*/m, '')
  // 去掉正文中额外的 script setup（如 IconGallery 旧写法）
  md = md.replace(/\n<script setup[\s\S]*?<\/script>\s*/g, '\n')

  const demoBlock = `<script setup lang="ts">
import BasicDemo from '../examples/${key}/basic.vue'

const basicSource = \`${escapeSourceForMd(source).replace(/`/g, '\\`')}\`
</script>

`

  const rendered = `
## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

\`\`\`vue
${source.trim()}
\`\`\`

  </template>
</DemoBlock>
`

  if (/## 基础用法/.test(md)) {
    md = md.replace(/## 基础用法[\s\S]*?(?=\n## )/m, rendered.trim() + '\n\n')
  } else {
    // 插到标题后
    md = md.replace(/^(# .+\n(?:\n::: tip[\s\S]*?:::\n)?)/m, `$1\n${rendered}\n`)
  }

  // 避免表格里未转义的 <> 再次炸构建：简单处理常见泛型（仅类型列）
  md = md.replace(/`([^`]*<[^`]+>)`/g, (_, inner) => {
    return '`' + inner.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '`'
  })

  fs.writeFileSync(mdPath, demoBlock + md.replace(/^\uFEFF/, ''), 'utf8')
  return true
}

function main() {
  let count = 0
  for (const key of Object.keys(CATALOG)) {
    if (key === 'overview') continue
    const source = buildSfc(key).replace(/\r\n/g, '\n')
    const dir = path.join(EXAMPLES_DIR, key)
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(path.join(dir, 'basic.vue'), source, 'utf8')
    if (injectDemoIntoMd(key, source)) count += 1
  }
  console.log(`已生成 ${count} 个组件 DemoBlock 示例`)
}

main()
