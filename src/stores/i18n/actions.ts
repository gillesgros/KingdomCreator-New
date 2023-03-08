import { SET_LANGUAGE } from "./mutation-types";
import { UPDATE_LANGUAGE } from "./action-types";
import { State } from "./store";
import { ActionContext } from "vuex";
import { i18n, loadLocaleMessages } from "../../i18n/i18n";
import { I18n } from "vue-i18n";
import { Language } from "../../i18n/language";
import { Settings } from "./settings";

type Context = ActionContext<State, any>

export const actions = {
  async LOAD_DEFAULT_LANGUAGE(context: Context) {
    const settings = Settings.load();
    console.log("in LOAD_DEFAULT_LANGUAGE", settings.language)
    return context.dispatch(UPDATE_LANGUAGE, settings.language);
  },
  async UPDATE_LANGUAGE(context: Context, language: Language) {
    console.log("in UPDATE_LANGUAGE", language)
    context.commit(SET_LANGUAGE, language);
    loadLocaleMessages(i18n as I18n, language);
    console.log("in UPDATE_LANGUAGE after I18n.loadLanguage", language)
  }
}
