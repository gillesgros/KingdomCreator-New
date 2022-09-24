import { DigitalCard } from "./digital-cards-type"
/*
FrenchCardTexts[CardNames.ANVIL] = "[!1]//Vous pouvez défausser un Trésor//pour recevoir une carte//coûtant jusqu'à [4].";
FrenchCardTexts[CardNames.CLERK] = "|+[2]|//Tous vos adversaires ayant//en main 5 cartes ou plus//en placent une sur leur pioche.//---//Au début de votre tour, vous pouvez//jouer cette carte depuis votre main.";
FrenchCardTexts[CardNames.INVESTMENT] = "Écartez une carte de votre main.//Choisissez : +[1]; ou écartez//cette carte pour dévoiler votre main//pour +{1} par Trésor révélé//de nom différent.";
FrenchCardTexts[CardNames.TIARA] = "|+1 Achat|//À ce tour, quand vous recevez//une carte, vous pouvez la placer//sur votre pioche. Vous pouvez jouer//deux fois un Trésor de votre main.";
FrenchCardTexts[CardNames.CHARLATAN] = "|+[!3]|//Tous vos adversaires//reçoivent une Malédiction.//---//Dans les parties utilisant//cette carte, les Malédictions//sont aussi un Trésor valant [1].";
FrenchCardTexts[CardNames.COLLECTION] = "[!2]//|+1	 Achat|//À ce tour, quand vous recevez//une carte Action, +{1}.";
FrenchCardTexts[CardNames.CRYSTAL_BALL] = "[!1]//Consultez la carte du haut de//votre pioche. Vous pouvez l'écarter,//la défausser, ou, si c'est une//Action on un Trésor, la jouer.";
FrenchCardTexts[CardNames.MAGNATE] = "Dévoilez votre main.//|+1 Carte| par Trésor dévoilé.";
FrenchCardTexts[CardNames.WAR_CHEST] = "Le jouer à votre gauche nomme//une carte. Recevez une carte//coûtant jusqu'à [5] qui//n'a pas été nommée à ce tour//pour les Trésors de guerre.";

*/
export const Work_Card:DigitalCard = {	id: "sauna", frenchName: "",  artwork:"",
text_html: '<div class="card-text" style="top:20px;">\
<div style="position:relative; top:60px;">\
<div style="line-height:18px;">\
<div style="display:inline;"><div style="display:inline; font-size:20px;">Vous pouvez défausser un Trésor</div></div><br>\
<div style="display:inline;"><div style="display:inline; font-size:20px;">pour recevoir une carte</div></div><br>\
<div style="display:inline;"><div style="display:inline; font-size:20px;">coûtant jusqu\'à     .</div></div><br>\
</div>\
</div>\
<div class="card-text-coin-icon" style="transform:scale(0.35); top:10px; display: inline; left:120px;">\
<div class="card-text-coin-text-container" style="display:inline;"><div class="card-text-coin-text" style="color: black; display:inline; top:8px;">1</div></div>\
</div>\
<div class="card-text-coin-icon" style="transform:scale(0.18); top:108px; display: inline; left:188px;">\
<div class="card-text-coin-text-container" style="display:inline;"><div class="card-text-coin-text" style="color: black; display:inline; top:8px;">4</div></div>\
</div>\
</div>'};


export const Work_Card_pro9:DigitalCard = {	id: "anvil", frenchName: "",  artwork:"",
text_html: '<div class="card-text" style="top:20px;">\
<div style="position:relative; top:60px;">\
<div style="line-height:18px;">\
<div style="display:inline;"><div style="display:inline; font-size:20px;">Vous pouvez défausser un Trésor</div></div><br>\
<div style="display:inline;"><div style="display:inline; font-size:20px;">pour recevoir une carte</div></div><br>\
<div style="display:inline;"><div style="display:inline; font-size:20px;">coûtant jusqu\'à     .</div></div><br>\
</div>\
</div>\
<div class="card-text-coin-icon" style="transform:scale(0.35); top:10px; display: inline; left:120px;">\
<div class="card-text-coin-text-container" style="display:inline;"><div class="card-text-coin-text" style="color: black; display:inline; top:8px;">1</div></div>\
</div>\
<div class="card-text-coin-icon" style="transform:scale(0.18); top:108px; display: inline; left:188px;">\
<div class="card-text-coin-text-container" style="display:inline;"><div class="card-text-coin-text" style="color: black; display:inline; top:8px;">4</div></div>\
</div>\
</div>'};

