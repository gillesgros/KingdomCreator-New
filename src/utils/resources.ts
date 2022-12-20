import { Language } from "../i18n/language";

const IMAGE_PREFEX = "/img/cards";
const BOXES_IMAGE_PREFEX = "/img/boxes";
const RULE_PDF_PREFEX = "/rules";
const PNG_SET_IMAGES = new Set(["alchemy", "cornucopia", "guilds"]);

export function getCardImageUrl(cardId: string, language: Language) {
  let SetName = cardId.split('_',2);
  let cardName = cardId.replace(SetName[0]+'_','')

  switch (language) {
    case Language.FRENCH:
	  return `${IMAGE_PREFEX}.${language}/${SetName[0]}/${cardName}.jpg`;
    default:
      return `${IMAGE_PREFEX}/${SetName[0]}/${SetName[0]}_${cardName}.jpg`;
  }
}


export function getSetImageUrl(setId: string, language: Language) {
  const ext = PNG_SET_IMAGES.has(setId) ? "png" : "jpg";
  switch (language) {
    case Language.FRENCH:
      return `${BOXES_IMAGE_PREFEX}.${language}/${setId}.${ext}`;
    default: 
      return `${BOXES_IMAGE_PREFEX}/${setId}.${ext}`;
  }
}

export function getRulebookUrl(setId: string, language: Language) {
    switch (language) {
    case Language.FRENCH:
      return `${RULE_PDF_PREFEX}.${language}/${setId}.pdf`;
    default: 
      return `${RULE_PDF_PREFEX}/${setId}.pdf`;
  }
}

export function ChangeCss(selector:string, property: string, value:string) {
    for (var i=0; i<document.styleSheets.length;i++) {//Loop through all styles
        //Try add rule
        try { document.styleSheets[i].insertRule(selector+ ' {'+property+':'+value+'}', document.styleSheets[i].cssRules.length);
        } catch(err) {try { document.styleSheets[i].addRule(selector, property+':'+value);} catch(err) {}}//IE
    }
}

