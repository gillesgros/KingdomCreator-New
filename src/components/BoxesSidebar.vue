<template>
  <div class="sidebar">
    <div class="sidebar-content">
      <div class="sidebar-content-title">Sets content</div>
      <div class="sets" v-for="set in sets" :key="set.setId">
        <div class="set">
          <label class="checkbox">
            <input type="radio" v-model="selectedBoxesSetId" :id="set.setId" :value="set.setId">
            <span>{{ $t(set.setId) }} 
              <span v-if="FindMultipleVersionSets(set.setId).length !== 0"> -  1st
                <input type="radio" v-model="selectedBoxesSetId" :id="(FindMultipleVersionSets(set.setId))[0].idv2" :value="(FindMultipleVersionSets(set.setId))[0].idv2">2nd
              </span>
            </span>
          </label>
        </div>
      </div>
      <div class="clear"></div>

      <div class="sidebar-content-title">Sort</div>
      <div class="option" v-for="sortOption in sortOptions" :key="sortOption.value">
        <label class="checkbox">
          <input type="radio" name="sortOption" :value="sortOption.value" v-model="selectedSortOption">
          <span>{{ sortOption.display }}</span>
        </label>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { UPDATE_SELECTED_BOXESSET } from "../stores/sets-store-mutation-types";
import { UPDATE_SORT_BOXES_SET } from "../stores/sets-store-mutation-types";

import { DominionSets } from "../dominion/dominion-sets";
import { State } from "../stores/sets-store";
import { SetId } from "../dominion/set-id";
import { MultipleVersionSets, HideMultipleVersionSets } from "../dominion/set-id";
import { SortOption } from "../settings/settings";

import { Vue, Component } from "vue-property-decorator";
//import { incaseofImgerrornew }  from "../utils/resources";

@Component
export default class BoxesSidebar extends Vue {

  beforeMount() {
    if (this.$storage.has("selectedBoxesSetId")) {
      if (!((this.$store.state as State).selectedBoxesSetId === this.$storage.get("selectedBoxesSetId"))) {
        this.$store.commit(UPDATE_SELECTED_BOXESSET, this.$storage.get("selectedBoxesSetId"));
      }
    } else {
      this.$storage.set("selectedBoxesSetId", (this.$store.state as State).selectedBoxesSetId);
    }
  }

  get sets() {
    return DominionSets.getAllSets().filter(set => {return (HideMultipleVersionSets.indexOf(set.setId) == -1)});
  }

  get selectedBoxesSetId() {
    if (!this.$storage.has("selectedBoxesSetId")) {
       this.$storage.set("selectedBoxesSetId", (this.$store.state as State).selectedBoxesSetId);
    }
    return (this.$store.state as State).selectedBoxesSetId;
  }
  
  set selectedBoxesSetId(value: SetId) {
    this.$storage.set("selectedBoxesSetId", value);
    this.$store.commit(UPDATE_SELECTED_BOXESSET, value);
  }

  get sortOptions(){
    return [
      {display: "Alphabetical", value: SortOption.ALPHABETICAL},
      {display: "Cost", value: SortOption.COST},
    ];
  }
  get selectedSortOption() {
    return (this.$store.state as State).sortBoxesSet;
  }
  set selectedSortOption(sortOption: string) {
    this.$store.commit(UPDATE_SORT_BOXES_SET, sortOption);
  }
  
  FindMultipleVersionSets(setValue: string) {
    return MultipleVersionSets.filter(set => {return (set.id===setValue)})
  }
}
</script>