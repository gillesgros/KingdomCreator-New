import Boxes from './views/Boxes.vue'
import { initialize } from './setup';
import { AppCreateRouter } from './router';

import '../styles/sets.styl';

initialize(AppCreateRouter(["/boxes.html"], Boxes));
