import * as Common from "./messages/common.fr.json";
import * as Sets from "./messages/sets.fr.json";

import * as Languages from "./messages/languages.fr.json";
import * as PageIndex from "./messages/page-index.fr.json";
import * as PageRules from "./messages/page-rules.fr.json";
import * as PageSets from "./messages/page-sets.fr.json";
import * as PageBoxes from "./messages/page-boxes.fr.json";

import * as Cards from "./messages/cards.fr.json";

/*
import * as Cards_Adventures from "./messages/cards.fr/cards.fr.adventures.json";
import * as Cards_Alchemy from "./messages/cards.fr/cards.fr.alchemy.json";
import * as Cards_Baseset from "./messages/cards.fr/cards.fr.baseset.json";
import * as Cards_Baseset2 from "./messages/cards.fr/cards.fr.baseset2.json";
import * as Cards_Cornucopia from "./messages/cards.fr/cards.fr.cornucopia.json";
import * as Cards_Darkages from "./messages/cards.fr/cards.fr.darkages.json";
import * as Cards_Empires from "./messages/cards.fr/cards.fr.empires.json";
import * as Cards_Guilds from "./messages/cards.fr/cards.fr.guilds.json";
import * as Cards_Hinterlands from "./messages/cards.fr/cards.fr.hinterlands.json";
import * as Cards_Intrigue from "./messages/cards.fr/cards.fr.intrigue.json";
import * as Cards_Intrigue2 from "./messages/cards.fr/cards.fr.intrigue2.json";
import * as Cards_Nocturne from "./messages/cards.fr/cards.fr.nocturne.json";
import * as Cards_Promos from "./messages/cards.fr/cards.fr.promos.json";
import * as Cards_Prosperity from "./messages/cards.fr/cards.fr.prosperity.json";
import * as Cards_Renaissance from "./messages/cards.fr/cards.fr.renaissance.json";
import * as Cards_Seaside from "./messages/cards.fr/cards.fr.seaside.json";
*/

export const messages = {
  ...(Common as any).default,
  ...(Sets as any).default,

  ...(Languages as any).default, 
  ...(PageIndex as any).default,
  ...(PageRules as any).default,
  ...(PageSets as any).default,
  ...(PageBoxes as any).default,

  ...(Cards as any).default,

/*
  ...(Cards_Adventures as any).default,
  ...(Cards_Alchemy as any).default,
  ...(Cards_Baseset as any).default,
  ...(Cards_Baseset2 as any).default,
  ...(Cards_Cornucopia as any).default,
  ...(Cards_Darkages as any).default,
  ...(Cards_Empires as any).default,
  ...(Cards_Guilds as any).default,
  ...(Cards_Hinterlands as any).default,
  ...(Cards_Intrigue as any).default,
  ...(Cards_Intrigue2 as any).default,
  ...(Cards_Nocturne as any).default,
  ...(Cards_Promos as any).default,
  ...(Cards_Prosperity as any).default,
  ...(Cards_Renaissance as any).default,
  ...(Cards_Seaside as any).default
*/

}
