<template>
  <div class="text-overlay">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TextOverlay",
});
</script>

<style>
.text-overlay {
  background: rgba(30,30,30,0.7);
  box-sizing: border-box;
  color: #fff;
  margin: 0 auto;
  max-width: 100%;
  padding: 6px 8px;
  text-align: center;
  text-shadow: 1px 1px 4px #000;
  z-index: 2;
}
</style>