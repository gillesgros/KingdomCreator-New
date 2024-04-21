import type { Locale } from "vue-i18n";
import { Language } from "../i18n/language";

const IMAGE_PREFEX = "/img/cards";
const BOXES_IMAGE_PREFEX = "/img/boxes";
const RULE_PDF_PREFEX = "/rules";
const PNG_SET_IMAGES = new Set(["alchemy", "cornucopia", "guilds"]);

export function getCardImageUrl(cardId: string, language: Language) {
  const SetName = cardId.split('_',2);
  const cardName = cardId.replace(SetName[0]+'_','')

  switch (language) {
    case Language.FRENCH:
      return `${IMAGE_PREFEX}.${language}/${SetName[0]}/${cardName}.jpg`;
    default:
      return `${IMAGE_PREFEX}/${SetName[0]}/${SetName[0]}_${cardName}.jpg`;
  }
}


export function getSetImageUrl(setId: string, language: Locale) {
  const ext = PNG_SET_IMAGES.has(setId) ? "png" : "jpg";
  switch (language) {
    case Language.FRENCH:
      return `${BOXES_IMAGE_PREFEX}.${language}/${setId}.${ext}`;
    default: 
      return `${BOXES_IMAGE_PREFEX}/${setId}.${ext}`;
  }
}

export function getRulebookUrl(setId: string, language: Locale) {
    switch (language) {
    case Language.FRENCH:
      return `${RULE_PDF_PREFEX}.${language}/${setId}.pdf`;
    default: 
      return `${RULE_PDF_PREFEX}/${setId}.pdf`;
  }
}

export function ChangeCss(selector:string, property: string, value:string) {
    for (let i=0; i<document.styleSheets.length;i++) {//Loop through all styles
      //Try add rule
      try { document.styleSheets[i].insertRule(selector+ ' {'+property+':'+value+'}', document.styleSheets[i].cssRules.length);
      } catch(err) {
        try { document.styleSheets[i].addRule(selector, property+':'+value);
        } catch(err) { 
          // console.log("do nothing")
        }
      }//IE
    }
}

export function incaseofImgerror(ev:any) {
  const imgsrc = ev.target.src;
  let First_try = false

  const indextoInsert = imgsrc.lastIndexOf('/'); 
  // /img/cards.fr/baseset2*/artisan.jpg or 
  // /img/cards/baseset2*/basetset2_artisan.jpg
  let indexforSetinCardName = (imgsrc.slice(indextoInsert)).indexOf('_'); 
  if (indexforSetinCardName == -1) indexforSetinCardName = 0

  const indexLang = (imgsrc.slice(0,indextoInsert)).lastIndexOf('/');
  let isLangEN= true

  if (imgsrc.slice(indexLang-3, indexLang-2)== ".") isLangEN= false
  const lastletter = imgsrc.slice(indextoInsert -1,indextoInsert)
  const last4letters = imgsrc.slice(indextoInsert -4,indextoInsert)

  if (ev.target.imgUrl == undefined) {
    First_try = true
    ev.target.imgUrl = ev.target.src
	// console.log("First_try undefined: " + First_try + " ## lastletter: "+ lastletter + " ## last4letters: " + last4letters)

  } else if (ev.target.imgUrl != ev.target.src) {
    First_try = false
    ev.target.imgUrl = ev.target.src
    // console.log("First_try equal: " + First_try + " ## lastletter: "+ lastletter + " ## last4letters: " + last4letters)

  } else {
    // console.log("First_try: " + First_try + " ## lastletter: "+ lastletter + " ## last4letters: " + last4letters)
  }
  let construct_URL=""
  
/*
  last4letters=="2add"
    si not en
      switching to en
  lastletter == "2"
    si First_try
      switching 1 st ed
        gestion selon lang
    si pas First_try
      switching 2 nd ed updatepack
        gestion selon lang
  sinon
    switching 2nd ed
      gestion selon lang
*/

//  switch (finalphrase)


  if (last4letters=="2add") {
    if (!isLangEN) {
      // switching to english need to add setname
      construct_URL = imgsrc.slice(0,indexLang-3)+ imgsrc.slice(indexLang,indextoInsert-4)
          + imgsrc.slice(indexLang,indextoInsert-4) + '_' +imgsrc.slice(indextoInsert+1)
      ev.target.src = construct_URL
    }
  } else if (lastletter == "2") {
    if (First_try) {
      if (isLangEN) { // remove 2
        construct_URL = imgsrc.slice(0,indextoInsert-1) + imgsrc.slice(indexLang,indextoInsert-1) 
            +imgsrc.slice(indextoInsert+ indexforSetinCardName)
        ev.target.src = construct_URL
      } else {
        construct_URL = imgsrc.slice(0,indextoInsert-1) + imgsrc.slice(indextoInsert)
        ev.target.src = construct_URL
      }
    } else { // add 2add
      if (isLangEN) { // add 2add in setname 2 times
        construct_URL = imgsrc.slice(0,indextoInsert) + "add" + imgsrc.slice(indexLang,indextoInsert) 
            + 'add_' +imgsrc.slice(indextoInsert+ indexforSetinCardName+1)
        ev.target.src = construct_URL

      } else {
        construct_URL = imgsrc.slice(0,indextoInsert) + "add" + imgsrc.slice(indextoInsert)
        ev.target.src = construct_URL
      }
    }
  } else {
    // add 2 
    if (isLangEN) { // add 2 in setname 2 times
      construct_URL = imgsrc.slice(0,indextoInsert) + "2" +
           imgsrc.slice(indexLang,indextoInsert) + '2_' + imgsrc.slice(indextoInsert+ indexforSetinCardName+1)
      ev.target.src = construct_URL
    } else {
      construct_URL = imgsrc.slice(0,indextoInsert) + "2" + imgsrc.slice(indextoInsert)
      ev.target.src = construct_URL
    }
  }
}


