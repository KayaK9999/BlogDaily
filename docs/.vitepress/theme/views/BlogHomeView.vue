<script setup lang="ts">
import { useListPage } from '../utils/client/useListPage'
import BlogPostList from '../components/BlogPostList.vue'
import { getClientPostList } from '../utils/client/globalData'

const posts = getClientPostList()

const {
  list,
} = useListPage(posts, 1, 3)
</script>

<template>
  <BlogPostList :posts="list" />
</template>
