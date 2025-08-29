<template>
  <div class="pagination">
    <button 
      class="pagination__button"
      :disabled="currentPage === 1"
      @click="changePage(currentPage - 1)"
    >
      &lt;
    </button>
    
    <button
      v-for="page in visiblePages"
      :key="page"
      class="pagination__button"
      :class="{ 'pagination__button--active': page === currentPage }"
      @click="changePage(page)"
    >
      {{ page }}
    </button>
    
    <button
      class="pagination__button"
      :disabled="currentPage === totalPages"
      @click="changePage(currentPage + 1)"
    >
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
    validator: (value: number) => value > 0
  },
  totalItems: {
    type: Number,
    required: true,
    validator: (value: number) => value >= 0
  },
  itemsPerPage: {
    type: Number,
    default: 10,
    validator: (value: number) => value > 0
  },
  maxVisiblePages: {
    type: Number,
    default: 5,
    validator: (value: number) => value >= 3
  }
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
  gap: var(--basic-spacing-small); // 8px
  justify-content: center;
  margin-top: var(--basic-spacing); // 16px
}

.pagination__button {
  width: var(--size-medium); // 32px
  height: var(--size-medium); // 32px
  border: 1px solid var(--color-base-border-primary); // Тонкая белая граница (прозрачность 0.12)
  border-radius: var(--border-radius); // 4px
  background: var(--color-base-background-tertiary); // Тёмный серый фон
  color: var(--color-base-content-primary); // Белый текст
  font-family: var(--font-family-default);
  font-size: var(--font-size-base); // 14px
  font-weight: var(--font-weight-medium); // 500
  line-height: var(--line-height-reset); // 1
  cursor: pointer;
  transition: all var(--transition-ease) 0.2s; // Плавный переход
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background: var(--color-base-background-quaternary); // Более светлый фон
    border-color: var(--color-base-border-accent); // Акцентная граница
  }

  &--active {
    background: var(--color-status-success); // Мятный зелёный
    color: var(--color-base-on-primary); // Белый текст
    border-color: var(--color-status-success); // Мятная граница
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: var(--color-base-background-placeholder); // Серый фон
    border-color: var(--color-base-border-secondary); // Бледная граница
  }
}
</style>