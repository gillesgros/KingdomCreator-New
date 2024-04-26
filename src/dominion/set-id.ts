export enum SetId {
  ADVENTURES = "adventures",
  ALCHEMY = "alchemy",
  ALLIES = "allies",
  BASE_SET = "baseset",
  BASE_SET_2 = "baseset2",
  BASE_SET_2_ADD = "baseset2add",
  CORNUCOPIA = "cornucopia",
  DARK_AGES = "darkages",
  EMPIRES = "empires",
  GUILDS = "guilds",
  GUILDSCORNUCOPIA = "guildscornucopia",
  HINTERLANDS = "hinterlands",
  HINTERLANDS_2 = "hinterlands2",
  HINTERLANDS_2_ADD = "hinterlands2add",
  INTRIGUE = "intrigue",
  INTRIGUE_2 = "intrigue2",
  INTRIGUE_2_ADD = "intrigue2add",
  MENAGERIE = "menagerie",
  NOCTURNE = "nocturne",
  PLUNDER = "plunder",
  PROMOS = "promos",
  PROSPERITY = "prosperity",
  PROSPERITY_2 = "prosperity2",
  PROSPERITY_2_ADD = "prosperity2add",
  RENAISSANCE = "renaissance",
  SEASIDE = "seaside",
  SEASIDE_2 = "seaside2",
  SEASIDE_2_ADD = "seaside2add",
  PERSONAL = "personal",
  ALL = "all",
  TO_FORCE_RELOAD = "to force reload"
}

export const Set_To_Ignore_Kingdoms = 
    new Set([SetId.PROMOS,
             SetId.PERSONAL]);

export const Sets_To_Ignore_Regroup = 
    new Set([SetId.GUILDSCORNUCOPIA]);

export const Set_To_Ignore_Rules =
    new Set([ SetId.PROMOS,
              SetId.BASE_SET_2_ADD,
              SetId.INTRIGUE_2_ADD,
              SetId.SEASIDE_2_ADD,
              SetId.PROSPERITY_2_ADD,
              SetId.HINTERLANDS_2_ADD,
              SetId.PERSONAL,
]);

export const Set_To_Ignore_Rules_FR =
    new Set([ SetId.PROMOS,
              SetId.BASE_SET_2, 
              SetId.INTRIGUE_2,
              SetId.SEASIDE_2,
              SetId.PROSPERITY_2,
              SetId.HINTERLANDS_2,
              SetId.GUILDSCORNUCOPIA,
              SetId.RENAISSANCE,
              SetId.EMPIRES,
              SetId.NOCTURNE,
              SetId.MENAGERIE,
              SetId.ALLIES,
              SetId.PLUNDER,
]);

export interface VersionOfSet {
    readonly id: SetId,
    readonly idv2: SetId
}

export const MultipleVersionSets:VersionOfSet[]= [
    { id: SetId.BASE_SET,    idv2: SetId.BASE_SET_2 },
    { id: SetId.INTRIGUE,    idv2: SetId.INTRIGUE_2 },
    { id: SetId.SEASIDE,     idv2: SetId.SEASIDE_2 },
    { id: SetId.PROSPERITY,  idv2: SetId.PROSPERITY_2 },
    { id: SetId.HINTERLANDS, idv2: SetId.HINTERLANDS_2 }
];

export const HideMultipleVersionSets = [
    SetId.BASE_SET_2, 
    SetId.INTRIGUE_2,
    SetId.SEASIDE_2,
    SetId.PROSPERITY_2,
    SetId.HINTERLANDS_2,
];