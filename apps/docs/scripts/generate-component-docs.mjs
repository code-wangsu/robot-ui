/**
 * 根据组件源码生成 VitePress 文档（Element Plus 风格骨架）
 * 用法：node apps/docs/scripts/generate-component-docs.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '../../..')
const COMP_SRC = path.join(ROOT, 'packages/components/src')
const DOCS_DIR = path.join(ROOT, 'apps/docs/components')
const CONFIG_PATH = path.join(ROOT, 'apps/docs/.vitepress/config.ts')

/** @type {Record<string, { name: string; title: string; group: string; tag: string; usage: string; events?: string; slots?: string; tip?: string }>} */
const CATALOG = {
  button: { name: 'Button', title: 'Button 按钮', group: 'basic', tag: 'rb-button', usage: `<rb-button type="primary" text="主要按钮" />\n<rb-button type="success" plain text="朴素按钮" />\n<rb-button size="small" text="小按钮" />` },
  icon: { name: 'Icon', title: 'Icon 图标库', group: 'basic', tag: 'rb-icon', usage: `<rb-icon name="shuaxin" :size="48" color="#3c9cff" />\n<rb-icon name="rili" :size="40" />` },
  'icon-font': { name: 'IconFont', title: 'IconFont 字体图标', group: 'basic', tag: 'rb-icon-font', usage: `<rb-icon-font name="fanhuishouye" :size="40" />` },
  text: { name: 'Text', title: 'Text 文本', group: 'basic', tag: 'rb-text', usage: `<rb-text text="普通文本" />\n<rb-text type="primary" text="主题色" />` },
  link: { name: 'Link', title: 'Link 链接', group: 'basic', tag: 'rb-link', usage: `<rb-link href="https://example.com" text="打开链接" />` },
  tag: { name: 'Tag', title: 'Tag 标签', group: 'basic', tag: 'rb-tag', usage: `<rb-tag text="标签" type="primary" />\n<rb-tag text="成功" type="success" effect="light" />` },
  badge: { name: 'Badge', title: 'Badge 徽标', group: 'basic', tag: 'rb-badge', usage: `<rb-badge :value="12">\n  <rb-button text="消息" />\n</rb-badge>` },
  color: { name: 'Color', title: 'Color 色块', group: 'basic', tag: 'rb-color', usage: `<rb-color color="#3c9cff" label="Primary" />` },
  cell: { name: 'Cell', title: 'Cell 单元格', group: 'basic', tag: 'rb-cell', usage: `<rb-cell title="标题" value="内容" is-link />` },
  'cell-group': { name: 'CellGroup', title: 'CellGroup 单元格组', group: 'basic', tag: 'rb-cell-group', usage: `<rb-cell-group title="分组">\n  <rb-cell title="单元格" />\n</rb-cell-group>` },
  loading: {
    name: 'Loading',
    title: 'Loading 加载',
    group: 'basic',
    tag: 'rb-loading',
    usage: `<rb-loading text="加载中" />\n<rb-loading mode="spinner" :size="28" />`,
  },
  empty: {
    name: 'Empty',
    title: 'Empty 空状态',
    group: 'basic',
    tag: 'rb-empty',
    usage: `<rb-empty text="暂无数据" />\n<rb-empty text="暂无内容" description="稍后再试" compact />`,
  },
  divider: { name: 'Divider', title: 'Divider 分割线', group: 'basic', tag: 'rb-divider', usage: `<rb-divider text="分割线" />` },
  gap: { name: 'Gap', title: 'Gap 间隔槽', group: 'basic', tag: 'rb-gap', usage: `<rb-gap height="24" />` },
  line: { name: 'Line', title: 'Line 线条', group: 'basic', tag: 'rb-line', usage: `<rb-line />` },

  row: { name: 'Row', title: 'Row 行布局', group: 'layout', tag: 'rb-row', usage: `<rb-row :gutter="16">\n  <rb-col :span="12">左</rb-col>\n  <rb-col :span="12">右</rb-col>\n</rb-row>` },
  col: { name: 'Col', title: 'Col 列布局', group: 'layout', tag: 'rb-col', usage: `<rb-col :span="8">列</rb-col>` },
  layout: { name: 'Layout', title: 'Layout 布局容器', group: 'layout', tag: 'rb-layout', usage: `<rb-layout direction="vertical" height="400rpx">\n  <template #header>Header</template>\n  Main\n  <template #footer>Footer</template>\n</rb-layout>` },
  scroll: { name: 'Scroll', title: 'Scroll 滚动容器', group: 'layout', tag: 'rb-scroll', usage: `<rb-scroll height="400rpx">\n  <view>内容</view>\n</rb-scroll>` },
  'scroll-list': { name: 'ScrollList', title: 'ScrollList 横向滚动', group: 'layout', tag: 'rb-scroll-list', usage: `<rb-scroll-list>\n  <view v-for="i in 10" :key="i">项{{ i }}</view>\n</rb-scroll-list>` },
  sticky: { name: 'Sticky', title: 'Sticky 吸顶', group: 'layout', tag: 'rb-sticky', usage: `<rb-sticky :scroll-top="scrollTop">\n  <view>吸顶内容</view>\n</rb-sticky>` },
  'page-footer': { name: 'PageFooter', title: 'PageFooter 页脚布局', group: 'layout', tag: 'rb-page-footer', usage: `<rb-page-footer>\n  <template #header>顶栏</template>\n  内容\n  <template #footer>底栏</template>\n</rb-page-footer>` },
  grid: { name: 'Grid', title: 'Grid 宫格', group: 'layout', tag: 'rb-grid', usage: `<rb-grid :col="4">\n  <rb-grid-item text="宫格" />\n</rb-grid>` },
  'grid-item': { name: 'GridItem', title: 'GridItem 宫格项', group: 'layout', tag: 'rb-grid-item', usage: `<rb-grid-item text="项" />` },
  'status-bar': { name: 'StatusBar', title: 'StatusBar 状态栏占位', group: 'layout', tag: 'rb-status-bar', usage: `<rb-status-bar />` },
  'safe-bottom': { name: 'SafeBottom', title: 'SafeBottom 底部安全区', group: 'layout', tag: 'rb-safe-bottom', usage: `<rb-safe-bottom />` },
  'root-portal': { name: 'RootPortal', title: 'RootPortal 根节点传送', group: 'layout', tag: 'rb-root-portal', usage: `<rb-root-portal>\n  <view>挂到页面根</view>\n</rb-root-portal>` },

  form: { name: 'Form', title: 'Form 表单', group: 'form', tag: 'rb-form', usage: `<rb-form :model="model" :rules="rules">\n  <rb-form-item prop="name" label="姓名">\n    <rb-input v-model="model.name" />\n  </rb-form-item>\n</rb-form>` },
  'form-item': { name: 'FormItem', title: 'FormItem 表单项', group: 'form', tag: 'rb-form-item', usage: `<rb-form-item prop="name" label="姓名">\n  <rb-input v-model="name" />\n</rb-form-item>` },
  input: { name: 'Input', title: 'Input 输入框', group: 'form', tag: 'rb-input', usage: `<rb-input v-model="value" placeholder="请输入" clearable />` },
  textarea: { name: 'Textarea', title: 'Textarea 文本域', group: 'form', tag: 'rb-textarea', usage: `<rb-textarea v-model="value" placeholder="请输入" />` },
  checkbox: { name: 'Checkbox', title: 'Checkbox 复选框', group: 'form', tag: 'rb-checkbox', usage: `<rb-checkbox v-model="checked" label="同意协议" />` },
  'checkbox-group': { name: 'CheckboxGroup', title: 'CheckboxGroup 复选组', group: 'form', tag: 'rb-checkbox-group', usage: `<rb-checkbox-group v-model="list">\n  <rb-checkbox name="a" label="A" />\n</rb-checkbox-group>` },
  radio: { name: 'Radio', title: 'Radio 单选框', group: 'form', tag: 'rb-radio', usage: `<rb-radio v-model="value" name="1" label="选项一" />` },
  'radio-group': { name: 'RadioGroup', title: 'RadioGroup 单选组', group: 'form', tag: 'rb-radio-group', usage: `<rb-radio-group v-model="value">\n  <rb-radio name="1" label="A" />\n</rb-radio-group>` },
  switch: { name: 'Switch', title: 'Switch 开关', group: 'form', tag: 'rb-switch', usage: `<rb-switch v-model="on" />` },
  slider: { name: 'Slider', title: 'Slider 滑块', group: 'form', tag: 'rb-slider', usage: `<rb-slider v-model="value" :min="0" :max="100" />` },
  rate: { name: 'Rate', title: 'Rate 评分', group: 'form', tag: 'rb-rate', usage: `<rb-rate v-model="value" />` },
  search: { name: 'Search', title: 'Search 搜索', group: 'form', tag: 'rb-search', usage: `<rb-search v-model="keyword" placeholder="搜索" />` },
  'number-box': { name: 'NumberBox', title: 'NumberBox 步进器', group: 'form', tag: 'rb-number-box', usage: `<rb-number-box v-model="count" :min="1" :max="99" />` },
  upload: { name: 'Upload', title: 'Upload 上传', group: 'form', tag: 'rb-upload', usage: `<rb-upload v-model:file-list="fileList" :auto-upload="false" />`, tip: 'App/Android 使用 `uni.chooseImage` + `uni.uploadFile`。' },
  code: { name: 'Code', title: 'Code 验证码按钮', group: 'form', tag: 'rb-code', usage: `<rb-code :seconds="60" @change="onChange" />` },
  'code-input': { name: 'CodeInput', title: 'CodeInput 验证码输入', group: 'form', tag: 'rb-code-input', usage: `<rb-code-input v-model="code" :maxlength="6" />` },
  picker: { name: 'Picker', title: 'Picker 选择器', group: 'form', tag: 'rb-picker', usage: `<rb-picker v-model:show="show" :columns="columns" @confirm="onConfirm" />` },
  'date-picker': { name: 'DatePicker', title: 'DatePicker 日期时间', group: 'form', tag: 'rb-date-picker', usage: `<rb-date-picker v-model="value" type="datetime" />`, tip: '`type` 支持 `date` / `time` / `datetime`，对齐 Element Plus。' },
  'datetime-picker': { name: 'DatetimePicker', title: 'DatetimePicker 时间滚轮', group: 'form', tag: 'rb-datetime-picker', usage: `<rb-datetime-picker v-model:show="show" mode="datetime" />` },
  'datetime-panel': { name: 'DatetimePanel', title: 'DatetimePanel 日期时间面板', group: 'form', tag: 'rb-datetime-panel', usage: `<rb-datetime-panel show-time @confirm="onConfirm" />` },
  calendar: { name: 'Calendar', title: 'Calendar 日历', group: 'form', tag: 'rb-calendar', usage: `<rb-calendar @confirm="onConfirm" />` },
  keyboard: { name: 'Keyboard', title: 'Keyboard 数字键盘', group: 'form', tag: 'rb-keyboard', usage: `<rb-keyboard v-model:show="show" @change="onChange" />` },
  'multi-select': { name: 'MultiSelect', title: 'MultiSelect 多选', group: 'form', tag: 'rb-multi-select', usage: `<rb-multi-select v-model="value" v-model:visible="show" :options="options" />` },

  popup: { name: 'Popup', title: 'Popup 弹出层', group: 'feedback', tag: 'rb-popup', usage: `<rb-popup v-model:show="show" mode="bottom">\n  <view>内容</view>\n</rb-popup>` },
  modal: { name: 'Modal', title: 'Modal 模态框', group: 'feedback', tag: 'rb-modal', usage: `<rb-modal v-model:show="show" title="提示" content="确认操作？" />` },
  'app-dialog': { name: 'AppDialog', title: 'AppDialog 业务弹窗', group: 'feedback', tag: 'rb-app-dialog', usage: `<rb-app-dialog v-model="show" title="业务弹窗">\n  内容\n  <template #footer>\n    <rb-button size="small" text="取消" />\n  </template>\n</rb-app-dialog>` },
  toast: { name: 'Toast', title: 'Toast 消息通知', group: 'feedback', tag: 'rb-toast', usage: `<script setup>\nimport { showToast } from 'robot-ui'\nshowToast({ title: '成功', message: '操作完成', type: 'success' })\n</script>` },
  'action-sheet': { name: 'ActionSheet', title: 'ActionSheet 动作面板', group: 'feedback', tag: 'rb-action-sheet', usage: `<rb-action-sheet v-model:show="show" :actions="actions" @select="onSelect" />` },
  alert: { name: 'Alert', title: 'Alert 警告提示', group: 'feedback', tag: 'rb-alert', usage: `<rb-alert type="warning" title="注意" description="请检查输入" />` },
  'notice-bar': { name: 'NoticeBar', title: 'NoticeBar 通知栏', group: 'feedback', tag: 'rb-notice-bar', usage: `<rb-notice-bar text="这是一条通知" />` },
  notify: { name: 'Notify', title: 'Notify 消息提示', group: 'feedback', tag: 'rb-notify', usage: `<rb-notify v-model:show="show" type="primary" message="通知内容" />` },
  tooltip: { name: 'Tooltip', title: 'Tooltip 文字提示', group: 'feedback', tag: 'rb-tooltip', usage: `<rb-tooltip text="提示文案">\n  <rb-button text="悬停" />\n</rb-tooltip>` },
  overlay: { name: 'Overlay', title: 'Overlay 遮罩层', group: 'feedback', tag: 'rb-overlay', usage: `<rb-overlay :show="show" @click="show = false" />` },
  transition: { name: 'Transition', title: 'Transition 过渡动画', group: 'feedback', tag: 'rb-transition', usage: `<rb-transition :show="show" mode="fade">\n  <view>内容</view>\n</rb-transition>` },
  'swipe-action': { name: 'SwipeAction', title: 'SwipeAction 滑动单元格', group: 'feedback', tag: 'rb-swipe-action', usage: `<rb-swipe-action>\n  <rb-swipe-action-item :options="options">内容</rb-swipe-action-item>\n</rb-swipe-action>` },
  'swipe-action-item': { name: 'SwipeActionItem', title: 'SwipeActionItem 滑动项', group: 'feedback', tag: 'rb-swipe-action-item', usage: `<rb-swipe-action-item :options="[{ text: '删除', style: { background: '#f56c6c' } }]">行</rb-swipe-action-item>` },
  'no-network': { name: 'NoNetwork', title: 'NoNetwork 无网络', group: 'feedback', tag: 'rb-no-network', usage: `<rb-no-network />` },

  table: { name: 'Table', title: 'Table 表格', group: 'data', tag: 'rb-table', usage: `<rb-table :columns="columns" :data="list" row-key="id" />` },
  pagination: { name: 'Pagination', title: 'Pagination 分页', group: 'data', tag: 'rb-pagination', usage: `<rb-pagination v-model:current-page="page" :total="100" background />` },
  list: { name: 'List', title: 'List 列表', group: 'data', tag: 'rb-list', usage: `<rb-list>\n  <rb-list-item title="标题" />\n</rb-list>` },
  'list-item': { name: 'ListItem', title: 'ListItem 列表项', group: 'data', tag: 'rb-list-item', usage: `<rb-list-item title="标题" note="说明" />` },
  loadmore: { name: 'Loadmore', title: 'Loadmore 加载更多', group: 'data', tag: 'rb-loadmore', usage: `<rb-loadmore status="loadmore" @loadmore="onLoad" />` },
  'pull-refresh': { name: 'PullRefresh', title: 'PullRefresh 下拉刷新', group: 'data', tag: 'rb-pull-refresh', usage: `<rb-pull-refresh :refreshing="loading" @refresh="onRefresh">\n  列表\n</rb-pull-refresh>` },
  'virtual-list': { name: 'VirtualList', title: 'VirtualList 虚拟列表', group: 'data', tag: 'rb-virtual-list', usage: `<rb-virtual-list :list="list" :item-height="80" />` },
  card: { name: 'Card', title: 'Card 卡片', group: 'data', tag: 'rb-card', usage: `<rb-card title="标题" type="success">内容</rb-card>` },
  collapse: {
    name: 'Collapse',
    title: 'Collapse 折叠面板',
    group: 'data',
    tag: 'rb-collapse',
    usage: `<rb-collapse v-model="active">\n  <rb-collapse-item name="1" title="面板一">内容 A</rb-collapse-item>\n  <rb-collapse-item name="2" title="面板二">内容 B</rb-collapse-item>\n</rb-collapse>\n\n<!-- 手风琴 -->\n<rb-collapse v-model="one" accordion>\n  <rb-collapse-item name="a" title="仅一项">内容</rb-collapse-item>\n</rb-collapse>`,
  },
  'collapse-item': {
    name: 'CollapseItem',
    title: 'CollapseItem 折叠项',
    group: 'data',
    tag: 'rb-collapse-item',
    usage: `<rb-collapse-item name="1" title="标题" value="右侧" label="说明">内容</rb-collapse-item>`,
    slots: 'default / title / label / value / icon',
  },
  'line-progress': { name: 'LineProgress', title: 'LineProgress 进度条', group: 'data', tag: 'rb-line-progress', usage: `<rb-line-progress :percentage="60" />` },
  'count-down': { name: 'CountDown', title: 'CountDown 倒计时', group: 'data', tag: 'rb-count-down', usage: `<rb-count-down :time="3600000" />` },
  'count-to': { name: 'CountTo', title: 'CountTo 数字滚动', group: 'data', tag: 'rb-count-to', usage: `<rb-count-to :end-val="1000" />` },
  skeleton: { name: 'Skeleton', title: 'Skeleton 骨架屏', group: 'data', tag: 'rb-skeleton', usage: `<rb-skeleton :loading="true" rows="3" />` },
  'read-more': { name: 'ReadMore', title: 'ReadMore 展开阅读', group: 'data', tag: 'rb-read-more', usage: `<rb-read-more :show-height="200">长文本</rb-read-more>` },
  parse: { name: 'Parse', title: 'Parse 富文本', group: 'data', tag: 'rb-parse', usage: `<rb-parse :content="html" />` },

  image: { name: 'Image', title: 'Image 图片', group: 'media', tag: 'rb-image', usage: `<rb-image src="https://example.com/a.jpg" :preview-src-list="list" fit="cover" />`, tip: '配置 `preview-src-list` 后点击预览，支持左右切换。' },
  'image-viewer': { name: 'ImageViewer', title: 'ImageViewer 图片预览', group: 'media', tag: 'rb-image-viewer', usage: `<rb-image-viewer v-model:show="show" :url-list="list" />` },
  video: { name: 'Video', title: 'Video 视频', group: 'media', tag: 'rb-video', usage: `<rb-video src="https://example.com/a.mp4" :controls="true" />` },
  album: { name: 'Album', title: 'Album 相册', group: 'media', tag: 'rb-album', usage: `<rb-album :urls="urls" />` },
  swiper: { name: 'Swiper', title: 'Swiper 轮播', group: 'media', tag: 'rb-swiper', usage: `<rb-swiper :list="images" />` },
  avatar: { name: 'Avatar', title: 'Avatar 头像', group: 'media', tag: 'rb-avatar', usage: `<rb-avatar src="https://example.com/a.jpg" />` },
  'avatar-group': { name: 'AvatarGroup', title: 'AvatarGroup 头像组', group: 'media', tag: 'rb-avatar-group', usage: `<rb-avatar-group :urls="urls" />` },

  tabs: { name: 'Tabs', title: 'Tabs 标签页', group: 'nav', tag: 'rb-tabs', usage: `<rb-tabs v-model="current" :list="tabs" />` },
  subsection: { name: 'Subsection', title: 'Subsection 分段器', group: 'nav', tag: 'rb-subsection', usage: `<rb-subsection v-model="current" :list="list" />` },
  navbar: { name: 'Navbar', title: 'Navbar 导航栏', group: 'nav', tag: 'rb-navbar', usage: `<rb-navbar title="标题" :auto-back="true" />` },
  tabbar: { name: 'Tabbar', title: 'Tabbar 底部导航', group: 'nav', tag: 'rb-tabbar', usage: `<rb-tabbar v-model="current">\n  <rb-tabbar-item text="首页" />\n</rb-tabbar>` },
  'tabbar-item': { name: 'TabbarItem', title: 'TabbarItem 导航项', group: 'nav', tag: 'rb-tabbar-item', usage: `<rb-tabbar-item text="首页" icon="home" />` },
  steps: { name: 'Steps', title: 'Steps 步骤条', group: 'nav', tag: 'rb-steps', usage: `<rb-steps :current="1">\n  <rb-steps-item title="步骤一" />\n  <rb-steps-item title="步骤二" />\n</rb-steps>` },
  'steps-item': { name: 'StepsItem', title: 'StepsItem 步骤项', group: 'nav', tag: 'rb-steps-item', usage: `<rb-steps-item title="完成" />` },
  'index-list': { name: 'IndexList', title: 'IndexList 索引列表', group: 'nav', tag: 'rb-index-list', usage: `<rb-index-list :index-list="letters">\n  <rb-index-anchor index="A" />\n</rb-index-list>` },
  'index-anchor': { name: 'IndexAnchor', title: 'IndexAnchor 索引锚点', group: 'nav', tag: 'rb-index-anchor', usage: `<rb-index-anchor index="A" />` },
  'back-top': { name: 'BackTop', title: 'BackTop 回到顶部', group: 'nav', tag: 'rb-back-top', usage: `<rb-back-top :scroll-top="scrollTop" />` },
  'footer-back': { name: 'FooterBack', title: 'FooterBack 底部返回', group: 'nav', tag: 'rb-footer-back', usage: `<rb-footer-back @back="goBack" />` },

  'soft-keyboard': { name: 'SoftKeyboard', title: 'SoftKeyboard 软键盘', group: 'keyboard', tag: 'rb-soft-keyboard', usage: `<rb-soft-keyboard v-model:show="show" @input="onInput" />` },
  'soft-keyboard-input': { name: 'SoftKeyboardInput', title: 'SoftKeyboardInput 软键盘输入', group: 'keyboard', tag: 'rb-soft-keyboard-input', usage: `<rb-soft-keyboard-input v-model="value" />` },
  'system-keyboard-input': { name: 'SystemKeyboardInput', title: 'SystemKeyboardInput 系统键盘输入', group: 'keyboard', tag: 'rb-system-keyboard-input', usage: `<rb-system-keyboard-input v-model="value" />` },
  'app-tag': { name: 'AppTag', title: 'AppTag 业务标签', group: 'other', tag: 'rb-app-tag', usage: `<rb-app-tag text="标签" />`, tip: '兼容旧 API，新项目推荐使用 `RbTag`。' },
}

