<template>
  <button
    class="custom-button"
    :class="[{ 'custom-button_disabled': disabled }, `custom-button_${type}`]"
    @click="$emit('click')"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineEmits(['click']);

withDefaults(
  defineProps<{
    disabled?: boolean;
    type?: 'primary' | 'secondary';
  }>(),
  {
    type: 'primary',
    disabled: false,
  }
);
</script>

<style lang="scss">
.custom-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--basic-spacing-small);
  min-height: var(--size-medium);
  padding: var(--basic-spacing-small) var(--basic-spacing);
  border: 1px solid var(--color-base-border-primary);
  border-radius: var(--border-radius-medium);
  background: transparent;
  color: var(--color-base-on-primary);
  font-family: var(--font-family-system);
  font-size: var(--font-size-medium);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-base);
  transition: all var(--transition-ease) 0.3s;
  cursor: pointer;
  position: relative;

  &:hover {
    background: var(--color-base-background-quaternary);
    border-color: var(--color-base-border-accent);
  }

  &:focus-visible {
    outline: 2px solid var(--color-base-border-accent);
    outline-offset: 2px;
  }

  &:active {
    transform: scale(0.98);
  }

  &_primary {
    background-color: var(--color-base-accent);
    color: var(--color-base-accent-secondary);
    border-color: var(--color-base-accent);

    &:hover {
      background-color: var(--color-status-background-success);
    }
  }

  &_secondary {
    &:hover {
      background: var(--color-status-background-error);
    }
  }

  &_disabled,
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;

    &:hover {
      background: transparent;
      border-color: var(--color-base-border-primary);
    }
  }

  :deep(svg) {
    width: var(--size-small);
    height: var(--size-small);
    color: inherit;
  }
}
</style>
