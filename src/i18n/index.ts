import { createI18n, type I18n, type I18nOptions } from 'vue-i18n';
import { isRef } from 'vue'

import messages from '@intlify/unplugin-vue-i18n/messages'
import { APP_LANGUAGES, type Language } from './consts';
import dayjs from 'dayjs';

const loadedLanguages: Array<Language> = ['en'];

let i18n: I18n | undefined;

export function setupI18n(options?: I18nOptions): I18n {
  const locale = options?.locale ?? 'en';

  i18n = createI18n<false>({
    locale,
    fallbackLocale: 'en',
    messages,
    legacy: false,
    globalInjection: true,
  });

  return i18n;
}


async function setI18nLocale(lang: Language): Promise<void> {
  if (!(i18n && isRef(i18n.global.locale))) return;

  const locale = lang;

  if (!loadedLanguages.includes(locale)) {
    loadedLanguages.push(locale);
  }

  i18n.global.locale.value = locale;
}

async function setDayJsLocale(lang: Language): Promise<void> {
  try {
    const localeModule = await import(`dayjs/locale/${lang}.js`);
    console.log('Loaded locale:', localeModule);
    dayjs.locale(lang, localeModule.default)
    console.log('Current locale:', dayjs.locale())
  } catch (error) {
    console.error(`[dayjs]: unsupported locale "${lang}"`, error);
  }
}

export function getLocale(): Language {
  const storageLang = localStorage.getItem('language');
  return APP_LANGUAGES.includes(storageLang as Language) 
      ? storageLang as Language
      : 'en'
}


export async function setLocale(locale: Language): Promise<void> {
  await setI18nLocale(locale);
  await setDayJsLocale(locale);
}


export default i18n;