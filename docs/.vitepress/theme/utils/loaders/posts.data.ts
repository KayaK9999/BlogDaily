import { createContentLoader } from 'vitepress'
import { getDescription, getFirstH1, parseDate } from '../node/posts'
import type { IPost } from '../../types/post'

declare const data: IPost[]
export { data }

// This function is only called on build time
// So we can use any Node.js API here
export default createContentLoader('**/*.md', {
  excerpt: (file) => { file.excerpt = getDescription(file.content, 200) },
  includeSrc: true,
  transform: (rawData) => {
    return rawData
      // filter hidden page
      .filter(page => !page.frontmatter?.hidden)
      // sort as date
      // parse tags and date
      .map((page) => {
        const tags = page.frontmatter?.tags ?? ''
        const date = page.frontmatter?.date ?? ''
        return {
          ...page,
          tags: tags.split(',').map((tag: string) => tag.trim()),
          date: parseDate(date),
          path: page.url,
          title: getFirstH1(page.src ?? ''),
        }
      })
      .sort((a, b) => {
        if (a.frontmatter?.date && b.frontmatter?.date)
          return +parseDate(b.frontmatter.date) - +parseDate(a.frontmatter.date)
        return 0
      })
      .map((page): IPost => ({
        // compress content
        title: page.title,
        description: page.excerpt ?? '',
        titleImage: page.frontmatter?.titleImage,
        date: page.date?.toLocaleDateString() ?? '',
        tags: page.tags ?? [],
        path: page.path,
        frontmatter: page.frontmatter,
      }))
  },
})
