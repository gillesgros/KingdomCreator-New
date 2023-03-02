<template>
  <Page :subtitle="$t('rules_page_subtitle')" :selectedType="selectedType">
    <div class="content main">
      <Rulebooks />
    </div>
  </Page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Base from "./base";
import Page, { MenuItemType } from "../components/Page.vue";
import Rulebooks from "../components/Rulebooks.vue";

export default defineComponent({
  name: "Rules",

  components: {
    Page,
    Rulebooks,
  },
  setup(props) {
    const selectedType = MenuItemType.RULES;
    const base = new Base();
    return {
      selectedType,
      ...base,
    };
  },
  watch: {
    "$route.query.lang": {
      handler() {
        this.onLanguageQueryParameterChanged();
      },
      immediate: true,
    },
    language: {
      handler() {
        this.onLanguageChanged();
      },
      immediate: true,
    },
  },
});
</script>
