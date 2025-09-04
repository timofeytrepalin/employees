<template>
  <div class="theme_switcher__container">
    <button
      class="theme-switcher__toggle"
      :class="{ 'theme-switcher__toggle_active': appTheme === 'dark' }"
      @click="toggleTheme"
    >
      <span class="theme-switcher__thumb"></span>
    </button>
    <div>Dark Theme</div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSettings, type Theme } from '@/stores/settings';

const settingsStore = useSettings();
const { appTheme } = storeToRefs(settingsStore);

const toggleTheme = () => {
  const newTheme: Theme = appTheme.value === 'light' ? 'dark' : 'light';
  settingsStore.setTheme(newTheme);
};
</script>

<style lang="scss">

.theme_switcher__container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.theme-switcher__toggle {
  position: relative;
  width: 48px;
  height: 28px;
  background: var(--color-base-background-tertiary);
  border: 1px solid var(--color-base-border-primary);
  border-radius: 14px;
  cursor: pointer;
  transition: all var(--transition-ease) 0.2s;
  display: flex;
  align-items: center;
  padding: 0 4px;
  margin-bottom: 4px;

  &:hover {
    border-color: var(--color-base-border-accent);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(40, 167, 69, 0.2);
  }

  &_active {
    background: var(--color-status-success);
    background-image: radial-gradient(
      circle at center,
      var(--color-status-success) 0%,
      rgba(52, 199, 89, 0.7) 70%
    );
  }
}

.theme-switcher__thumb {
  width: 24px;
  height: 24px;
  background: var(--color-base-background-primary);
  border-radius: 50%;
  position: absolute;
  transition: transform var(--transition-ease) 0.2s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

  .theme-switcher__toggle--active & {
    transform: translateX(20px);
  }
}
</style>