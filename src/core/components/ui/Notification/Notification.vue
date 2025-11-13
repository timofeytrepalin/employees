<template>
  <transition name="notification">
    <div
      v-if="isVisible"
      class="notification"
      :class="[`notification_${type}`, { notification_closing: isClosing }]"
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
  id: { type: String, required: true },
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
    info: InfoIcon,
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
  right: var(--basic-spacing);
  top: var(--basic-spacing);
  width: 350px;
  padding: var(--basic-spacing);
  border-radius: var(--border-radius-medium);
  box-shadow: var(--shadow-dark);
  display: flex;
  align-items: flex-start;
  z-index: 1000;
  background: var(--color-base-background-secondary);
  color: var(--color-base-content-primary);
  transform: translateY(0);
  opacity: 1;
  transition: all var(--transition-ease) 0.3s;

  &_success {
    border-left: 4px solid var(--color-status-success);
    .notification__icon svg {
      color: var(--color-status-success);
    }
  }

  &_error {
    border-left: 4px solid var(--color-status-error);
    .notification__icon svg {
      color: var(--color-status-error);
    }
  }

  &_warning {
    border-left: 4px solid var(--color-status-warning);
    .notification__icon svg {
      color: var(--color-status-warning);
    }
  }

  &_info {
    border-left: 4px solid var(--color-base-content-tertiary);
    .notification__icon svg {
      color: var(--color-base-content-tertiary);
    }
  }

  &_closing {
    transform: translateY(var(--basic-spacing));
    opacity: 0;
  }

  &__icon {
    margin-right: var(--basic-spacing-small);
    flex-shrink: 0;

    svg {
      width: var(--size-small);
      height: var(--size-small);
    }
  }

  &__content {
    flex-grow: 1;
  }

  &__title {
    margin: 0 0 var(--basic-spacing-small) 0;
    font-size: var(--font-size-medium);
    font-weight: var(--font-weight-big);
    line-height: var(--line-height-base);
    letter-spacing: var(--letter-spacing-small);
    color: var(--color-base-content-primary);
  }

  &__message {
    margin: 0;
    line-height: var(--line-height-small);
    color: var(--color-base-content-secondary);
  }

  &__close {
    margin-left: var(--basic-spacing-small);
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
      width: var(--size-mini);
      height: var(--size-mini);
      color: var(--color-base-content-tertiary);
    }
  }
}

/* Анимации */
.notification-enter-from,
.notification-leave-to {
  transform: translateY(var(--basic-spacing));
  opacity: 0;
}

.notification-enter-active,
.notification-leave-active {
  transition: all var(--transition-ease) 0.3s;
}
</style>
