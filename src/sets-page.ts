import Sets from './views/Sets.vue'
import { initialize } from './setup';
import { AppCreateRouter } from './router';

import '../styles/sets.styl';

initialize(AppCreateRouter(["/sets.html"], Sets));
