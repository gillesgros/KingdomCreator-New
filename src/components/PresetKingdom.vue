<template>
  <div v-show="isGameDisplayed(kingdom.name)">
    <a :id="kingdom.name"/>
    <div class="preset-kingdom_title">
      <div class="preset-kingdom_title left-top-sign-div">
        <div class="preset-kingdom_title_name">{{kingdom.name}}</div>
        <div class="preset-kingdom_title_sets" v-for="set in sets" :key="set.setId">
          <span class="preset-kingdom_set-name" :class="[set.setId]">
            {{ $t(set.setId) }}</span>
        </div>
      </div>
      <div class="right-top-sign-div">
        <img style="width: 15px; height: 15px; cursor: pointer;" :src='"/img/elements/" +isPlayFavImg(kingdom.name) +".png"' 
           @click="onclick($event, kingdom.name)" />
      </div>
      <div class="right-top-sign-div"><a href="#TopofThePage">
        <svg viewBox="0 0 32 32" height="20px" width="20px">
          <use xlink:href="#TopOfPage"/>
        </svg>
      </a></div>
    </div>

    <div class="preset-kingdom_metadata" v-if="hasMetadata">
      <div class="preset-kingdom_metadata_use-platinums-and-colonies"
          v-if="kingdom.metadata.useColonies">
           {{ $t("Use Platinums/Colonies") }}
      </div>
      <div class="preset-kingdom_metadata_use-shelters"
          v-if="kingdom.metadata.useShelters">
          {{ $t("Use Shelters") }}
      </div>
    </div>

    <GridLayout
      :items="getSupplyCards(kingdom)"
      :number-of-columns="numberOfColumnsForSupplyCards"
      :is-vertical="true"
    >
      <template v-slot:default="slotProps">
        <StaticCardWithSet :card="slotProps.item" />
        <BaneCardCover isType="Bane" v-if="isBaneCard(slotProps.item)" />
        <BaneCardCover isType="Obelisk" v-if="isObeliskCard(slotProps.item)" />

      </template>
    </GridLayout>

    <div v-if="addonIds.length">
      <div class="preset-kingdom__addon-title">
        <AddonTitle
          :has-events="kingdom.eventIds.length > 0"
          :has-landmarks="kingdom.landmarkIds.length > 0"
          :has-projects="kingdom.projectIds.length > 0"
          :has-ways="kingdom.wayIds.length > 0"
          :has-allies="kingdom.allyIds.length > 0"
          :has-traits="kingdom.traitIds.length > 0"
        />
      </div>
      <GridLayout
        :items="getCards(addonIds)"
        :number-of-columns="numberOfColumnsForAddons"
        :is-vertical="false"
      >
        <template v-slot:default="slotProps">
          <StaticCardWithSet :card="slotProps.item" />
        </template>
      </GridLayout>
    </div>
        
    <div v-if="kingdom.boonIds.length">
      <div class="preset-kingdom__addon-title">Boons</div>
      <GridLayout
        :items="getCards(kingdom.boonIds)"
        :number-of-columns="numberOfColumnsForAddons"
        :is-vertical="false"
      >
        <template v-slot:default="slotProps">
          <StaticCardWithSet :card="slotProps.item" />
        </template>
      </GridLayout>
    </div>
    <CopyButton 
      :text="copyText"
      class="preset-kingdom-copy-button"
    />
  </div>
</template>

<script lang="ts">
/* import Vue, typescript */
import { defineComponent, computed } from 'vue';
import type { PropType } from "vue";
import { useI18n } from "vue-i18n";

/* import Dominion Objects and type*/
import { DominionKingdom } from "../dominion/dominion-kingdom";
import { DominionSets } from "../dominion/dominion-sets";
import type { SupplyCard } from "../dominion/supply-card";
import { SupplyCardSorter } from "../utils/supply-card-sorter";
import type { SortOption } from "../settings/settings";

/* import store  */
import { useWindowStore } from '../pinia/window-store';
import { useSetsStore } from "../pinia/sets-store";

/* import Components */
import AddonTitle from "./AddonTitle.vue";
import GridLayout from "./GridLayout.vue";
import StaticCardWithSet from "./StaticCardWithSet.vue";
import BaneCardCover from "./BaneCardCover.vue";
import CopyButton from "./CopyButton.vue";

const FOUR_COLUMN_SUPPLY_CARD_WIDTH = 450;
const TWO_COLUMN_ADDON_WIDTH = 525;

