import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  pages: [],
  globalStyle: {
    backgroundColor: '#f5f6f8',
    backgroundColorBottom: '#f5f6f8',
    backgroundColorTop: '#f5f6f8',
    backgroundTextStyle: 'dark',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTextStyle: 'black',
    navigationBarTitleText: 'robot-ui Playground',
    navigationStyle: 'default',
  },
  easycom: {
    autoscan: true,
    custom: {
      '^rb-(.*)': '@robot-ui/components/$1/rb-$1.vue',
    },
  },
})
