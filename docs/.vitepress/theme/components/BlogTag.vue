<script setup lang="ts">
import { POST_LIST_PAGE_URL } from '../constants'

const props = withDefaults(defineProps<{
  tag: string
  href?: string
  highlight?: boolean
  onBeforeTagChange?: (tag: string, value: boolean) => boolean | void
}>(), {
  highlight: false,
})

function onClickTag(e: MouseEvent) {
  if (props.onBeforeTagChange) {
    const result = props.onBeforeTagChange(props.tag, !props.highlight)
    if (result === false)
      e.preventDefault()
  }
}
</script>

<template>
  <!-- <a :href="href ?? `${POST_LIST_PAGE_URL}?tag=${tag}`" class="tag" @click="() => globalHighlight = tag"> -->
  <a :href="href ?? `${POST_LIST_PAGE_URL}?tag=${tag}`" class="tag" @click="onClickTag">
    <span class="tag__name" :class="{ highlight }">
      {{ tag }}
    </span>
  </a>
</template>

<style scoped>
.tag {
  @apply cursor-pointer;
  border: 0;
}

.tag__name {
  @apply px-1 py-0.5;
  @apply border-1 border-solid border-gray-200 dark:border-gray-700;
  @apply rounded-2px;
  @apply text-xs;
  @apply transition-colors duration-500 ease;
  @apply hover:bg-gray-200 dark:hover:bg-gray-700;
}

.tag__name::before {
  content: '#';
}

.tag__name.highlight {
  @apply bg-teal-100 hover:bg-teal-200;
  @apply border-teal-200;
  @apply text-teal-800;
}
</style>
