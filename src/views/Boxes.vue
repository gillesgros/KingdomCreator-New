<template>
  <div>
    <Page :subtitle="$t('boxes_page_subtitle')" :selectedType="selectedType">
      <div class="content">
        <BoxesSidebar />
        <div class="main">
          <div class="sets-description">{{$t("boxes_page_description")}}</div>
          <div class="kingdoms">
		  <!-- Box content -->
            <PresetBoxcontent  />
          </div>
        </div>
      </div>
    </Page>
    <EnlargeButton />
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Base from "./base";
import Page, { MenuItemType } from "../components/Page.vue";
import EnlargeButton from "../components/EnlargeButton.vue";
import PresetBoxcontent from "../components/PresetBoxcontent.vue";
import BoxesSidebar from "../components/BoxesSidebar.vue";

/*
import { DominionSets } from "../dominion/dominion-sets";
import { DominionSet } from "../dominion/dominion-set";
import { State } from "../stores/sets-store";
*/

@Component({
  components: {
    Page,
    PresetBoxcontent,
    BoxesSidebar,
    EnlargeButton,
  }
})
export default class Boxes extends Base {
  selectedType = MenuItemType.BOXES

/*
  get sets() {
    const setId = (this.$store.state as State).selectedBoxesSetId;
	console.log("in Boxes : set is = " + setId);
    return [ (DominionSets.sets[setId] as DominionSet) ];
  }
  */
}
</script>
