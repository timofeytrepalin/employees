<template>
  <Transition name="modal">
    <div v-if="isOpen" class="modal">
      <div class="modal__overlay" @click.self="handleClose">
        <div class="modal__container" :style="{ maxWidth: width }">
          <div class="modal__header">
            <slot name="header">
              <h3 class="modal__title">{{ title }}</h3>
            </slot>
            <button class="modal__close" @click="handleClose" aria-label="Закрыть">
              <svg class="modal__close-icon" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                />
              </svg>
            </button>
          </div>

          <div class="modal__body">
            <slot />
          </div>

          <div class="modal__footer" v-if="$slots.footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const props = defineProps({
  isOpen: Boolean,
  title: {
    type: String,
    default: '',
  },
  closeOnOverlayClick: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['close']);

const handleClose = () => {
  if (props.closeOnOverlayClick) {
    emit('close');
  }
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--background-base);

  &__overlay {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: var(--background-filter);
    transition: opacity var(--transition-ease) 0.3s;
  }

  &__container {
    // position: relative;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-height: 90vh;
    background: var(--color-base-background-secondary);
    border: 1px solid var(--color-base-border-primary);
    border-radius: var(--border-radius-medium);
    box-shadow: var(--shadow-dark);
    overflow: hidden;
    transition: all var(--transition-ease) 0.3s;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--basic-spacing);
    border-bottom: 1px solid var(--color-base-border-secondary);
    background: var(--color-base-background-utility);
  }

  &__title {
    margin: 0;
    color: var(--color-base-content-primary);
    font-family: var(--font-family-default);
    font-size: var(--font-size-big);
    font-weight: var(--font-weight-big);
    line-height: var(--line-height-big);
    letter-spacing: var(--letter-spacing-small);
  }

  &__close {
    background: none;
    border: none;
    padding: var(--basic-spacing-small);
    color: var(--color-base-content-tertiary);
    cursor: pointer;
    transition: color var(--transition-ease) 0.2s;

    &:hover {
      color: var(--color-base-content-primary);
    }
  }

  &__close-icon {
    width: var(--size-small);
    height: var(--size-small);
    display: block;
  }

  &__body {
    padding: var(--basic-spacing-medium);
    max-height: calc(90vh - var(--size-large) * 2);
    overflow-y: auto;
    color: var(--color-base-content-secondary);
    font-family: var(--font-family-default);
    font-size: var(--font-size-base);
    line-height: var(--line-height-base);
  }

  &__footer {
    padding: var(--basic-spacing); // 16px
    border-top: 1px solid var(--color-base-border-secondary);
    display: flex;
    justify-content: flex-end;
    gap: var(--basic-spacing-small);
    background: var(--color-base-background-utility);
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal__container,
.modal-leave-to .modal__container {
  transform: translateY(-20px) scale(0.95);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity var(--transition-ease) 0.3s;
}

.modal-enter-active .modal__container,
.modal-leave-active .modal__container {
  transition:
    transform var(--transition-ease) 0.3s,
    opacity var(--transition-ease) 0.3s;
}
</style>
