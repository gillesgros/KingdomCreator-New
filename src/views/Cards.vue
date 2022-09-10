<template>
  <Page :subtitle="$t('sets_page_subtitle')" :selectedType="selectedType">
    <div class="content">
     <BoxesSidebar />
     <div class="main">
       <card-online-page-component :set="set"  v-if="true"/>
       <card-online-page-landscape-component :set="set"  v-if="true"/>
       <card-online-page-othercard-component :set="set" v-if="true"/>
      </div>
    </div>
  </Page>

</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Base from "./base";
import Page, { MenuItemType } from "../components/Page.vue";

import CardOnlinePageComponent from "../components/card-online-page.vue";
import CardOnlinePageLandscapeComponent from "../components/card-online-page-landscape.vue";
import CardOnlinePageOthercardComponent from "../components/card-online-page-othercard.vue";
import BoxesSidebar from "../components/BoxesSidebar.vue";
import { State } from "../stores/sets-store";
import { DominionSets } from "../dominion/dominion-sets";
import { DominionSet } from "../dominion/dominion-set";


@Component({
  components: {
    Page,
    BoxesSidebar,
    "card-online-page-component": CardOnlinePageComponent,
    "card-online-page-landscape-component": CardOnlinePageLandscapeComponent,
    "card-online-page-othercard-component": CardOnlinePageOthercardComponent
  }
})

export default class Cards extends Base {
  selectedType = MenuItemType.CARDS
  
  get set() {
    const setId = (this.$store.state as State).selectedBoxesSetId;
    return (DominionSets.sets[setId] as DominionSet);
  }
  
}
</script>
