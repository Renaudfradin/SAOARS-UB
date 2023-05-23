import React from "react";
import { useParams } from "react-router-dom";
import imgDefault from "@assets/img/imgDefault/stuff_370.png"
import RenderStart from "@components/renderStars/renderStart";
import Stats from "@components/stats/stats";
import Effect from "@components/effect/effect";
import "./Weapon.css"
import { Helmet } from "react-helmet-async";
import useWeapon from "@hook/useWeapon";

export default function Weapon() {
  const param = useParams();
  const idParam = param.id;
  const { weapon } = useWeapon(idParam)

  return(
    <>
      <Helmet>
        <title>Weapon {idParam}</title>
        <meta name="description" content="List Weapons - Sword Art Online : Unleash Blading - Database" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.ico" />
      </Helmet>
      <div className="imgMid">
        <p>{weapon.name_weapon}</p>
        <img src={imgDefault} alt="" />
        <RenderStart list={false} stars={weapon.stars}/>
        <div className="layoutStat">
          <div className="containerEffect">
            <Effect
              character={false}
              effect={weapon.effect_1}
            ></Effect>
            <Effect
              character={false}
              effect={weapon.effect_2}
            ></Effect>
            <Effect
              character={false}
              effect={weapon.effect_3}
            ></Effect>
          </div>
          <Stats
            stats={{ ...weapon }}
          ></Stats>
        </div>
      </div>
    </>
  )
}