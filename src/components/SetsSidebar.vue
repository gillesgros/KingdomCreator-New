<template>
  <div class="sidebar">
    <div class="sidebar-content">
      <div class="sidebar-content-title">{{ $t("Sets") }}</div>
      <div class="sets">
        <div class="sets" v-for="set in kingdomsets" :key="set">
          <label class="checkbox">
            <input type="radio" v-model="selectedSetId" id="selectedSet" :value="set"/>
            <span>{{ $t(set) }} <span v-if="FindMultipleVersionSets(set).length !== 0"> - 1st</span></span>
          </label>
          <span v-if="FindMultipleVersionSets(set).length !== 0">
            <label class="checkbox suboption-set">
              <input type="radio" v-model="selectedSetId" id="selectedSet" :value="(FindMultipleVersionSets(set))[0].idv2">
              <span>2nd</span>
            </label>
          </span>
        </div>
      </div><!-- sets {{ set.name }} --><!-- (this.$store.state as State).selectedSetId -->

      <br>
      <div class="sets">
        <div class="set">
          <label class="checkbox">
            <input type="radio" id="selectedKDSet" :value="valueForSetId_All" v-model="selectedSetId" />
            <span>All recommended sets</span>
          </label>
        </div>
      </div><!-- sets All -->

      <div class="sets">
        <div class="set">
          <label class="checkbox">
            <input type="radio" id="selectedKDSet" :value="valueForSetId_Personal" v-model="selectedSetId" />
            <span>Personal sets</span>
          </label>
          <div class="js input-file-container"  v-show="show_PersonalFileSelection_Div">
            <input type="file" class="input-file"
                  id="fileInput" ref="fileInput"
                  onclick="this.value=null;" 
                  @change="SelectFile($event)" 
                  accept=".yaml"  
                  v-show="show_PersonalFileSelection_Input"/>
            <label id="my-file-label-trigger" for="fileInput" class="input-file-trigger" v-show="show_PersonalFileSelection_Input"
                  tabindex="0">Select a file...</label>
            <div id="div-file-return" class="file-return" style="background-color=blue">{{file_name}}</div>
          </div>
        </div>
      </div><!-- sets Personal -->

      <div class="clear"></div>

      <div class="sidebar-content-title">{{ $t("Filter Games") }}</div>
      <div class="option" v-for="filterOption in filterOptions" :key="filterOption.value">
        <label class="checkbox">
          <input type="radio" id="filterOption" :value="filterOption.value" v-model="selectedFilterOption">
          <span>{{ $t(filterOption.display) }}</span>
        </label>
      </div>

      <div class="sidebar-content-title">{{ $t("Sort") }}</div>
      <div class="option" v-for="sortOption in sortOptions" :key="sortOption.value">
        <label class="checkbox">
          <input type="radio" name="sortOption" :value="sortOption.value" v-model="selectedSortOption">
          <span>{{ $t(sortOption.display) }}</span>
        </label>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { UPDATE_SELECTED_SET } from "../stores/sets-store-mutation-types";
import { UPDATE_FILTER_PLAYED_GAMES } from "../stores/sets-store-mutation-types";
import { UPDATE_SORT_SET } from "../stores/sets-store-mutation-types";

/*import { DominionSets } from "../dominion/dominion-sets";*/
import { MultipleVersionSets, HideMultipleVersionSets } from "../dominion/set-id";
import { State } from "../stores/sets-store";
import { SetId, Set_To_Ignore_Kingdoms } from "../dominion/set-id";
import { SortOption } from "../settings/settings";

import { Vue, Component } from "vue-property-decorator";
import { DominionKingdom } from "../dominion/dominion-kingdom";
import { DominionKingdoms } from "../dominion/dominion-kingdoms";

declare function  Yaml_Parsing(file_content : string) :any;

@Component
export default class SetsSidebar extends Vue {
  file_name= "";
  show_PersonalFileSelection_Input=false;

