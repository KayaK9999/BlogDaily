export const INJECT_KEY_POSTS = Symbol('posts')
// 这里不能用Symbol，因为index可能执行多次，导致Symbol不一致
export const NODE_GLOBAL_POST_LIST = 'blog:postList'

export const POST_LIST_PAGE_URL = '/page'
export const POST_LIST_PAGE_SIZE = 10
