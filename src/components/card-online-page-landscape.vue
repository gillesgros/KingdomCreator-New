<template>
<!-- for the Landscape cards -->
  <div class="content Coef_scale12 card-rows " >
    <div v-for="Card in Cards" :key="Card.id" :class="getClassCard(Card)">

  <!--<div class="landscape-study-window" style="width:471px;height:294px;top:341px;left:378px;"> -->
    <div class="landscape unselectable" style="left:0px; top:0px; z-index:0;transform: scale(1); cursor:">
        <div class="landscape-template" :style='"background-image: url(" + getHost() + "/img/Templates-card-type/" + getCardTypeById(Card).png + ".png);"'></div>
        <!-- type of card -->
        <div class="landscape-art" :style='"background-size: 452px 177px; background-image: url(" + Card.artwork + ")"'>
            <div class="action-layer"></div>
        </div>
        <!--Card name -->
        <div class="landscape-name-container"  :style='"top:"+ getCardNameFontSize(Card).top + "px;"'>
            <div class="landscape-name" :style='"font-size:" + getCardNameFontSize(Card).fontsize + "em;"'>
            {{ Card.frenchName }}
            </div>
        </div>

        <div class="landscape-type-rotate "  style="top:35px; ">
            <div class="landscape-name" :style="getCardTypeById(Card).style">
                {{ getCardTypeById(Card).label }}	
            </div>
        </div>
        <!---->
        <div class="landscape-cost-container-full" v-if="getCardNeedCost(Card)">
            <!---->
            <div class="landscape-coin-cost-full" v-if="((getCardCost(Card).treasure > 0 && getCardCost(Card).debt > 0)|| getCardCost(Card).debt == 0 && getCardCost(Card).treasure >= 0)" >
                <div class="coin-cost-full-text" style="top:12px;">{{ getCardCost(Card).treasure }}</div>
            </div>
            <div class="landscape-debt-cost-full" v-if="getCardCost(Card).debt > 0">
              <div class="landscape-debt-cost-full-text" style="top:12px;">{{ getCardCost(Card).debt }}</div>
            </div>
            <!---->
            <!---->
        </div>
		<!--Card Text -->
        <div class="landscape-text-container" v-html="Card.text_html"></div>

<div class="landscape-bottom-right-container-expansion" :style="ExpansionIconPosition(Card)">
  <div class="expansion-icon-bottom-full" :style='" background-image: url(" + getHost() + "/img/Templates-set/"+ getCardSetById(Card) + "-small.png);"'>
  </div>
        </div>

        <div class="full-card-border">
          <div class="card-footer landscape-card-footer illustrator" style="color:Black;">{{ getCardIllustrator(Card).illustrator }}</div>
          <div class="card-footer landscape-card-footer copyright">{{ getCardSetYear(Card) }}</div>

        </div>
        <!---->
    </div>
<!--</div>-->
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { DominionSets } from "../dominion/dominion-sets";
import { SupplyCard } from "../dominion/supply-card";
import { OtherCard } from "../dominion/other-card";
import { CardType } from "../dominion/card-type"
import { Addon } from "../dominion/addon"
import { Cost } from "../dominion/cost"
import { SetId } from "../dominion/set-id"

import { DominionSet } from "../dominion/dominion-set";

import { DigitalCard } from "../dominion/digital_cards/digital-cards-type"
import { Cards_list } from "../dominion/digital_cards/digital-cards-landscape"
import { IllustratorCard } from "../dominion/digital_cards/digital-cards-type"
import { Cards_list_Illustrator, Year_set} from "../dominion/digital_cards/digital-cards-Illustrator"

export const QuestionMarkVaue =
    new Set([ "bank",
              "philosophersstone"
]);

interface DisplayableCardType {
    readonly png: string,
    readonly label: string,
    readonly style: string
}


@Component
export default class CardOnlinePageComponent extends Vue {
  @Prop() readonly set!: DominionSet;
  @Prop() readonly items!: any[];
  @Prop() readonly numberOfColumns!: number;
  @Prop() readonly isVertical!: boolean;
  @Prop() readonly shape!: string;

