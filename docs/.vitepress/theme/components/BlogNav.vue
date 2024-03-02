<script setup lang="ts">
defineProps<{
  open: boolean
}>()

// const open: Ref<boolean> = ref(false)
</script>

<template>
  <nav class="nav" z-1 :class="{ open }">
    <ul class="nav__list">
      <li><a href="/">Home</a></li>
      <li><a href="/page">Posts</a></li>
      <li><a href="/tags.html">Tags</a></li>
      <li><a href="/api-examples.html">About</a></li>
    </ul>
  </nav>
</template>

<style>
.nav {
  @apply w-full grid;
  @apply transition-all duration-500 ease;
  grid-template-rows: 0fr;
}

.nav.open {
  grid-template-rows: 1fr;
}

.nav li {
  list-style: none;
}

.nav .nav__list {
  @apply flex flex-col justify-center items-center gap-3;
  @apply border-0 border-solid border-gray-300 dark:border-gray-500;
  @apply p-4 rounded-sm;
  @apply text-lg font-serif font-500;
  @apply overflow-hidden p-0;
  @apply transition-all duration-500 ease;
  list-style-type: none;
  margin: 0;
}

.nav.open .nav__list {
  @apply p-4 border-t-1;
}

@screen md {

  .nav {
    @apply w-auto block;
  }

  .nav .nav__list {
    @apply flex flex-row justify-between items-center;
    @apply font-serif font-500 text-lg;
  }

  .nav .nav__list li {
    --at-apply: flex flex-row justify-between items-center cursor-pointer;
    margin: 0 0.5rem;
  }

  .nav .nav__list li::after {
    --at-apply: ml-10px;
    content: "/";
    transform: rotate(15deg);
  }

  .nav .nav__list li:last-child::after {
    content: "";
  }

  .nav__list {
    @apply p-0 my-0;
  }

  .nav a {
    --at-apply: duration-200 ease-in-out;
    text-decoration: none;
    color: inherit;
    border-bottom: 1px solid transparent;
  }

  .nav a:hover {
    border-bottom: 1px solid currentColor;
  }
}
</style>
