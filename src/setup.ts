import { createApp } from "vue";
import { Router } from "vue-router";
import { UPDATE_WINDOW_WIDTH } from "./stores/window/mutation-types";
import { Store } from "vuex";
import { I18n } from "./i18n/i18n";

export function initialize<S>(router: Router, store: Store<S>) {
  initializeWindowListener(store);
  const app = createApp({
    template: "<router-view></router-view>"
  });
  app.use(router);
  app.use(store);
  app.use(I18n.getInstance());
  app.mount('#app');
  //app.use("<router-view></router-view>");
  //configureCompat({
    // default everything to Vue 2 behavior
  //  MODE: 2,
  //});
};

function initializeWindowListener<S>(store: Store<S>) {
  window.addEventListener("resize", () => {
    updateWindowSize(store);
  });
  updateWindowSize(store);
}

function updateWindowSize<S>(store: Store<S>) {
  store.commit(UPDATE_WINDOW_WIDTH, window.outerWidth);
}
