<script setup lang="ts">
// TODO: 允许隐藏部分页面
import { computed } from 'vue'

const props = defineProps<{
  totalPages: number
  currentPage: number
  prevUrl?: string
  nextUrl?: string
}>()

const emit = defineEmits<{
  changePage: [page: number]
}>()

const hasNext = computed(() => props.currentPage < props.totalPages)
const hasPrev = computed(() => props.currentPage > 1)

const pageNumbers = computed(() => Array.from({ length: props.totalPages }, (_, i) => i + 1))
</script>

<template>
  <div class="paginator">
    <div>
      <a
        class="paginator__button"
        :class="{ disabled: !hasPrev }"
        :href="hasPrev ? prevUrl : ''"
        @click="emit('changePage', props.currentPage - 1)"
      >
        上一页
      </a>
    </div>
    <div class="paginator__pages">
      <a
        v-for="page in pageNumbers"
        :key="page"
        class="paginator__page"
        :class="{ active: page === props.currentPage }"
        :href="`/page/${page}`"
        @click="emit('changePage', page)"
      >
        {{ page }}
      </a>
    </div>
    <div>
      <a
        :disabled="!hasNext"
        :href="hasNext ? nextUrl : ''"
        class="paginator__button"
        :class="{ disabled: !hasNext }"
      >
        下一页
      </a>
    </div>
  </div>
</template>

<style scoped>
.paginator {
  @apply flex flex-row gap-2;
  @apply justify-center;
  @apply items-center;
  @apply py-10;
}

.paginator__pages {
  @apply flex flex-row gap-1;
  @apply justify-center;
  @apply items-center;
}

.paginator__page, .paginator__button {
  @apply border-0;
  @apply bg-transparent;
  @apply text-inherit;
  @apply px-4;
  @apply py-2;
  @apply rounded-md;
  @apply transition-all;
  @apply block line-height-[100%];
  height: 18px;
}

.paginator__page:hover, .paginator__page.active, .paginator__button:hover {
  @apply bg-gray-200 dark:bg-gray-700;
}

.paginator__button.disabled {
  @apply cursor-default;
  @apply text-gray-400;
  @apply hover:text-gray-400;
  @apply hover:bg-transparent;
}
</style>
