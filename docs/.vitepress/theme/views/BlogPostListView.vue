<script setup lang="ts">
import { computed, ref, withDefaults } from 'vue'

import BlogPostList from '../components/BlogPostList.vue'

import { useTags } from '../utils/client/useTags'
import { data as allPosts } from '../utils/loaders/posts.data'

const props = withDefaults(defineProps<{ pageSize?: number }>(), {
  pageSize: 10,
})

const { globalHighlight } = useTags()

const posts = computed(() => {
  const tag = globalHighlight.value
  return allPosts.filter((post) => {
    if (tag)
      return post.tags?.includes(tag) ?? false

    return true
  })
})

const cutoff = ref(props.pageSize)
const list = computed(() => posts.value.slice(0, cutoff.value))
</script>

<template>
  <div class="post-list-container">
    <BlogPostList
      :posts="list"
    />
    <button
      v-if="cutoff < posts.length"
      class="load-more"
      @click="cutoff += 10"
    >
      加载更多
    </button>
  </div>
</template>

<style scoped>
.post-list-container {
  @apply flex flex-col items-center;
}

.post-list-container .load-more {
  @apply px-4 py-2;
  @apply bg-light-50 dark:bg-dark-50;
  @apply rounded-md;
  @apply my-4;
  @apply cursor-pointer;
  @apply transition-all duration-500 ease;
  @apply border-style-solid border-1 border-gray-200 dark:border-gray-700;
  @apply c-inherit;
}
</style>
