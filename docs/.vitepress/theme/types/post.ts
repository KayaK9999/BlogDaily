export interface IPost {
  title: string
  description: string
  titleImage?: string
  date: string
  tags?: string[]
  path: string
  content?: string
  frontmatter?: Record<string, any>
}

export interface IPostToc {
  level: number
  id: string
  text: string
}
