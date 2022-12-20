<template>
  <div><div v-for="set in sets" :set="set">
    <div class="preset-kingdom_title"  >
      <div class="preset-kingdom_title_name">{{ $t(set.setId) }}</div>
    </div>

    <!-- Supply Cards -->
    <GenericLayout :items="getCards(set.supplyCards.concat(OtherCards(set, 'Normal Supply Cards')), sortBoxesSet)" 
                   :title="$t('Kingdoms Cards')" :shape="Shape.CARD" :showOverlay="false"
                   :generic-nb-columns="numberOfColumnsForSupplyCards" :is-vertical="true" />
    <!-- generic slot : Events -->
    <GenericLayout :items="getCards(set.events.concat(OtherCards(set, 'Events')), sortBoxesSet)"
                   :title="$t('Events')" :shape="Shape.CARD" :showOverlay="false"
                   :generic-nb-columns="numberOfColumnsForAddons" :is-vertical="false" />
    <!-- generic slot : Landmarks -->
    <GenericLayout :items="getCards(set.landmarks.concat(OtherCards(set, 'Landmarks')), sortBoxesSet)"
                   :title="$t('Landmarks')" :shape="Shape.CARD" :showOverlay="false"
                   :generic-nb-columns="numberOfColumnsForAddons" :is-vertical="false" />
    <!-- generic slot : Projects -->
    <GenericLayout :items="getCards(set.projects.concat(OtherCards(set, 'Projects')), sortBoxesSet)"
                   :title="$t('Projects')" :shape="Shape.CARD" :showOverlay="false"
                   :generic-nb-columns="numberOfColumnsForAddons" :is-vertical="false" />
    <!-- generic slot : Ways -->
    <GenericLayout :items="getCards(set.ways.concat(OtherCards(set, 'Ways')), sortBoxesSet)"
                   :title="$t('Ways')" :shape="Shape.CARD" :showOverlay="false"
                   :generic-nb-columns="numberOfColumnsForAddons" :is-vertical="false" />
    <!-- generic slot : Boons -->
    <GenericLayout :items="getCards(set.boons.concat(OtherCards(set, 'Boons')), sortBoxesSet)"
                   :title="$t('Boons')" :shape="Shape.CARD" :showOverlay="false"
                   :generic-nb-columns="numberOfColumnsForAddons" :is-vertical="false" />
    <!-- generic slot : Ally -->
    <GenericLayout :items="getCards(set.allies.concat(OtherCards(set, 'Allies')), sortBoxesSet)"
                   :title="$t('Allies')" :shape="Shape.CARD" :showOverlay="false"
                   :generic-nb-columns="numberOfColumnsForAddons" :is-vertical="false" />
				   
    <!-- otherCards : Basic Supply Cards, Ruins, Shelters, Non-Supply, Travellers, Artefacts, Hexes, -->
    <GenericLayout v-for="card in GetOtherCardTypes('vertical')" :key="card.cardType"
                   :items="getCards(OtherCards(set, card.cardType), challenge_sortBoxesSet(card.cardType))" 
                   :title="$t(card.title)" :shape="Shape.CARD" :showOverlay="false"
                   :generic-nb-columns="numberOfColumnsForSupplyCards" :is-vertical="true" />
	
    <GenericLayout v-for="card in GetOtherCardTypes('horizontal')" :key="card.cardType"
                   :items="getCards(OtherCards(set, card.cardType), sortBoxesSet)"
                   :title="$t(card.title)" :shape="Shape.CARD" :showOverlay="false"
                   :generic-nb-columns="numberOfColumnsForAddons" :is-vertical="false" />
	
    <GenericLayout v-for="card in GetOtherCardTypes('verticalMat')" :key="card.cardType"
                   :items="getCards(OtherCards(set, card.cardType), sortBoxesSet)"
                   :title="$t(card.title)" :shape="Shape.CARD" :showOverlay="false"
                   generic-nb-columns=3  :is-vertical="true" />
	
    <GenericLayout v-for="card in GetOtherCardTypes('horizontalMat')" :key="card.cardType"
                   :items="getCards(OtherCards(set, card.cardType), sortBoxesSet)"
                   :title="$t(card.title)" :shape="Shape.CARD" :showOverlay="false"
                   generic-nb-columns=2  :is-vertical="false" />
	
    <GenericLayout v-for="card in GetOtherCardTypes('squareMat')" :key="card.cardType"
                   :items="getCards(OtherCards(set, card.cardType), sortBoxesSet)"
                   :title="$t(card.title)" :shape="getshapeofmat(card.cardType)" :showOverlay="false"
                   generic-nb-columns=3  :is-vertical="false" />
    </div></div>
</template>
 
<script lang="ts">
import GenericLayout from "./GenericLayout.vue";
import { DominionSet } from "../dominion/dominion-set";
import { DominionSets } from "../dominion/dominion-sets";
import { SetId } from "../dominion/set-id";
import { Shape }  from "./GridLayout.vue";

import { SupplyCard } from "../dominion/supply-card";
import { SupplyCardSorter } from "../utils/supply-card-sorter";
import { State } from "vuex-class";
import { State as StoreState } from "../stores/sets-store";
import { Vue, Component } from "vue-property-decorator";
import { SortOption } from "../settings/settings";

