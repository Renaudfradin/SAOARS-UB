import React from "react";
import { NavLink } from "react-router-dom";
import imgOpen from "@assets/img/icon_nav/navigation.svg";
import imgClose from "@assets/img/icon_nav/navigation_close.svg";
import imgHome from "@assets/img/icon_nav/icon_main.svg";
import imgBanner from "@assets/img/icon_nav/icon_scout.svg";
import imgCharacter from "@assets/img/icon_nav/icon_character.svg";
import imgWeapon from "@assets/img/icon_nav/icon_weapon.svg";
import imgEquipement from "@assets/img/icon_nav/icon_equipment.svg";
import imgImaginations from "@assets/img/icon_nav/icon_item.svg";
import imgAbility from "@assets/img/icon_nav/icon_quest.svg";
import "./navbar.css"

export default function Navbar(params) {
  return(
    <div className="layoutNavbar">
      <div className="layoutTitle">
        <h3>SAOARS/UB</h3>
        <p>Database</p>
      </div>
      <NavLink to='/' className={({ isActive })=> (isActive ? 'layoutIconNavActive' : 'layoutIconNav')}>
        <img src={imgHome} alt={imgHome} />
        <p>Accueil</p>
      </NavLink>
      <NavLink to='/banners' className={({ isActive })=> (isActive ? 'layoutIconNavActive' : 'layoutIconNav')}>
      <img src={imgBanner} alt={imgBanner} />
        <p>Banniere</p>
      </NavLink>
      <NavLink to='/characters' className={({ isActive })=> (isActive ? 'layoutIconNavActive' : 'layoutIconNav')}>
        <img src={imgCharacter} alt={imgCharacter} />
        <p>Personnage</p>
      </NavLink>
      <NavLink to='/weapons' className={({ isActive })=> (isActive ? 'layoutIconNavActive' : 'layoutIconNav')}>
        <img src={imgWeapon} alt={imgWeapon} />
        <p>Arme</p>
      </NavLink>
      <NavLink to='/equipements' className={({ isActive })=> (isActive ? 'layoutIconNavActive' : 'layoutIconNav')}>
        <img src={imgEquipement} alt={imgEquipement} />
        <p>Equipement</p>
      </NavLink>
      <NavLink to='/imaginations' className={({ isActive })=> (isActive ? 'layoutIconNavActive' : 'layoutIconNav')}>
        <img src={imgImaginations} alt={imgImaginations} />
        <p>Imaginations</p>
      </NavLink>
      <NavLink to='/abilitys' className={({ isActive })=> (isActive ? 'layoutIconNavActive' : 'layoutIconNav')}>
        <img src={imgAbility} alt={imgAbility} />
        <p>Capacité</p>
      </NavLink>
    </div>
  )
}