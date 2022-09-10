fs = require("fs");
Loader = require('./loader');

function transformName(name) {
  return name.toLowerCase().replace(/'/g, "");
}

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
/*    console.log('set is: ' + setIds[j])
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