export const Work_Card_pro8:DigitalCard = {	id: "clerk", frenchName: "",  artwork:"",
text_html: '<div class="card-text" style="top:10px;">\
<div style="position:relative; top:05px;">\
<div style="line-height:18px;">\
<div style="display:inline;"><div style="display:inline; font-size:20px;">+     </div></div><br>\
<div style="display:inline;"><div style="display:inline; font-size:20px;">Tous vos adversaires ayant</div></div><br>\
<div style="display:inline;"><div style="display:inline; font-size:20px;">en main 5 cartes ou plus</div></div><br>\
<div style="display:inline;"><div style="display:inline; font-size:20px;">en placent une sur leur pioche.</div></div><br>\
</div></div>\
<div class="horizontal-line" style="width:200px; height:3px; margin-top:15px;"></div>\
<div style="position:relative; top:0x;"><div style="line-height:18px;">\
<div style="display:inline;"><div style="display:inline; font-size:18px;">Au début de votre tour, vous pouvez</div></div><br>\
<div style="display:inline;"><div style="display:inline; font-size:18px;">jouer cette carte depuis votre main.</div></div><br>\
</div>\
</div>\
<div class="card-text-coin-icon" style="transform:scale(0.22); top:02px; display: inline;left:140px;">\
<div class="card-text-coin-text-container" style="display:inline;"><div class="card-text-coin-text" style="color: black; display:inline; top:8px;">2</div></div>\
</div>\
</div>'};


export const Work_Card_pro7:DigitalCard = {	id: "investment", frenchName: "",  artwork:"",
text_html: '<div class="card-text" style="top:20px;">\
<div style="position:relative; top:15px;">\
<div style="line-height:20px;">\
<div style="display:inline;"><div style="display:inline; font-size:18px;">Écartez une carte de votre main.</div></div><br>\
<div style="display:inline;"><div style="display:inline; font-size:18px;">Choisissez : +      ; ou écartez</div></div><br>\
<div style="display:inline;"><div style="display:inline; font-size:18px;">cette carte pour dévoiler votre main</div></div><br>\
<div style="display:inline;"><div style="display:inline; font-size:18px;">pour +        par Trésor révélé</div></div><br>\
<div style="display:inline;"><div style="display:inline; font-size:18px;">de nom différent.</div></div><br>\
</div>\
</div>\
<div class="card-text-coin-icon" style="transform:scale(0.18); top:40px; display: inline;left:140px;">\
<div class="card-text-coin-text-container" style="display:inline;"><div class="card-text-coin-text" style="color: black; display:inline; top:8px;">1</div></div>\
</div>\
<div class="card-text-vp-icon-container" style="display:inline; transform:scale(0.18); top:90px; left:100px;"><div class="card-text-vp-text-container">\
<div class="card-text-vp-text" style="top:8px;">1</div></div><div class="card-text-vp-icon"></div></div>\
</div>'};

export const Work_Card_pro6:DigitalCard = {	id: "tiara", frenchName: "",  artwork:"",
text_html: '<div class="card-text" style="top:20px;">\
<div style="position:relative; top:15px;">\
<div style="line-height:26px;">\
<div style="display:inline;"><div style="display:inline; font-size:28px;"><div style="display: inline; font-weight: bold;">+1 Achat</div></div></div><br>\
</div>\
<div style="line-height:16px; position:relative; top:05px;">\
<div style="display:inline;"><div style="display:inline; font-size:18px;">À ce tour, quand vous recevez</div></div><br>\
<div style="display:inline;"><div style="display:inline; font-size:18px;">une carte, vous pouvez la placer</div></div><br>\
<div style="display:inline;"><div style="display:inline; font-size:18px;">sur votre pioche. Vous pouvez jouer</div></div><br>\
<div style="display:inline;"><div style="display:inline; font-size:18px;">deux fois un Trésor de votre main.</div></div><br>\
</div>\
</div>\
</div>'};

