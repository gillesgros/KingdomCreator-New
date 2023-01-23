fs = require("fs");
path = require('path');
//iconvlite = require('iconv-lite');
Loader = require('./loader');

function transformName(name) {
  return name.toLowerCase().replace(/'/g, "");
}

function TestAndCreateDir(Path) {
  if (!fs.existsSync(Path)) fs.mkdirSync(Path);
}

const sets = Loader.loadSets();
const types = ["cards", "events", "landmarks", "projects", "boons", "allies", "ways", "othercards"]

function convert_Per_File(__dirName, __Pattern) {
//liste des fichiers et traduction
  let separator=","
  const result = {};
  fileoobjs = fs.readdirSync(__dirName)
  fileoobjs.forEach((file) => { 
    if(fs.lstatSync(path.join(__dirName,file)).isFile()) {
      if (path.extname(file) == ".csv" && path.basename(file).indexOf(__Pattern)!=- 1 ) {
        console.log("working on file : "+ file)
        const SetFileName = file.replace(__Pattern,'').replace('.csv','')
        // read file with "utf16le" type
        local_csv = fs.readFileSync(path.join(__dirName,file), "utf16le");
        let lines=(local_csv.replace(/"/g, "").split(/\r?\n/))
        let start_line=0
        if (lines[start_line].includes("sep=")) {
          separator=(lines[start_line].split("="))[1];
          start_line+=1
        }
        L= lines[start_line].split(separator);
		console.log(L)
        const names = {};
        for (let i = start_line; i < lines.length; i++) {
          const [english, lang_1, lang_2, lang_3, lang_4, lang_5, lang_6] = lines[i].split(separator);
		names[transformName(english)] = {[L[1]]: lang_1, [L[2]]: lang_2, [L[3]]: lang_3, [L[4]]: lang_4,[L[5]]: lang_5,[L[6]]: lang_6}
        }

        // Merge all items into a single list.
        for (let n = 1; n < L.length; n++) {
          result[L[n]]={};
        }
        const setIds = Object.keys(sets);
        let items = []
        for (let i = 0; i < setIds.length; i++) {
          const set = sets[setIds[i]];
          if (SetFileName == set.id) {
            for (let j = 0; j < types.length; j++) {
              if (set[types[j]]) {
                items = items.concat(set[types[j]]);
              }
            }
          }
        }
        for (let i = 0; i < items.length; i++) {
          const id = items[i].id;
          const name = items[i].name;
          const set= items[i].setId;
          //console.log(set)
          result["en"][id] = name;
          // the english name is also present in translation file
        
          for (let n = 1; n < L.length; n++) {
            const lang = L[n];
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
                   // console.log("Skipping: ", id, ", ",name, ", ", lang);
                  }
                }
              }
            }
          }
        }

        const resultLanguages = Object.keys(result);
        for (let i = 0; i < resultLanguages.length; i++) {
          let lang = resultLanguages[i];
          if (i==0) {
            TestAndCreateDir('./src');
            TestAndCreateDir('./src/i18n');
            TestAndCreateDir('./src/i18n/messages');
          }
          if (lang=="en") lang =""
          TestAndCreateDir(`./src/i18n/messages/${lang}`);
          TestAndCreateDir(`./src/i18n/messages/${lang}/cards`);
          console.log("building file" + `./src/i18n/messages/${lang}/cards/cards.${resultLanguages[i]}.${SetFileName}.json`)
          fs.writeFileSync(`./src/i18n/messages/${lang}/cards/cards.${resultLanguages[i]}.${SetFileName}.json`, JSON.stringify(result[resultLanguages[i]], null, 2));
        }
      }
    }
  })
}



const missing= {};
convert_Per_File("./process/resources","cards_translations - ")
fs.writeFileSync(`./src/i18n/messages/cards.missing.json`, JSON.stringify(missing, null, 2));

