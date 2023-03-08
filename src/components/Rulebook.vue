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
import { defineComponent, computed, ref } from "vue";
// import { useStore } from "vuex";
import { getSetImageUrl, getRulebookUrl } from "../utils/resources";
// import type { Language } from "../i18n/language";
import TextOverlay from "./TextOverlay.vue";
import { i18n, getLocale } from "../i18n/i18n";
import type { I18n } from "vue-i18n";

export interface RulebookInterface {
  id: string;
  name: string;
}

export default defineComponent({
  name: "Rulebook",
  components: {
    TextOverlay,
  },
  props: {
    rulebook: { type: Object as () => RulebookInterface,
                required: true,
    },
  },
  setup(props) {
    const lang = computed (() => getLocale(i18n as I18n));
    const imageUrl = computed(() => {
      return getSetImageUrl(props.rulebook.id, lang.value);
    });

    const rulebookUrl = computed(() => {
      return getRulebookUrl(props.rulebook.id, lang.value);
    });

    return {
      imageUrl,
      rulebookUrl,
    };
  }
});
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