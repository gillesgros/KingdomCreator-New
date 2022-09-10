<template>
  <div class="static-card" :class="{isVertical: isVertical}">
    <img class="static-card__img" :src="cardImageUrl" :key="cardImageUrl" @error="incaseoferror"/>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { incaseofImgerror } from "../utils/resources";

@Component
export default class StaticCard extends Vue {
  @Prop() readonly cardImageUrl!: string | null;
  @Prop() readonly isVertical!: boolean;
  
  incaseoferror (ev:any) {
    incaseofImgerror(ev);
  }
}
</script>

<style>
.static-card {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.static-card,
.static-card__img {
  height: 100%;
  position: absolute;
  top: 0;
  width: 100%;
}
</style>