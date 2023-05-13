import { createApp } from "vue";
import { i18n } from "./i18n/i18n";
import type { Router } from "vue-router";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { useWindowStore } from "./pinia/window-store";
// import gsap from "gsap";

export function initialize<S>(router: Router) {
  const app = createApp({
    template: `
      <div id="app">
        <router-view></router-view>
      </div>
    `
  });

  app.use(i18n);
  app.use(router);
  console.log(router)
  app.use(createPinia().use(piniaPluginPersistedstate));
  initializeWindowListener();
  app.mount('#app');
};

function initializeWindowListener () {
  window.addEventListener("resize", () => {
    updateWindowSize();
  });
  updateWindowSize();   
};

function updateWindowSize () {
  const WindowStore = useWindowStore();
  WindowStore.updateWindowWidth(window.outerWidth);
};
