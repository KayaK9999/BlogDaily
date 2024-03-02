<script setup lang="ts">
import { ref } from 'vue'
import { useData } from 'vitepress'
import BlogNav from './BlogNav.vue'
import BlogSearch from './BlogSearch.vue'

const { site } = useData()
const openNav = ref<boolean>(false)
</script>

<template>
  <header class="header">
    <!-- LOGO -->
    <div class="header__logo" z-1>
      {{ site.title }}
    </div>
    <ClientOnly>
      <div class="header__search-container">
        <BlogSearch />
      </div>
    </ClientOnly>

    <div class="header__space" />

    <!-- Navigation -->
    <BlogNav :open="openNav" class="header__nav" />

    <button class="header__nav-button" z-1 @click="() => openNav = !openNav">
      <div i-ph="list" />
    </button>

    <div id="header-search-result" class="header__search-result" />
  </header>
</template>

<style scoped>
.header {
  @apply flex flex-wrap flex-row gap-x-sm justify-between items-center;
  @apply border-b-1 border-b-solid border-gray-300 dark:border-gray-500;
  @apply fixed top-0 left-0 right-0 z-10 px-1rem;
  @apply text-inherit;
  @apply backdrop-filter backdrop-blur-20 backdrop-saturate-150;
  z-index: 100;
  overflow: visible;
}

.header__nav {
  flex-basis: 100%;
}

.header__search-container {
  /* @apply min-h-[var(--header-height)]; */
  @apply flex-1 order-2 flex items-center;
  @apply mb-2;
}

.header__search-input {
  @apply min-w-full;
}

/* .header::after {
  @apply absolute top-0 left-0 right-0 bottom-0;
  @apply bg-inherit bg-opacity-50 dark:bg-opacity-50;
  @apply backdrop-filter backdrop-blur-20 backdrop-saturate-150;
  @apply text-inherit;
  content: '';
  z-index: 0;
} */

.header__space {
  @apply flex-1 min-h-[var(--header-height)];
  @apply hidden;
}

.header__nav {
  order: 1;
}

.header__nav-button {
  display: block;
  @apply border-0 hover:bg-gray-200 dark:hover:bg-gray-700;
  @apply bg-transparent;
  @apply text-inherit;
  @apply p-0 px-1;
  @apply rounded-md;
  @apply transition-all;
  @apply block line-height-[100%];
  @apply cursor-pointer;
  @apply h-34px text-3xl;
}

@screen md {
  .header {
    @apply px-2rem;
    /* flex-wrap: nowrap; */
  }

  .header__space {
    @apply block;
  }

  .header__logo {
    @apply text-1.6rem;
  }

  .header__nav {
    flex-basis: 0;
    order: 0;
  }

  .header__nav-button {
    display: none;
  }

  .header__search-container {
    @apply flex-grow-0 order-0 mb-0;
  }
}

.header__logo {
  @apply font-serif font-700 line-height-2rem;
  @apply my-0.5rem;
  @apply cursor-default;
}

.header__search-result {
  @apply max-h-[50vh] overflow-y-auto;
  border-top: 1px solid;
  border-color: inherit;
  flex-basis: 100%;
  order: 3;
}

.header__search-result:empty {
  flex-basis: 0;
  display: none;
}
</style>
