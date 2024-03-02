import path from 'node:path'
import type { ResolvedConfig } from 'vite'
import * as pagefind from 'pagefind'

// The following code is executed in Node.js when building the site
export async function onBuildEnd(siteConfig: { outDir: string, assetsDir: string }) {
  // console.log('Building pagefind index...', siteConfig)
  const { outDir, assetsDir } = siteConfig
  const indexOutDir = path.join(outDir, assetsDir, 'pagefind')
  const { index } = await pagefind.createIndex({})
  await index!.addDirectory({ path: outDir })
  await index!.writeFiles({
    outputPath: indexOutDir,
  })
}

export default function PagefindPlugin() {
  let outDir = ''
  let assetsDir = ''
  let mode = ''
  let root = ''

  const virtualModuleId = 'virtual:pagefind-path'
  const resolvedVirtualModuleId = `\0${virtualModuleId}`

  return {
    name: 'pagefind',
    configResolved(cfg: ResolvedConfig) {
      // outDir: absolute path in build, relative to root in dev
      // e.g. outDir = 'dist', assetsDir = 'assets' in dev
      // e.g. outDir = 'docs/.vitepress/dist', assetsDir = 'assets' in build
      outDir = cfg.build.outDir
      assetsDir = cfg.build.assetsDir
      mode = cfg.command
      root = cfg.root
    },

    resolveId(id: string) {
      if (id === virtualModuleId)
        return resolvedVirtualModuleId
    },

    load(id: string) {
      const fullAssertPath = path.join('/', assetsDir, 'pagefind', 'pagefind.js')
      const fullAssertPathDev = path.join('/@fs', root, '.vitepress', outDir, assetsDir, 'pagefind', 'pagefind.js')
      if (id === resolvedVirtualModuleId) {
        switch (mode) {
          case 'build':
            return `export const path = ${JSON.stringify(fullAssertPath)}`
          default:
            return `export const path = ${JSON.stringify(fullAssertPathDev)}`
        }
      }
      // return `export default ${JSON.stringify({ outDir, assetsDir })}`
    },

  }
}
