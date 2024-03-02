import type { Awaitable } from 'vitepress'
import { useRouter } from 'vitepress'

const onBeforeRouteChangeCBs: ((to: string) => Awaitable<boolean | void>)[] = []
const onBeforePageLoadCBs: ((to: string) => Awaitable<boolean | void>)[] = []
const onAfterRouteChangedCBs: ((to: string) => Awaitable<void>)[] = []

export enum RouteChangeType {
  onBeforeRouteChange,
  onBeforePageLoad,
  onAfterRouteChanged,
}

async function onBeforeRouteChange(to: string) {
  for (const cb of onBeforeRouteChangeCBs) {
    const result = await cb(to)
    if (result === false)
      return false
  }
}

async function onBeforePageLoad(to: string) {
  for (const cb of onBeforePageLoadCBs) {
    const result = await cb(to)
    if (result === false)
      return false
  }
}

async function onAfterRouteChanged(to: string) {
  for (const cb of onAfterRouteChangedCBs)
    await cb(to)
}

let initd = false
function init() {
  if (initd)
    return
  initd = true

  const router = useRouter()
  router.onBeforeRouteChange = onBeforeRouteChange
  router.onBeforePageLoad = onBeforePageLoad
  router.onAfterRouteChanged = onAfterRouteChanged
}

export function addRouterChangeListener(type: RouteChangeType, cb: (to: string) => Awaitable<boolean | void>) {
  init()
  switch (type) {
    case RouteChangeType.onBeforeRouteChange:
      // 去重
      if (onBeforeRouteChangeCBs.includes(cb))
        return
      onBeforeRouteChangeCBs.push(cb)
      break
    case RouteChangeType.onBeforePageLoad:
      // 去重
      if (onBeforePageLoadCBs.includes(cb))
        return
      onBeforePageLoadCBs.push(cb)
      break
    case RouteChangeType.onAfterRouteChanged:
      // 去重
      if (onAfterRouteChangedCBs.includes(cb as (to: string) => Awaitable<void>))
        return
      onAfterRouteChangedCBs.push(cb as (to: string) => Awaitable<void>)
      break
  }
}

export function removeRouterChangeListener(type: RouteChangeType, cb: (to: string) => Awaitable<boolean | void>) {
  init()
  switch (type) {
    case RouteChangeType.onBeforeRouteChange:
      onBeforeRouteChangeCBs.splice(onBeforeRouteChangeCBs.indexOf(cb), 1)
      break
    case RouteChangeType.onBeforePageLoad:
      onBeforePageLoadCBs.splice(onBeforePageLoadCBs.indexOf(cb), 1)
      break
    case RouteChangeType.onAfterRouteChanged:
      onAfterRouteChangedCBs.splice(onAfterRouteChangedCBs.indexOf(cb as (to: string) => Awaitable<void>), 1)
      break
  }
}
