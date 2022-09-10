Loader = require('./loader')
fs = require "fs"
os = require("os");

sets = Loader.loadSets()

findCardByShortId = (shortId) ->
   for setId, set of sets
      for card in set.cards
         if shortId == card.shortId
            return card
      if set.events
         for event in set.events
            if shortId == event.shortId
               return event
      if set.landmarks
         for landmark in set.landmarks
            if shortId == landmark.shortId
               return landmark
      if set.projects
         for project in set.projects
            if shortId == project.shortId
               return project
      if set.boons
         for boon in set.boons
            if shortId == boon.shortId
               return boon
      if set.ways
         for way in set.ways
            if shortId == way.shortId
               return way
      if set.allies
         for ally in set.allies
            if shortId == ally.shortId
               return ally

   throw Error('Card not found: ' + shortId)

getSetsForCards = (cards) ->
   setIdsMap = {}
   for card in cards
      setIdsMap[card.setId] = true
   setIds = (set for set of setIdsMap)
   setIds.sort()
   return setIds

parseSupplyString = (supplyString) ->
   split = supplyString.split(":")
   kingdomName = split[0].trim()
   cardNames =
      split[1]
         .replace(/\(/g, ',')
         .replace(/\)/g, '')
         .replace(/•/g, ',')
         .split(',')
   cards = []
   for cardName in cardNames 
      tokenized = Loader.tokenize(cardName)
      if tokenized
         cards.push(findCardByShortId(tokenized))
   return {
      name: kingdomName
      cards: cards
   }

sortBy = (key, a, b, r) ->
    r = if r then 1 else -1
    return -1*r if a[key] > b[key]
    return +1*r if a[key] < b[key]
    return 0

Append = (FileDesc, StringToPrint) ->
   console.log(StringToPrint)
   fs.appendFileSync FileDesc, StringToPrint + os.EOL, (error) -> 
      console.error("Error writing file", error) if error



