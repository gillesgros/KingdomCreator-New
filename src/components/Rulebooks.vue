<template>
  <div class="rulebooks">
    <div class="rulebooks-description">
      {{ $t("rules_page_description") }}
    </div>
    <GridLayout 
      :items="rulebooks"
      :number-of-columns="3"
      :is-vertical="true"
      :shape="Shape.SQUARE"
    >
      <template v-slot:default="slotProps">
        <Rulebook :rulebook="slotProps.item" />
      </template>
    </GridLayout>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import type { I18n } from "vue-i18n";

import GridLayout, { Shape } from "./GridLayout.vue";
import Rulebook from "./Rulebook.vue";
import type { RulebookInterface } from "./Rulebook.vue";
import { SetId, Set_To_Ignore_Rules, Set_To_Ignore_Rules_FR } from "../dominion/set-id";
import { DominionSets } from "../dominion/dominion-sets";
import { Language } from "../i18n/language";
import { i18n, getLocale } from "../i18n/i18n";

export default defineComponent({
  name: "Rulebooks",
  components: {
    GridLayout,
    Rulebook
  },
  setup() {
    const store = useStore();
    const { t } = useI18n();
    const language = computed(() => getLocale(i18n as I18n));

    console.log(language.value, t(SetId.GUILDS))
    const rulebooks = computed(() => {
      const listSets =  DominionSets
        .getAllSets()
        .filter(s => !Set_To_Ignore_Rules.has(s.setId))
        .map(s => {
          return {
            id: s.setId,
            name: t(s.setId),
          } as RulebookInterface
        })
        .concat({
          id: SetId.GUILDSCONUCOPIA as string,
          name: t(SetId.GUILDS) + " / " + t(SetId.CORNUCOPIA),
        })
        .filter((set) => !(
            language.value == Language.FRENCH  
            ? Set_To_Ignore_Rules_FR.has(set.id as SetId) 
            : "" )
        )
        .sort((a, b) => {
          return a.id == b.id ? 0 : a.id < b.id ? -1 : 1;
        });
      return listSets;
    });
    
    return { 
      rulebooks, 
      Shape 
    };
  }
});
</script>

<style>
.rulebooks {
  max-width: 800px;
}

.rulebooks-description {
  font-family: 'Alegreya Sans', sans-serif;
  font-weight: 300;
  margin: 10px 5px;
}
</style>