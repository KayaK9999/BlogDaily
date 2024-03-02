import Unocss from 'unocss/vite'
import { defineBlogConfig } from './theme/utils/node'
import PagefindPlugin, { onBuildEnd } from './theme/utils/plugins/searchPlugin'

// https://vitepress.dev/reference/site-config
export default defineBlogConfig({
  title: 'Noodles.Daily',
  description: 'A VitePress Site',
  vite: {
    plugins: [
      Unocss(),
      PagefindPlugin(),
    ],
    build: {
      rollupOptions: {
        external: ['/assets/pagefind/pagefind.js'],
      },
    },
  },
  buildEnd: onBuildEnd,
})
