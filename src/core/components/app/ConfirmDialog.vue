<template>
  <base-modal :isOpen :title="props.title" @close="emit('close')">
    <div class="confirm-dialog-form">
      <slot />
      <div class="confirm-dialog-form__actions">
        <CustomButton class="confirm-dialog-form__button" @click="emit('close')">{{ t('cancel') }}</CustomButton>
        <CustomButton class="confirm-dialog-form__button" @click="handleConfirm">{{ props.confirmTitle }}</CustomButton>
      </div>
    </div>
  </base-modal>
</template>

<script lang="ts" setup>
import BaseModal from '@/core/components/ui/Dialog/NativeModal.vue'
import CustomButton from '@/core/components/ui/Button/CustomButton.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface Props {
  isOpen: boolean
  confirmTitle?: string
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
  confirmTitle: 'Confirm',
  title: 'Confirm'
})

const emit = defineEmits(['close', 'confirm'])

const handleConfirm = () => {
  emit('confirm')
}
</script>

<style lang="scss">
.confirm-dialog-form {
  width: 600px;
  background: var(--color-base-background-secondary);
  padding: var(--basic-spacing);
  border-radius: var(--border-radius-medium);
  box-shadow: var(--shadow-dark);

  &__actions {
    display: flex;
    justify-content: center;
    gap: var(--basic-spacing-big);
    width: 100%;
    margin-top: var(--basic-spacing);
  }

  &__button {
    padding: var(--basic-spacing-small) var(--basic-spacing);
    background: var(--color-base-background-utility);
    color: var(--color-base-on-primary);
    border: 1px solid var(--color-base-border-primary);
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: background var(--transition-ease) 0.2s, border-color var(--transition-ease) 0.2s;

    &:hover {
      background: var(--color-base-background-quaternary);
      border-color: var(--color-base-border-accent);
    }

    &:last-child {
      background: var(--color-status-success);
      border-color: var(--color-status-success);

      &:hover {
        background: linear-gradient(
          98.19deg,
          rgba(40, 167, 69, 1) -4.08%,
          rgba(9, 255, 144, 1) 309.87%
        );
      }
    }
  }
}
</style>