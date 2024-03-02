<script setup lang="ts">
import type { IPost } from '../types/post'
import BlogPostPreview from './BlogPostPreview.vue'

defineProps < {
  posts: IPost[]
  page?: number
  pageSize?: number
}>()
</script>

<template>
  <TransitionGroup name="post-list" class="post-list" tag="ul">
    <li
      v-for="(post, idx) in posts"
      :key="post.path"
      class="post-list__item"
    >
      <BlogPostPreview
        :path="post.path"
        :title="post.title"
        :description="post.description ?? ''"
        :tags="post.tags ?? []"
        :date="post.date ?? ''"
        :title-image="post.titleImage ?? ''"
      />
      <hr v-if="idx !== posts.length - 1" class="post-list__divider">
    </li>
  </TransitionGroup>
</template>

<style>
.post-list {
  @apply flex flex-col;
  @apply flex-1;
  @apply: w-full relative m-0;
  max-width: 800px;
  text-align: initial;
  padding-inline-start: 0;
}

.post-list-enter-from {
  opacity: 0;
  transform: translateY(30%);
}

.post-list-leave-to {
  opacity: 0;
  transform: translateY(-30%);
}

.post-list-enter-active,
.post-list-leave-active,
.post-list-move {
  transition: all 0.5s ease;
  width: 100%;
}

.post-list-leave-active {
  @apply absolute;
}

.post-list__item {
  @apply border-0;
  /* 清除ul自带样式 */
  list-style: none;
}

.post-list__divider {
  @apply border-0 border-gray-200 dark:border-gray-700 border-b-solid border-b-1;
}

ul .post-list__item:last-child .post-list__divider {
  @apply border-0;
  @apply m-0;
}
</style>
