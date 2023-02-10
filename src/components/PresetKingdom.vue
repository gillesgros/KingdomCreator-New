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
import AddonTitle from "./AddonTitle.vue";
import GridLayout from "./GridLayout.vue";
import { DominionKingdom } from "../dominion/dominion-kingdom";
import { DominionSets } from "../dominion/dominion-sets";
import { SupplyCard } from "../dominion/supply-card";
import { State } from "vuex-class";
import { State as StoreState } from "../stores/sets-store";
import { UPDATE_NEED_REFRESH } from "../stores/sets-store-mutation-types";
import { SupplyCardSorter } from "../utils/supply-card-sorter";
import { SortOption } from "../settings/settings";

import { Vue, Component, Prop } from "vue-property-decorator";
import StaticCardWithSet from "./StaticCardWithSet.vue";
import BaneCardCover from "./BaneCardCover.vue";
import CopyButton from "./CopyButton.vue";

const FOUR_COLUMN_SUPPLY_CARD_WIDTH = 450;
const TWO_COLUMN_ADDON_WIDTH = 525;

@Component({
  components: {
    AddonTitle,
    GridLayout,
    StaticCardWithSet,
    BaneCardCover,
    CopyButton,
  }
})
export default class PresetKingdom extends Vue {
  @Prop() readonly kingdom!: DominionKingdom;
  @State(state => state.sortSet) readonly sortSet!: string;
  @State(state => state.window.width) windowWidth!: number;

  get sets() {
    return this.kingdom.setIds.map(DominionSets.getSetById);
  }

  get numberOfColumnsForSupplyCards() {
    return this.windowWidth <= FOUR_COLUMN_SUPPLY_CARD_WIDTH ? 4 : 5;
  }

  get numberOfColumnsForAddons() {
    return this.windowWidth <= TWO_COLUMN_ADDON_WIDTH ? 2 : 3;
  }

  get addonIds() {
    return this.kingdom.eventIds.concat(
        this.kingdom.landmarkIds, this.kingdom.projectIds, this.kingdom.wayIds, this.kingdom.allyIds, this.kingdom.traitIds);
  }

  get hasMetadata() {
    return this.kingdom.metadata.useColonies || this.kingdom.metadata.useShelters;
  }

  get copyText() {
    return this.kingdom.supplyIds.concat(this.addonIds).map((id) => this.$t(id)).join(", ");
  }

  getSupplyCards(kingdom: DominionKingdom) {
    const cardIds = this.kingdom.supplyIds.concat();
    let Cards = SupplyCardSorter.sort(this.getCards(cardIds) as SupplyCard[], (this.$store.state as StoreState).sortSet as SortOption, this.$t.bind(this));
    if (this.kingdom.baneCardId) {
      Cards.push(this.getCards([this.kingdom.baneCardId])[0]);
    }
    /*
    if (this.kingdom.obeliskCardId) {
      Cards.push(this.getCards([this.kingdom.obeliskCardId])[0]);
    }
    */
    return Cards;
  }

  getCards(cardIds: string[]) {
    return SupplyCardSorter.sort(cardIds.map(DominionSets.getCardById) as SupplyCard[], (this.$store.state as StoreState).sortSet as SortOption, this.$t.bind(this));
  }

  isBaneCard(supplyCard: SupplyCard) {
    return this.kingdom.baneCardId &&
      this.kingdom.baneCardId == supplyCard.id;
  }

  isObeliskCard(supplyCard: SupplyCard) {
    return this.kingdom.obeliskCardId &&
      this.kingdom.obeliskCardId == supplyCard.id;
  }

//  getCopyText(kingdom: DominionKingdom) {
//    return this.getSupplyCards(kingdom).map((card) => card.name).join(", ");
//  }
  
  isPlayFavImg(kingdomName: string) {
    let PlayedGames = this.$storage.get("playedGames")
    let myIndex = PlayedGames.indexOf(kingdomName,0)
    if (myIndex > -1) {
      return "check";
    } else {
       return "light_blue_cross";
    }
  }

  isGameDisplayed(kingdomName: string) {
    if ((this.$store.state as StoreState).showFilterPlayGames == "PNP") { return true }
    let PlayedGames = this.$storage.get("playedGames")
    let myIndex = PlayedGames.indexOf(kingdomName,0)
    if ((this.$store.state as StoreState).showFilterPlayGames == "P") {
      return (myIndex > -1) ? true : false;  }
    if ((this.$store.state as StoreState).showFilterPlayGames == "NP") {
      return myIndex > -1 ? false : true; }
    return true
  }

  onclick(ev: any, kingdomName: string) {
    let PlayedGames = this.$storage.get("playedGames")
    let myIndex = PlayedGames.indexOf(kingdomName,0)
    if (myIndex > -1) {
      /* remove it */
      PlayedGames.splice(myIndex,1)
      this.$storage.set("playedGames",PlayedGames)
      ev.target.src="/img/elements/light_blue_cross.png"
    } else {
       /* add it */
       this.$storage.set("playedGames", PlayedGames.concat(kingdomName))
       ev.target.src="/img/elements/check.png"
    }
    if ((this.$store.state as StoreState).showFilterPlayGames != "PNP") { 
      this.forceRerender() }
  }

   forceRerender() {
     this.$store.commit(UPDATE_NEED_REFRESH);
  }

}
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