import type {Card} from "./card"
import type {Cost} from "./cost"

export interface Addon extends Card {
  readonly name: string;
  readonly cost: Cost;
}
