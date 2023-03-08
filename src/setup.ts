import { createApp } from "vue";
import { UPDATE_WINDOW_WIDTH } from "./stores/window/mutation-types";
import type { Store } from "vuex";

import { i18n } from "./i18n/i18n";
import type { Router } from "vue-router";

export function initialize<S>(router: Router, store: Store<S>) {
  initializeWindowListener(store);
  const app = createApp({
    template: `
      <div id="app">
        <router-view></router-view>
      </div>
    `
  });
  app.use(i18n);
  app.use(router);
  app.use(store);
  app.mount('#app');
};

function initializeWindowListener<S>(store: Store<S>) {
  window.addEventListener("resize", () => {
    updateWindowSize(store);
  });
  updateWindowSize(store);   
};

function updateWindowSize<S>(store: Store<S>) {
  store.commit(UPDATE_WINDOW_WIDTH, window.outerWidth);
};
