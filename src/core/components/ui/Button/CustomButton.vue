<template>
  <button class="custom-button" :class="{ 'custom-button--disabled': disabled }" @click="$emit('click')">
    <span class="custom-button__content">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
defineEmits(['click']);
defineProps<{
  disabled?: boolean; // Добавлен проп для отключённого состояния
}>();
</script>

<style lang="scss" scoped>
button.custom-button {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: var(--size-medium); // 36px
  padding: var(--basic-spacing-small) var(--basic-spacing); // 12px 16px
  // border: 1px solid var(--color-base-border-primary); // Тонкая граница
  border-radius: var(--border-radius-medium); // 16px
  background: radial-gradient(
    circle at center,    
    rgba(0, 0, 0, 0) 90%,
    var(--color-base-background-utility) 0%,
  ); // Радиальный градиент от утилитарного фона к прозрачному
  color: var(--color-base-on-primary); // Белый/чёрный текст
  font-family: var(--font-family-system);
  font-size: var(--font-size-medium); // 16px
  font-weight: var(--font-weight-medium); // 500
  line-height: var(--line-height-base); // 1.5
  // transition: all var(--transition-ease) 0.2s; // Плавный переход
  cursor: pointer;
  outline: none;
  position: relative; // Для корректного наложения градиента
  overflow: hidden; // Скроем лишние части градиента
  box-shadow: var(--shadow-dark);

  &:hover {
    background: radial-gradient(
      circle at center,
      var(--color-base-background-quaternary) 0%,
      rgba(0, 0, 0, 0) 70%
    ); // Более светлый градиент при наведении
    // border-color: var(--color-base-border-accent);
  }

  &:focus {
    box-shadow: 0 0 0 3px rgba(52, 199, 89, 0.3); // Мятный фокус
  }

  &__content {
    color: inherit;
    font-family: var(--font-family-default);
    font-size: var(--font-size-base); // 15px
    line-height: var(--line-height-base); // 1.5
    letter-spacing: var(--letter-spacing-small); // -0.02em
    transition: all var(--transition-ease) 0.4s;
  }

  &--primary {
    background: radial-gradient(
      circle at center,
      var(--color-status-success) 0%,
      rgba(52, 199, 89, 0) 70%
    ); // Мятный радиальный градиент
    border-color: var(--color-status-success); // Зелёная граница
    color: var(--color-base-on-primary);

    &:hover {
      background: radial-gradient(
        circle at center,
        rgba(52, 199, 89, 1) 0%,
        rgba(9, 255, 144, 0) 70%
      ); // Более яркий мятный градиент
    }
  }

  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: radial-gradient(
      circle at center,
      var(--color-base-background-placeholder) 0%,
      rgba(0, 0, 0, 0) 70%
    ); // Серый градиент для отключённого состояния
    border-color: var(--color-base-border-secondary);
  }

  :deep(svg) {
    color: inherit;
    width: var(--size-small); // 24px
    height: var(--size-small); // 24px
    transition: all var(--transition-ease) 0.4s;
  }
}
</style>
