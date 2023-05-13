<template>
  <div class="sidebar">
    <div class="sidebar-content">
      <div class="sidebar-content-title">{{ $t("Sets content") }}</div>
      <div class="set">
        <div class="sets" v-for="setId in sets" :key="setId">
          <label class="checkbox">
            <input type="radio" v-model="selectedBoxesSetId" :id="setId" :value="setId"
              @change="handleSelectionChange(setId)" />
            <span>{{ $t(setId) }} <span v-if="findMultipleVersionSets(setId).length !== 0"> - 1st</span></span>
          </label>
          <span v-if="findMultipleVersionSets(setId).length !== 0">
            <label class="checkbox suboption-set">
              <input type="radio" v-model="selectedBoxesSetId" :id="findMultipleVersionSets(setId)[0].idv2"
                :value="findMultipleVersionSets(setId)[0].idv2" 
                @change="handleSelectionChange(findMultipleVersionSets(setId)[0].idv2)" />
              <span>2nd</span>
            </label>
          </span>
        </div>
      </div>
      <div class="clear"></div>

      <div class="sidebar-content-title">{{ $t("Sort") }}</div>
      <div class="option" v-for="sortOption in sortOptions" :key="sortOption.value">
        <label class="checkbox">
          <input type="radio" name="sortOption" :value="sortOption.value" v-model="sortBoxesSet"
            @change="handleSortChange(sortOption.value)">
          <span>{{ $t(sortOption.display) }}</span>
        </label>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
/* import Vue, typescript */
import { defineComponent, ref } from "vue";

/* import Dominion Objects and type*/
import { DominionSets } from "../dominion/dominion-sets";
import type { SetId } from "../dominion/set-id";
import { MultipleVersionSets, HideMultipleVersionSets } from "../dominion/set-id";
import { SortOption } from "../settings/settings";

/* import store  */
import { useSetsStore } from '../pinia/sets-store';

/* import Components */

const sortOptions = [
  { display: "Alphabetical", value: SortOption.ALPHABETICAL },
  { display: "Cost", value: SortOption.COST },
];


export default defineComponent({
  name: 'BoxesSidebar',
  setup() {
    const setsStore = useSetsStore()
    const selectedBoxesSetId = ref(setsStore.selectedBoxesSetId)
    const sortBoxesSet = ref(setsStore.sortBoxesSet);

    const sets = DominionSets.getAllSetsIds()
      .filter(setId => { return (HideMultipleVersionSets.indexOf(setId) == -1) });

    const handleSelectionChange = (value: SetId) => {
      setsStore.updateSelectedBoxesSet(value);
    };

    const handleSortChange = (value: SortOption) => {
      console.log(value);
      setsStore.updateSortBoxesSet(value);
    };

    const findMultipleVersionSets = (setValue: string) => {
      return MultipleVersionSets.filter(set => {
        return (set.id === setValue)
      });
    };

    return {
      selectedBoxesSetId,
      sortBoxesSet,

      sortOptions,
      sets,
      handleSelectionChange,
      handleSortChange,
      findMultipleVersionSets
    };
  }
});
</script>