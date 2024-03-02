<script setup lang="ts">
import { useTags } from '../utils/client/useTags'
import BlogTag from '../components/BlogTag.vue'

const { tags } = useTags()
</script>

<template>
  <div class="tag-container">
    <h1 class="tag-container__title">
      Tags
    </h1>
    <ul class="tag-container__list">
      <li v-for="tag in tags" :key="tag" class="tag-container__list__item">
        <BlogTag :tag="tag" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.tag-container {
  @apply flex flex-col;
  @apply font-serif;
  @apply px-10;
}

.tag-container__title {
  @apply font-serif font-700 text-1.6rem line-height-2rem;
  @apply my-0.5rem;
  @apply cursor-default;
}

.tag-container__list {
  @apply flex flex-row justify-start items-center p-0  my-0 gap-1ch;
  @apply font-serif font-500 text-lg;
}

.tag-container__list__item {
  --at-apply: flex flex-row justify-between items-center cursor-pointer;
  list-style: none;
}
</style>
