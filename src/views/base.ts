import { computed, watch } from "vue";
import { onBeforeMount } from "vue";
import type { I18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

import { UPDATE_LANGUAGE, LOAD_DEFAULT_LANGUAGE } from "../stores/i18n/action-types";
import { Language, getLanguage } from "../i18n/language";
import { i18n, setI18nLanguage, loadLocaleMessages, getLocale } from "../i18n/i18n";

const useBase = () => {
  console.log("Base: setup")
  const store = useStore();
  const route = useRoute();
  const router = useRouter();

  const languageStateStr = computed(() => getLocale(i18n as I18n));
  const routeQueryLang = computed(() => route.query.lang);
  // console.log("Base - languageStr = ",languageStateStr.value)
  // console.log("Base - routeQueryLang = ",routeQueryLang.value)

  // function for onBeforeMount 
  const updateLanguageForQueryParam = () => {
    console.log("updateLanguageForQueryParam", getLocale(i18n as I18n));
    const langStr = Array.isArray(route.query.lang)
      ? route.query.lang[0]
      : route.query.lang;
    if (langStr && typeof langStr === 'string' && langStr !== languageStateStr.value) {
      // loadLocaleMessages(i18n as I18n, getLanguage(langStr));
      // setI18nLanguage(i18n as I18n, langStr);
      store.dispatch(UPDATE_LANGUAGE, getLanguage(langStr));
    }
  };

  // for Watch function : languageStateStr
  const onLanguageChanged = () => {
    console.log("onLanguageChanged")
    if (route.query.lang === languageStateStr.value) { return; }
    if (getLanguage(languageStateStr.value) === Language.ENGLISH) {
      const { lang, ...query } = route.query;
      router.replace({ query });
    } else {
      router.replace({
        query: {
          ...route.query,
          lang: languageStateStr.value,
        },
      });
    }
  };

  // for Watch function : $route.query.lang
  const onLanguageQueryParameterChanged = () => {
    console.log("in Base, onLanguageQueryParameterChanged")
    if (route.query.lang !== languageStateStr.value) {
      //loadLocaleMessages(i18n as I18n, (route.query.lang as any) as Language);
      //setI18nLanguage(i18n as I18n, (route.query.lang as any) as Language);
      store.dispatch(UPDATE_LANGUAGE, route.query.lang);
    }
  };

  watch(languageStateStr, onLanguageChanged);
  watch(routeQueryLang, onLanguageQueryParameterChanged);

  onBeforeMount(() => {
    console.log("Base : in onBeforeMount")
    if (route.query.lang) {
      console.log("in Base, setup - route.query.value:", route.query._value)
      updateLanguageForQueryParam();
    } else {
      store.dispatch(LOAD_DEFAULT_LANGUAGE);
    }
  });

  return {
    languageStateStr,
    routeQueryLang,
    onLanguageChanged,
    onLanguageQueryParameterChanged,
  };

}

export default useBase
