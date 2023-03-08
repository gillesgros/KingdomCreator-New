import Index from "./views/Index.vue"
import { default as store } from "./stores/sets-store";
import { initialize } from "./setup";
import { AppCreateRouter } from "./router";

initialize(AppCreateRouter(["/"], Index), store);