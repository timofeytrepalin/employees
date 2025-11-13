<template>
  <div class="pagination">
    <button class="pagination__button" :disabled="currentPage === 1" @click="changePage(currentPage - 1)">&lt;</button>

    <button
      v-for="page in visiblePages"
      :key="page"
      class="pagination__button"
      :class="{ pagination__button_active: page === currentPage }"
      @click="changePage(page)"
    >
      {{ page }}
    </button>

    <button class="pagination__button" :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">
      &gt;
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
    validator: (value: number) => value > 0,
  },
  totalItems: {
    type: Number,
    required: true,
    validator: (value: number) => value >= 0,
  },
  itemsPerPage: {
    type: Number,
    default: 10,
    validator: (value: number) => value > 0,
  },
  maxVisiblePages: {
    type: Number,
    default: 5,
    validator: (value: number) => value >= 3,
  },
});

const emit = defineEmits(['page-changed']);

const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage));

const visiblePages = computed(() => {
  const half = Math.floor(props.maxVisiblePages / 2);
  let start = Math.max(1, props.currentPage - half);
  const end = Math.min(start + props.maxVisiblePages - 1, totalPages.value);

  if (end - start + 1 < props.maxVisiblePages) {
    start = Math.max(1, end - props.maxVisiblePages + 1);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value && page !== props.currentPage) {
    emit('page-changed', page);
  }
};
</script>

<style lang="scss">
.pagination {
  display: flex;
  gap: var(--basic-spacing-small);
  justify-content: center;
  margin-top: var(--basic-spacing);
}

.pagination__button {
  width: var(--size-medium);
  height: var(--size-medium);
  border: 1px solid var(--color-base-border-primary);
  border-radius: var(--border-radius);
  background: var(--color-base-background-tertiary);
  color: var(--color-base-content-primary);
  cursor: pointer;
  transition: all var(--transition-ease) 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background: var(--color-base-background-quaternary);
    border-color: var(--color-base-border-accent);
    color: var(--color-base-content-primary);
  }

  &_active {
    background: var(--color-base-accent);
    color: var(--color-base-accent-secondary);
    border-color: var(--color-base-accent);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: var(--color-base-background-placeholder);
    border-color: var(--color-base-border-secondary);
  }
}
</style>
