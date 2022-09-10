<template>
  <a class="rulebook" target="_rulebookDominion" :href="rulebookUrl">
    <img class="rulebook__img" :src="imageUrl" />
    <TextOverlay>
      <span class="rulebook__overlay" :class="rulebook.id">
        {{ rulebook.name }}
      </span>
    </TextOverlay>
  </a>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { State } from "vuex-class";
import { getSetImageUrl, getRulebookUrl } from "../utils/resources";
import { Language } from "../i18n/language";
import TextOverlay from "./TextOverlay.vue";

export interface RulebookInterface {
  id: string;
  name: string;
}

@Component({
  components: {
    TextOverlay,
  }
})


export default class Rulebook extends Vue {
  @Prop() readonly rulebook!: RulebookInterface;
  @State(state => state.i18n.language) readonly language!: Language;
  
  get imageUrl() {
    return getSetImageUrl(this.rulebook.id, this.language);
  }

  get rulebookUrl() {
    return getRulebookUrl(this.rulebook.id, this.language);
  }
}
</script>

<style>
.rulebook {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-decoration: none;
}
.rulebook,
.rulebook__img {
  height: 100%;
  pointer-events: all;
  position: absolute;
  top: 0;
  width: 100%;
  object-fit: contain;
}

.rulebook__overlay {
  font-size: 15px;
  text-decoration: none;
}

@media (max-width: 600px) {
  .rulebook__overlay {
    font-size: 12px;
  }
}  
</style>