import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { initTheme } from '@robot-ui/utils'
import { ensureUniGlobal, installUniStubs } from './uni-stubs'
import DemoBlock from '../components/DemoBlock.vue'
import IconGallery from '../components/IconGallery.vue'
import ThemePicker from '../components/ThemePicker.vue'

import '../../../../packages/styles/index.scss'
import '../../../../packages/assets/iconfont.css'

import * as RobotComponents from '../../../../packages/components/src/index.ts'
import RbPopupBody from '../../../../packages/components/src/popup/rb-popup-body.vue'
import RbRootPortal from '../stubs/rb-root-portal.vue'

import './style.css'

function toKebab(name: string) {
  return name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

function register(app: { component: (name: string, comp: unknown) => void }, name: string, comp: unknown) {
  app.component(name, comp)
  app.component(toKebab(name), comp)
}

const theme: Theme = {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    ensureUniGlobal()
    installUniStubs(app)

    if (typeof window !== 'undefined') {
      initTheme()
    }

    app.component('DemoBlock', DemoBlock)
    app.component('IconGallery', IconGallery)
    app.component('ThemePicker', ThemePicker)

    for (const [name, comp] of Object.entries(RobotComponents)) {
      if (!name.startsWith('Rb') || (!comp || (typeof comp !== 'object' && typeof comp !== 'function'))) continue
      if (name === 'RbRootPortal') continue
      register(app, name, comp)
    }

    register(app, 'RbPopupBody', RbPopupBody)
    register(app, 'RbRootPortal', RbRootPortal)
  },
}

export default theme
