export type ListResource =
  | "characters"
  | "weapons"
  | "equipments"
  | "banners"
  | "abilities"
  | "attacks"
  | "imaginations"
  | "home-backgrounds"
  | "home-characters";

export type DetailResource =
  | "character"
  | "weapon"
  | "equipment"
  | "banner"
  | "ability"
  | "attack"
  | "imagination";

export type PageMeta = {
  last_page?: number;
  total?: number;
};

export type Page<T> = {
  data: T[];
  meta?: PageMeta;
};

export type ListSeed<T extends ApiRecord = ApiRecord> = {
  initialPage?: Page<T>;
  seededAt?: number;
};

export type StatKey = "hp" | "mp" | "atk" | "matk" | "def" | "mdef" | "crit" | "spd";

export type StatValues = Partial<Record<StatKey, number | string | null>>;

export type StatBlock = StatValues & {
  stage: number;
};

export type LocaleLine = {
  name?: string;
  description?: string;
};

export type SkillRef = {
  id?: number | string;
  slug?: string;
  name?: string;
  description?: string;
  type_atk?: string | null;
  mp_cost?: number | string | null;
};

export type ApiRecord = {
  id?: number | string;
  slug?: string;
  name?: string;
  description?: string;
  image?: string | null;
  image2?: string | null;
  start?: number | string | null;
  element?: string | null;
  type?: string | null;
  type_atk?: string | null;
  mp_cost?: number | string | null;
  type_equipment?: string | null;
  element_weapons?: string | null;
  weapon_type?: string | null;
  artwork?: string | null;
  artwork_thumbnail?: string | null;
  artwork_large?: string | null;
  artwork_limit_break?: string | null;
  artwork_limit_break_thumbnail?: string | null;
  image_large?: string | null;
  image_fallback?: string | null;
  person?: string | null;
  person_key?: string | null;
  world?: string | number | null;
  world_name?: string | null;
  profile?: string | null;
  available_locales?: string[];
};

export type CharacterListItem = ApiRecord & {
  atk1?: string | null;
  atk2?: string | null;
  atk3?: string | null;
};

export type CharacterDetail = ApiRecord &
  StatValues & {
    stats?: StatBlock[];
    locales?: Record<string, LocaleLine>;
    weapon?: {
      slug?: string;
      image?: string | null;
      name?: string;
      element?: string | null;
      type?: string | null;
    } | null;
    banner?: {
      image?: string | null;
      slug?: string;
      name?: string | null;
    } | null;
    special_partner?: { name?: string; slug?: string } | null;
    atk1?: SkillRef | null;
    atk2?: SkillRef | null;
    atk3?: SkillRef | null;
    enhance_atk?: SkillRef | null;
    enhance_atk2?: SkillRef | null;
    ultime?: string;
    ultime_description?: string;
    enhance?: string;
  };

export type WeaponSkillLine = { lb: number; text?: string };

export type WeaponSkill = {
  slot: number | string;
  name?: string;
  lines: WeaponSkillLine[];
};

export type WeaponDetail = ApiRecord &
  StatValues & {
    stats?: StatBlock[];
    skills?: WeaponSkill[];
    locales?: Record<string, LocaleLine>;
    fanadata_id?: string | number | null;
    characters_id?: {
      slug?: string;
      image?: string | null;
      image2?: string | null;
      description?: string;
      name?: string;
      element?: string | null;
      weapon_type?: string | null;
    } | null;
  };

export type EquipmentDetail = ApiRecord &
  StatValues & {
    stats?: StatBlock[];
    locales?: Record<string, LocaleLine>;
    effect_1?: string | null;
    effect_2?: string | null;
  };

export type BannerCharacter = {
  id?: number | string;
  slug?: string;
  image?: string | null;
  name?: unknown;
};

export type BannerDetail = ApiRecord & {
  from?: string | null;
  to?: string | null;
  characters?: BannerCharacter[];
};

export type AbilityDetail = ApiRecord & {
  descripton?: string;
};

export type AttackDetail = ApiRecord;

export type ImaginationDetail = ApiRecord & {
  character?: string | null;
};

export type SiteStats = {
  Banner?: number;
  Character?: number;
  Weapon?: number;
  Equipment?: number;
};

export type ArtworkCard = {
  key: string;
  filter?: string | null;
  filterLabel?: string | null;
  thumbnail?: string | null;
  large?: string | null;
  title?: string | null;
  subtitle?: string | null;
};

export class ApiError extends Error {
  response: { status: number; headers: { "retry-after": string } };

  constructor(status: number, headers: Headers) {
    super(`HTTP ${status}`);
    this.name = "ApiError";
    this.response = {
      status,
      headers: { "retry-after": headers.get("retry-after") || "" },
    };
  }
}
