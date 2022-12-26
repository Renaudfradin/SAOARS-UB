import React from "react";
import { Link,NavLink } from "react-router-dom";
import imgOpen from "../../assets/img/icon_nav/navigation.webp";
import imgClose from "../../assets/img/icon_nav/navigation_close.webp";
import imgHome from "../../assets/img/icon_nav/icon_main.webp";
import imgBanner from "../../assets/img/icon_nav/icon_scout.webp";
import imgCharacter from "../../assets/img/icon_nav/icon_character.webp";
import imgWeapon from "../../assets/img/icon_nav/icon_weapon.webp";
import imgEquipement from "../../assets/img/icon_nav/icon_equipment.webp";
import imgImaginations from "../../assets/img/icon_nav/icon_scout.webp";
import imgAbility from "../../assets/img/icon_nav/icon_scout.webp";
import "./navbar.css"

export default function Navbar(params) {
  return(
    <div className="layoutNavbar">
      <h3>SAOARS/UB</h3>
      <NavLink to='/' className={({ isActive })=> (isActive ? 'layoutIconNavActive' : 'layoutIconNav')}>
        <img src={imgHome} alt={imgHome} />
        <Link to='/'>Accueil</Link>
      </NavLink>
      <NavLink to='/banners' className={({ isActive })=> (isActive ? 'layoutIconNavActive' : 'layoutIconNav')}>
      <img src={imgBanner} alt={imgBanner} />
        <Link to='/banners'>Banniere</Link>
      </NavLink>
      <NavLink to='/characters' className={({ isActive })=> (isActive ? 'layoutIconNavActive' : 'layoutIconNav')}>
        <img src={imgCharacter} alt={imgCharacter} />
        <Link to='/characters'>Personnage</Link>
      </NavLink>
      <NavLink to='/weapons' className={({ isActive })=> (isActive ? 'layoutIconNavActive' : 'layoutIconNav')}>
        <img src={imgWeapon} alt={imgWeapon} />
        <Link to='/weapons'>Arme</Link>
      </NavLink>
      <NavLink to='/equipements' className={({ isActive })=> (isActive ? 'layoutIconNavActive' : 'layoutIconNav')}>
        <img src={imgEquipement} alt={imgEquipement} />
        <Link to='/equipements'>Equipement</Link>
      </NavLink>
      <NavLink to='/imaginations' className={({ isActive })=> (isActive ? 'layoutIconNavActive' : 'layoutIconNav')}>
        <img src={imgImaginations} alt={imgImaginations} />
        <Link to='/imaginations'>Imaginations</Link>
      </NavLink>
      <NavLink to='/abilitys' className={({ isActive })=> (isActive ? 'layoutIconNavActive' : 'layoutIconNav')}>
        <img src={imgAbility} alt={imgAbility} />
        <Link to='/abilitys'>Capacité</Link>
      </NavLink>
    </div>
  )
}