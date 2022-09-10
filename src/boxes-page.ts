import Boxes from "./views/Boxes.vue";
import { store } from "./stores/sets-store";
import { initialize } from "./setup";
import { createRouter } from "./router";

initialize(createRouter(["/boxes.html"], Boxes), store);
