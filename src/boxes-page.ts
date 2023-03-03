//import Boxes from "./views/Boxes.vue";
import Rules from "./views/Rules.vue"
import { default as store } from "./stores/sets-store";
import { initialize } from "./setup";
import { AppCreateRouter } from "./router";

/*
initialize(AppCreateRouter(["/boxes.html"], Boxes), store);
*/
initialize(AppCreateRouter(["/boxes.html"], Rules), store);