export const Work_Card_pro5:DigitalCard = {	id: "charlatan", frenchName: "",  artwork:"",
text_html: '<div class="card-text" style="top:20px;">\
<div style="position:relative; top:05px;">\
<div style="line-height:18px;">\
<div style="display:inline;"><div style="display:inline; font-size:20px;">+     </div></div><br>\
<div style="display:inline;"><div style="display:inline; font-size:20px;">Tous vos adversaires</div></div><br>\
<div style="display:inline;"><div style="display:inline; font-size:20px;">reçoivent une Malédiction</div></div><br>\
</div></div>\
<div class="horizontal-line" style="width:200px; height:3px; margin-top:15px;"></div>\
<div style="position:relative; top:0x;"><div style="line-height:18px;">\
<div style="display:inline;"><div style="display:inline; font-size:20px;">Dans les parties utilisant</div></div><br>\
<div style="display:inline;"><div style="display:inline; font-size:20px;">cette carte, les Malédictions</div></div><br>\
<div style="display:inline;"><div style="display:inline; font-size:20px;">sont aussi un Trésor valant     .</div></div><br>\
</div>\
</div>\
<div class="card-text-coin-icon" style="transform:scale(0.22); top:02px; display: inline;left:140px;">\
<div class="card-text-coin-text-container" style="display:inline;"><div class="card-text-coin-text" style="color: black; display:inline; top:8px;">3</div></div>\
</div>\
<div class="card-text-coin-icon" style="transform:scale(0.15); top:135px; display: inline;left:240px;">\
<div class="card-text-coin-text-container" style="display:inline;"><div class="card-text-coin-text" style="color: black; display:inline; top:8px;">1</div></div>\
</div>\
</div>'};

export const Work_Card_pro4:DigitalCard = {	id: "collection", frenchName: "",  artwork:"",
text_html: '<div class="card-text" style="top:20px;">\
<div style="position:relative; top:60px;">\
<div style="line-height:18px;">\
<div style="display:inline;"><div style="display:inline; font-size:20px;"><div style="display: inline; font-size:26px; font-weight: bold;">+1 Achat</div></div></div><br>\
<div style="display:inline;"><div style="display:inline; font-size:20px;">À ce tour, quand vous recevez</div></div><br>\
<div style="display:inline;"><div style="display:inline; font-size:20px;">une carte Action, +    </div></div><br>\
</div>\
</div>\
<div class="card-text-coin-icon" style="transform:scale(0.35); top:10px; display: inline;left:120px;">\
<div class="card-text-coin-text-container" style="display:inline;"><div class="card-text-coin-text" style="color: black; display:inline; top:8px;">2</div></div>\
</div>\
<div class="card-text-vp-icon-container" style="display:inline; transform:scale(0.18); top:107px;left:220px;"><div class="card-text-vp-text-container">\
<div class="card-text-vp-text" style="top:8px;">1</div></div><div class="card-text-vp-icon"></div></div>\
</div>'};

export const Work_Card_pro3:DigitalCard = {	id: "crystalball", frenchName: "",  artwork:"",
text_html: '<div class="card-text" style="top:20px;">\
<div style="position:relative; top:50px;">\
<div style="line-height:18px;">\
<div style="display:inline;"><div style="display:inline; font-size:20px;">Consultez la carte du haut de</div></div><br>\
<div style="display:inline;"><div style="display:inline; font-size:20px;">votre pioche. Vous pouvez</div></div><br>\
<div style="display:inline;"><div style="display:inline; font-size:20px;">l\'écarter, la défausser, ou, si c\'est</div></div><br>\
<div style="display:inline;"><div style="display:inline; font-size:20px;">une Action on un Trésor, la jouer</div></div><br>\
</div>\
</div>\
<div class="card-text-coin-icon" style="transform:scale(0.35); top:05px; display: inline;left:120px;">\
<div class="card-text-coin-text-container" style="display:inline;"><div class="card-text-coin-text" style="color: black; display:inline; top:8px;">1</div></div>\
</div>\
</div>'};

