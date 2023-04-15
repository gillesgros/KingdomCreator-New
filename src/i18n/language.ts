import type { Locale } from 'vue-i18n'

export enum Language {
  DUTCH = "nl",
  ENGLISH = "en",
  FRENCH = "fr",
  GERMAN = "de",
  SPANISH = "es",
  POLISH ="pl"
}

export function getLanguage(value: string):Locale {
  const [prefix] = value.split("-");
  for (const key of Object.keys(Language)) {
    if (Language[key as keyof typeof Language] == prefix) {
      return Language[key as keyof typeof Language];
    }
  }
  return Language.ENGLISH;
}
