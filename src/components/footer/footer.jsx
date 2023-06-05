import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

export default function footer() {
  return (
    <div className="containerFooter">
      <div className="linkBtn">
        <Link to="/about">About</Link>
      </div>
      <div className="infoFooter">
        <p>SAOUB's Database V2 Développer par <a href="https://github.com/Renaudfradin" target="_blank">RenaudFradin</a>.</p>
        <p>Crédits des données/images relatives au jeu Sword Art Online Unleash Blading à Bandai Namco Entertainment Inc. et autres auteurs respectifs.</p>
        <p>Fait par des Joueurs pour des Joueurs.</p>
      </div>
    </div>
  )
}