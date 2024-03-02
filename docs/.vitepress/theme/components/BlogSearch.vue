<script setup lang="ts">
import { path } from 'virtual:pagefind-path'
import { onBeforeMount, ref, watchEffect } from 'vue'
import type { PagefindInstance, PagefindResultData } from '../types/search'

const pagefindInstance = ref<PagefindInstance | undefined>()

onBeforeMount(async () => {
  const pagefind = await import(/* @vite-ignore */ path) as PagefindInstance
  pagefind.init()
  pagefindInstance.value = pagefind
})

const search = ref('')
const searchResults = ref<PagefindResultData[]>([])
watchEffect(async () => {
  if (pagefindInstance.value) {
    const res = await pagefindInstance.value.debouncedSearch(search.value, 300)
    if (!res)
      return
    searchResults.value = await Promise.all(res.results.map(async (item) => {
      const data = await item.data()
      return data
    }))
  }
})
</script>

<template>
  <div class="search-container" w-full relative>
    <input v-model="search" class="search-input" type="text" placeholder="Search..." z-1 min-w-full>
    <button v-if="search.length > 0" class="search-input__clear" @click="() => { search = '' }">
      <div i-ph="x-circle-fill" />
    </button>
  </div>
  <Teleport to="#header-search-result">
    <div v-if="search" class="search-results">
      <ul class="result-item">
        <li v-for="result in searchResults" :key="result.url">
          <h1>  <span text-lg inline-block i-ph="file-bold" /> {{ result.meta.title }} </h1>
          <ul v-if="result.sub_results" class="result-item__sub">
            <li v-for="sub_result in result.sub_results" :key="sub_result.title">
              <h2> {{ sub_result.title }} </h2>
              <p text-xs v-html="sub_result.excerpt" />
              <!-- <button>Jump</button> -->
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </Teleport>
</template>

<style>
.search-input {
  /* @apply w-full; */
  @apply px-1rem py-0.5rem;
  @apply border-1 border-solid border-gray-300 dark:border-gray-500;
  @apply rounded-md;
  @apply bg-light dark:bg-dark;
  @apply text-inherit;
  @apply transition-all duration-500 ease outline-blue-500 outline-2px;
  --un-outline-color-opacity: 0;
  z-index: 100;
  overflow: visible;
}

.search-input:focus-visible {
  --un-outline-color-opacity: 1;
}

.search-input__clear {
  @apply absolute top-0 right-0 h-full w-40px;
  @apply border-0 ;
  @apply bg-transparent;
  @apply text-inherit text-lg opacity-50 hover:opacity-80;
  @apply p-0 px-1;
  @apply rounded-md;
  @apply transition-all;
  @apply flex justify-center items-center;
  @apply transition-opacity duration-500 ease;
  z-index: 100;
  overflow: visible;
}

.search-results {
  @apply text-inherit;
  z-index: 100;
  overflow: hidden;
}

.result-item {
  @apply mt-0;
  @apply px-1rem py-0.5rem;
  /* @apply border-1 border-solid border-gray-300 dark:border-gray-500; */
  @apply rounded-md;
  /* @apply bg-light dark:bg-dark; */
  @apply text-inherit;
  z-index: 100;
  overflow: visible;
  list-style: none;
}

.result-item:empty {
  @apply h-0 m-0 p-0;
}

.search-results > ul > li {
  @apply px-1rem py-0.5rem;
  /* @apply border-1 border-solid border-gray-300 dark:border-gray-500; */
  @apply rounded-md;
  /* @apply bg-light dark:bg-dark; */
  @apply text-inherit;
  z-index: 100;
  overflow: visible;
  list-style: none;
}

.result-item__sub {
  /* @apply border-1 border-solid border-gray-300 dark:border-gray-500; */
  @apply rounded-md;
  @apply px-0 py-0;
  @apply text-inherit;
  @apply flex flex-col gap-sm;
  z-index: 100;
  overflow: visible;
  list-style: none;
}

.result-item__sub > li {
  @apply px-1rem py-0.5rem;
  @apply border-1 border-solid border-gray-400 dark:border-gray-300;
  @apply rounded-md;
  /* @apply bg-light dark:bg-dark; */
  @apply text-inherit;
  @apply hover:bg-light dark:hover:bg-dark;
  @apply transition-all duration-500 ease;
  z-index: 100;
  overflow: visible;
  list-style: none;
}

.result-item h1 {
  @apply font-serif font-700 text-lg;
  @apply mb-0.5rem mt-0;
  @apply flex gap-[1ch] items-center;
  @apply relative z-10;
}

.result-item__sub h2 {
  @apply font-serif font-700 text-base;
  @apply my-0.5rem;
}

.result-item__sub h2::before {
  @apply inline;
  @apply mr-[0.5ch];
  content: '#';
}

.result-item p {
  @apply text-dark-100 dark:text-light-100;
}

.result-item mark {
  @apply font-bold;
  @apply text-dark dark:text-light;
  text-decoration: underline;
  background-color: inherit;
}
</style>
