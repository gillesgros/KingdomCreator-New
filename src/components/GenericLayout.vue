<template>
  <div v-if="items.length">
    <div class="preset-kingdom__addon-title">{{title}}</div> 
      <GridLayout
        v-if="items.length"
        :items="items"
        :number-of-columns="genericNbColumns"
        :is-vertical="isVertical"
		:shape="shape"
      >
        <template v-slot:default="slotProps">
          <StaticCardWithSet
            :card="slotProps.item"
            :is-vertical="false"
			:showOverlay="showOverlay"
          />
        </template>
    </GridLayout>
  </div>
</template>

<script lang="ts">
import GridLayout from "./GridLayout.vue";
import StaticCardWithSet from "./StaticCardWithSet.vue";
import { Vue, Component, Prop } from "vue-property-decorator";
import { State } from "vuex-class";

@Component({
  components: {
    GridLayout,
    StaticCardWithSet,
  }
})

export default class PresetKingdom extends Vue {
  @State(state => state.window.width) readonly windowWidth!: number;
  @State(state => state.window.isEnlarged) readonly isEnlarged!: boolean;
  @Prop() readonly items!: any[];
  @Prop() readonly genericNbColumns!: number;
  @Prop() readonly isVertical!: boolean;
  @Prop() readonly shape!: string;
  @Prop() readonly showOverlay!: boolean;
  @Prop() readonly title!: string;
  
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