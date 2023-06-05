import iconHome from "../../assets/img/icon_nav/icon_main.svg";
import iconBanners from "../../assets/img/icon_nav/icon_scout.svg";
import iconCharacters from "../../assets/img/icon_nav/icon_weapon.svg";
import iconWeapons from "../../assets/img/icon_nav/icon_weapon.svg";
import iconEquipements from "../../assets/img/icon_nav/icon_equipment.svg";
import iconAbilmitys from "../../assets/img/icon_nav/icon_quest.svg";

export const items = [
  { url: "/", imgBtn: iconHome, text: "Accueil" },
  { url: "/banners", imgBtn: iconBanners, text: "Banniere" },
  { url: "/characters", imgBtn: iconCharacters, text: "Personnage" },
  { url: "/weapons", imgBtn: iconWeapons, text:"Arme" },
  { url: "/equipements", imgBtn: iconEquipements, text: "Equipement" },
  { url: "/abilitys", imgBtn: iconAbilmitys, text:"Capacité" }
]