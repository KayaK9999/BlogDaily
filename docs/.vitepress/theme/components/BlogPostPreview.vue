<script setup lang="ts">
import { withBase } from 'vitepress'
import type { IPost } from '../types/post'
import { useTags } from '../utils/client/useTags'
import { POST_LIST_PAGE_URL } from '../constants'
import BlogTag from './BlogTag.vue'

const props = defineProps<IPost>()
const { globalHighlight } = useTags()
</script>

<template>
  <a class="post-preview" :href="withBase(props.path)">
    <!-- 左侧是文章信息 -->
    <div class="post-info">
      <div class="post-info__title">
        <!-- 文章标题 -->
        {{ props.title }}
      </div>
      <div class="post-info__description" v-html="props.description" />
      <div class="post-info__footer">
        <div class="post-info__tags">
          <!-- 文章标签 -->
          <BlogTag
            v-for="tag in props.tags"
            :key="tag"
            :tag="tag"
            :highlight="globalHighlight?.includes(tag)"
            :href="!globalHighlight?.includes(tag) ? undefined : `${POST_LIST_PAGE_URL}`"
          />
        </div>
        <div class="post-info__date">
          <!-- 文章日期 -->
          {{ props.date }}
        </div>

      </div>
    </div>
    <!-- 右侧是插图 -->
    <!-- 先不管插图 -->
    <div v-if="!!props.titleImage" class="post-img">
      <img :src="props.titleImage" alt="">
    </div>
  </a>
</template>

<style>
.post-preview {
  @apply flex flex-row justify-between border-0;
  @apply transition-all duration-500 ease;
  @apply px-4 py-3;
  @apply hover:(bg-gray-200 dark:bg-gray-700 bg-opacity-50 dark:bg-opacity-50);
  @apply rounded-md;
}

.post-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-right: 1rem;
  width: 100%;
  width: --webkit-fill-available;
}

.post-img {
  width: 120px;
  height: auto;
  max-height: 120px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
}

.post-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.post-info__title {
  @apply font-serif font-700 text-xl line-height-2rem;
  @apply mb-1;
  @apply cursor-default;
  @apply text-inherit;
}

.post-info__description {
  @apply font-serif font-500 text-gray-500 dark:text-gray-400;
  @apply mb-1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  flex: 1;
}

.post-info__description p {
  margin: 0;
}

.post-info__footer {
  @apply flex flex-row justify-between items-center;
  @apply w-full;
  @apply mt-1;
}
.post-info__tags {
  @apply flex flex-row gap-1 flex-wrap;
  @apply font-serif font-500;
}

.post-info__date {
  @apply font-serif font-500;
  @apply text-xs;
}

@screen md {
  .post-img {
    width: 180px;
  }
}
</style>
