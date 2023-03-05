<template>
  <Page :subtitle="$t('rules_page_subtitle')" :selectedType="selectedType">
    <div class="content main">
      <Rulebooks />
    </div>
  </Page>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import Page from "../components/Page.vue";
import { MenuItemType } from "../components/Page.vue";
import Rulebooks from "../components/Rulebooks.vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { UPDATE_LANGUAGE, LOAD_DEFAULT_LANGUAGE } from "../stores/i18n/action-types";
import { Language, getLanguage } from "../i18n/language";

export default defineComponent({
  name: "Rules",
  components: {
    Page,
    Rulebooks,
  },
  setup() {
    console.log ("in Rules setup")
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const language = store.state.i18n.language;
	console.log("in Rules, language:", language)
	console.log("in Rules, router:",router)
	console.log("in Rules, route.query:",route.query)
	if (route.query.value != null)	console.log("in Rules, route.query.value:",route.query._value)

    const selectedType = MenuItemType.RULES;

    const updateLanguageForQueryParam = () => {
	console.log("in updateLanguageForQueryParam");
      const lang = Array.isArray(route.query.lang)
        ? route.query.lang[0]
        : route.query.lang;
      if (lang && typeof lang === 'string' && lang !== language) {
        console.log("lang", lang);
        store.dispatch(UPDATE_LANGUAGE, getLanguage(lang));
      }
    };

    const onLanguageChanged = () => {
      console.log("in onLanguageChanged", language);
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
      console.log("in onLanguageQueryParameterChanged");
      if (route.query.lang !== language) {
        store.dispatch(UPDATE_LANGUAGE, route.query.lang);
      }
    };

    const onBeforeMount = computed(() => {
      console.log("in Rules onBeforeMount");
      if (route.query.lang) {
        updateLanguageForQueryParam();
      } else {
        store.dispatch(LOAD_DEFAULT_LANGUAGE);
      }
    });

    return {
      language,
      onLanguageChanged,
      onLanguageQueryParameterChanged,
      onBeforeMount,
      selectedType,
    };

  },
  watch: {
    "$route.query.lang": "onLanguageQueryParameterChanged",
    language: "onLanguageChanged",
  },
});
</script>