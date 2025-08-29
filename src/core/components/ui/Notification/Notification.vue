<!-- src/components/Notification/Notification.vue -->
<template>
  <transition name="notification">
    <div 
      v-if="isVisible"
      class="notification"
      :class="[`notification--${type}`, { 'notification--closing': isClosing }]"
      @mouseenter="pauseTimeout"
      @mouseleave="resumeTimeout"
    >
      <div class="notification__icon">
        <component :is="typeIcon" />
      </div>
      <div class="notification__content">
        <h4 v-if="title" class="notification__title">{{ title }}</h4>
        <p class="notification__message">{{ message }}</p>
      </div>
      <button class="notification__close" @click="close">
        <CloseIcon />
      </button>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import CloseIcon from '@/../public/icons/close.svg';
import SuccessIcon from '@/../public/icons/success.svg';
import ErrorIcon from '@/../public/icons/error.svg';
import WarningIcon from '@/../public/icons/warning.svg';
import InfoIcon from '@/../public/icons/info.svg';

type NotificationType = 'success' | 'error' | 'warning' | 'info';

const props = defineProps({
  title: String,
  message: { type: String, required: true },
  type: { type: String as () => NotificationType, default: 'info' },
  duration: { type: Number, default: 5000 },
  id: { type: String, required: true }
});

const emit = defineEmits(['close']);

const isVisible = ref(true);
const isClosing = ref(false);
let timeoutId: number | null = null;
let remainingTime = props.duration;
let startTime: number;

const typeIcon = computed(() => {
  const icons = {
    success: SuccessIcon,
    error: ErrorIcon,
    warning: WarningIcon,
    info: InfoIcon
  };
  return icons[props.type];
});

const startTimer = () => {
  startTime = Date.now();
  timeoutId = window.setTimeout(() => {
    close();
  }, remainingTime);
};

const pauseTimeout = () => {
  if (timeoutId) {
    clearTimeout(timeoutId);
    remainingTime -= Date.now() - startTime;
  }
};

const resumeTimeout = () => {
  startTimer();
};

const close = () => {
  isClosing.value = true;
  setTimeout(() => {
    isVisible.value = false;
    emit('close', props.id);
  }, 300);
};

startTimer();
</script>

<style lang="scss" scoped>
.notification {
  position: fixed;
  right: var(--basic-spacing); // 16px
  top: var(--basic-spacing); // 16px
  width: 350px;
  padding: var(--basic-spacing); // 16px
  border-radius: var(--border-radius-medium); // 8px
  box-shadow: var(--shadow-dark); // Мягкая тень
  display: flex;
  align-items: flex-start;
  z-index: 1000;
  background: var(--color-base-background-secondary); // Тёмный серый фон
  color: var(--color-base-content-primary); // Белый текст
  transform: translateY(0);
  opacity: 1;
  transition: all var(--transition-ease) 0.3s; // Плавный переход

  &--success {
    border-left: 4px solid var(--color-status-success); // Мятная граница
    .notification__icon svg {
      color: var(--color-status-success); // Мятная иконка
    }
  }

  &--error {
    border-left: 4px solid var(--color-status-error); // Красная граница
    .notification__icon svg {
      color: var(--color-status-error); // Красная иконка
    }
  }

  &--warning {
    border-left: 4px solid var(--color-status-warning); // Жёлтая граница
    .notification__icon svg {
      color: var(--color-status-warning); // Жёлтая иконка
    }
  }

  &--info {
    border-left: 4px solid var(--color-base-content-tertiary); // Бледный серый
    .notification__icon svg {
      color: var(--color-base-content-tertiary); // Бледная иконка
    }
  }

  &--closing {
    transform: translateY(var(--basic-spacing)); // 16px
    opacity: 0;
  }

  &__icon {
    margin-right: var(--basic-spacing-small); // 8px
    flex-shrink: 0;

    svg {
      width: var(--size-small); // 24px
      height: var(--size-small); // 24px
    }
  }

  &__content {
    flex-grow: 1;
  }

  &__title {
    margin: 0 0 var(--basic-spacing-small) 0; // 8px
    font-family: var(--font-family-default);
    font-size: var(--font-size-medium); // 16px
    font-weight: var(--font-weight-big); // 700
    line-height: var(--line-height-base); // 1.5
    letter-spacing: var(--letter-spacing-small); // 0.04em
    color: var(--color-base-content-primary); // Белый текст
  }

  &__message {
    margin: 0;
    font-family: var(--font-family-default);
    font-size: var(--font-size-base); // 14px
    font-weight: var(--font-weight-base); // 400
    line-height: var(--line-height-small); // 1.4
    color: var(--color-base-content-secondary); // Серый текст
  }

  &__close {
    margin-left: var(--basic-spacing-small); // 8px
    background: none;
    border: none;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity var(--transition-ease) 0.2s;
    padding: 0;
    flex-shrink: 0;

    &:hover {
      opacity: 1;
    }

    svg {
      width: var(--size-mini); // 16px
      height: var(--size-mini); // 16px
      color: var(--color-base-content-tertiary); // Бледный серый
    }
  }
}

/* Анимации */
.notification-enter-from,
.notification-leave-to {
  transform: translateY(var(--basic-spacing)); // 16px
  opacity: 0;
}

.notification-enter-active,
.notification-leave-active {
  transition: all var(--transition-ease) 0.3s;
}
</style>