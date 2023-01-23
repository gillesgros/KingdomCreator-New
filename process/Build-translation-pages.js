fs = require("fs");
path = require('path');

Loader = require('./loader');

function transformName(name) {
  return name.toLowerCase().replace(/'/g, "");
}

function TestAndCreateDir(Path) {
  if (!fs.existsSync(Path)) fs.mkdirSync(Path);
}


//const sets = Loader.loadSets();
//const types = ["cards", "events", "landmarks", "projects", "boons", "allies", "ways", "othercards"]

// Read in the Dutch and German translations.
const csv = fs.readFileSync("./process/resources/pages.csv", "utf16le");
const lines = csv.replace(/"/g, "").split(/\r?\n/);
const names = {};
let separator=";"
let start_line=0
console.log(lines[start_line])
if (lines[start_line].includes("sep=")) {
  console.log("sep found")
  separator=(lines[start_line].split("="))[1];
  start_line+=1
} 
languages= lines[start_line].split(separator);

const pages=new Set ()

for (let i = start_line + 1; i < lines.length; i++) {
  const Line_splittted = lines[i].split(separator);
  names[Line_splittted[0]]={}
}
const resultPages = Object.keys(names);
console.log(resultPages)

TestAndCreateDir('./src');
TestAndCreateDir('./src/i18n');
TestAndCreateDir('./src/i18n/messages');



for (let i = 0; i < resultPages.length; i++) {
  const page = resultPages[i];
  if (page != "" ) {
    for (let n = 2; n < languages.length; n++) {
      if (languages[n] != "" ) names[languages[n]]={};
    }
    
    for (let i = 1; i < lines.length; i++) {
      const Line_splittted = lines[i].split(separator);
      if (Line_splittted[0] == page) {
//    names[Line_splittted[0]][Line_splittted[1]]=[]
        for (let j = 2 ; j < Line_splittted.length; j++) {
          if (Line_splittted[j] != '') names[languages[j]][Line_splittted[1]]= Line_splittted[j]
        }
      }
    }
    console.log(languages)
    for (let j= 2 ; j < languages.length; j++) {
      if (languages[j] != "" ) {
        lang=languages[j]
        if (lang=="en") lang =""
        TestAndCreateDir(`./src/i18n/messages/${lang}`)
        console.log(`./src/i18n/messages/${lang}/${resultPages[i]}.${languages[j]}.json`)
        fs.writeFileSync(`./src/i18n/messages/${lang}/${resultPages[i]}.${languages[j]}.json`, JSON.stringify(names[languages[j]], null, 2));
      }
    }
  }
}








