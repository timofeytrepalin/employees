<template>
  <base-modal :isOpen :title="t('addPersonForm.email')" @close="emit('close')">
    <div class="employee-form">
      <div class="employee-form__grid">
        <div class="employee-form__field">
          <p class="employee-form__label">{{ t('addPersonForm.title') }}</p>
          <CustomInput v-model="form.name" class="employee-form__input" required />
        </div>

        <div class="employee-form__field">
          <p class="employee-form__label">{{ t('addPersonForm.email') }}</p>
          <CustomInput v-model="form.email" class="employee-form__input" :validationFunction="employeeValidation.validateEmail" type="email" />
        </div>

        <div class="employee-form__field">
          <p class="employee-form__label">{{ t('addPersonForm.avatar') }}</p>
          <CustomInput v-model="form.avatar" class="employee-form__input" />
        </div>

        <div class="employee-form__field">
          <p class="employee-form__label">{{ t('addPersonForm.employeeCode') }}</p>
          <CustomInput v-model="form.employeeCode" class="employee-form__input" required/>
        </div>

        <div class="employee-form__field">
          <p class="employee-form__label">{{ t('addPersonForm.designation') }}</p>
          <CustomInput v-model="form.designation" class="employee-form__input" required/>
        </div>

        <div class="employee-form__field">
          <p class="employee-form__label">{{ t('addPersonForm.phone') }}</p>
          <CustomInput v-model="form.phone" class="employee-form__input" :validationFunction="employeeValidation.validatePhone" type="text" />
        </div>

        <div class="employee-form__field">
          <p class="employee-form__label">{{ t('addPersonForm.joiningDate') }}</p>
          <VueDatePicker v-model="form.joiningDate" text-input :lang="language" :teleport="true" dark/>
        </div>
      </div>

      <div class="employee-form__actions">
        <CustomButton class="employee-form__button" @click="handleSave"> {{ t('addPersonForm.save') }} </CustomButton>
      </div>
    </div>
  </base-modal>
</template>

<script lang="ts" setup>
import { computed, reactive, toRaw } from 'vue'
import BaseModal from '@/core/components/ui/Dialog/NativeModal.vue'
import CustomInput from '@/core/components/ui/Input/CustomInput.vue'
import CustomButton from '@/core/components/ui/Button/CustomButton.vue'
import { useI18n } from 'vue-i18n'

import { useEmployeeValidation } from '@/core/composables/useEmployeeValidation'
import { useSettings } from '@/stores/settings'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const employeeValidation = useEmployeeValidation();
const settingsStore = useSettings();
const { t } = useI18n()

interface Props {
  isOpen: boolean
}

withDefaults(defineProps<Props>(), {
  isOpen: false,
})

const emit = defineEmits(['close', 'submit'])

const language = computed(() => settingsStore.language)


const form = reactive({
  name: '',
  email: '',
  avatar: '',
  employeeCode: '',
  designation: '',
  phone: '',
  joiningDate: '',
})

const handleSave = () => {
  emit('submit', toRaw(form))
}
</script>

<style lang="scss">
.employee-form {
  width: 600px;
  background: var(--color-base-background-secondary);
  padding: var(--basic-spacing-medium);
  border-radius: var(--border-radius-medium);
  box-shadow: var(--shadow-dark);

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
}
</style>