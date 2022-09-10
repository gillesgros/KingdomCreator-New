<template>
  <div>
    <div class="preset-set_title" >
      <div style="width:50%;">
      <span> {{ $tc("Recommended Kingdoms Sets", nbKingdomRecommmendedSet) }} </span></div>
      <div>
      <span class="preset-show-hide_filter" v-show="!this.ShowFilterKingdom" v-on:click="showhidefilter"> [ {{ $t("show Kingdoms list") }} ] </span>
      <span class="preset-show-hide_filter" v-show= "this.ShowFilterKingdom" v-on:click="showhidefilter"> [ {{ $t("hide Kingdoms list") }} ] </span></div>
    </div>
    <div  class="preset-set_title" v-show= "this.ShowFilterKingdom">
      <div class="preset-kingdom_title_sets" v-for="kingdom in kingdoms" v-show="toshow(kingdom)&&isGameDisplayed(kingdom.name)">
        <a style="text-decoration: none"  :href="'#' + kingdom.name">
          <span class="preset-kingdom_set-name"  :class="kingdom.setIds[0]">{{kingdom.name}}</span>
        </a>
      </div>
    </div>
    <PresetKingdom v-for="kingdom in kingdoms" :key="RefreshKingdomList" :kingdom="kingdom" v-show="toshow(kingdom)&&isGameDisplayed(kingdom.name)"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
//import { Vue, Component } from "vue-property-decorator";
import PresetKingdom from "./PresetKingdom.vue";
import { DominionKingdoms } from "../dominion/dominion-kingdoms";
import { DominionKingdom } from "../dominion/dominion-kingdom";
import { SetId } from "../dominion/set-id";
import { State } from "../stores/sets-store";
import { UPDATE_SHOW_FILTER_KINGDOM } from "../stores/sets-store-mutation-types";

@Component({
  components: {
    PresetKingdom
  }
})

export default class PresetKingdomList extends Vue {
  @Prop() RefreshKingdomList!: number;
  ListSet:SetId[]=[];
  ShowFilterKingdom = false;

  created() {
    this.ShowFilterKingdom= (this.$store.state as State).showFilterKingdom;
  }

  get kingdoms() {
    const setId:SetId = (this.$store.state as State).selectedSetId;
    if (setId === SetId.ALL) {
      return DominionKingdoms.getAllKingdoms();
    }
    if (!(setId in DominionKingdoms.kingdoms)) { return []; }
      return DominionKingdoms.kingdoms[setId] 
    console.log ((this.$store.state as State).needRefresh)
  }

  get nbKingdomRecommmendedSet() {
    let nbking= 0 * (this.$store.state as State).needRefresh;
    for (var king of this.kingdoms!) {
      if (this.toshow(king) == true && this.isGameDisplayed(king.name) == true) {
        nbking +=1; 
      }
    }
    return nbking;
  }

  toshow(kingdom: DominionKingdom) {
    let elm

    this.ListSet.concat(kingdom.setIds as SetId[]);
    for (var set of kingdom.setIds) {
      elm = document.getElementById(set)!;
      if (elm !== null && elm.getAttribute('class') !==null) {
        if (! elm.getAttribute('class')!.includes(set)) {
          return false;
    } } } 
    return true;
  }

  isGameDisplayed(kingdomName: string) {
    //console.log((this.$store.state as State).showFilterPlayGames + (this.$store.state as State).needRefresh)
    if ((this.$store.state as State).showFilterPlayGames == "PNP") { return true }
    let PlayedGames = this.$storage.get("playedGames")
    let myIndex = PlayedGames.indexOf(kingdomName,0)
    if ((this.$store.state as State).showFilterPlayGames == "P") {
      return (myIndex > -1) ? true : false;  }
    if ((this.$store.state as State).showFilterPlayGames == "NP") {
      return myIndex > -1 ? false : true; }
    return true
  }

  showhidefilter() {
    this.ShowFilterKingdom = !(this.ShowFilterKingdom);
    this.$store.commit(UPDATE_SHOW_FILTER_KINGDOM, this.ShowFilterKingdom);
    return this.ShowFilterKingdom;
  }

} 
</script>

<style>

</style>