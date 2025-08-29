import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Language } from '@/i18n/consts';
import { setLocale } from '@/i18n';

export type Theme = 'light' | 'dark';


export const useSettings = defineStore('settings', () => {
    const language = ref('')

    function setLanguage(lang: Language) {
        setLocale(lang);
        language.value = lang;
        localStorage.setItem(`language`, lang);
    }

    const appTheme = ref<Theme>(localStorage.getItem(`appTheme`) as Theme || 'dark')

    function setTheme(theme: Theme) {
        appTheme.value = theme;
        localStorage.setItem(`appTheme`, theme);
        document.documentElement.setAttribute('data-theme', appTheme.value);
    }


    return {
        language,
        setLanguage,
        appTheme,
        setTheme
    };
});