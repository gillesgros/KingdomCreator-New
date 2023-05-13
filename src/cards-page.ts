import Cards from "./views/Cards.vue"
import { initialize } from "./setup";
import { AppCreateRouter } from "./router";

import '../styles/cards.styl';

initialize(AppCreateRouter(["/cards.html"], Cards));