const GROUP_ORDER = [
  { key: 'basic', text: 'Basic 基础' },
  { key: 'layout', text: 'Layout 布局' },
  { key: 'form', text: 'Form 表单' },
  { key: 'feedback', text: 'Feedback 反馈' },
  { key: 'data', text: 'Data 数据展示' },
  { key: 'media', text: 'Media 媒体' },
  { key: 'nav', text: 'Navigation 导航' },
  { key: 'keyboard', text: 'Keyboard 键盘' },
  { key: 'other', text: 'Others 其他' },
]

function parseProps(vueSource) {
  const rows = []
  const block = vueSource.match(/defineProps<\s*\{([\s\S]*?)\}\s*>/)
  if (!block) return rows
  const lines = block[1].split('\n')
  let pending = []
  for (const raw of lines) {
    const line = raw.trim()
    if (!line) continue
    if (line.startsWith('/**')) {
      pending = [line.replace(/^\/\*\*\s?/, '').replace(/\*\/\s*$/, '').trim()]
      continue
    }
    if (line.startsWith('*') && !line.startsWith('*/')) {
      pending.push(line.replace(/^\*\s?/, '').trim())
      continue
    }
    if (line.startsWith('*/')) continue
    const mm = line.match(/^(\w+)\??:\s*(.+)$/)
    if (!mm) continue
    const name = mm[1]
    if (['customStyle', 'customClass'].includes(name)) {
      pending = []
      continue
    }
    const desc = pending.filter(Boolean).join(' ') || name
    pending = []
    rows.push({
      name,
      desc,
      type: mm[2].replace(/,$/, '').trim(),
    })
  }
  return rows
}

