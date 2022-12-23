import React from "react";
import { Link } from "react-router-dom";
import imgOpen from "../../assets/img/icon_nav/navigation.webp"
import imgClose from "../../assets/img/icon_nav/navigation_close.webp"
import "./navbar.css"

export default function Navbar(params) {
  return(
    <div className="layoutNavbar">
      <h3>SAOARS/UB</h3>
      <div>
        <img src="" alt="" />
        <Link to='/'>Accueil</Link>
      </div>
      <div>
        <Link to='/banners'>Banniere</Link>
      </div>
      <div>
      <Link to='/characters'>Personnage</Link>
      </div>
      <div>
        <Link to='/weapons'>Arme</Link>
      </div>
      <div>
        <Link to='/equipements'>Equipement</Link>
      </div>
      <div>
        <Link to='/imaginations'>Imaginations</Link>
      </div>
      <div>
        <Link to='/abilitys'>Capacité</Link>
      </div>
    </div>
  )
}