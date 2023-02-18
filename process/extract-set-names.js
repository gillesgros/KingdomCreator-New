fs = require("fs");
Loader = require('./loader');

function transformName(name) {
  return name.toLowerCase().replace(/'/g, "");
}

function TestAndCreateDir(Path) {
  if (!fs.existsSync(Path)) fs.mkdirSync(Path);
}

function usage() {
console.log("")
console.log("")
console.log("To run properly 'extract-set-names.js' you need to have a translation file")
console.log ("located and named './process/resources/sets_name.csv'.")
console.log("")
console.log("The format of this file is a comma separated value file with a first line")
console.log("containing the following 'en,fr,de,nl,es'.")
console.log("the list of language is limited. To add one language you need to code.")
console.log("The file need to include all sets present in 'sets' directory.")
console.log("")
console.log("The output is a file located at '`./src/i18n/messages'")
console.log("and named 'sets.${lang}.json' depending on the languages found in the CSV file.")
console.log("")
console.log("This translation generation is deprecated.")
console.log("")
console.log("")
}

usage()
// Read in the Dutch and German translations.
const csv = fs.readFileSync("./process/resources/sets_name.csv", "utf8");
const lines = csv.replace(/"/g, "").split(/\r?\n/);
const names = {};

console.log(lines[0])
L= lines[0].split(",");
console.log(L)

for (let i = 1; i < lines.length; i++) {
  const [english, lang_1, lang_2, lang_3, lang_4] = lines[i].split(",");
  names[transformName(english)] = {[L[1]]: lang_1, [L[2]]: lang_2, [L[3]]: lang_3, [L[4]]: lang_4};
}

const sets = Loader.loadSets();
const setIds = Object.keys(sets);

// ======================================================
//  console.log(names)

for (let i = 1; i < L.length; i++) {
  const lang = L[i];
  console.log(lang)
  const result = {};
  for (let j = 0; j < setIds.length; j++) {
    const set = sets[setIds[j]];
    console.log('set is: ' + setIds[j])
/*
    console.log('    ' + transformName(set.name)
                                .replace(' - updatepack','2add')
                                .replace(' (2nd)','2')
                                .replace(' ',''))
*/    console.log(names[transformName(set.name)
                                .replace(' - updatepack','2add')
                                .replace(' (2nd)','2')
                                .replace(' ','')])

    if (names[transformName(set.name)
                                .replace(' - updatepack','2add')
                                .replace(' (2nd)','2')
                                .replace(' ','')][lang] != "") {
      result[setIds[j]] = names[transformName(set.name)
                                .replace(' - updatepack','2add')
                                .replace(' (2nd)','2')
                                .replace(' ','')][lang];
    }

  }
  fs.writeFileSync(`./src/i18n/messages/sets.${lang}.json`, JSON.stringify(result, null, 2));
}
console.log('// ======================================================')
usage()