export default defineComponent({
  name: 'PresetKingdom',
  components: {
    AddonTitle,
    GridLayout,
    StaticCardWithSet,
    BaneCardCover,
    CopyButton
  },
  props: {
    kingdom: {
      type: DominionKingdom as PropType<DominionKingdom>,
      required: true
    }
  },
  setup(props) {
    const windowStore = useWindowStore();
    const setsStore = useSetsStore();
    const { t } = useI18n();

    const sets = computed(() => {
      return props.kingdom.setIds.map(DominionSets.getSetById);
    });

    const numberOfColumnsForSupplyCards = computed(() => {
      return windowStore.isEnlarged ? 2 : windowStore.width <= FOUR_COLUMN_SUPPLY_CARD_WIDTH ? 4 : 5;
    });

    const numberOfColumnsForAddons = computed(() => {
      return windowStore.isEnlarged ? 1 : windowStore.width <= TWO_COLUMN_ADDON_WIDTH ? 2 : 3;
    });


// export default class PresetKingdom extends Vue {
//   @Prop() readonly kingdom!: DominionKingdom;

  const addonIds = computed(() => {
    return props.kingdom.eventIds.concat(
      props.kingdom.landmarkIds, props.kingdom.projectIds, props.kingdom.wayIds, props.kingdom.allyIds, props.kingdom.traitIds);
  });

  const hasMetadata = computed(() => {
    return props.kingdom.metadata.useColonies || props.kingdom.metadata.useShelters;
  });

  const copyText = computed(() => {
    return props.kingdom.supplyIds.concat(addonIds.value).map((id) => t(id)).join(", ");
  });

  const getSupplyCards = (kingdom: DominionKingdom) => {
    const cardIds = props.kingdom.supplyIds.concat();
    let Cards = SupplyCardSorter.sort(getCards(cardIds) as SupplyCard[], setsStore.sortSet as SortOption, t);
    if (props.kingdom.baneCardId) {
      Cards.push(getCards([props.kingdom.baneCardId])[0]);
    }
    /*
    if (this.kingdom.obeliskCardId) {
      Cards.push(this.getCards([this.kingdom.obeliskCardId])[0]);
    }
    */
    return Cards;
  };

  const getCards = (cardIds: string[]) => {
    return SupplyCardSorter.sort(cardIds.map(DominionSets.getCardById) as SupplyCard[], setsStore.sortSet as SortOption, t);
  };

  const isBaneCard = (supplyCard: SupplyCard) => {
    return props.kingdom.baneCardId &&
    props.kingdom.baneCardId == supplyCard.id;
  };

  const isObeliskCard = (supplyCard: SupplyCard) => {
    return props.kingdom.obeliskCardId &&
    props.kingdom.obeliskCardId == supplyCard.id;
  };

//  getCopyText(kingdom: DominionKingdom) {
//    return this.getSupplyCards(kingdom).map((card) => card.name).join(", ");
//  }
  
  const isPlayFavImg = (kingdomName: string) => {
    let PlayedGames = setsStore.playedGames;
    let myIndex = PlayedGames.indexOf(kingdomName,0)
    if (myIndex > -1) {
      return "check";
    } else {
       return "light_blue_cross";
    }
  };

  const isGameDisplayed = (kingdomName: string) => {
    if (setsStore.showFilterPlayGames == "PNP") { return true }
    let PlayedGames = setsStore.playedGames;
    let myIndex = PlayedGames.indexOf(kingdomName,0)
    if (setsStore.showFilterPlayGames == "P") {
      return (myIndex > -1) ? true : false;  }
    if (setsStore.showFilterPlayGames == "NP") {
      return myIndex > -1 ? false : true; }
    return true
  };

  const onclick = (ev: any, kingdomName: string) => {
    let PlayedGames = setsStore.playedGames
    let myIndex = PlayedGames.indexOf(kingdomName,0)
    if (myIndex > -1) {
      /* remove it */
      PlayedGames.splice(myIndex,1)
      setsStore.updatePlayedGames(PlayedGames)
      ev.target.src="/img/elements/light_blue_cross.png"
    } else {
       /* add it */
       setsStore.updatePlayedGames(PlayedGames.concat(kingdomName))
       ev.target.src="/img/elements/check.png"
    }
    if (setsStore.showFilterPlayGames != "PNP") { 
      forceRerender() }
  };

   const forceRerender = () => {
     setsStore.updateNeedRefresh()
  };

  return {
      t,
      sets,
      numberOfColumnsForSupplyCards,
      numberOfColumnsForAddons,

      addonIds,
      hasMetadata,
      copyText,
      getSupplyCards,
      getCards,
 
      isBaneCard,
      isObeliskCard,
      isPlayFavImg,
      isGameDisplayed,
      onclick
    };
  }
})
</script>

<style>
@media (max-width: 450px) {
  .preset-kingdom_title_name {
    font-size: 30px;
    margin-right: 8px;
  }
    
  .preset-kingdom_set-name {
    font-size: 14px;
    padding: 4px 6px;
  }
}

</style>