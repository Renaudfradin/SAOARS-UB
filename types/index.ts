export type PaginationMeta = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
};

export type PaginationLinks = {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: PaginationMeta;
  links: PaginationLinks;
};

export type BannerData = {
  id: string;
  name: string;
  slug: string;
  image: string;
  created_at: string;
  updated_at?: string;
  from?: string;
  to?: string;
  characters?: string[];
};

export type BannersApiResponse = BannerData[] | PaginatedResponse<BannerData>;

export type CharacterData = {
  id: string;
  name: string;
  slug: string;
  image?: string;
  rarity?: number;
  element?: string;
  weapon_type?: string;
  created_at: string;
  updated_at?: string;
};

export type CharactersApiResponse =
  | CharacterData[]
  | PaginatedResponse<CharacterData>;

export type EquipmentData = {
  id: string;
  name: string;
  slug: string;
  image?: string;
  type?: string;
  rarity?: number;
  created_at: string;
  updated_at?: string;
};

export type EquipmentApiResponse =
  | EquipmentData[]
  | PaginatedResponse<EquipmentData>;

export type WeaponData = {
  id: string;
  name: string;
  slug: string;
  image?: string;
  type?: string;
  rarity?: number;
  created_at: string;
  updated_at?: string;
};

export type WeaponsApiResponse = WeaponData[] | PaginatedResponse<WeaponData>;

export type SearchParams = {
  page?: string;
  search?: string;
  filter?: string;
  sort?: string;
};

export type PageProps<T = Record<string, unknown>> = {
  params?: T;
  searchParams?: SearchParams;
};

export type SlugPageProps = PageProps<{ slug: string }>;

export type ApiResponse<T> = T | { data: T } | PaginatedResponse<T>;

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export type ErrorState = {
  message: string;
  code?: number;
  details?: string;
};
