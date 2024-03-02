// https://vitepress.dev/guide/custom-theme
import type { EnhanceAppContext, Theme } from 'vitepress'
import Layout from './Layout.vue'
import '@unocss/reset/sanitize/sanitize.css'
import '@unocss/reset/sanitize/assets.css'
import 'uno.css'
import './styles/index.css'

export default {
  Layout,
} satisfies Theme