export function incaseofImgerror(ev:any) {
	let imgsrc = ev.target.src;
//console.log('imgsrc: ' + imgsrc)
//console.log('imgURL: ' + ev.target.imgUrl)
	let First_try = false
	if (ev.target.imgUrl == undefined) {
		First_try = true
		ev.target.imgUrl = ev.target.src
	}

	let indextoInsert = imgsrc.lastIndexOf('/'); 
	// /img/cards.fr/baseset2*/artisan.jpg or 
	// /img/cards/baseset2*/basetset2_artisan.jpg
	let indexforSetinCardName = (imgsrc.slice(indextoInsert)).indexOf('_'); 
	if (indexforSetinCardName == -1) indexforSetinCardName = 0

	let indexLang = (imgsrc.slice(0,indextoInsert)).lastIndexOf('/');
	let isLangEN= true

	if (imgsrc.slice(indexLang-3, indexLang-2)== ".") isLangEN= false
	let lastletter = imgsrc.slice(indextoInsert -1,indextoInsert)
	let last4letters = imgsrc.slice(indextoInsert -4,indextoInsert)

	let construct_URL=""

	if (last4letters=="2add") {
		if (!isLangEN) {
			// switching to english need to add setname
			construct_URL = imgsrc.slice(0,indexLang-3)+ imgsrc.slice(indexLang,indextoInsert-4)
					+ imgsrc.slice(indexLang,indextoInsert-4) + '_' +imgsrc.slice(indextoInsert+1)
			//console.log('// switching to english need to add setname')
			//console.log(construct_URL)
			ev.target.src = construct_URL
		}
	} else if (lastletter == "2") {
		//console.log('// try 2add if it is not the first try')
		if (First_try) {
			// if First try remove 2
			if (isLangEN) { // remove 2
				construct_URL = imgsrc.slice(0,indextoInsert-1) + imgsrc.slice(indexLang,indextoInsert-1) 
						+imgsrc.slice(indextoInsert+ indexforSetinCardName)
				//console.log(construct_URL)
				ev.target.src = construct_URL
			} else {
				construct_URL = imgsrc.slice(0,indextoInsert-1) + imgsrc.slice(indextoInsert)
				//console.log(construct_URL)
				ev.target.src = construct_URL
			}
		} else { // add 2add
			if (isLangEN) { // add 2add in setname 2 times
				construct_URL = imgsrc.slice(0,indextoInsert) + "add" + imgsrc.slice(indexLang,indextoInsert) 
						+ 'add_' +imgsrc.slice(indextoInsert+ indexforSetinCardName+1)
				//console.log(construct_URL)
				ev.target.src = construct_URL

			} else {
				construct_URL = imgsrc.slice(0,indextoInsert) + "add" + imgsrc.slice(indextoInsert)
				//console.log(construct_URL)
				ev.target.src = construct_URL
			}
		}
	} else {
		// add 2 
		if (isLangEN) { // add 2 in setname 2 times
			construct_URL = imgsrc.slice(0,indextoInsert) + "2" +
					 imgsrc.slice(indexLang,indextoInsert) + '2_' + imgsrc.slice(indextoInsert+ indexforSetinCardName+1)
			//console.log(construct_URL)
			ev.target.src = construct_URL
		} else {
			construct_URL = imgsrc.slice(0,indextoInsert) + "2" + imgsrc.slice(indextoInsert)
			//console.log(construct_URL)
			ev.target.src = construct_URL
		}
	}
	//console.log("===============")
}
export function incaseofImgerrorold(ev:any) {
	let imgsrc = ev.target.src;
	let indextoInsert = imgsrc.lastIndexOf('/'); 
	// /img/cards.fr/baseset2*/*artisan.jpg or 
	// /img/cards/baseset2*/*basetset2_artisan.jpg
	let indexforSetinCardName = (imgsrc.slice(indextoInsert)).indexOf('_'); 
	if (indexforSetinCardName == -1) indexforSetinCardName = 0
	// /img/cards/baseset2/basetset2_*artisan.jpg
	// /img/cards.fr/baseset2/*artisan.jpg
	let indexLang = (imgsrc.slice(0,indextoInsert-1)).lastIndexOf('/');
	if (imgsrc.slice(indexLang-3, indexLang-2)== ".") indexforSetinCardName = 0
	// 
	let lastletter = imgsrc.slice(indextoInsert + indexforSetinCardName -1,indextoInsert + indexforSetinCardName)
	//let last4letters = imgsrc.slice(indextoInsert + indexforSetinCardName -1,indextoInsert + indexforSetinCardName)
	console.log('imgsrc: ' + imgsrc)
	console.log(ev.target.imgUrl)
	console.log('imgsrc.slice: ' + imgsrc.slice(indextoInsert + indexforSetinCardName -1,indextoInsert + indexforSetinCardName))
	/* try in order 
		not found 2 and it is not 2add 
			try removing lang 1st 2 2add
	*/
	
	if (lastletter=="2") {
		console.log('found 2: removing it')
		ev.target.src = imgsrc.slice(0,indextoInsert-1)+ imgsrc.slice(indextoInsert,indextoInsert + indexforSetinCardName -1) + imgsrc.slice(indextoInsert + indexforSetinCardName)
		return
	}
    if (ev.target.imgUrl == undefined) {
		/* backup original URL */
	  // test in removing 1 character if character is 2
	  //  to try 2nd edition to 1st edition.
	 /*
      console.log("error loading " + imgsrc + " - loading " + 
          imgsrc.slice(0,indextoInsert-1)+ imgsrc.slice(indextoInsert,indextoInsert + indexforSetinCardName -1) + imgsrc.slice(indextoInsert + indexforSetinCardName))
        console.log(" - loading " + imgsrc.slice(indextoInsert,indextoInsert+indexforSetinCardName -1))
        console.log("- loading " +  imgsrc.slice(indextoInsert + indexforSetinCardName))
     */
	 
      ev.target.imgUrl =    imgsrc.slice(0,indextoInsert-1)+ imgsrc.slice(indextoInsert,indextoInsert + indexforSetinCardName -1) + imgsrc.slice(indextoInsert + indexforSetinCardName)
      ev.target.src = ev.target.imgUrl
    } else {
	  // test if is 2dd (2nd edition update pack
	  // to try it (adding 2add
	  if ((imgsrc.slice(0,indextoInsert)).includes('2add') == false) {
		let setreplaced = ""
	    if (indexforSetinCardName !=0) {
			//console.log("error loading round 2 " + imgsrc + " - loading " + imgsrc.slice(0,indextoInsert)+ '2add' +  imgsrc.slice(indexforSetinCardName))
			setreplaced = imgsrc.slice(indextoInsert,indextoInsert + indexforSetinCardName)+ '2add'
		}
/*
		console.log("error loading round 2 " + imgsrc + " - loading " + imgsrc.slice(0,indextoInsert)+ '2add' + setreplaced +  
					imgsrc.slice(indexforSetinCardName + indextoInsert))
*/
		ev.target.imgUrl = imgsrc.slice(0,indextoInsert)+ '2add'+ setreplaced +  imgsrc.slice(indexforSetinCardName + indextoInsert)
        ev.target.src = ev.target.imgUrl
	  }
	}
  }

