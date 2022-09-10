import Cards from "./views/Cards.vue";
import { store } from "./stores/sets-store";
import { initialize } from "./setup";
import { createRouter } from "./router";

initialize(createRouter(["/cards.html"], Cards), store);

