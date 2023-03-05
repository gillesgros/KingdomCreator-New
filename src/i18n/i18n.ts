import { createI18n } from 'vue-i18n'
import en from "./en";
import { Language } from "./language";

const i18n = createI18n({
  legacy: false,
  locale: Language.ENGLISH,
  fallbackLocale: Language.ENGLISH,
  //silentTranslationWarn: true,
  messages: { en },
});

export class I18n {
  private static readonly instance = i18n;
  private static readonly loaded = new Set([Language.ENGLISH]);
  
  static getInstance(): any {
    return this.instance;
  }

  static async setLanguage(language: Language): Promise<any> {
    i18n.global.locale = ((language as unknown) as typeof i18n.global.locale);
    document.querySelector("html")?.setAttribute("lang", language) ?? false
  }

  static async loadLanguage(language: Language): Promise<any> {
    console.log("loading message : ", language)
    if (this.loaded.has(language)) {
      return Promise.resolve();
    }
    const { messages } = await import(
        /* webpackChunkName: "language-[request]" */ `./${language}.ts`);
    i18n.global.setLocaleMessage(language, messages);
    this.loaded.add(language);
  }
}

