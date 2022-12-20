<template>
  <button
    class="fullscreen-button"
    :class="{ 'fullscreen-button--has-copied': IsFullScreen }"
    @click="handleClick"
  >
    <input ref="textInputfull" class="fullscreen-button__input" type="text" :value="textfull" readonly />
    <div class="fullscreen-button__icon">
      <svg v-if="	IsFullScreen" height="24" width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M15 2h2v5h7v2h-9v-7zm9 13v2h-7v5h-2v-7h9zm-15 7h-2v-5h-7v-2h9v7zm-9-13v-2h7v-5h2v7h-9z"/>
      </svg>
      <svg v-else height="32" width="32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M1 1v6h2V3h4V1H1zm2 12H1v6h6v-2H3v-4zm14 4h-4v2h6v-6h-2v4zm0-16h-4v2h4v4h2V1h-2z"/>
      </svg>
    </div>
    <transition name="fade-slide-in">
      <div v-if="IsFullScreen" class="fullscreen-button__copied">
        FullScreen!
      </div>
    </transition>
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { State } from "vuex-class";
import { ChangeCss } from "../utils/resources";
import { UPDATE_FULLSCREEN_RANDOMIZER } from "../stores/randomizer/mutation-types";


@Component
export default class FullScreenButton extends Vue {
  @State(state => state.randomizer.isFullScreen) HasFullScreenRequested!: boolean;
  @Prop() readonly textfull!: string; 

  get IsFullScreen() {
    return Boolean(this.HasFullScreenRequested);
  }


  handleClick() {
  console.log("in handleClick")
  
    if (this.HasFullScreenRequested == false ) {
    this.$store.commit(UPDATE_FULLSCREEN_RANDOMIZER, true);
      ChangeCss('.content .sidebar', 'display', 'none');
      ChangeCss('.content', 'max-width', 'unset');
      ChangeCss('.content .main', 'margin-right', 'unset');
    } else {
    this.$store.commit(UPDATE_FULLSCREEN_RANDOMIZER, false);
      ChangeCss('.content .sidebar', 'display', 'unset');
      ChangeCss('.content', 'max-width', '1450px');
      ChangeCss('.content .main', 'margin-right', '255px');
    }
  }

}
</script>


<style>
.fullscreen-button {
  -webkit-appearance: none;
  border: none;
  //display: block;
  height: 30px;
  outline: none;
  padding: 0;
  position: relative;
  width: 30px;
  
}

.fullscreen-button__icon {
  border: none;
  height: 100%;
  left: 0;
  outline: none;
  position: absolute;
  top: 0;
  width: 100%;
}

.fullscreen-button__input {
  overflow: hidden;
  position: absolute;
  top: -999999px;
  width: 100%;
}

.fullscreen-button__icon {
  background: #fff; 
  box-sizing: border-box;
  padding: 3px;
  z-index: 1;
}

.fullscreen-button--has-copied svg {
  fill: #02779e;
}

.fullscreen-button__copied {
  background: #02779e;
  border-radius: 4px;
  border: 1px solid #02779e;
  color: #fff;
  font-size: 12px;
  left: 36px;
  padding: 3px 5px;
  position: absolute;
  top: 4px;
}

.fullscreen-button__copied::before {
  border-bottom: 5px solid transparent;
  border-right: 4px solid #02779e;
  border-top: 5px solid transparent;
  content: '';
  height: 0;
  left: -4px;
  position: absolute;
  top: 5px;
  width: 0;
}
</style>