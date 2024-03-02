import type { Ref } from 'vue'
import { computed, toRef, unref } from 'vue'
import type { IPost } from '../../types/post'

export function useListPage(posts: Ref<IPost[]> | IPost[], page: Ref<number> | number, pageSize: Ref<number> | number, opts: Record<string, any> = {}) {
  const prefix = opts.prefix || '/page/'
  const list = computed(() => {
    const start = (unref(page) - 1) * unref(pageSize)
    const end = start + unref(pageSize)
    return unref(posts).slice(start, end)
  })

  const total = computed(() => {
    return unref(posts).length
  })

  const totalPages = computed(() => {
    return Math.ceil(total.value / unref(pageSize))
  })

  const hasPrev = computed(() => {
    return unref(page) > 1
  })

  const hasNext = computed(() => {
    return unref(page) < totalPages.value
  })

  const prevURL = computed(() => {
    if (hasPrev.value)
      return `${prefix}${unref(page) - 1}`
    return ''
  })

  const nextURL = computed(() => {
    if (hasNext.value)
      return `${prefix}${unref(page) + 1}`
    return ''
  })

  const setPage = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages.value)
      toRef(page).value = newPage
  }

  return {
    list,
    totalPages,
    total,
    hasPrev,
    hasNext,
    prevURL,
    nextURL,
    setPage,
  }
}
