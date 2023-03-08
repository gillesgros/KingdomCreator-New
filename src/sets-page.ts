import Rules from "./views/Rules.vue"
import { default as store } from "./stores/sets-store";
import { initialize } from "./setup";
import { AppCreateRouter } from "./router";

initialize(AppCreateRouter(["/sets.html"], Rules), store);