  get Cards() {
    return Cards_list.filter(card => 
            this.set.supplyCards.some(function(item) { return item.shortId == card.id; }))
    .concat (
        Cards_list.filter(card => 
            this.set.otherCards.some(function(item) { return item.shortId == card.id; }))
    ).concat (
        Cards_list.filter(card => 
            this.set.boons.some(function(item) { return item.shortId == card.id; }))
    ).concat (
        Cards_list.filter(card => 
            this.set.ways.some(function(item) { return item.shortId == card.id; }))
    ).concat (
        Cards_list.filter(card => 
            this.set.events.some(function(item) { return item.shortId == card.id; }))
    ).concat (
        Cards_list.filter(card => 
            this.set.projects.some(function(item) { return item.shortId == card.id; }))
    ).concat (
        Cards_list.filter(card => 
            this.set.landmarks.some(function(item) { return item.shortId == card.id; }))
    )
  }
  
  getHost() { 
    return window.location.protocol + "//" + window.location.host; 
  }

  getClassCard(currentCard: DigitalCard) {
    return "v-for-landscape card-theme-title-dark card-theme-text-dark";
  }

  getCardTypeById(currentCard: DigitalCard):DisplayableCardType {
    let card;
    card = DominionSets.getCardById(currentCard.id);
    switch (card.constructor.name) {
      case "Event"   : { return {png: "event", label: "Événement", 
                                 style: "top:0px; left:-5px; font-size:0.7em;" }; }
      case "Project" : { return {png: "project", label: "Projet", 
                                 style: "top:-2px; left:-10px; font-size:1em;" }; }
      case "Landmark": { return {png: "landmark", label: "Repère", 
                                 style: "top:3px; left:-15px; font-size:0.9em;" }; }
      case "Boon"    : { return {png: "boon", label: "Aubaine", 
                                 style: "top:-2px; left:-8px; font-size:0.9em;" }; }
      case "Way"     : { return {png: "way", label: "Voie", 
                                 style: "top:3px; left:-15px; font-size:1.2em;" }; }
      case "OtherCard" : {
        card = card as OtherCard;
        switch(card.type) { 
          case "Hexes": { return {png: "hex", label: "Sortilège", 
                                 style: "top:1px; left:-6px; font-size:0.75em;" }; }
          case "States": { return {png: "state", label: "État", 
                                 style: "top:5px; left:-18px; font-size:1.1em;" }; }
          case "Heirlooms": { return {png: "heirloom", label: "Patrimoine", 
                                 style: "top:3px; left:-15px; font-size:0.9em;" }; }
          case "Artifacts": { return {png: "artifact", label: "Artefact", 
                                 style: "top:-2px; left:-8px; font-size:0.85em;" }; }
          default: { return {png: 'error-no valid card type', label: 'error-no valid card type', 
                                 style: '' }; }
        }
      }
    }
    return {png: 'error-no valid card type', label: 'error-no valid card type', style: '' }; 
  }

  getisTreasureCard(currentCard: DigitalCard) {
    let card;
    card = DominionSets.getCardById(currentCard.id);
    if (card.constructor.name == "SupplyCard") {
      card = card as SupplyCard;
      return card.isOfType(CardType.TREASURE);
    }
    if (card.constructor.name == "OtherCard") {
      return false;
    }
      return false;
  }

  getValueforTreasureCard(currentCard: DigitalCard) {
    let pattern = '<div class="card-text-coin-text" style="color: black; display:inline; top:8px;">';
    if ( QuestionMarkVaue.has(currentCard.id)) { return "?"; }
    let valuePosition = currentCard.text_html.indexOf(pattern)
    if (valuePosition == -1) { return "?"; }
    return currentCard.text_html.charAt(currentCard.text_html.indexOf(pattern) + pattern.length);
  }

  getCardNeedCost(currentCard: DigitalCard) {
    let card;
    card = DominionSets.getCardById(currentCard.id);
	//console.log(currentCard.id + " :: " + card.constructor.name);
    if (card.constructor.name == "Boon" || 
        card.constructor.name == "Landmark" || 
        card.constructor.name == "OtherCard" || 
        card.constructor.name == "Way") {
      return false;
    }
    return true;
  }

  getCardCost(currentCard: DigitalCard) {
    let card;
    card = DominionSets.getCardById(currentCard.id);
    if (card.constructor.name == "Boon" || card.constructor.name == "OtherCard") {
      return ({treasure: 0,
            potion: 0,
            debt: 0} as Cost);
    }
    card = card as Addon
    return card.cost
  }

