<template>
  <base-modal :isOpen :title="t('addPersonForm.title')" @close="emit('close')">
    <div class="employee-form">
      <div class="employee-form__grid">
        <div class="employee-form__field">
          <p class="employee-form__label">{{ t('addPersonForm.title') }}</p>
          <CustomInput v-model="form.name" class="employee-form__input" required />
        </div>

        <div class="employee-form__field">
          <p class="employee-form__label">{{ t('addPersonForm.email') }}</p>
          <CustomInput
            v-model="form.email"
            class="employee-form__input"
            :validationFunction="employeeValidation.validateEmail"
            type="email"
          />
        </div>

        <div class="employee-form__field">
          <p class="employee-form__label">{{ t('addPersonForm.avatar') }}</p>
          <CustomInput v-model="form.avatar" class="employee-form__input" />
        </div>

        <div class="employee-form__field">
          <p class="employee-form__label">{{ t('addPersonForm.designation') }}</p>
          <CustomInput v-model="form.designation" class="employee-form__input" required />
        </div>

        <div class="employee-form__field">
          <p class="employee-form__label">{{ t('addPersonForm.phone') }}</p>

          <PhoneInput class="employee-form__input" v-model="form.phone" :locale="language" />
        </div>

        <div class="employee-form__field">
          <p class="employee-form__label">{{ t('addPersonForm.joiningDate') }}</p>
          <VueDatePicker
            class="employee-form__input"
            v-model="form.joiningDate"
            text-input
            :lang="language"
            :teleport="true"
            dark
          />
        </div>
      </div>

      <div class="employee-form__actions">
        <CustomButton class="employee-form__button" @click="handleSave"> {{ t('addPersonForm.save') }} </CustomButton>
      </div>
    </div>
  </base-modal>
</template>

<script setup lang="ts">
import { computed, reactive, toRaw } from 'vue';
import BaseModal from '@/core/components/ui/Dialog/NativeModal.vue';
import CustomInput from '@/core/components/ui/Input/CustomInput.vue';
import CustomButton from '@/core/components/ui/Button/CustomButton.vue';
import { useI18n } from 'vue-i18n';

import { useEmployeeValidation } from '@/core/composables/useEmployeeValidation';
import { useSettings } from '@/stores/settings';
import VueDatePicker from '@vuepic/vue-datepicker';
import { PhoneInput } from '@desource/phone-mask-vue';
import '@vuepic/vue-datepicker/dist/main.css';

const employeeValidation = useEmployeeValidation();
const settingsStore = useSettings();
const { t } = useI18n();

interface Props {
  isOpen: boolean;
}

withDefaults(defineProps<Props>(), {
  isOpen: false,
});

const emit = defineEmits(['close', 'submit']);

const language = computed(() => settingsStore.language);

const form = reactive({
  name: '',
  email: '',
  avatar: '',
  employeeCode: '',
  designation: '',
  phone: '',
  joiningDate: '',
});

const handleSave = () => {
  emit('submit', toRaw(form));
};
</script>

<style lang="scss">
.employee-form {
  width: 600px;
  padding: var(--basic-spacing-medium);

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--basic-spacing-big);
    margin-bottom: var(--basic-spacing);
  }

  &__field {
    display: flex;
    width: 100%;
    flex-direction: column;
  }

  &__label {
    margin-bottom: var(--basic-spacing-small);
    font-size: var(--font-size-small);
    line-height: var(--line-height-base);
    color: var(--color-base-content-secondary);
    letter-spacing: var(--letter-spacing-small);
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
  }

  &__input {
    &.phone-input.theme-dark {
      /* Colors */
      --pi-bg: transparent;
      --pi-fg: var(--color-base-content-primary);
      --pi-muted: #6b7280;
      --pi-border: var(--color-base-border-primary);
      --pi-border-hover: #d1d5db;
      --pi-border-focus: var(--color-base-accent);
      --pi-focus-ring: 2px solid var(--color-base-accent);
      --pi-disabled-bg: transparent;
      --pi-disabled-fg: #9ca3af;
      /* Sizes */
      --pi-font-size: var(--font-size-base);
      --pi-height: var(--size-medium);
      /* Spacing */
      --pi-padding: var(--basic-spacing-small);
      /* Border radius */
      --pi-radius: var(--border-radius-mini);
      /* Shadows */
      --pi-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
      --pi-shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05);
      /* Validation */
      --pi-warning: #f59e0b;
      --pi-warning-light: #fbbf24;
      --pi-success: var(--color-base-border-primary);
      --pi-focus-ring-warning: var(--color-status-warning);
      --pi-focus-ring-success: 3px solid var(--color-status-success);
    }

    &.dp__theme_dark {
      --dp-background-color: transparent;
      --dp-text-color: var(--color-base-content-primary);
      --dp-hover-color: #484848;
      --dp-hover-text-color: #fff;
      --dp-hover-icon-color: #959595;
      --dp-primary-color: #005cb2;
      --dp-primary-disabled-color: #61a8ea;
      --dp-primary-text-color: #fff;
      --dp-secondary-color: #a9a9a9;
      --dp-border-color: var(--color-base-border-primary);
      --dp-menu-border-color: var(--color-base-border-primary);
      --dp-border-color-hover: #aaaeb7;
      --dp-border-color-focus: var(--color-base-accent);
      --dp-disabled-color: #737373;
      --dp-disabled-color-text: #d0d0d0;
      --dp-scroll-bar-background: #212121;
      --dp-scroll-bar-color: #484848;
      --dp-success-color: var(--color-base-border-primary);
      --dp-success-color-disabled: #428f59;
      --dp-icon-color: #959595;
      --dp-danger-color: #e53935;
      --dp-marker-color: #e53935;
      --dp-tooltip-color: #3e3e3e;
      --dp-highlight-color: rgb(0 92 178 / 20%);
      --dp-range-between-dates-background-color: var(--dp-hover-color, #484848);
      --dp-range-between-dates-text-color: var(--dp-hover-text-color, #fff);
      --dp-range-between-border-color: var(--dp-hover-color, #fff);

      border-radius: var(--border-radius);
    }
  }
}

div.phone-dropdown.theme-dark {
  --pi-bg: var(--color-base-background-secondary);
  --pi-fg: var(--color-base-content-primary);
  --pi-disabled-bg: var(--color-base-accent);
}
</style>
