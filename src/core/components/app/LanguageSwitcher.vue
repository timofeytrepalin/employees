<template>
  <div class="language-switcher">
    <select :value="language" class="language-switcher__select" @change="switchLocale">
      <option v-for="(locale, idx) in appLanguages" :key="idx" :value="locale.key" class="language-switcher__option">
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

const language = computed(() => settingsStore.language);

const switchLocale = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const selectedLanguage = target.value as Language;
  settingsStore.setLanguage(selectedLanguage);
};
</script>

<style lang="scss" scoped>
.language-switcher {
  display: flex;
  align-items: center;
}

.language-switcher__select {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: var(--size-medium);
  padding: var(--basic-spacing-small) var(--basic-spacing);
  border: 1px solid var(--color-base-border-primary);
  border-radius: var(--border-radius-medium);
  background: transparent;
  color: var(--color-base-on-primary);
  font-family: var(--font-family-system);
  font-size: var(--font-size-medium);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-base);
  transition: all var(--transition-ease) 0.3s;
  cursor: pointer;
  outline: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 32px;

  &:hover {
    background: var(--color-base-background-quaternary);
    border-color: var(--color-base-border-accent);
    transform: translateY(-1px);
  }

  &:focus {
    border-color: var(--color-base-border-accent);
    box-shadow: 0 0 0 2px var(--color-base-border-accent);
  }

  &:active {
    transform: translateY(0);
    background: var(--color-base-background-tertiary);
  }
}
</style>
