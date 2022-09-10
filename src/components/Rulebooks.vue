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

import { Vue, Component } from "vue-property-decorator";
import { State } from "vuex-class";
import GridLayout, { Shape } from "./GridLayout.vue";
import Rulebook, { RulebookInterface } from "./Rulebook.vue";
import { SetId, Set_To_Ignore_Rules, Set_To_Ignore_Rules_FR } from "../dominion/set-id";
import { DominionSets } from "../dominion/dominion-sets";
import { Language } from "../i18n/language";

// const SETS_TO_IGNORE = new Set([SetId.PROMOS]);

@Component({
  components: {
    GridLayout,
    Rulebook
  }
})
export default class Rulebooks extends Vue {
  @State(state => state.i18n.language) readonly language!: Language;
  Shape = Shape;

  get rulebooks() {
    return DominionSets
      .getAllSets()
      .filter(s => !Set_To_Ignore_Rules.has(s.setId))
      .map(s => {
        return {
          id: s.setId,
          name: this.$t(s.setId),
        } as RulebookInterface
      })
      .concat({
        id: SetId.GUILDSCONUCOPIA as string,
        name: `${this.$tc(SetId.GUILDS)} / ${this.$tc(SetId.CORNUCOPIA)}`,
      })
      .filter((set) => !(
          this.language == Language.FRENCH  
          ? Set_To_Ignore_Rules_FR.has(set.id as SetId) 
          : "" )
      )
      .sort((a, b) => {
        return a.id == b.id ? 0 : a.id < b.id ? -1 : 1;
      });
  }
};
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