import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const docsRoot = path.resolve(__dirname, '..')
const keys = ['line', 'grid', 'slider', 'table', 'image', 'video', 'grid-item']

function escapeSource(source) {
  return source
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/<\/script>/gi, '<\\/script>')
    .replace(/<\/template>/gi, '<\\/template>')
}

function buildDemoSection(source) {
  return `## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

\`\`\`vue
${source.trim()}
\`\`\`

  </template>
</DemoBlock>
`
}

for (const key of keys) {
  const examplePath = path.join(docsRoot, 'examples', key, 'basic.vue')
  if (!fs.existsSync(examplePath)) continue
  const source = fs.readFileSync(examplePath, 'utf8').replace(/\r\n/g, '\n')
  const mdPath = path.join(docsRoot, 'components', `${key}.md`)
  if (!fs.existsSync(mdPath)) continue
  let md = fs.readFileSync(mdPath, 'utf8').replace(/\r\n/g, '\n')

  // 重建顶部 script
  const script = `<script setup lang="ts">
import BasicDemo from '../examples/${key}/basic.vue'

const basicSource = \`${escapeSource(source)}\`
</script>
`

  md = md.replace(/^<script setup[\s\S]*?<\/script>\s*/m, '')
  md = script + '\n' + md

  if (/## 基础用法/.test(md)) {
    md = md.replace(/## 基础用法[\s\S]*?(?=\n## |\n:::|\n# )/m, `${buildDemoSection(source)}\n`)
  }

  // 表格泛型转义，避免 Vue 解析崩
  md = md.replace(/`([^`]*<[^`]+>)`/g, (_, inner) => '`' + inner.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '`')

  fs.writeFileSync(mdPath, md)
  console.log('fixed', key)
}
