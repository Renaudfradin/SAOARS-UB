import React from "react";
import CardWeapon from "@components/cardWeapons/cardWeapons.jsx";
import RenderStart from "@components/renderStars/renderStart.jsx";
import imgWeaponDefault from "@assets/img/imgDefault/stuff_370.png"
import { Helmet } from "react-helmet-async";
import useWeapons from "@hook/useWeapons";

export default function contentWeapons() {
  const { weapons } = useWeapons();

  return (
    <>
      <Helmet>
        <title>List Weapons - Sword Art Online : Unleash Blading - Database</title>
      </Helmet>
      <div className="imgHeader">
        <div className="leftHeader" />
        <div className="midHeader" />
        <div className="rightHeader" />
      </div>
      <div className="imgMid">
        <div className="cardList">
          {weapons.map((weapon)=>(
            <CardWeapon
              key={weapon.idw}
              idw={weapon.idw}
              name_weapon={weapon.name_weapon}
              imgWeaponDefault={imgWeaponDefault}
              stars={<RenderStart list={true} stars={weapon.stars} />}
            ></CardWeapon>
          ))}
        </div>
      </div>
      <div className="imgFooter">
        <div className="leftFooter" />
        <div className="midFooter" />
        <div className="rightFooter" />
      </div>
    </>
  )
}