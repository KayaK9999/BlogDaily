import type { Ref } from 'vue'
import { onMounted, ref } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import type { IPostToc } from '../../types/post'

export function getToc(rootSelector: string, depth: number): IPostToc[] {
  return Array.from(document.querySelectorAll(`${rootSelector} :where(h1, h2, h3, h4, h5, h6)`)).filter(
    el => el.id && el.hasChildNodes(),
  ).map((el) => {
    const level = Number(el.tagName[1])
    return {
      level,
      id: el.id,
      text: el.textContent ?? '',
    }
  }).filter(item => item.level <= depth)
}

export function useActiveTocId(contentSelector: string, anchorSelector: string, tocList: Ref<IPostToc[]>): Ref<string | null> {
  const activeId = ref<string | null>(null)

  function isActive(index: number, anchor: HTMLAnchorElement, nextAnchor: HTMLAnchorElement | null): [boolean, string | null] {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop

    if (index === 0 && scrollTop === 0)
      return [true, null]

    if (scrollTop < anchor.offsetTop)
      return [false, null]

    if (!nextAnchor || scrollTop < nextAnchor.offsetTop - 80)
      return [true, anchor.hash.slice(1)]

    return [false, null]
  }

  function setActiveId() {
    const contentHeadings = (Array.from(
      document.querySelectorAll(`${contentSelector} :where(h1, h2, h3, h4, h5, h6) ${anchorSelector}`),
    ) as HTMLAnchorElement[]).filter((anchor: HTMLAnchorElement) => {
      return anchor.offsetParent !== null && tocList.value.some(item => item.id === anchor.hash.slice(1))
    }) as HTMLAnchorElement[]
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    const isTop = scrollTop === 0
    if (isTop) {
      activeId.value = tocList.value[0]?.id ?? null
      return
    }
    for (let i = 0; i < contentHeadings.length; i++) {
      const anchor = contentHeadings[i]
      const nextAnchor = contentHeadings[i + 1]
      const [active, id] = isActive(i, anchor, nextAnchor)
      if (active) {
        activeId.value = id
        return
      }
    }
    activeId.value = null
  }

  const onScroll = useDebounceFn(setActiveId, 100)
  onMounted(() => {
    requestAnimationFrame(setActiveId)
    window.addEventListener('scroll', onScroll)
  })
  return activeId
}
