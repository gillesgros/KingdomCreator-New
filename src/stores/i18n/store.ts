import { Language } from "../../i18n/language"
import { i18n, setLocale } from "../../i18n/i18n";
import { I18n } from "vue-i18n";
import { Settings } from "./settings";
import { actions } from "./actions";


export interface State {
  language: Language;
}

export const store = {
  state: {
    language: Language.ENGLISH,
  } as State,
  actions,
  mutations: {
    SET_LANGUAGE (state: State, language: Language) {
      console.log("in SET_LANGAUGE")
      setLocale(i18n as I18n, language)
      state.language = language;
      new Settings(language).save();
    }
  }
};