# strings = [
strings=[""
"# Alchemy #"
"Alchemy & Dominion:"
"Forbidden Arts: Apprentice, Familiar, Possession, University, Cellar, Council Room, Gardens,"
"Laboratory, Thief,  Throne Room"
"Potion Mixers: Alchemist, Apothecary, Golem, Herbalist, Transmute, Cellar, Chancellor,"
"Festival, Militia,  Smithy"
"Chemistry Lesson: Alchemist, Golem, Philosopher's Stone, University, Bureaucrat, Market,"
"Moat, Remodel, Witch,  Woodcutter"
"Alchemy & Intrigue:"
"Servants: Golem, Possession, Scrying Pool, Transmute, Vineyard, Conspirator, Great Hall,"
"Minion, Pawn,  Steward"
"Secret Research: Familiar, Herbalist, Philosopher's Stone, University, Bridge, Masquerade,"
"Minion, Nobles, Shanty Town, Torturer"
"Pools, Tools, and Fools: Apothecary, Apprentice, Golem, Scrying Pool, Baron, Coppersmith,"
"Ironworks, Nobles, Trading Post, Wishing Well"

"# Adventures #"
"Adventures alone:"
"Gentle Intro: Scouting Party • Amulet, Distant Lands, Dungeon, Duplicate, Giant, Hireling, Port, Ranger, Ratcatcher, Treasure Trove"
"Expert Intro: Mission, Plan • Caravan Guard, Coin of the Realm, Haunted Woods, Lost City, Magpie, Peasant, Raze, Swamp Hag, Transmogrify,"
"Wine Merchant"
"Adventures & Dominion:"
"Level Up: Training • Dungeon, Gear, Guide, Lost City, Miser • Market, Merchant, Militia, Throne Room, Workshop"
"Son of Size Distortion: Bonfire, Raid • Amulet, Duplicate, Giant, Messenger, Treasure Trove • Bandit, Bureaucrat, Gardens, Moneylender, Witch"
"Adventures & Intrigue:"
"Royalty Factory: Pilgrimage • Bridge Troll, Duplicate, Page, Raze, Royal Carriage • Conspirator, Courtier, Harem, Nobles, Swindler"
"Masters of Finance: Ball, Borrow • Artificer, Distant Lands, Gear, Transmogrify, Wine Merchant • Bridge, Pawn, Shanty Town, Steward, Upgrade"
"Adventures & Seaside:"
"Prince of Orange: Mission • Amulet, Dungeon, Haunted Woods, Page, Swamp Hag • Caravan, Fishing Village, Merchant Ship, Tactician,"
"Treasure Map"
"Gifts and Mathoms: Expedition, Quest • Bridge Troll, Caravan Guard, Hireling, Lost City, Messenger • Ambassador, Embargo, Haven, Salvager,"
"Smugglers"
"Adventures & Alchemy:"
"Haste Potion: Plan • Magpie, Messenger, Port, Royal Carriage, Treasure Trove • Apprentice, Scrying Pool, Transmute, University, Vineyard"
"Cursecatchers: Save, Trade • Amulet, Bridge Troll, Caravan Guard, Peasant, Ratcatcher • Apothecary, Familiar, Golem, Herbalist,"
"Philosopher's Stone"
"Adventures & Prosperity (use Platinum & Colony):"
"Last Will and Monument: Inheritance • Coin of the Realm, Dungeon, Messenger, Relic, Treasure Trove • Bishop, Counting House, Monument,"
"Rabble, Vault"
"Think Big: Ball, Ferry • Distant Lands, Giant, Hireling, Miser, Storyteller • Contraband, Expand, Hoard, King's Court, Peddler"
"Adventures & Cornucopia/Guilds:"
"The Hero's Return: Travelling Fair • Artificer, Miser, Page, Ranger, Relic • Fairgrounds, Farming Village, Horse Traders, Jester, Menagerie"
"Seacraft and Witchcraft: Ferry, Seaway • Peasant, Storyteller, Swamp Hag, Transmogrify, Wine Merchant • Fortune Teller, Hamlet,"
"Horn of Plenty, Tournament, Young Witch, bane: Guide (*Guide is the Bane)"
"Spendthrift: Lost Arts • Artificer, Gear, Magpie, Miser, Storyteller • Doctor, Masterpiece, Merchant Guild, Soothsayer, Stonemason"
"Queen of Tan: Pathfinding, Save • Coin of the Realm, Duplicate, Guide, Ratcatcher, Royal Carriage • Advisor, Butcher, Candlestick Maker, Herald,"
"Journeyman"
"Adventures & Hinterlands:"
"Traders and Raiders: Raid • Haunted Woods, Lost City, Page, Port, Wine Merchant • Develop, Farmland, Haggler, Spice Merchant, Trader"
"Journeys: Expedition, Inheritance • Bridge Troll, Distant Lands, Giant, Guide, Ranger • Cartographer, Crossroads, Highway, Inn, Silk Road"
"Adventures & Dark Ages (use Shelters):"
"Cemetery Polka: Alms • Amulet, Caravan Guard, Hireling, Peasant, Relic • Graverobber, Marauder, Procession, Rogue, Wandering Minstrel"
"Groovy Decay: Lost Arts, Pathfinding • Dungeon, Haunted Woods, Ratcatcher, Raze, Transmogrify • Cultist, Death Cart, Fortress, Knights, Rats"
"Adventures & Empires"
"Area Control: Banquet, Keep • Capital, Catapult/Rocks, Charm, Crown, Farmers' Market • Coin of the Realm, Page, Relic, Treasure Trove, Wine"
"Merchant"
"No Money No Problems: Bandit Fort, Mission • Archive, Encampment/Plunder, Royal Blacksmith, Temple, Villa • Dungeon, Duplicate, Hireling,"
"Peasant, Transmogrify"

"# Baseset #"
"First Game: Cellar, Market, Militia, Mine, Moat, Remodel,"
"Smithy, Village, Woodcutter, Workshop."
"Big Money: Adventurer, Bureaucrat, Chancellor, Chapel, Feast,"
"Laboratory, Market, Mine, Moneylender, Throne Room"
"Interaction: Bureaucrat, Chancellor, Council Room, Festival,"
"Library, Militia, Moat, Spy, Thief, Village"
"Size Distortion: Cellar, Chapel, Feast, Gardens, Laboratory,"
"Thief, Village, Witch, Woodcutter, Workshop"
"Village Square: Bureaucrat, Cellar, Festival, Library, Market,"
"Remodel, Smithy, Throne Room, Village, Woodcutter"
""]





## ###################################################

