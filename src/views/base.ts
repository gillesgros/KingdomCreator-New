import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { UPDATE_LANGUAGE, LOAD_DEFAULT_LANGUAGE } from "../stores/i18n/action-types";
import { Language, getLanguage } from "../i18n/language";

export default defineComponent({
  name: "Base",
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const language = store.state.i18n.language;

    const updateLanguageForQueryParam = () => {
      const lang = Array.isArray(route.query.lang)
        ? route.query.lang[0]
        : route.query.lang;
      if (lang && typeof lang === 'string' && lang !== language) {
        store.dispatch(UPDATE_LANGUAGE, getLanguage(lang));
      }
    };

    const onLanguageChanged = () => {
      if (route.query.lang === language) { return; }
      if (language === Language.ENGLISH) {
        const { lang, ...query } = route.query;
        router.replace({ query });
      } else {
        router.replace({
          query: {
            ...route.query,
            lang: language,
          },
        });
      }
    };

    const onLanguageQueryParameterChanged = () => {
      if (route.query.lang !== language) {
        store.dispatch(UPDATE_LANGUAGE, route.query.lang);
      }
    };

    const created = () => {
      if (route.query.lang) {
        updateLanguageForQueryParam();
      } else {
        store.dispatch(LOAD_DEFAULT_LANGUAGE);
      }
    };

    return {
      language,
      onLanguageChanged,
      onLanguageQueryParameterChanged,
      created,
    };
  },
  watch: {
    "$route.query.lang": {
      handler: "onLanguageQueryParameterChanged",
      immediate: true,
    },
    language: {
      handler: "onLanguageChanged",
      immediate: true,
    },
  },
});