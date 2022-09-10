<template>
  <Page :subtitle="$t('sets_page_subtitle')" :selectedType="selectedType">
    <div class="content">
      <SetsSidebar />
      <div class="main">
        <div class="sets-description">{{ $t("sets_page_description") }}</div>
        <div class="kingdoms">
<!-- filter by set -->
          <div class="preset-set_title"   >
            <div style="width:50%;">{{ $t("To Filter Sets") }}</div>
            <div style ="width:35%;">
              <span class="preset-show-hide_filter" v-show="!this.ShowFilter" v-on:click="showhidefilter"> [ {{ $t("show filter") }} ] </span>
              <span class="preset-show-hide_filter" v-show= "this.ShowFilter" v-on:click="showhidefilter"> [ {{ $t("hide filter") }} ] </span></div>
            <div><span class="preset-show-hide_filter"                           v-on:click="resetfilter"   > [ {{ $t("reset filter") }} ] </span></div>
          </div>
          <div class="preset-set_title" v-show="this.ShowFilter">
            <div class="preset-kingdom_title_sets" v-for="set in sets" :key="set.setId">
              <span :id="set.setId" v-on:click="setfilter(set.setId)" :class="set.setId""
          class="preset-kingdom_set-name filter-out"> {{ $t(set.setId) }} </span>
            </div>
          </div>
<!-- Kingdoms list  -->
          <PresetKingdomList :key="RefreshKingdomList"/>
        </div>
      </div>
    </div>

    <svg class ="defs-only" xmlns="http://www.w3.org/2000/svg" >
      <symbol id="TopOfPage" >
      <path d="M16,0C7.163,0,0,7.164,0,16c0,8.837,7.163,16,16,16c8.836,0,16-7.163,16-16C32,7.164,24.836,0,16,0z M16,30   C8.28,30,1.969,23.72,1.969,16C1.969,8.28,8.28,2,16,2c7.72,0,14,6.28,14,14C30,23.72,23.72,30,16,30z" fill="#121313"/>
      <path d="M16.699,11.293c-0.384-0.38-1.044-0.381-1.429,0l-6.999,6.899c-0.394,0.391-0.394,1.024,0,1.414   c0.395,0.391,1.034,0.391,1.429,0l6.285-6.195l6.285,6.196c0.394,0.391,1.034,0.391,1.429,0c0.394-0.391,0.394-1.024,0-1.414   L16.699,11.293z" fill="#121313"/>
      </symbol>
    </svg>

  </Page>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Base from "./base";
import Page, { MenuItemType } from "../components/Page.vue";
import PresetKingdomList from "../components/PresetKingdomList.vue";
import SetsSidebar from "../components/SetsSidebar.vue";
import { DominionSets } from "../dominion/dominion-sets";

import { DominionKingdoms } from "../dominion/dominion-kingdoms";
import { State } from "../stores/sets-store";
import { SetId } from "../dominion/set-id";

@Component({
  components: {
    Page,
    PresetKingdomList,
    SetsSidebar
  }
})

export default class sets extends Base {
  selectedType = MenuItemType.SETS
  RefreshKingdomList=0;
  ShowFilter=false;

  get sets () {
    return DominionSets.getAllSets();
  }

  get kingdoms() {
    const setId = (this.$store.state as State).selectedSetId;
    if (setId === ("All" as SetId)) {
      return DominionKingdoms.getAllKingdoms();
    }
    if (!(setId in DominionKingdoms.kingdoms)) { return []; }
      return DominionKingdoms.kingdoms[setId] 
  }

  setfilter(setid : string) {
    let elm = document.getElementById(setid)!;
    elm.getAttribute('class')!.includes(setid) 
        ? elm.setAttribute('class', 'preset-kingdom_set-name filter-in ')
        : elm.setAttribute('class', 'preset-kingdom_set-name filter-out ' + setid)
    this.forceRerender()
  }

  resetfilter() {
    let dominionSets = DominionSets.getAllSets()
    for (let set in dominionSets) {
     let elm = document.getElementById(dominionSets[set].setId)!;
     elm.setAttribute('class', 'preset-kingdom_set-name filter-out '+ dominionSets[set].setId)
    }
    this.forceRerender()
  }

   forceRerender() {
     this.RefreshKingdomList  += 1;
  }

  showhidefilter() {
    this.ShowFilter = !(this.ShowFilter)
    return this.ShowFilter;
  }

}
</script>
