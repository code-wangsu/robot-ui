import { copySync, ensureDirSync, removeSync } from 'fs-extra'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))
const pkgRoot = resolve(root, '..')
const monorepoRoot = resolve(pkgRoot, '../..')

const targets = [
  {
    from: resolve(monorepoRoot, 'packages/components/src'),
    to: resolve(pkgRoot, 'components'),
  },
  {
    from: resolve(monorepoRoot, 'packages/styles'),
    to: resolve(pkgRoot, 'styles'),
  },
  {
    from: resolve(monorepoRoot, 'packages/assets'),
    to: resolve(pkgRoot, 'assets'),
  },
]

for (const { from, to } of targets) {
  removeSync(to)
  ensureDirSync(to)
  copySync(from, to, {
    filter: (src) => !src.includes('node_modules') && !src.endsWith('package.json'),
  })
  console.log(`[robot-ui] copied ${from} -> ${to}`)
}