function parseDefaults(vueSource) {
  const map = {}
  const start = vueSource.search(/withDefaults\(\s*defineProps</)
  if (start < 0) return map
  const afterProps = vueSource.indexOf('>()', start)
  if (afterProps < 0) return map
  const objStart = vueSource.indexOf('{', afterProps)
  if (objStart < 0) return map
  let depth = 0
  let end = -1
  for (let i = objStart; i < vueSource.length; i += 1) {
    const ch = vueSource[i]
    if (ch === '{') depth += 1
    if (ch === '}') {
      depth -= 1
      if (depth === 0) {
        end = i
        break
      }
    }
  }
  if (end < 0) return map
  const body = vueSource.slice(objStart + 1, end)
  let i = 0
  while (i < body.length) {
    const keyMatch = body.slice(i).match(/^\s*(\w+)\s*:\s*/)
    if (!keyMatch) {
      i += 1
      continue
    }
    i += keyMatch[0].length
    const key = keyMatch[1]
    let value = ''
    if (body[i] === "'" || body[i] === '"') {
      const quote = body[i]
      i += 1
      while (i < body.length && body[i] !== quote) {
        if (body[i] === '\\') {
          value += body[i] + body[i + 1]
          i += 2
          continue
        }
        value += body[i]
        i += 1
      }
      i += 1
      map[key] = `${quote}${value}${quote}`
    } else if (body.startsWith('() =>', i)) {
      i += 5
      while (i < body.length && /\s/.test(body[i])) i += 1
      if (body[i] === '[') {
        let d = 0
        const s = i
        do {
          if (body[i] === '[') d += 1
          if (body[i] === ']') d -= 1
          i += 1
        } while (i < body.length && d > 0)
        map[key] = body.slice(s, i)
      } else {
        map[key] = '() => …'
      }
    } else {
      while (i < body.length && body[i] !== ',' && body[i] !== '\n') {
        value += body[i]
        i += 1
      }
      map[key] = value.trim()
    }
    while (i < body.length && (body[i] === ',' || /\s/.test(body[i]))) i += 1
  }
  return map
}

function parseEmits(vueSource) {
  const rows = []
  const m = vueSource.match(/defineEmits<\s*\{([\s\S]*?)\}\s*>/)
  if (!m) return rows
  const lines = m[1].split('\n')
  let pending = []
  for (const raw of lines) {
    const line = raw.trim()
    if (!line) continue
    if (line.startsWith('/**')) {
      pending = [line.replace(/^\/\*\*\s?/, '').replace(/\*\/\s*$/, '').trim()]
      continue
    }
    if (line.startsWith('*') && !line.startsWith('*/')) {
      pending.push(line.replace(/^\*\s?/, '').trim())
      continue
    }
    const mm = line.match(/^'?([\w:-]+)'?\s*:\s*/)
    if (!mm) continue
    rows.push({
      name: mm[1],
      desc: pending.filter(Boolean).join(' ') || '-',
    })
    pending = []
  }
  return rows
}

function findMainVue(dir) {
  const base = path.join(COMP_SRC, dir)
  const preferred = path.join(base, `rb-${dir}.vue`)
  if (fs.existsSync(preferred)) return preferred
  const files = fs.readdirSync(base).filter((f) => f.startsWith('rb-') && f.endsWith('.vue'))
  return files[0] ? path.join(base, files[0]) : null
}

function renderDoc(key, meta, vuePath) {
  const src = vuePath ? fs.readFileSync(vuePath, 'utf8') : ''
  const props = parseProps(src)
  const defaults = parseDefaults(src)
  const emits = parseEmits(src)

  let md = `# ${meta.title}\n\n`
  if (meta.tip) md += `::: tip\n${meta.tip}\n:::\n\n`
  md += `## 基础用法\n\n\`\`\`vue\n${meta.usage}\n\`\`\`\n\n`

  md += `## Attributes\n\n| 属性 | 说明 | 类型 | 默认值 |\n|------|------|------|--------|\n`
  if (props.length) {
    for (const p of props) {
      const def = defaults[p.name] ?? '—'
      md += `| ${p.name} | ${p.desc} | \`${p.type}\` | ${def} |\n`
    }
  } else {
    md += `| — | 详见源码 props | — | — |\n`
  }
  md += `| customStyle | 自定义样式 | \`string / object\` | — |\n`
  md += `| customClass | 自定义类名 | \`string\` | — |\n\n`

  if (emits.length) {
    md += `## Events\n\n| 事件名 | 说明 |\n|--------|------|\n`
    for (const e of emits) {
      md += `| ${e.name} | ${e.desc} |\n`
    }
    md += `\n`
  }

  md += `## 在 Playground 中试用\n\n打开 \`apps/playground\`，在首页进入对应分类页，点击 **${meta.name}** 测试按钮即可验证。\n`
  return md
}

function writeDocs() {
  fs.mkdirSync(DOCS_DIR, { recursive: true })
  for (const [key, meta] of Object.entries(CATALOG)) {
    const vuePath = findMainVue(key)
    const md = renderDoc(key, meta, vuePath)
    fs.writeFileSync(path.join(DOCS_DIR, `${key}.md`), md, 'utf8')
  }
  // remove obsolete combined pages that conflict? keep management-port as overview redirect
  const overview = `# 组件总览\n\nrobot-ui 组件文档结构参考 [Element Plus](https://element-plus.org/zh-CN/component/button.html)：\n\n- 基础用法示例\n- Attributes / Events 表格\n- Playground 可交互验证\n\n共 **${Object.keys(CATALOG).length}** 个组件文档页，请从左侧导航浏览。\n`
  fs.writeFileSync(path.join(DOCS_DIR, 'overview.md'), overview, 'utf8')
}

function writeConfig() {
  const groups = GROUP_ORDER.map((g) => {
    const items = Object.entries(CATALOG)
      .filter(([, m]) => m.group === g.key)
      .map(([key, m]) => `            { text: '${m.title}', link: '/components/${key}' },`)
      .join('\n')
    return `        {\n          text: '${g.text}',\n          collapsed: false,\n          items: [\n${items}\n          ],\n        },`
  }).join('\n')

  const config = `import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'robot-ui',
  description: '面向 uni-app 安卓端的 Vue3 组件库',
  lang: 'zh-CN',
  lastUpdated: true,
  themeConfig: {
    logo: '/logo.svg',
    search: {
      provider: 'local',
    },
    nav: [
      { text: '指南', link: '/guide/introduce' },
      { text: '组件', link: '/components/overview' },
      { text: 'Playground', link: 'http://localhost:5173' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '介绍', link: '/guide/introduce' },
            { text: '快速开始', link: '/guide/quickstart' },
            { text: '主题与单位', link: '/guide/theme' },
          ],
        },
      ],
      '/components/': [
        {
          text: 'Overview',
          items: [{ text: '组件总览', link: '/components/overview' }],
        },
${groups}
      ],
    },
    socialLinks: [],
    footer: {
      message: '文档结构参考 Element Plus · 基于 Vue3 + uni-app',
      copyright: 'Copyright © robot-ui',
    },
  },
})
`
  fs.writeFileSync(CONFIG_PATH, config, 'utf8')
}

writeDocs()
writeConfig()
console.log(`Generated ${Object.keys(CATALOG).length} component docs + sidebar config`)
