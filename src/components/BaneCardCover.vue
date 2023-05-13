<template>
  <div :class="cardCover" class="card-cover">
    <div class="card-cover-div">
      <div :class="cardCoverText" class="card-cover-text">
        {{ $t(isType) }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* import Vue, typescript */
import { defineComponent, computed, onMounted } from "vue";
import gsap, { Sine } from "gsap";

/* import Dominion Objects and type*/
/* import store  */
/* import Components */

const ANIMATION_DURATION_SEC = 0.6;
const WINDOW_RESIZE_DELAY_MSEC = 300;

export default defineComponent({
  name: "BaneCardCover",
  props: {
    isType: {
      type: String,
      required: true,
    },
  },
  setup(props: { isType: string; }) {
    const cardCover = computed(() => {
      return props.isType.toLowerCase() + "-color"
    });

    const cardCoverText = computed(() => {
      return props.isType.toLowerCase() + "-color-text"
    });

    // onMounted(() =>{
    //     const element = document.querySelectorAll(".card-cover")[0].firstElementChild!
    //     const activeAnimation =
    //       gsap.to(element, {
    //         duration: ANIMATION_DURATION_SEC,
    //         // rotation: 33,
    //         scale: 1,
    //         // x: 133, // just use x/y instead of transform because they're faster and more clear
    //         y:  0,// transform because they're faster and more clear
    //         ease: Sine.easeInOut,
    //         onComplete: function () {
    //           activeAnimation.kill
    //           return;
    //         }});
    // });


    return {
      cardCover,
      cardCoverText
    }
  }
})
</script>

<style>

.card-cover {
  width: 100%;
  height: 100%;
  position: absolute;
  box-sizing: border-box;
  /* display: flex; */
}

.bane-color {
  border: 8px solid #b78eca
    /* curse-color */
  ;
}

.obelisk-color {
  border: 8px solid #7db68d
    /* landmark-color */
  ;
}

.card-cover-div {
  position:inherit;
  display: flex;
  transform: rotate(+0.75turn);
  align-self: flex-end;
  right: 0%;
  flex-direction: column-reverse;
  bottom:10%;
}
.bane_div{
  bottom: 10%;
}
.obelisk_div{
  bottom: 20%;
}

.card-cover-text {
  position: absolute;
  padding: 6px 12px;
}

.bane-color-text {
  color: white;
  background: #b78eca
    /* curse-color */
  ;

}

.obelisk-color-text {
  color: black;
  background: #7db68d
    /* Landmark-color */
  ;
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