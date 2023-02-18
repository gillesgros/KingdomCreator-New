const axios = require("axios");
const Loader = require("./loader");
const Fs = require("fs");
const resize = require("./resize");

const sets = Loader.loadSets();
const trace = false

// for all sets
//getAllSetsImages()

// for 1 set define it 
getAllImages(getCards(sets.plunder));


async function getAllSetsImages() {
  for (var k in sets) {
    console.log(k)
    //console.log(sets[k])
    await getAllImages(getCards(sets[k]));
  }
  return;
}

async function getAllImages(cards) {
  for (let i = 0; i < cards.length; i++) {
    if (trace) console.log(` 0 - before getImage`);
    if ( (cards[i].shortId).includes('tohide') == false ) {
      await getImage(cards[i]);
    }
  }
}

async function getImage(card) {
  var erroroccured=false;
  const response = await axios.get(createPageUrl(card)).catch(function (error) {
    console.log(error.response.status);
    erroroccured=true
    return;
  })
  if (trace) console.log(` 1 - After axios: ${card.name}`);
  if ( erroroccured) {
    console.log(`error in URL: ${card.name}`);
    return;
  } 
  if (response.status != 200) {
    console.log(`Invalid URL: ${card.name}`);
    return;
  } 
  const name = card.name.replace(/\s/g, "_").replace(/'/g, "%27");
 
  var matchPhrase = new RegExp(`class="fullImageLink" id="file"><a href="(\/images\/[^.]+\/${name}\.jpg)\"`)
  const match = response.data.match(matchPhrase);
  if (!match || match.length < 2) {
    console.log(`Unable to find URL: ${card.setId} - ${card.name} - ${name} for URL `+ createPageUrl(card));
    return;
  }
  if (trace) console.log(` 2 - Before imageResponse: ${card.name} - ${match[1]}`);
  const imageResponse = await axios.get(`http://wiki.dominionstrategy.com${match[1]}`, {
    responseType: "stream"
  });
  if (trace) console.log(` 3 - After axios imageResponse: ${card.name}`);
  
  const tempFilename = `process/cards/${card.setId}/${card.id}.jpg`;
  TestAndCreateDir("process");
  TestAndCreateDir("process/cards");
  TestAndCreateDir(`process/cards/${card.setId}`);
  if (!Fs.existsSync(`process/cards/${card.setId}`)) {
    Fs.mkdirSync(`process/cards/${card.setId}`);
  }
  const writer = Fs.createWriteStream(tempFilename);
  if (trace) console.log(` 4 - After createWriteStream: ${card.name}`);
  imageResponse.data.pipe(writer);

  return new Promise((resolve) => {
    writer.on("finish", () => {
      TestAndCreateDir("docs");
      TestAndCreateDir("docs/img");
      TestAndCreateDir("docs/img/cards");
      TestAndCreateDir(`docs/img/cards/${card.setId}`);
      resize(tempFilename, `docs/img/cards/${card.setId}/${card.id}.jpg`);
      console.log(`  ${card.id} : Complete`)
      resolve();
    });
  });
}

function TestAndCreateDir(Path) {
  if (!Fs.existsSync(Path)) Fs.mkdirSync(Path);
}

function createPageUrl(card) {
  const name = card.name.replace(/\s/g, "_");
  if (trace) console.log(`          ==> File:${name}.jpg`)
  return `http://wiki.dominionstrategy.com/index.php/File:${name}.jpg`;
}

function getCards(set) {
  let cards = set.cards;
  if (set.events) {
    cards = cards.concat(set.events);
  }
  if (set.landmarks) {
    cards = cards.concat(set.landmarks);
  }
  if (set.projects) {
    cards = cards.concat(set.projects);
  }
  if (set.boons) {
    cards = cards.concat(set.boons);
  }
  if (set.ways) {
    cards = cards.concat(set.ways);
  }
  if (set.allies) {
    cards = cards.concat(set.allies);
  }
  if (set.othercards) {
    cards = cards.concat(set.othercards);
  }
  return cards;
}