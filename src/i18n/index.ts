import { createI18n, type I18n, type I18nOptions } from 'vue-i18n';
import type { Composer } from 'vue-i18n';
import messages from '@intlify/unplugin-vue-i18n/messages';
import { APP_LANGUAGES, type Language } from './consts';
import dayjs from 'dayjs';

import 'dayjs/locale/ru';
import 'dayjs/locale/fr';

let i18n: I18n | undefined;

export function setupI18n(options?: I18nOptions): I18n {
  const locale = getLocale();

  i18n = createI18n({
    locale,
    fallbackLocale: 'en',
    messages,
    legacy: false,
    globalInjection: true,
    ...options,
  });

  dayjs.locale(locale);
  return i18n;
}

function setI18nLocale(lang: Language): void {
  if (!i18n) return;
  const composer = i18n.global as Composer;
  composer.locale.value = lang;
}

function setDayJsLocale(lang: Language): void {
  try {
    dayjs.locale(lang);
  } catch {
    dayjs.locale('en');
  }
}

export function getLocale(): Language {
  try {
    const storageLang = localStorage.getItem('language');
    return APP_LANGUAGES.includes(storageLang as Language) ? (storageLang as Language) : 'en';
  } catch {
    return 'en';
  }
}

export async function setLocale(locale: Language): Promise<void> {
  if (!APP_LANGUAGES.includes(locale)) {
    return;
  }

  try {
    setI18nLocale(locale);
    setDayJsLocale(locale);
    localStorage.setItem('language', locale);
  } catch (error) {
    throw error;
  }
}

export function getI18n(): I18n {
  if (!i18n) {
    throw new Error('i18n instance not initialized. Call setupI18n() first.');
  }
  return i18n;
}

export default i18n;
