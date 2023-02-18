fs = require("fs");
Loader = require('./loader');

function transformName(name) {
  return name.toLowerCase().replace(/'/g, "");
}
// Read in the translation file

function TestAndCreateDir(Path) {
  if (!fs.existsSync(Path)) fs.mkdirSync(Path);
}

function usage() {
console.log("")
console.log("")
console.log("To run properly 'extract-card-names.js' you need to have a translation file")
console.log ("located and named './process/resources/cards_translations.csv'.")
console.log("")
console.log("The format of this file is a comma separated value file with a first line")
console.log("containing the following 'card,en,fr,de,nl,es'.")
console.log("the list of language is not limited.")
console.log("")
console.log("The output is mulitple files located at './src/i18n/messages'")
console.log("and named 'cards.${lang}.json' depending on the languages found in the CSV file")
console.log("and 'cards.missing.json' file containing card name that miss a translation.")
console.log("")
console.log("This translation generation is deprecated.")
console.log("")
console.log("")
}

usage()
// Read in the translation file
const csv = fs.readFileSync("./process/resources/cards_translations.csv", "utf8");
const lines = csv.replace(/"/g, "").split(/\r?\n/);
const names = {};

languages= lines[0].split(",");

for (let i = 1; i < lines.length; i++) {
  const Line_splittted = lines[i].split(",");
  names[transformName(Line_splittted[0])]=[]
  for (let j = 0 ; j < Line_splittted.length; j++) {
    names[transformName(Line_splittted[0])] [languages[j]]= Line_splittted[j]
  }
  //console.log(names[transformName(Line_splittted[0])])
}

const sets = Loader.loadSets();
const result = {};
const missing= {};
  for (let n = 1; n < languages.length; n++) {
      result[languages[n]]={};
  }

const types = ["cards", "events", "landmarks", "projects", "boons", "allies", "ways", "othercards"]
// Merge all items into a single list.
const setIds = Object.keys(sets);
let items = []
for (let i = 0; i < setIds.length; i++) {
  const set = sets[setIds[i]];
  for (let j = 0; j < types.length; j++) {
    if (set[types[j]]) {
      items = items.concat(set[types[j]]);
    }
  }
}
//console.log(items)

for (let i = 0; i < items.length; i++) {
  const id = items[i].id;
  const name = items[i].name;
  const set= items[i].setId;
  result["en"][id] = name;
  // the english name is also present in translation file

  for (let n = 1; n < languages.length; n++) {
    const lang = languages[n];
    /*
    console.log('======================')
    console.log(id)
    console.log(names[id])
    console.log(transformName(id))
    console.log(names[transformName(id)])
    */
    if (names[transformName(id)]) {
      if (names[transformName(id)][lang] != "") {
        result[lang][id] = names[transformName(id)][lang]
      }
    } else {
      // before skipping try if 2add ou 2 type of set
      id_from2add = id.replace(set,set.replace('2add',''))
      if (names[transformName(id_from2add)]) {
        if (names[transformName(id_from2add)][lang] != "") {
          result[lang][id] = names[transformName(id_from2add)][lang]
        }
      } else {
        id_fromadd = id.replace(set,set.replace('2add','2'))
        if (names[transformName(id_fromadd)]) {
          if (names[transformName(id_fromadd)][lang] != "") {
            result[lang][id] = names[transformName(id_fromadd)][lang]
          }
        } else {
          id_from2 = id.replace(set,set.replace('2',''))
          if (names[transformName(id_from2)]) {
            if (names[transformName(id_from2)][lang] != "") {
              result[lang][id] = names[transformName(id_from2)][lang]
            }
          } else {
			missing[id]= name
            console.log("Skipping: ", id, ", ",name, ", ", lang);
          }
        }
      }
    }
  }
}

TestAndCreateDir('./src');
TestAndCreateDir('./src/i18n');
TestAndCreateDir('./src/i18n/messages');

const resultLanguages = Object.keys(result);
for (let i = 0; i < resultLanguages.length; i++) {
  const lang = resultLanguages[i];
  fs.writeFileSync(`./src/i18n/messages/cards.${lang}.json`, JSON.stringify(result[lang], null, 2));
}

fs.writeFileSync(`./src/i18n/messages/cards.missing.json`, JSON.stringify(missing, null, 2));

usage()