<template>
  <div :class="cardCover" class="card-cover">  <div class="card-cover-div">
    <div :class="cardCoverText" class="card-cover-text">
      {{ $t(this.isType) }}
    </div> </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class BaneCardCover extends Vue {
  @Prop() readonly isType!: string;
  
  get cardCover() {
    return this.isType.toLowerCase() + "-color"
  }
  
  get cardCoverText() {
    return this.isType.toLowerCase() + "-color-text"
  }
}
</script>

<style>
.bane-card-cover {
  width: 100%;
  height: 100%;
  position: absolute;
  box-sizing: border-box;
  border: 5px solid #b78eca /* curse-color */;
}

.bane-card-cover-text {
  transform: rotate(0.75turn);
  color: white;
  background: #b78eca /* curse-color */;
  position: absolute;
  bottom: 9px;
  right: -17px;
  padding: 6px 12px;
}

.card-cover {
  width: 100%;
  height: 100%;
  position: absolute;
  box-sizing: border-box;
}
.bane-color {
  border: 5px solid #b78eca /* curse-color */;
}
.obelisk-color {
  border: 5px solid #55AC6A /* curse-color */;
}

.card-cover-div {
  position : relative;
  transform: rotate(0.75turn);
  bottom: -71%;
  right: -35%;
}

.card-cover-text {
  position: absolute;
  padding: 6px 12px;
}
.bane-color-text {
  color: white;
  background: #b78eca /* curse-color */;

}
.obelisk-color-text {
  color: black;
  background: #55AC6A /* curse-color */;
}

@media (max-width: 600px) {
  .card-cover {
    border-width: 3px;
  }
    
  .card-cover-text {
    font-size: 12px;
    right: -13px;
  }
}
</style>