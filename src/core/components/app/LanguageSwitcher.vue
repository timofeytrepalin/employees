<template>
  <div class="language-switcher">
    <select
      :value="language"
      class="language-switcher__select"
      @change="switchLocale"
    >
      <option
        v-for="(locale,idx) in appLanguages"
        :key="idx"
        :value="locale.key"
        class="language-switcher__option"
      >
        {{ locale.title }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { appLanguages, type Language } from '@/i18n/consts';
import { useSettings } from '@/stores/settings';
import { computed } from 'vue';

const settingsStore = useSettings();

const language = computed(() => settingsStore.language)

const switchLocale = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const selectedLanguage = target.value as Language
  settingsStore.setLanguage(selectedLanguage)
};
</script>


<style lang="scss" scoped>
.language-switcher {
  display: flex;
  align-items: center;
}

.language-switcher__select {
  padding: var(--basic-spacing-small) var(--basic-spacing); // 8px 16px
  background: var(--color-base-background-tertiary); // Тёмный серый фон
  color: var(--color-base-content-primary); // Белый текст
  border: 1px solid var(--color-base-border-primary); // Тонкая белая граница
  border-radius: var(--border-radius); // 4px
  font-family: var(--font-family-system);
  font-size: var(--font-size-base); // 14px
  font-weight: var(--font-weight-medium); // 500
  line-height: var(--line-height-base); // 1.5
  cursor: pointer;
  transition: all var(--transition-ease) 0.2s;
  appearance: none; // Убираем стандартный стиль select
  background-image: url('/images/hookah-arrow-down.svg'); // Кастомная стрелка
  background-repeat: no-repeat;
  background-position: right var(--basic-spacing-small) center; // 8px от правого края
  padding-right: calc(var(--basic-spacing) + var(--size-mini)); // Учёт стрелки
  width: 120px; // Увеличенная ширина для читаемости
  text-align: center;

  &:hover {
    background-color: var(--color-base-background-quaternary); // Светлее серый
    border-color: var(--color-base-border-accent); // Акцентная граница
  }

  &:focus {
    outline: none;
    border-color: var(--color-status-success); // Мятная граница
    box-shadow: 0 0 0 2px rgba(40, 167, 69, 0.2); // Мятный ореол
  }
}

.language-switcher__option {
  background: var(--color-base-background-secondary); // Тёмный фон для опций
  color: var(--color-base-content-primary); // Белый текст
}
</style>