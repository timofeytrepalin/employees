import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { APP_LANGUAGES, type Language } from '@/i18n/consts';
import { setLocale } from '@/i18n';

export type Theme = 'light' | 'dark';

export const useSettings = defineStore('settings', () => {
  function setLanguage(lang: Language) {
    setLocale(lang);
    localStorage.setItem(`language`, lang);
  }

  const language = computed(() => {
    return localStorage.getItem(`language`) || APP_LANGUAGES[0];
  });

  const appTheme = ref<Theme>((localStorage.getItem(`appTheme`) as Theme) || 'dark');

  function setTheme(theme: Theme) {
    appTheme.value = theme;
    localStorage.setItem(`appTheme`, theme);
    document.documentElement.setAttribute('data-theme', appTheme.value);
  }

  return {
    language,
    setLanguage,
    appTheme,
    setTheme,
  };
});
