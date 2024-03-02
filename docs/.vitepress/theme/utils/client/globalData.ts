import { data as allPosts } from '../loaders/posts.data'

export function getClientPostList() {
  return allPosts
}

export function getAllTags() {
  const postList = getClientPostList()
  const tags = new Set<string>()
  postList.forEach((post) => {
    post.tags?.forEach(tag => tags.add(tag))
  })
  return Array.from(tags)
}

export function getTagPosts(tag: string) {
  const postList = getClientPostList()
  return postList.filter(post => post.tags?.includes(tag))
}
