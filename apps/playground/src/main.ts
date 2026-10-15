import { createSSRApp } from 'vue'
import { registerComponents } from '@robot-ui/components'
import App from './App.vue'
import 'uno.css'
import '@robot-ui/styles/index.scss'

export function createApp() {
  const app = createSSRApp(App)
  registerComponents(app)
  return {
    app,
  }
}