export const Work_Card_pro2:DigitalCard = {	id: "magnate", frenchName: "",  artwork:"",
text_html: '<div class="card-text" style="top:20px;">\
<div style="position:relative; top:30px;">\
<div style="line-height:22px;">\
<div style="display:inline;"><div style="display:inline; font-size:24px;">Dévoilez votre main.</div></div><br>\
<div style="display:inline;"><div style="display:inline; font-size:24px;"><div style="display: inline; font-size:26px; font-weight: bold;">+ 1 Carte</div></div></div><br>\
<div style="display:inline;"><div style="display:inline; font-size:24px;">par Trésor dévoilé.</div></div><br>\
</div>\
</div>\
</div>'};

/*

Dévoilez votre main.//|+1 Carte| par Trésor dévoilé.";

*/

export const Work_Card_pro1:DigitalCard = {	id: "warchest", frenchName: "",  artwork:"",
text_html: '<div class="card-text" style="top:20px;">\
<div style="position:relative; top:10px;">\
<div style="line-height:18px;">\
<div style="display:inline;"><div style="display:inline; font-size:20px;">Le joueur à votre gauche nomme</div></div><br>\
<div style="display:inline;"><div style="display:inline; font-size:20px;">une carte. Recevez une carte</div></div><br>\
<div style="display:inline;"><div style="display:inline; font-size:20px;">coûtant jusqu\'à      qui</div></div><br>\
<div style="display:inline;"><div style="display:inline; font-size:20px;">n\'a pas été nommée à ce tour</div></div><br>\
<div style="display:inline;"><div style="display:inline; font-size:20px;">pour les Trésors de guerre.</div></div><br>\
</div>\
<div class="card-text-coin-icon" style="transform:scale(0.15); top:48px; display: inline;left:180px;">\
<div class="card-text-coin-text-container" style="display:inline;"><div class="card-text-coin-text" style="color: black; display:inline; top:8px;">5</div></div>\
</div>\
</div>\
</div>'};

/*seaside2*/

export const Work_Card_sea10:DigitalCard = { id: "astrolabe", frenchName: "",  artwork:"",
text_html: '<div class="card-text" style="top:20px;">\
<div style="position:relative; top:00px;">\
<div style="line-height:24px;">\
<div style="display:inline;"><div style="display:inline; font-size:26px;">Maintenant et au début</div></div><br>\
<div style="display:inline;"><div style="display:inline; font-size:26px;">de votre prochain tour :</div></div><br>\
</div>\
<div style="position:relative; top:55px;">\
<div style="display:inline;"><div style="display:inline; font-size:32px;"><div style="display: inline; font-weight: bold;">+ 1 Achat</div></div></div><br>\
</div>\
</div>\
<div class="card-text-coin-icon" style="transform:scale(0.35); top:60px; display: inline;left:120px;">\
<div class="card-text-coin-text-container" style="display:inline;"><div class="card-text-coin-text" style="color: black; display:inline; top:8px;">1</div></div>\
</div>\
</div>'};


export const Work_Card9:DigitalCard = { id: "corsair", frenchName: "",  artwork:"",
text_html: '<div class="card-text" style="top:20px;">\
<div style="position:relative; top:10px;">\
<div style="line-height:16px;">\
<div style="display:inline;"><div style="display:inline; font-size:18px;"><div style="display: inline; font-size:20px; font-weight: bold;">+    </div></div></div><br>\
<div style="display:inline;"><div style="display:inline; font-size:18px;">Au début de votre prochain tour,</div></div><br>\
<div style="display:inline;"><div style="display:inline; font-size:18px;"><div style="display: inline; font-size:20px; font-weight: bold;">+1 Carte</div>. D\'ici là, chacun de vos</div></div><br>\
<div style="display:inline;"><div style="display:inline; font-size:18px;">adversaires écarte le premier Argent</div></div><br>\
<div style="display:inline;"><div style="display:inline; font-size:18px;">ou Or qu\'il joue à chaque tour.</div></div><br>\
</div>\
</div>\
<div class="card-text-coin-icon" style="transform:scale(0.20); top:5px; display: inline;left:140px;">\
<div class="card-text-coin-text-container" style="display:inline;"><div class="card-text-coin-text" style="color: black; display:inline; top:8px;">2</div></div>\
</div>\
</div>'};