for string in strings

   # reconstruction of the proper kingdom string to process
   if (string=="")
       continue
   if (string.slice(0,1) == "#" && string.slice(-1) == "#") 
      console.log("set is " + string.replace(/#/g, '').trim())
      KingdomsYAMLSet_Name = string.replace(/#/g, '').trim().toLowerCase()+ '.yaml'
      console.log("kingdoms:")
      fs.writeFileSync KingdomsYAMLSet_Name, "kingdoms:" + os.EOL , (error) -> console.error("Error writing file", error) if error
      continue
   if (string.slice(-1) == ":") 
      continue
   if (string.slice(-1) == ",")
      string_old = string
      continue
   if (string_old != "")
      string = string_old + string
      string_old = ""

   kingdom = parseSupplyString(string)
   Append(KingdomsYAMLSet_Name, "  - name: " + kingdom.name)
   
   setIds = getSetsForCards(kingdom.cards)
   Append(KingdomsYAMLSet_Name, '    sets:')
   for setId in setIds
      Append(KingdomsYAMLSet_Name, '      - ' + setId)
   kingdomCards = (kingdom.cards).sort (a,b) ->
      sortBy('id', a, b, false)
   kingdomCards = (kingdom.cards).sort (a,b) ->
      sortBy('cardType', a, b,false)
   #console.log(kingdom.cards)

   Append(KingdomsYAMLSet_Name, '    supply:')
   for card in kingdomCards
      if (card.cardType != index )
         index = card.cardType
         switch (index)
            when "1 // events"    then string_step = '    events:'
            when "2 // landmarks" then string_step = '    landmarks:'
            when "3 // projects"  then string_step = '    projects:'
            when "4 // boons"     then string_step = '    boons:'
            when "5 // ways"      then string_step = '     ways:'
            when "6 // allies"    then string_step = '    allies:'
         if (string_step != "" ) 
            Append(KingdomsYAMLSet_Name, string_step )
            string_step=''
      Append(KingdomsYAMLSet_Name, '      - ' + card.id)

   Append(KingdomsYAMLSet_Name, "")



# strings = [
strings_adventures=[""
"# Alchemy #"
"Alchemy & Dominion:"
"Forbidden Arts: Apprentice, Familiar, Possession, University, Cellar, Council Room, Gardens,"
"Laboratory, Thief,  Throne Room"
"Potion Mixers: Alchemist, Apothecary, Golem, Herbalist, Transmute, Cellar, Chancellor,"
"Festival, Militia,  Smithy"
"Chemistry Lesson: Alchemist, Golem, Philosopher's Stone, University, Bureaucrat, Market,"
"Moat, Remodel, Witch,  Woodcutter"
"Alchemy & Intrigue:"
"Servants: Golem, Possession, Scrying Pool, Transmute, Vineyard, Conspirator, Great Hall,"
"Minion, Pawn,  Steward"
"Secret Research: Familiar, Herbalist, Philosopher's Stone, University, Bridge, Masquerade,"
"Minion, Nobles, Shanty Town, Torturer"
"Pools, Tools, and Fools: Apothecary, Apprentice, Golem, Scrying Pool, Baron, Coppersmith,"
"Ironworks, Nobles, Trading Post, Wishing Well"

"# Adventures #"
"Adventures alone:"
"Gentle Intro: Scouting Party • Amulet, Distant Lands, Dungeon, Duplicate, Giant, Hireling, Port, Ranger, Ratcatcher, Treasure Trove"
"Expert Intro: Mission, Plan • Caravan Guard, Coin of the Realm, Haunted Woods, Lost City, Magpie, Peasant, Raze, Swamp Hag, Transmogrify,"
"Wine Merchant"
"Adventures & Dominion:"
"Level Up: Training • Dungeon, Gear, Guide, Lost City, Miser • Market, Merchant, Militia, Throne Room, Workshop"
"Son of Size Distortion: Bonfire, Raid • Amulet, Duplicate, Giant, Messenger, Treasure Trove • Bandit, Bureaucrat, Gardens, Moneylender, Witch"
"Adventures & Intrigue:"
"Royalty Factory: Pilgrimage • Bridge Troll, Duplicate, Page, Raze, Royal Carriage • Conspirator, Courtier, Harem, Nobles, Swindler"
"Masters of Finance: Ball, Borrow • Artificer, Distant Lands, Gear, Transmogrify, Wine Merchant • Bridge, Pawn, Shanty Town, Steward, Upgrade"
"Adventures & Seaside:"
"Prince of Orange: Mission • Amulet, Dungeon, Haunted Woods, Page, Swamp Hag • Caravan, Fishing Village, Merchant Ship, Tactician,"
"Treasure Map"
"Gifts and Mathoms: Expedition, Quest • Bridge Troll, Caravan Guard, Hireling, Lost City, Messenger • Ambassador, Embargo, Haven, Salvager,"
"Smugglers"
"Adventures & Alchemy:"
"Haste Potion: Plan • Magpie, Messenger, Port, Royal Carriage, Treasure Trove • Apprentice, Scrying Pool, Transmute, University, Vineyard"
"Cursecatchers: Save, Trade • Amulet, Bridge Troll, Caravan Guard, Peasant, Ratcatcher • Apothecary, Familiar, Golem, Herbalist,"
"Philosopher's Stone"
"Adventures & Prosperity (use Platinum & Colony):"
"Last Will and Monument: Inheritance • Coin of the Realm, Dungeon, Messenger, Relic, Treasure Trove • Bishop, Counting House, Monument,"
"Rabble, Vault"
"Think Big: Ball, Ferry • Distant Lands, Giant, Hireling, Miser, Storyteller • Contraband, Expand, Hoard, King's Court, Peddler"
"Adventures & Cornucopia/Guilds:"
"The Hero's Return: Travelling Fair • Artificer, Miser, Page, Ranger, Relic • Fairgrounds, Farming Village, Horse Traders, Jester, Menagerie"
"Seacraft and Witchcraft: Ferry, Seaway • Peasant, Storyteller, Swamp Hag, Transmogrify, Wine Merchant • Fortune Teller, Hamlet,"
"Horn of Plenty, Tournament, Young Witch, bane: Guide (*Guide is the Bane)"
"Spendthrift: Lost Arts • Artificer, Gear, Magpie, Miser, Storyteller • Doctor, Masterpiece, Merchant Guild, Soothsayer, Stonemason"
"Queen of Tan: Pathfinding, Save • Coin of the Realm, Duplicate, Guide, Ratcatcher, Royal Carriage • Advisor, Butcher, Candlestick Maker, Herald,"
"Journeyman"
"Adventures & Hinterlands:"
"Traders and Raiders: Raid • Haunted Woods, Lost City, Page, Port, Wine Merchant • Develop, Farmland, Haggler, Spice Merchant, Trader"
"Journeys: Expedition, Inheritance • Bridge Troll, Distant Lands, Giant, Guide, Ranger • Cartographer, Crossroads, Highway, Inn, Silk Road"
"Adventures & Dark Ages (use Shelters):"
"Cemetery Polka: Alms • Amulet, Caravan Guard, Hireling, Peasant, Relic • Graverobber, Marauder, Procession, Rogue, Wandering Minstrel"
"Groovy Decay: Lost Arts, Pathfinding • Dungeon, Haunted Woods, Ratcatcher, Raze, Transmogrify • Cultist, Death Cart, Fortress, Knights, Rats"
"Adventures & Empires"
"Area Control: Banquet, Keep • Capital, Catapult/Rocks, Charm, Crown, Farmers' Market • Coin of the Realm, Page, Relic, Treasure Trove, Wine"
"Merchant"
"No Money No Problems: Bandit Fort, Mission • Archive, Encampment/Plunder, Royal Blacksmith, Temple, Villa • Dungeon, Duplicate, Hireling,"
"Peasant, Transmogrify"

"# Baseset #"
"First Game: Cellar, Market, Militia, Mine, Moat, Remodel,"
"Smithy, Village, Woodcutter, Workshop."
"Big Money: Adventurer, Bureaucrat, Chancellor, Chapel, Feast,"
"Laboratory, Market, Mine, Moneylender, Throne Room"
"Interaction: Bureaucrat, Chancellor, Council Room, Festival,"
"Library, Militia, Moat, Spy, Thief, Village"
"Size Distortion: Cellar, Chapel, Feast, Gardens, Laboratory,"
"Thief, Village, Witch, Woodcutter, Workshop"
"Village Square: Bureaucrat, Cellar, Festival, Library, Market,"
"Remodel, Smithy, Throne Room, Village, Woodcutter"
""]