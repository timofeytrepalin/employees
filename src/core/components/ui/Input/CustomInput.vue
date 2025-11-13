<template>
  <div class="input-wrapper">
    <input
      class="custom-input"
      :class="{ 'custom-input_error': errorMessage }"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      :required="required"
      :lang
      @input="handleInput"
      @blur="validateInput"
      @change="(e) => emit('change:modelValue', e)"
    />
    <div v-if="errorMessage" class="input-error">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { Language } from '@/i18n/consts';
import { useI18n } from 'vue-i18n';
import { ref, watch } from 'vue';

interface Props {
  modelValue?: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'date';
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  maxlength?: number;
  validateOnBlur?: boolean;
  lang?: Language;
  validationFunction?: (value: string) => { isValid: boolean; error: string };
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  disabled: false,
  readonly: false,
  required: false,
  validateOnBlur: true,
  placeholder: '',
  lang: 'en',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'change:modelValue', value: any): void;
  (e: 'validation', isValid: boolean): void;
}>();

const { t } = useI18n();
const errorMessage = ref('');
const isTouched = ref(false);

const validate = (value: string) => {
  if (props.required && !value.trim()) {
    errorMessage.value = t('validationMessages.fieldRequired');
    return false;
  }

  if (props.validationFunction) {
    const validationResult = props.validationFunction(value);
    errorMessage.value = validationResult.error;
    return validationResult.isValid;
  }

  errorMessage.value = '';
  return true;
};

const handleInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  emit('update:modelValue', value);

  if (!props.validateOnBlur && isTouched.value) {
    validate(value);
  }
};

const validateInput = () => {
  isTouched.value = true;
  const isValid = validate(props.modelValue || '');
  emit('validation', isValid);
};

watch(
  () => props.required,
  () => {
    if (isTouched.value) {
      validate(props.modelValue || '');
    }
  }
);
</script>

<style lang="scss">
.input-wrapper {
  margin-bottom: var(--basic-spacing);
  position: relative;
}

.custom-input {
  padding: var(--basic-spacing-small);
  border: 1px solid var(--color-base-border-primary);
  border-radius: var(--border-radius-mini);
  background: transparent;
  color: var(--color-base-content-primary);
  max-height: var(--size-medium);
  outline: none;
  max-width: 100%;
  transition: all var(--transition-ease) 0.3s;
  width: 100%;

  &:focus {
    border-color: var(--color-base-accent);
    box-shadow: 0 0 0 2px rgba(40, 167, 69, 0.2);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: var(--color-base-background-placeholder);
    border-color: var(--color-base-border-secondary);
  }

  &_error {
    border-color: var(--color-status-error);
  }
}

.input-error {
  position: absolute;
  bottom: 0;
  left: 0;
  transform: translate(0, 100%);
  color: var(--color-status-error);
  font-size: var(--font-size-small);
  line-height: var(--line-height-small);
  margin-top: var(--basic-spacing-small);
}
</style>
