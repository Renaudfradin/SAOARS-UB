export type NavItem = {
  to: string;
  icon?: string;
  text?: string;
  textKey?: string;
  mark?: string;
  end?: boolean;
};

export const navItems: NavItem[] = [
  { to: "/", icon: "/ui/nav/icon_main.png", text: "Index", end: true },
  { to: "/banners", icon: "/ui/nav/icon_scout.png", text: "Banner" },
  { to: "/characters", icon: "/ui/nav/icon_character.png", text: "Character" },
  { to: "/weapons", icon: "/ui/nav/icon_weapon.png", text: "Weapon" },
  { to: "/equipments", icon: "/ui/nav/icon_equipment.png", text: "Equipment" },
  { to: "/attacks", icon: "/ui/nav/icon_attack.png", textKey: "nav.attacks" },
  { to: "/abilities", icon: "/ui/nav/icon_ability.png", textKey: "nav.abilities" },
  { to: "/imaginations", icon: "/ui/nav/icon_imagination.png", textKey: "nav.imaginations" },
];

export const moreLinks = [{ to: "/gallery/characters", label: "nav.gallery" }];