  getCardNameFontSize(currentCard: DigitalCard) {
    let isTreasure = false
    let card = DominionSets.getCardById(currentCard.id);
    if (card.constructor.name == "SupplyCard") {
      if ((card as SupplyCard).isOfType(CardType.TREASURE)) { isTreasure=true; }
    }
    if ( card.constructor.name == "Wayx" ) {
      return {top: 7, fontsize: 1};
    }
    if (isTreasure) {
      if ((currentCard.frenchName).length >=19 ) { return {top: 22, fontsize: 0.97}; } /* 17 */
      if ((currentCard.frenchName).length >=18 ) { return {top: 21, fontsize: 1.08}; } /* 18 */
      if ((currentCard.frenchName).length >=16 ) { return {top: 20, fontsize: 1.16}; } /* 16 */
      if ((currentCard.frenchName).length >=14 ) { return {top: 20, fontsize: 1.2}; } /* 16 */
      if ((currentCard.frenchName).length >=8  ) { return {top: 18, fontsize: 1.5}; } /* 11 */
                                                   return {top: 16, fontsize: 1.8}; /* >= 6 */
    }
    if ((currentCard.frenchName).length >= 20 ) { return {top: 7, fontsize: 1}; }
    if ((currentCard.frenchName).length >= 17 ) { return {top: 7, fontsize: 1}; } /* 17 */
    if ((currentCard.frenchName).length >= 14 ) { return {top: 6, fontsize: 1.2}; } /* 14 */
    if ((currentCard.frenchName).length >= 13 ) { return {top: 4, fontsize: 1.3}; } /* 13 */
                                                  return {top: 4, fontsize: 1.4};  /* >= 12 */
  }

  getCardSetById(currentCard: DigitalCard) {
    return DominionSets.getCardById(currentCard.id).setId; 
  }

  getCardById(currentCard: DigitalCard,) {
    return (DominionSets.getCardById(currentCard.id) as SupplyCard);
  }

  getCardTypeFontSize(currentCard: DigitalCard) {
    var typeOfCard = this.getCardTypeById(currentCard).label
    if (typeOfCard.length >= 16 ) { return "font-size: 2.8em;   top:35px;"; }
    if (typeOfCard.length >= 14 ) { return "font-size: 3.125em; top:30px;"; }
                                    return "font-size: 4.2em;   top:20px;"; 
  }

  ExpansionIconPosition(currentCard: DigitalCard) {
    let CardSetid = this.getCardSetById(currentCard);
    switch (CardSetid) {
      case SetId.ADVENTURES : return " right: -32px; bottom: -74px; " /* from style */
      case SetId.RENAISSANCE : return " right: -32px; bottom: -74px; " /* from style */
      case SetId.EMPIRES : return " right: -34px; bottom: -78px; "
      case SetId.NOCTURNE : return " right: -37px; bottom: -72px; "
      case SetId.PROMOS : return " right: -34px; bottom: -74px; "
      case SetId.MENAGERIE : return " right: -36px; bottom: -24px; "

      default: { return ""; }
    }
  }

  getCardIllustrator(currentCard: DigitalCard):IllustratorCard {
    let returned_value = Cards_list_Illustrator.find(elt=> elt.id==currentCard.id) as IllustratorCard;
    if (typeof returned_value == "undefined") { return { id:"adventurer", illustrator:"" }}    
    return returned_value
  }

  getCardSetYear(currentCard: DigitalCard) {
    let CardSetid = this.getCardSetById(currentCard);
    if (CardSetid == SetId.PROMOS) {
      switch (currentCard.id) {
        case "envoy": return 2008;
        case "blackmarket": return 2009;
        case "stash": return 2010;
        case "walledvillage": return 2011;
        case "governor": return 2011;
        case "prince": return 2014;
        case "summon": return 2015;
        case "sauna": return 2016;
        case "avanto": return 2016;
        case "saunaavanto": return 2016;
        case "dismantle": return 2017;
        case "chruch": return 2019;
        case "captain": return 2019;
        default: { return ""; }
      }
    }
    return (Year_set.find(elt=> elt.id==CardSetid))!.year;
  }

}
</script>



