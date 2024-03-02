<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
import { onContentUpdated, useData } from 'vitepress'
import type { IPostToc } from '../types/post'
import { getToc, useActiveTocId } from '../utils/client/getToc'

const { page, frontmatter } = useData()
const toc: Ref<IPostToc[]> = ref([])
onContentUpdated(() => {
  toc.value = getToc('.post-content', 2)
})
const activeTocId = useActiveTocId('.post-content', '.header-anchor', toc)
</script>

<template>
  <div id="post_main" class="post-main">
    <div class="post-container no-title">
      <h1 :id="toc[0]?.id">
        {{ page.title }}
      </h1>
      <div v-if="!!frontmatter.titleImage" class="post-title-image">
        <img class="title-image__image" :src="frontmatter.titleImage" alt="">
      </div>
      <article class="post-content" data-pagefind-body>
        <slot />
      </article>
    </div>
    <div class="post-toc">
      <aside class="toc__container" fixed>
        <h3 class="toc__title">
          目录
        </h3>
        <ul class="toc__content">
          <li v-for="item in toc" :key="item.id" :class="{ nested: item.level > 2 }">
            <a
              :href="`#${item.id}`" :class="{
                active: item.id === activeTocId,
              }"
            >{{ item.text }}</a>
          </li>
        </ul>
      </aside>
    </div>
  </div>
</template>

<style>
.post-main {
  @apply flex flex-row flex-1 w-full;
}
.post-container {
  @apply flex flex-col content-center;
  @apply flex-1;
  @apply font-serif;
  @apply px-10;
  @apply w-full box-border;
}

.post-toc {
  @apply px-10 relative;
  color: var(--blog-text-color-secondary);
}

.post-toc ul {
  @apply list-none;
  padding-inline-start: 0;
}

.post-toc li {
  @apply mb-1;
}

.post-toc li:first-child {
  @apply hidden;
}

.post-toc li.nested {
  padding-left: 2ch;
}

.post-toc a {
  @apply text-sm border-0 hover:color-[var(--blog-text-color)];
  @apply transition-colors duration-200 ease;
  color: var(--blog-text-color-secondary);
}

.post-toc a.active {
  @apply color-[var(--blog-text-color)];

}
.post-container h1 {
  @apply font-700 text-4xl line-height-2rem;
}

.post-title-image, .post-content {
  @apply flex flex-col;
  @apply flex-1;
  @apply font-serif;
  position: relative;
}

.post-title-image {
  overflow: hidden
}

.post-title-image img{
  @apply transition-transform duration-2000 ease;
}
.post-title-image img:hover {
  transform: scale(1.3);
}

.title-image__image {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  object-position: center;
}
</style>

<style>
.post-container.no-title > .post-content h1:first-child {
  display: none;
}
</style>