export const Work_Card8:DigitalCard = {	id: "seawitch", frenchName: "",  artwork:"",
text_html: '<div class="card-text" style="top:20px;">\
<div style="position:relative; top:10px;">\
<div style="line-height:30px;">\
<div style="display:inline;"><div style="display:inline; font-size:30px;"><div style="display: inline; font-weight: bold;">+2 Cartes</div></div></div><br>\
</div>\
<div style="line-height:18px;">\
<div style="display:inline;"><div style="display:inline; font-size:20px;">Tous vos adversaires reçoivent</div></div><br>\
<div style="display:inline;"><div style="display:inline; font-size:20px;">une Malédiction. Au début de </div></div><br>\
<div style="display:inline;"><div style="display:inline; font-size:20px;">votre prochain tour, <div style="display: inline; font-size:22px; font-weight: bold;">+2 Cartes</div>,</div></div><br>\
<div style="display:inline;"><div style="display:inline; font-size:20px;">puis défaussez 2 cartes.</div></div><br>\
</div>\
</div>\
</div>'};

export const Work_Card7:DigitalCard = {	id: "tidepools", frenchName: "",  artwork:"",
text_html: '<div class="card-text" style="top:20px;">\
<div style="position:relative; top:10px;">\
<div style="line-height:30px;">\
<div style="display:inline;"><div style="display:inline; font-size:30px;"><div style="display: inline; font-weight: bold;">+3 Cartes</div></div></div><br>\
<div style="display:inline;"><div style="display:inline; font-size:30px;"><div style="display: inline; font-weight: bold;">+1 Action</div></div></div><br>\
</div>\
<div style="line-height:18px;">\
<div style="display:inline;"><div style="display:inline; font-size:20px;">Au début de votre prochain</div></div><br>\
<div style="display:inline;"><div style="display:inline; font-size:20px;">tour, défaussez 2 cartes.</div></div><br>\
</div>\
</div>\
</div>'};


export const Work_Card6:DigitalCard = {	id: "seachart", frenchName: "",  artwork:"",
text_html: '<div class="card-text" style="top:20px;">\
<div style="position:relative; top:10px;">\
<div style="line-height:26px;">\
<div style="display:inline;"><div style="display:inline; font-size:28px;"><div style="display: inline; font-weight: bold;">+1 Carte</div></div></div><br>\
<div style="display:inline;"><div style="display:inline; font-size:28px;"><div style="display: inline; font-weight: bold;">+1 Action</div></div></div><br>\
</div>\
<div style="line-height:14px;">\
<div style="display:inline;"><div style="display:inline; font-size:16px;">Dévoilez la carte du haut de votre pioche.</div></div><br>\
<div style="display:inline;"><div style="display:inline; font-size:16px;">Si vous en avez un exemplaire</div></div><br>\
<div style="display:inline;"><div style="display:inline; font-size:16px;">en jeu, prenez-là en main.</div></div><br>\
</div>\
</div>\
</div>'};

export const Work_Card5:DigitalCard = {	id: "pirate", frenchName: "",  artwork:"",
text_html: '<div class="card-text" style="top:10px;">\
<div style="position:relative; top:05px;">\
<div style="line-height:16px;">\
<div style="display:inline;"><div style="display:inline; font-size:18px;">Au début de votre prochain tour</div></div><br>\
<div style="display:inline;"><div style="display:inline; font-size:18px;">recevez en main un Trésor</div></div><br> \
<div style="display:inline;"><div style="display:inline; font-size:18px;">coûtant jusqu\'à    .</div></div><br> \
</div></div>\
<div class="horizontal-line" style="width:200px; height:3px; margin-top:0px;"></div>\
<div style="position:relative; top:5px;"><div style="line-height:18px;">\
<div style="display:inline;"><div style="display:inline; font-size:18px;">Quand un joueur reçoit un Trésor</div></div><br> \
<div style="display:inline;"><div style="display:inline; font-size:18px;">vous pouvez jouer cette carte</div></div><br> \
<div style="display:inline;"><div style="display:inline; font-size:18px;">depuis votre main.</div></div><br> \
</div></div>\
<div class="card-text-coin-icon" style="transform:scale(0.13); top:50px; display: inline;left:190px;">\
<div class="card-text-coin-text-container" style="display:inline;"><div class="card-text-coin-text" style="color: black; display:inline; top:8px;">6</div></div>\
</div>\
</div>'};

