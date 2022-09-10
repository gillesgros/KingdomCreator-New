Loader = require('./loader')


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


strings = ["Hinterlands alone:"
"Introduction: Cartographer, Crossroads, Develop, Jack of all Trades, Margrave, Nomads, Oasis, Spice Merchant, Stables,"
"Weaver"
"Bargains: Border Village, Cauldron, Fool's Gold, Haggler, Highway, Scheme, Souk, Trader, Trail, Wheelwright"
"Hinterlands & Dominion:"
"Happy Trails: Berserker, Highway, Nomads, Oasis, Trail • Cellar, Library, Moneylender, Throne Room, Workshop"
"Adventures Abroad: Crossroads, Fool's Gold, Guard Dog, Souk, Witch's Hut • Festival, Laboratory, Remodel, Sentry,"
"Vassal"
"Hinterlands & Intrigue:"
"Money for Nothing: Cartographer, Jack of All Trades, Tunnel, Weaver, Wheelwright • Patrol, Pawn, Replace,"
"Shanty Town, Torturer"
"The Duke's Ball: Guard Dog, Inn, Scheme, Trail, Wheelwright • Conspirator, Duke, Harem, Masquerade, Upgrade"
"Hinterlands & Seaside:"
"Travelers: Cartographer, Crossroads, Farmland, Souk, Stables • Cutpurse, Island, Lookout, Merchant Ship, Warehouse"
"Runners: Berserker, Cauldron, Guard Dog, Nomads, Wheelwright • Bazaar, Blockade, Caravan, Smugglers, Sailor"
"Hinterlands & Alchemy:"
"Wine Country: Farmland, Guard Dog, Highway, Margrave, Nomads • Apprentice, Familiar, Golem, University, Vineyard"
"Hinterlands & Prosperity [use Platinum/Colony]: "
"Instant Gratification: Berserker, Cauldron, Haggler, Oasis, Trail • Bishop, Expand, Hoard, Mint, Watchtower"
"Treasure Trove: Cauldron, Develop, Fool's Gold, Guard Dog, Inn • Bank, Clerk, Crystal Ball, Monument, Tiara"
"Hinterlands & Cornucopia/Guilds:"
"Blue Harvest: Fool's Gold, Trail, Tunnel, Weaver, Witch's Hut • Hamlet, Horn of Plenty, Horse Traders, Jester,"
"Tournament"
"Exchanges: Border Village, Cauldron, Develop, Stables, Trader • Butcher, Herald, Masterpiece, Soothsayer, Stonemason"
"Hinterlands & Dark Ages [use Shelters]:"
"Far From Home: Cartographer, Develop, Fool's Gold, Weaver, Witch's Hut • Catacombs, Count, Feodum, Fortress,"
"Wandering Minstrel"
"Expeditions: Highway, Nomads, Oasis, Scheme, Spice Merchant • Altar, Catacombs, Ironmonger, Poor House, Storeroom"
"Hinterlands & Adventures:"
"Traders and Raiders: Raid • Berserker, Guard Dog, Haggler, Spice Merchant, Trader • Haunted Woods, Lost City, Page,"
"Port, Wine Merchant"
"Journeys: Expedition, Inheritance • Cartographer, Crossroads, Highway, Inn, Trail • Bridge Troll, Distant Lands, Giant,"
"Guide, Ranger"
"Hinterlands & Empires:"
"Simple Plans: Donate, Labyrinth • Border Village, Cauldron, Haggler, Stables, Wheelwright • Catapult/Rocks,"
"Enchantress, Forum, Patrician/Emporium, Villa"
"Expansion: Battlefield, Fountain • Farmland, Oasis, Spice Merchant, Stables, Tunnel • Castles, Charm,"
"Encampment/Plunder, Engineer, Legionary"
"Hinterlands & Nocturne:"
"Search Party: Cartographer, Inn, Oasis, Scheme, Souk • Cobbler, Conclave, Druid (The Mountain's Gift, The Sky's Gift,"
"The Sun's Gift), Faithful Hound, Werewolf"
"Counting Sheep: Crossroads, Farmland, Oasis, Tunnel, Weaver • Crypt, Leprechaun, Pooka, Secret Cave, Shepherd"
"Hinterlands & Renaissance:"
"Sweetened Deals: Silos • Develop, Guard Dog, Haggler, Spice Merchant, Witch's Hut • Flag Bearer, Lackeys,"
"Mountain Village, Silk Merchant, Spices"
"A Penny Saved: Barracks, Guildhall • Berserker, Border Village, Oasis, Souk, Trader • Ducat, Patron, Scepter, Seer,"
"Swashbuckler"
"Hinterlands & Menagerie:"
"Big Blue: Way of the Turtle, Banish • Trader, Trail, Tunnel, Weaver, Witch's Hut • Black Cat, Falconer, Sheepdog, Sleigh,"
"Village Green"
"Intersection: Way of the Mouse, Crossroads, Gamble • Develop, Farmland, Nomads, Stables, Wheelwright • Cardinal,"
"Hostelry, Livery, Mastermind, Supplies"
"Hinterlands & Allies:"
"Longest Tunnel: Fellowship of Scribes • Haggler, Jack of All Trades, Margrave, Trail, Tunnel • Bauble, Capital City,"
"Carpenter, Contract, Innkeeper"
"Expertise: Order of Masons • Border Village, Crossroads, Highway, Inn, Spice Merchant • Barbarian, Highwayman,"
"Specialist, Townsfolk, Underling "
]

console.log("kingdoms:")
for string in strings
   # reconstruction of the proper kingdom string to process
   if (string=="")
      continue
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
   
   console.log("  - name: " + kingdom.name)
   
   setIds = getSetsForCards(kingdom.cards)
   console.log('    sets:')
   for setId in setIds
      console.log('      - ' + setId)

   kingdomCards = (kingdom.cards).sort (a,b) ->
      sortBy('id', a, b, false)

   kingdomCards = (kingdom.cards).sort (a,b) ->
      sortBy('cardType', a, b,false)

   #console.log(kingdom.cards)

   console.log('    supply:')
   for card in kingdomCards
      if (card.cardType != index )
         index = card.cardType
         switch (index)
            when "1 // events"    then console.log('    events:')
            when "2 // landmarks" then console.log('    landmarks:')
            when "3 // projects"  then console.log('    projects:')
            when "4 // boons"     then console.log('    boons:')
            when "5 // ways"      then console.log('    ways:')
            when "6 // allies"    then console.log('    allies:')
      console.log('      - ' + card.id)

   console.log("")