//import Index from "./views/Index.vue";
import Rules from "./views/Rules.vue"
import { default as store } from "./stores/sets-store";
import { initialize } from "./setup";
import { AppCreateRouter } from "./router";

/*
initialize(AppCreateRouter(["/index.html"], Index), store);
*/
initialize(AppCreateRouter(["/index.html"], Rules), store);
