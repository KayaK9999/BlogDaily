<script setup lang="ts">
import { useData } from 'vitepress'

import BlogHeader from './components/BlogHeader.vue'
import BlogHomeView from './views/BlogHomeView.vue'
import BlogPostListView from './views/BlogPostListView.vue'
import BlogContentView from './views/BlogContentView.vue'
import BlogTagView from './views/BlogTagView.vue'

const { frontmatter } = useData()
</script>

<template>
  <BlogHeader />
  <!-- Header是fixed定位，所以需要一个占位符 -->
  <div h="[var(--header-height)]" w="full" />
  <main class="container" mx="auto">
    <BlogHomeView v-if="frontmatter.home" flex="1" />
    <BlogPostListView v-else-if="frontmatter.type === 'index'" flex="1" />
    <BlogTagView v-else-if="frontmatter.type === 'tag'" flex="1" />
    <BlogContentView v-else>
      <Content />
    </BlogContentView>
  </main>
</template>
