import { createApp } from "vue";
import { Router } from "vue-router";
import { UPDATE_WINDOW_WIDTH } from "./stores/window/mutation-types";
import { Store } from "vuex";
import { I18n } from "./i18n/i18n";
import App from "./views/Rules.vue";


export function initialize<S>(router: Router, store: Store<S>) {
  initializeWindowListener(store);
  const app = createApp(App);
  app.use(router);
  app.use(store);
  app.use(I18n.getInstance());
  app.mount('#app');
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
