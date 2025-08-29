<template>
  <div class="theme-switcher">
    <!-- <img src="/images/hookah-icon.png" alt="Hookah" class="theme-switcher__icon" /> -->
    <select
      v-model="appTheme"
      class="theme-switcher__select"
      @change="switchTheme"
    >
      <option
        v-for="themeOption in appThemes"
        :key="themeOption.key"
        :value="themeOption.key"
        class="theme-switcher__option"
      >
        {{ themeOption.title }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSettings, type Theme } from '@/stores/settings';

interface ThemeOption {
  key: Theme;
  title: string;
}

const appThemes: ThemeOption[] = [
  { key: 'light', title: 'Light' },
  { key: 'dark', title: 'Dark' },
];

const settingsStore = useSettings();
const { appTheme } = storeToRefs(settingsStore);

const switchTheme = () => {
  settingsStore.setTheme(appTheme.value);
};
</script>

<style lang="scss" scoped>
.theme-switcher {
  display: flex;
  align-items: center;
  gap: var(--basic-spacing-small); // 8px
}

.theme-switcher__icon {
  width: var(--size-mini); // 16px
  height: var(--size-mini);
  opacity: 0.6;
}

.theme-switcher__select {
  padding: var(--basic-spacing-small) var(--basic-spacing); // 8px 16px
  background: var(--color-base-background-tertiary); // Тёмный/светлый серый фон
  color: var(--color-base-content-primary); // Белый/чёрный текст
  border: 1px solid var(--color-base-border-primary); // Тонкая граница
  border-radius: var(--border-radius); // 4px
  font-family: var(--font-family-system);
  font-size: var(--font-size-base); // 14px
  font-weight: var(--font-weight-medium); // 500
  line-height: var(--line-height-base); // 1.5
  cursor: pointer;
  transition: all var(--transition-ease) 0.2s;
  appearance: none;
//   background-image: url('/images/hookah-arrow-down.svg');
  background-repeat: no-repeat;
  background-position: right var(--basic-spacing-small) center;
  padding-right: calc(var(--basic-spacing) + var(--size-mini)); // Учёт стрелки
  width: 120px;
  text-align: center;

  &:hover {
    background-color: var(--color-base-background-quaternary);
    border-color: var(--color-base-border-accent);
  }

  &:focus {
    outline: none;
    border-color: var(--color-status-success); // Мятная граница
    box-shadow: 0 0 0 2px rgba(40, 167, 69, 0.2); // Мятный ореол
  }
}

.theme-switcher__option {
  background: var(--color-base-background-secondary);
  color: var(--color-base-content-primary);
}
</style>