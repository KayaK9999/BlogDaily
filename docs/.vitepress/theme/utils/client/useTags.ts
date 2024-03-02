import type { Ref } from 'vue'
import { computed, ref } from 'vue'
import { getAllTags, getClientPostList, getTagPosts } from './globalData'
import { RouteChangeType, addRouterChangeListener, removeRouterChangeListener } from './hackRouter'

const globalHighlight: Ref<string | null> = ref(null)

function routerChangeCB(to: string) {
  const url = new URL(to, window.location.origin)
  const query = url.searchParams
  globalHighlight.value = query.get('tag') ?? null
}

export function useTags(tagStr?: Ref<string | null | undefined>) {
  addRouterChangeListener(RouteChangeType.onAfterRouteChanged, routerChangeCB)
  const tagPosts = computed(() => {
    switch (tagStr?.value) {
      case 'all':
      case '':
      case null:
      case undefined:
        return getClientPostList()
      default:
        return getTagPosts(tagStr!.value)
    }
  })
  if (typeof window !== 'undefined') {
    window.addEventListener('unload', () => {
      removeRouterChangeListener(RouteChangeType.onAfterRouteChanged, routerChangeCB)
    })
  }

  return {
    posts: tagPosts,
    tags: getAllTags(), // tag在客户端是静态的，无需ref
    globalHighlight,
  }
}
