import { defineConfig } from 'vitepress'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const vitepressDir = path.dirname(fileURLToPath(import.meta.url))
const monorepoRoot = path.resolve(vitepressDir, '../../..')

export default defineConfig({
  title: 'robot-ui',
  description: '面向 uni-app 安卓端的 Vue3 组件库',
  lang: 'zh-CN',
  lastUpdated: true,
  vite: {
    resolve: {
      alias: [
        {
          // 文档站无 uni 条件编译，用 teleport stub 替代
          find: path.resolve(monorepoRoot, 'packages/components/src/root-portal/rb-root-portal.vue'),
          replacement: path.resolve(vitepressDir, 'stubs/rb-root-portal.vue'),
        },
        {
          find: '@robot-ui/assets/iconfont.css',
          replacement: path.resolve(monorepoRoot, 'packages/assets/iconfont.css'),
        },
        {
          find: /^@robot-ui\/assets\/(.+)$/,
          replacement: path.resolve(monorepoRoot, 'packages/assets/$1'),
        },
        {
          find: /^@robot-ui\/assets$/,
          replacement: path.resolve(monorepoRoot, 'packages/assets/src/index.ts'),
        },
        {
          find: /^@robot-ui\/icons$/,
          replacement: path.resolve(monorepoRoot, 'packages/icons/src/index.ts'),
        },
        {
          find: /^@robot-ui\/utils$/,
          replacement: path.resolve(vitepressDir, 'theme/docs-utils.ts'),
        },
        {
          find: /^@robot-ui\/components$/,
          replacement: path.resolve(monorepoRoot, 'packages/components/src/index.ts'),
        },
      ],
    },
    css: {
      preprocessorOptions: {
        scss: {
          // 与 playground 一致：modern API，并静默存量 @import 迁移期警告
          api: 'modern-compiler',
          silenceDeprecations: ['import', 'global-builtin', 'legacy-js-api'],
        },
      },
      postcss: {
        plugins: [
          {
            postcssPlugin: 'rpx-to-px',
            Declaration(decl) {
              if (typeof decl.value === 'string' && decl.value.includes('rpx')) {
                decl.value = decl.value.replace(/(-?[\d.]+)rpx/g, (_, num) => `${Number(num) / 2}px`)
              }
            },
          },
        ],
      },
    },
    server: {
      fs: {
        allow: [monorepoRoot],
      },
    },
    optimizeDeps: {
      exclude: ['@robot-ui/assets', '@robot-ui/icons', '@robot-ui/utils', '@robot-ui/components'],
    },
    ssr: {
      noExternal: ['@robot-ui/assets', '@robot-ui/icons', '@robot-ui/utils', '@robot-ui/components'],
    },
  },
  themeConfig: {
    logo: '/logo.svg',
    search: {
      provider: 'local',
    },
    nav: [
      { text: '指南', link: '/guide/introduce' },
      { text: '组件', link: '/components/overview' },
      { text: '图标库', link: '/components/icon' },
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
        {
          text: 'Basic 基础',
          collapsed: false,
          items: [
            { text: 'Button 按钮', link: '/components/button' },
            { text: 'Icon 图标库', link: '/components/icon' },
            { text: 'IconFont 字体图标', link: '/components/icon-font' },
            { text: 'Text 文本', link: '/components/text' },
            { text: 'Link 链接', link: '/components/link' },
            { text: 'Tag 标签', link: '/components/tag' },
            { text: 'Badge 徽标', link: '/components/badge' },
            { text: 'Color 色块', link: '/components/color' },
            { text: 'Cell 单元格', link: '/components/cell' },
            { text: 'CellGroup 单元格组', link: '/components/cell-group' },
            { text: 'Loading 加载', link: '/components/loading' },
            { text: 'Empty 空状态', link: '/components/empty' },
            { text: 'Divider 分割线', link: '/components/divider' },
            { text: 'Gap 间隔槽', link: '/components/gap' },
            { text: 'Line 线条', link: '/components/line' },
          ],
        },
        {
          text: 'Layout 布局',
          collapsed: false,
          items: [
            { text: 'Row 行布局', link: '/components/row' },
            { text: 'Col 列布局', link: '/components/col' },
            { text: 'Layout 布局容器', link: '/components/layout' },
            { text: 'Scroll 滚动容器', link: '/components/scroll' },
            { text: 'ScrollList 横向滚动', link: '/components/scroll-list' },
            { text: 'Sticky 吸顶', link: '/components/sticky' },
            { text: 'PageFooter 页脚布局', link: '/components/page-footer' },
            { text: 'Grid 宫格', link: '/components/grid' },
            { text: 'GridItem 宫格项', link: '/components/grid-item' },
            { text: 'StatusBar 状态栏占位', link: '/components/status-bar' },
            { text: 'SafeBottom 底部安全区', link: '/components/safe-bottom' },
            { text: 'RootPortal 根节点传送', link: '/components/root-portal' },
          ],
        },
        {
          text: 'Form 表单',
          collapsed: false,
          items: [
            { text: 'Form 表单', link: '/components/form' },
            { text: 'FormItem 表单项', link: '/components/form-item' },
            { text: 'Input 输入框', link: '/components/input' },
            { text: 'Textarea 文本域', link: '/components/textarea' },
            { text: 'Checkbox 复选框', link: '/components/checkbox' },
            { text: 'CheckboxGroup 复选组', link: '/components/checkbox-group' },
            { text: 'Radio 单选框', link: '/components/radio' },
            { text: 'RadioGroup 单选组', link: '/components/radio-group' },
            { text: 'Switch 开关', link: '/components/switch' },
            { text: 'Slider 滑块', link: '/components/slider' },
            { text: 'Rate 评分', link: '/components/rate' },
            { text: 'Search 搜索', link: '/components/search' },
            { text: 'NumberBox 步进器', link: '/components/number-box' },
            { text: 'Upload 上传', link: '/components/upload' },
            { text: 'Code 验证码按钮', link: '/components/code' },
            { text: 'CodeInput 验证码输入', link: '/components/code-input' },
            { text: 'Picker 选择器', link: '/components/picker' },
            { text: 'DatePicker 日期时间', link: '/components/date-picker' },
            { text: 'DatetimePicker 时间滚轮', link: '/components/datetime-picker' },
            { text: 'DatetimePanel 日期时间面板', link: '/components/datetime-panel' },
            { text: 'Calendar 日历', link: '/components/calendar' },
            { text: 'Keyboard 数字键盘', link: '/components/keyboard' },
            { text: 'MultiSelect 多选弹窗', link: '/components/multi-select' },
          ],
        },
        {
          text: 'Feedback 反馈',
          collapsed: false,
          items: [
            { text: 'Popup 弹出层', link: '/components/popup' },
            { text: 'Modal 模态框', link: '/components/modal' },
            { text: 'AppDialog 业务弹窗', link: '/components/app-dialog' },
            { text: 'Toast 消息通知', link: '/components/toast' },
            { text: 'ActionSheet 动作面板', link: '/components/action-sheet' },
            { text: 'Alert 警告提示', link: '/components/alert' },
            { text: 'NoticeBar 通知栏', link: '/components/notice-bar' },
            { text: 'Notify 消息提示', link: '/components/notify' },
            { text: 'Tooltip 文字提示', link: '/components/tooltip' },
            { text: 'Overlay 遮罩层', link: '/components/overlay' },
            { text: 'Transition 过渡动画', link: '/components/transition' },
            { text: 'SwipeAction 滑动单元格', link: '/components/swipe-action' },
            { text: 'SwipeActionItem 滑动项', link: '/components/swipe-action-item' },
            { text: 'NoNetwork 无网络', link: '/components/no-network' },
          ],
        },
        {
          text: 'Data 数据展示',
          collapsed: false,
          items: [
            { text: 'Table 表格', link: '/components/table' },
            { text: 'Pagination 分页', link: '/components/pagination' },
            { text: 'List 列表', link: '/components/list' },
            { text: 'ListItem 列表项', link: '/components/list-item' },
            { text: 'Loadmore 加载更多', link: '/components/loadmore' },
            { text: 'PullRefresh 下拉刷新', link: '/components/pull-refresh' },
            { text: 'VirtualList 虚拟列表', link: '/components/virtual-list' },
            { text: 'Card 卡片', link: '/components/card' },
            { text: 'Collapse 折叠面板', link: '/components/collapse' },
            { text: 'CollapseItem 折叠项', link: '/components/collapse-item' },
            { text: 'LineProgress 进度条', link: '/components/line-progress' },
            { text: 'CountDown 倒计时', link: '/components/count-down' },
            { text: 'CountTo 数字滚动', link: '/components/count-to' },
            { text: 'Skeleton 骨架屏', link: '/components/skeleton' },
            { text: 'ReadMore 展开阅读', link: '/components/read-more' },
            { text: 'Parse 富文本', link: '/components/parse' },
          ],
        },
        {
          text: 'Media 媒体',
          collapsed: false,
          items: [
            { text: 'Image 图片', link: '/components/image' },
            { text: 'ImageViewer 图片预览', link: '/components/image-viewer' },
            { text: 'Video 视频', link: '/components/video' },
            { text: 'Album 相册', link: '/components/album' },
            { text: 'Swiper 轮播', link: '/components/swiper' },
            { text: 'Avatar 头像', link: '/components/avatar' },
            { text: 'AvatarGroup 头像组', link: '/components/avatar-group' },
          ],
        },
        {
          text: 'Navigation 导航',
          collapsed: false,
          items: [
            { text: 'Tabs 标签页', link: '/components/tabs' },
            { text: 'Subsection 分段器', link: '/components/subsection' },
            { text: 'Navbar 导航栏', link: '/components/navbar' },
            { text: 'Tabbar 底部导航', link: '/components/tabbar' },
            { text: 'TabbarItem 导航项', link: '/components/tabbar-item' },
            { text: 'Steps 步骤条', link: '/components/steps' },
            { text: 'StepsItem 步骤项', link: '/components/steps-item' },
            { text: 'IndexList 索引列表', link: '/components/index-list' },
            { text: 'IndexAnchor 索引锚点', link: '/components/index-anchor' },
            { text: 'BackTop 回到顶部', link: '/components/back-top' },
            { text: 'FooterBack 底部返回', link: '/components/footer-back' },
          ],
        },
        {
          text: 'Keyboard 键盘',
          collapsed: false,
          items: [
            { text: 'SoftKeyboard 软键盘', link: '/components/soft-keyboard' },
            { text: 'SoftKeyboardInput 软键盘输入', link: '/components/soft-keyboard-input' },
            { text: 'SystemKeyboardInput 系统键盘输入', link: '/components/system-keyboard-input' },
          ],
        },
        {
          text: 'Others 其他',
          collapsed: false,
          items: [
            { text: 'AppTag 业务标签', link: '/components/app-tag' },
          ],
        },
      ],
    },
    socialLinks: [],
    footer: {
      message: '文档风格参考 Element Plus · 品牌色 #3c9cff',
      copyright: 'Copyright © robot-ui',
    },
    outline: {
      label: 'CONTENTS',
      level: [2, 3],
    },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    lastUpdatedText: '最后更新于',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '外观',
  },
})
