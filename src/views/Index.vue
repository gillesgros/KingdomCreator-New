<!-- <template>
  <div>
    <ReplaceSupplyCardModal :key="this.$store.state.randomizer.kingdom.id" />
    <Page :subtitle="$t('index_page_subtitle')" :selectedType="selectedType">
      <Randomizer @specify-replacement="showReplaceModal = true" />
    </Page>
    <EnlargeButton />
  </div>
</template> -->

<template>
  <Page :subtitle="$t('rules_page_subtitle')" :selectedType="selectedType">
    <div class="content main">
      <Rulebooks />
    </div>
  </Page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import useBase from "./base";
//import EnlargeButton from "../components/EnlargeButton.vue";
import Page, { MenuItemType } from "../components/Page.vue";
//import Randomizer from "../components/Randomizer.vue";
//import ReplaceSupplyCardModal from "../components/ReplaceSupplyCardModal.vue";
import Rulebooks from "../components/Rulebooks.vue";

export default defineComponent({
  name: "Index",
  // components: {
  //   Page,
  //   Randomizer,
  //   ReplaceSupplyCardModal,
  //   EnlargeButton
  // },
  components: {
    Page,
    Rulebooks
  },
  setup() {
    console.log("Rules: setup")
    useBase();
    const selectedType = MenuItemType.RANDOMIZER;

  return {
      selectedType,
    };
  }

});
</script>