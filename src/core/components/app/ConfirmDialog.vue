<template>
  <base-modal :isOpen :title="props.title" @close="emit('close')">
    <div class="confirm-dialog-form">
      <slot />
      <div class="confirm-dialog-form__actions">
        <CustomButton class="confirm-dialog-form__button" type="secondary" @click="emit('close')">{{
          t('cancel')
        }}</CustomButton>
        <CustomButton class="confirm-dialog-form__button" @click="handleConfirm">{{ props.confirmTitle }}</CustomButton>
      </div>
    </div>
  </base-modal>
</template>

<script lang="ts" setup>
import BaseModal from '@/core/components/ui/Dialog/NativeModal.vue';
import CustomButton from '@/core/components/ui/Button/CustomButton.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

interface Props {
  isOpen: boolean;
  confirmTitle?: string;
  title?: string;
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
  confirmTitle: 'Confirm',
  title: 'Confirm',
});

const emit = defineEmits(['close', 'confirm']);

const handleConfirm = () => {
  emit('confirm');
};
</script>

<style lang="scss">
.confirm-dialog-form {
  padding: var(--basic-spacing);
  border-radius: var(--border-radius-medium);

  &__actions {
    display: flex;
    justify-content: space-between;
    gap: var(--basic-spacing-big);
    width: 100%;
    margin-top: var(--basic-spacing);
  }

  &__button {
    min-width: 25%;
    transition:
      background var(--transition-ease) 0.2s,
      border-color var(--transition-ease) 0.2s;
  }
}
</style>
