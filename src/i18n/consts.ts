export const APP_LANGUAGES = ['en', 'ru', 'fr'] as const

export type Language = typeof APP_LANGUAGES[number]


export const appLanguages : Array<{
  key: Language,
  value: string,
  title: string
}> = [
  { key: 'en', value: 'English', title: 'English (UK)' },
  { key: 'fr', value: 'French', title: 'Français' },
  { key: 'ru', value: 'Russian', title: 'Русский' },
];