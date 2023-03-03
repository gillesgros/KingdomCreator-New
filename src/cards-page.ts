//import Cards from "./views/Cards.vue";
import Rules from "./views/Rules.vue"
import { default as store } from "./stores/sets-store";
import { initialize } from "./setup";
import { AppCreateRouter } from "./router";

/*
initialize(AppCreateRouter(["/cards.html"], Cards), store);
*/
initialize(AppCreateRouter(["/cards.html"], Rules), store);


