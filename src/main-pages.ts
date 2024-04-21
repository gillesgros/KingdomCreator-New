import Index from './views/Index.vue'
import Sets from './views/Sets.vue'
import Rules from './views/Rules.vue'
import Boxes from './views/Boxes.vue'
// import Cards from './views/Cards.vue'

import { initialize } from './setup';
import { AppCreateRouterMultiple } from './router';

import '../styles/index.styl';
import '../styles/sets.styl';
import '../styles/rules.styl';
import '../styles/cards.styl';


initialize(AppCreateRouterMultiple([
                { paths: [""], component : Index },
                { paths: ["/"], component : Index },
                { paths: ["/index.html"], component : Index },
                { paths: ["/sets.html"], component : Sets },
                { paths: ["/rules.html"], component : Rules },
                { paths: ["/boxes.html"], component : Boxes },
            ]))