  beforeMount() {
    if (this.$storage.has("selectedSetId")) {
      if (!((this.$store.state as State).selectedSetId === this.$storage.get("selectedSetId")))  {
        this.$store.commit(UPDATE_SELECTED_SET, this.$storage.get("selectedSetId"));
      }
    } else {
      this.$storage.set("selectedSetId", (this.$store.state as State).selectedSetId);
    }
    if (!(this.$storage.has("playedGames"))) { this.$storage.set("playedGames", [ "played" ]) }
  }

/*  get sets() {
   return DominionSets.getAllSets().filter((set) => !Set_To_Ignore_Kingdoms.has(set.setId));
  }
*/
  get kingdomsets() {
    return DominionKingdoms.getAllSets().filter((set) => !((Set_To_Ignore_Kingdoms).has(set)))
                                        .filter(set => {return (HideMultipleVersionSets.indexOf(set) == -1)});
  }
  get valueForSetId_All():string { return (SetId.ALL as string); }
  get valueForSetId_Personal():string { return (SetId.PERSONAL as string); }

  get selectedSetId() {
    if (!this.$storage.has("selectedSetId")) {
       this.$storage.set("selectedSetId", (this.$store.state as State).selectedSetId);
    }
    return (this.$store.state as State).selectedSetId;
  }

  set selectedSetId(value: SetId) {
    ((value as string).toLowerCase() == (SetId.PERSONAL as string)) 
        ? this.show_PersonalFileSelection_Input = true
        : this.show_PersonalFileSelection_Input = false;
    this.$storage.set("selectedSetId", value);
    this.$store.commit(UPDATE_SELECTED_SET, value);
  }

  get show_PersonalFileSelection_Div() {
    if (((this.selectedSetId as string) == (SetId.PERSONAL as string)) && (this.file_name == "")) {
      this.show_PersonalFileSelection_Input = true;
      return true;
    }
    if (this.show_PersonalFileSelection_Input) { return true; }
    if (this.file_name != "") { return true; }
    return false;
  }

  SelectFile(ev: any) {
    let file = ev.target.files[0];
    if (file == undefined) {
      this.file_name = ""
    } else {
      let reader = new FileReader();
      reader.onload = (e) => { 
          let kingdoms_object = Yaml_Parsing((reader.result as string)); 
          let kingdoms = Object.keys(kingdoms_object).map((key) => { return kingdoms_object[key] })
          let sets = kingdoms[0].map((json: any) => DominionKingdom.fromJson(json));
          DominionKingdoms.kingdoms[SetId.PERSONAL] = sets;
          /* to  request update of kigndom-list */
          this.selectedSetId=SetId.TO_FORCE_RELOAD;
          this.selectedSetId=SetId.PERSONAL;
       };
      reader.readAsText(file);
      this.file_name = file.name;
    }
  }

  get filterOptions() {
    return [
      {display: "All Games", value: "PNP"},
      {display: "Played Games", value: "P"},
      {display: "Not played Games", value: "NP"},
    ];
  }
  get selectedFilterOption() {
    return (this.$store.state as State).showFilterPlayGames;
  }
  set selectedFilterOption(value: string) {
    this.$store.commit(UPDATE_FILTER_PLAYED_GAMES, value);
  }

  get sortOptions(){
    return [
      {display: "Set", value: SortOption.SET},
      {display: "Alphabetical", value: SortOption.ALPHABETICAL},
      {display: "Cost", value: SortOption.COST},
    ];
  }
  get selectedSortOption() {
    return (this.$store.state as State).sortSet;
  }
  set selectedSortOption(sortOption: string) {
    this.$store.commit(UPDATE_SORT_SET, sortOption);
  }
  
  FindMultipleVersionSets(setValue: string) {
    return MultipleVersionSets.filter(set => {return (set.id===setValue)})
  }
  
}
</script>

<style>

/* styles de base si JS est activé */
.js .input-file-container {
  position: relative;
  width: 225px;
}

.js .input-file-trigger {
  display: block;
  padding: 3px 22px;;
  background: #39D2B4;
  color: #fff;
  font-size: 1em;
  transition: all .4s;
  cursor: pointer;
}

.js .input-file {
  position: absolute;
  top: 0; left: 0;
  width: 225px;
  padding: 3px ;
  opacity: 0;
  cursor: pointer;
}
 
/* quelques styles d'interactions */
.js .input-file:hover + .input-file-trigger,
.js .input-file:focus + .input-file-trigger,
.js .input-file-trigger:hover {
  background: #344A5E;
  color: #39B2B4;
}

/* styles du retour visuel */
.file-return:empty {
  margin: 1.8em 0;
}

.file-return:not(:empty) {
  margin: 5px 3px;;
}

.file-return:not(:empty):before {
  content : "Selected file: ";
  font-size: 0.8em;
}
</style>