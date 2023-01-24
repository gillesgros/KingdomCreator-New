fs = require("fs");
path = require('path');

Loader = require('./loader');

function transformName(name) {
  return name.toLowerCase().replace(/'/g, "");
}

function TestAndCreateDir(Path) {
  if (!fs.existsSync(Path)) fs.mkdirSync(Path);
}
// Read text file "UTF8" containing format
//sep=	
//PageName	id	en	nl	de	fr	es	pl
/*  Current PageName
  'languages',         'common',
  'page-boxes',        'page-index',
  'page-rules',        'page-sets',
  'sets',              '',
  'cards.baseset2',    'cards.baseset',
  'cards.intrigue2',   'cards.intrigue',
  'cards.seaside',     'cards.seaside2',
  'cards.alchemy',     'cards.prosperity',
  'cards.prosperity2', 'cards.cornucopia',
  'cards.hinterlands', 'cards.hinterlands2',
  'cards.promos',      'cards.darkages',
  'cards.guilds',      'cards.adventures',
  'cards.empires',     'cards.nocturne',
  'cards.renaissance', 'cards.menagerie',
  'cards.allies'
*/
const csv = fs.readFileSync("./process/resources/pages.csv", "utf8");
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
    const filenamesplitted=(resultPages[i]).split('.')
    for (let j= 2 ; j < languages.length; j++) {
      if (languages[j] != "" ) {
        lang=languages[j]
        if (lang=="en" && resultPages[i]=="sets") continue
        if (lang=="en") lang =""
        TestAndCreateDir(`./src/i18n/messages/${lang}`)
        if (filenamesplitted.length > 1 ) {
          if (filenamesplitted[0] == "cards") {
            TestAndCreateDir(`./src/i18n/messages/${lang}/cards`)
            filename = `./src/i18n/messages/${lang}/cards/${filenamesplitted[0]}.${languages[j]}.${filenamesplitted[1]}.json`
          } else filename = `./src/i18n/messages/${lang}/${filenamesplitted[0]}.${languages[j]}.${filenamesplitted[1]}.json`
        } else filename = `./src/i18n/messages/${lang}/${filenamesplitted[0]}.${languages[j]}.json`
        console.log(filename)
        fs.writeFileSync(filename, JSON.stringify(names[languages[j]], null, 2));
      }
    }
  }
}








