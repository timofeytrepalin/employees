<template>
  <div class="input-wrapper">
    <input
      class="custom-input"
      :class="{ 'custom-input--error': errorMessage }"
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
    />
    <div v-if="errorMessage" class="input-error">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { Language } from '@/i18n/consts';
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
  lang?: Language
  validationFunction?: (value:string) => {isValid: boolean, error: string}
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  disabled: false,
  readonly: false,
  required: false,
  validateOnBlur: true,
  placeholder: '',
  lang: 'en'
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'validation', isValid: boolean): void;
}>();

const errorMessage = ref('');
const isTouched = ref(false);

const validate = (value: string) => {
  if (props.required && !value.trim()) {
    errorMessage.value = 'Это поле обязательно для заполнения';
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

// Валидация при изменении required
watch(() => props.required, () => {
  if (isTouched.value) {
    validate(props.modelValue || '');
  }
});
</script>

<style lang="scss" scoped>
.input-wrapper {
  margin-bottom: var(--basic-spacing); // 16px
}

.custom-input {
  padding: var(--basic-spacing-small); // 8px
  font-family: var(--font-family-default);
  font-size: var(--font-size-base); // 14px
  font-weight: var(--font-weight-base); // 400
  line-height: var(--line-height-base); // 1.5
  letter-spacing: var(--letter-spacing-small); // 0.04em
  border: 2px solid var(--color-base-border-primary); // Тонкая белая граница (прозрачность 0.12)
  border-radius: var(--border-radius); // 4px
  background: var(--color-base-background-tertiary); // Тёмный серый фон
  color: var(--color-base-content-primary); // Белый текст
  max-height: var(--size-medium); // 32px
  outline: none;
  max-width: 100%;
  transition: all var(--transition-ease) 0.3s; // Плавный переход

  &:focus {
    border-color: var(--color-status-success); // Мятная граница
    background: var(--color-base-background-secondary); // Более светлый фон
    box-shadow: 0 0 0 2px rgba(40, 167, 69, 0.2); // Мятный ореол
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: var(--color-base-background-placeholder); // Серый фон
    border-color: var(--color-base-border-secondary); // Бледная граница
  }

  &--error {
    border-color: var(--color-status-error); // Красная граница
    background: rgba(229, 57, 53, 0.1); // Лёгкий красный фон
  }
}

.input-error {
  color: var(--color-status-error); // Красный текст
  font-family: var(--font-family-default);
  font-size: var(--font-size-small); // 12px
  font-weight: var(--font-weight-base); // 400
  line-height: var(--line-height-small); // 1.4
  margin-top: var(--basic-spacing-small); // 8px
}
</style>