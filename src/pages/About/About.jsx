import React from "react";
import { Helmet } from "react-helmet-async";

export default function About() {
  return(
    <>
      <Helmet>
        <title>About - Sword Art Online : Unleash Blading - Database</title>
        <meta name="description" content="About - Sword Art Online : Unleash Blading - Database" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.ico" />
      </Helmet>
      <div className="imgMid">
        <div>
          <h2>The Database</h2>
          <p>Nous sommes des joueurs qui souhaitent mettre en place un "guide" pour aider les joueurs dans leur aventure sur le jeu. Ce site web est complété par la contribution des joueurs du jeu Sword Art Online Unleash Blading.</p>
          <p>Créé par des joueurs, pour les joueurs.</p>
        </div>
        <div>
          <h2>Politique de confidentialité</h2>
          <p>Cette politique de confidentialité peut être modifiée à notre discrétion par des ajouts ou suppressions. Votre utilisation continue du site web après toute modification indique que vous acceptez les changements.</p>
          <p>Vous devez vous référer à cette page web, qui affiche la version la plus récente de notre politique de confidentialité.</p>
        </div>
      </div>
    </>
  )
}