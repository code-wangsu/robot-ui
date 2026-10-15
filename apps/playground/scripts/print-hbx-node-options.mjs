import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const dir = dirname(fileURLToPath(import.meta.url))
const registerUrl = pathToFileURL(join(dir, 'register-win-esm.mjs')).href

console.log('请将下面整行设置为系统 / 用户环境变量 NODE_OPTIONS（然后重启 HBuilderX）：\n')
console.log(`NODE_OPTIONS=--import ${registerUrl}`)
console.log('\nPowerShell 临时生效（当前会话）：')
console.log(`$env:NODE_OPTIONS="--import ${registerUrl}"`)
