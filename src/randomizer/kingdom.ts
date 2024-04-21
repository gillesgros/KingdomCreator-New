import type { Boon } from "../dominion/boon";
import type { Event } from "../dominion/event";
import type { Landmark } from "../dominion/landmark";
import type { Project } from "../dominion/project";
import type { Way } from "../dominion/way";
import type { Ally } from "../dominion/ally";
import type { Trait } from "../dominion/trait";
import { Supply } from "../randomizer/supply";

export class Kingdom {
  constructor(
    readonly id: number,
    readonly supply: Supply,
    readonly events: Event[],
    readonly landmarks: Landmark[],
    readonly projects: Project[],
    readonly ways: Way[],
    readonly boons: Boon[],
    readonly ally: Ally | null,
    readonly traits: Trait[],
    readonly metadata: Metadata) {
  }

  static empty() {
    return new Kingdom(
      0,                /* id: number,  */
      Supply.empty(),   /* supply: Supply, */
      [],               /* events: Event[], */
      [],               /* landmarks: Landmark[], */
      [],               /* projects: Project[], */
      [],               /* ways: Way[], */
      [],               /* boons: Boon[], */
      null,             /* allies: Ally|null, */
      [],               /* traits: Trait[]*/
      new Metadata(false, false));   /* metadata: Metadata */
  }
}

export class Metadata {
  constructor(
    readonly useColonies: boolean,
    readonly useShelters: boolean) {
  }
}