const FOUR_COLUMN_SUPPLY_CARD_WIDTH = 450;
const TWO_COLUMN_ADDON_WIDTH = 525;

interface genericCardTypes {
  cardType: string;
  title: string;
}

const OTHER_CARD_TYPES: genericCardTypes[] = [
 {cardType: "Knight", title: "Supply Cards - Knights" }, /* dark Ages */
 {cardType: "Castle", title: "Supply Cards - Castles" }, /* empires */
 {cardType: "Basic Cards Treasure", title: "Basic Cards"},
 {cardType: "Basic Cards Victory", title: "Basic Cards"},
 {cardType: "Basic Cards", title: "Basic Cards"},
 {cardType: "Ruins", title: "Basic Cards - Ruins" }, /* dark Ages */
 {cardType: "Shelter", title: "Basic Cards - Shelters" }, /* dark Ages */
 {cardType: "Non-Supply Cards", title: "Non-Supply Cards"},
 {cardType: "Split Cards", title: "Supply Cards Split Piles"},
 {cardType: "Travellers Page", title: "Supply Cards - Travellers - Page Progression" }, /* adventures */
 {cardType: "Travellers Peasant", title: "Supply Cards - Travellers - Peasant Progression" }, /* adventures */
 {cardType: "Prize", title: "Non-Supply Cards"},
 {cardType: "Heirloom", title: "Non-Supply Cards - Heirlooms" }, /*nocturne */
 ];

const OTHER_CARD_TYPES_HORIZONTAL: genericCardTypes[] = [
 {cardType: "Hexes", title: "Hexes" }, /*nocturne */
 {cardType: "States", title: "States" }, /*nocturne */
 {cardType: "Artifacts", title: "Artifacts" }, /* Renaissance */
 ];
 
const OTHER_CARD_TYPES_MAT_HORIZONTAL: genericCardTypes[] = [
 {cardType: "Mat Horizontal", title: "Mat included in box"},
 ];
 
const OTHER_CARD_TYPES_MAT: genericCardTypes[] = [
 {cardType: "Mat Vertical", title: "Mat included in box"},
 ];
 
const OTHER_CARD_TYPES_MAT_SQUARE: genericCardTypes[] = [
 {cardType: "Mat Square", title: "Mat included in box"},
 {cardType: "advToken", title: "Tokens included in box"},
 {cardType: "Tokens", title: "Tokens included in box"},
 ];
 
@Component({
  components: {
    GenericLayout,
  }
})

export default class PresetBoxcontent extends Vue {
  //@Prop() readonly set!: DominionSet;
  @State(state => state.window.width) windowWidth!: number;
  @State(state => state.window.isEnlarged) readonly isEnlarged!: boolean;
  @State(state => state.sortBoxesSet) readonly sortBoxesSet!: string;
  @State(state => state.selectedBoxesSetId) readonly selectedBoxesSetId!: string;
   Shape = Shape;

  get sets() {
    const setId:SetId = (this.$store.state as StoreState).selectedBoxesSetId;
    return [ (DominionSets.sets[setId] as DominionSet) ];
  }

  get numberOfColumnsForSupplyCards() {
    return this.isEnlarged ? 2 : this.windowWidth <= FOUR_COLUMN_SUPPLY_CARD_WIDTH ? 4 : 5;
  }

  get numberOfColumnsForAddons() {
    return this.isEnlarged ? 1 : this.windowWidth <= TWO_COLUMN_ADDON_WIDTH ? 2 : 3;
  }
  
  getshapeofmat(mycardtype: string) {
    if (mycardtype == 'advToken') return Shape.SMALLSQUARE
    return Shape.SQUARE
  }
 
  getCards(cardIds: SupplyCard[], sortOption=SortOption.ORDERSTRING, origine="unset") {
    return SupplyCardSorter.sort(cardIds, sortOption, this.$t.bind(this));
  }
 
  OtherCards(usingSet: DominionSet, typeRequested : string) {
/*
  console.log("typeRequested : " + typeRequested)
  console.log(usingSet.otherCards)
  console.log(usingSet.otherCards.filter((card)=>((card.type).includes(typeRequested))))
  */
    return  usingSet.otherCards.filter((card)=>((card.type).includes(typeRequested)));
  }
 
  OtherCardTypes(isVertical:boolean) {
    return isVertical ? OTHER_CARD_TYPES : OTHER_CARD_TYPES_HORIZONTAL; 
  }
  
  GetOtherCardTypes(typeRequested:string) {
    if (typeRequested == 'horizontal' ) return OTHER_CARD_TYPES_HORIZONTAL; 
    if (typeRequested == 'vertical' ) return OTHER_CARD_TYPES;
    if (typeRequested == 'horizontalMat' ) return OTHER_CARD_TYPES_MAT_HORIZONTAL; 
    if (typeRequested == 'verticalMat' ) return OTHER_CARD_TYPES_MAT;
    if (typeRequested == 'squareMat' ) return OTHER_CARD_TYPES_MAT_SQUARE;
    return OTHER_CARD_TYPES;
  }

  challenge_sortBoxesSet(mycard_type : string) {
    if (mycard_type == "Travellers Page" || mycard_type == "Travellers Peasant") return SortOption.COST;
    if (mycard_type == "Split Cards") return SortOption.ORDERSTRING;
    if (mycard_type == "Castle") return SortOption.COST;
    return this.sortBoxesSet
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