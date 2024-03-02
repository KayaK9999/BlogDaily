export interface PagefindInstance {
  init: (options?: Record<string, any>) => void
  search: (query: string) => Promise<PagefindResponse>
  debouncedSearch: (query: string, waitMs: number) => Promise<PagefindResponse | null>
}

export interface PagefindResponse {
  results: PagefindResult[]
}

export interface PagefindResult {
  id: string
  data: () => Promise<PagefindResultData>
}

export interface PagefindResultData {
  url: string
  excerpt: string
  meta: {
    title: string
    image: string
  }
  content: string
  word_count: number
  sub_results?: PagefindSubResultData[]
}

export interface PagefindSubResultData {
  anchor: {
    id: string
    text: string
    element: string
    location: number
  }
  excerpt: string
  title: string
  url: string
}
