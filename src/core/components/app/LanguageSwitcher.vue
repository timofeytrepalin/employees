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
  padding: var(--basic-spacing-small) var(--basic-spacing);
  background: var(--color-base-background-tertiary);
  color: var(--color-base-content-primary);
  border: 1px solid var(--color-base-border-primary);
  border-radius: var(--border-radius);
  font-family: var(--font-family-system);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-base);
  cursor: pointer;
  transition: all var(--transition-ease) 0.2s;
  appearance: none;
  background-repeat: no-repeat;
  background-position: right var(--basic-spacing-small) center;
  padding-right: calc(var(--basic-spacing) + var(--size-mini));
  width: 120px;
  text-align: center;

  &:hover {
    background-color: var(--color-base-background-quaternary);
    border-color: var(--color-base-border-accent);
  }

  &:focus {
    outline: none;
    border-color: var(--color-status-success);
    box-shadow: 0 0 0 2px rgba(40, 167, 69, 0.2);
  }
}

.language-switcher__option {
  background: var(--color-base-background-secondary);
  color: var(--color-base-content-primary);
}
</style>