export const Work_Card4:DigitalCard = {	id: "sailor", frenchName: "",  artwork:"",
text_html: '<div class="card-text" style="top:20px;">\
<div style="position:relative; top:15px;">\
<div style="line-height:14px;">\
<div style="display:inline;"><div style="display:inline; font-size:28px;"><div style="display: inline; font-weight: bold;">+1 Action</div></div></div><br> \
<div style="display:inline;"><div style="display:inline; font-size:16px;">Une fois durant ce tour, quand vous</div></div><br>\
<div style="display:inline;"><div style="display:inline; font-size:16px;">recevez une carte Durée, vous pouvez</div></div><br>\
<div style="display:inline;"><div style="display:inline; font-size:16px;"> la jouer. Au début de votre prochain tour,</div></div><br> \
<div style="display:inline;"><div style="display:inline; font-size:16px;">+     et vous pouvez écarter.</div></div><br> \
<div style="display:inline;"><div style="display:inline; font-size:16px;">une carte de votre main.</div></div><br> \
</div></div>\
<div class="card-text-coin-icon" style="transform:scale(0.13); top:88px; display: inline;left:68px;">\
<div class="card-text-coin-text-container" style="display:inline;"><div class="card-text-coin-text" style="color: black; display:inline; top:8px;">2</div></div>\
</div>\
</div>'};


export const Work_Card3:DigitalCard = {	id: "blockade", frenchName: "",  artwork:"",
text_html: '<div class="card-text" style="top:20px;">\
<div style="position:relative; top:0px;">\
<div style="line-height:13px;">\
<div style="display:inline;"><div style="display:inline; font-size:16px;">Recevez une carte coûtant jusqu\'à     ,</div></div><br>\
<div style="display:inline;"><div style="display:inline; font-size:16px;">en la mettant de côté. Au début de votre</div></div><br> \
<div style="display:inline;"><div style="display:inline; font-size:16px;">prochain tour, prenez-là en main</div></div><br> \
<div style="display:inline;"><div style="display:inline; font-size:16px;">Tant qu\'elle est mise de côté,</div></div><br> \
<div style="display:inline;"><div style="display:inline; font-size:16px;">quand un autre joueur en reçoit</div></div><br> \
<div style="display:inline;"><div style="display:inline; font-size:16px;">un exemplaire durant leur tour,</div></div><br> \
<div style="display:inline;"><div style="display:inline; font-size:16px;">il reçoit une Malédiction.</div></div><br> \
</div></div>\
<div class="card-text-coin-icon" style="transform:scale(0.13); top:4px; display: inline;left:240px;">\
<div class="card-text-coin-text-container" style="display:inline;"><div class="card-text-coin-text" style="color: black; display:inline; top:8px;">4</div></div>\
</div>\
</div>'};

export const Work_Card2:DigitalCard = {	id: "monkey", frenchName: "",  artwork:"",
text_html: '<div class="card-text" style="top:20px;">\
<div style="position:relative; top:27px;">\
<div style="line-height:16px;">\
<div style="display:inline;"><div style="display:inline; font-size:18px;">Jusqu\'à votre prochain tour, quand</div></div><br>\
<div style="display:inline;"><div style="display:inline; font-size:18px;">le joueur à votre droite reçoit</div></div><br> \
<div style="display:inline;"><div style="display:inline; font-size:18px;">une carte, <div style="display: inline; font-size:20px; font-weight: bold;">+1 Carte</div>. Au début</div></div><br> \
<div style="display:inline;"><div style="display:inline; font-size:18px;">de votre prochain tour, <div style="display: inline; font-size:20px; font-weight: bold;">+1 Carte</div>.</div></div><br> \
</div></div>\
</div>'};
