import React from "react";
import CardWeapon from "@components/cardWeapons/cardWeapons.jsx";
import { Helmet } from "react-helmet-async";
import useWeapons from "@hook/useWeapons";

export default function contentWeapons() {
  const { weapons } = useWeapons();

  return (
    <>
      <Helmet>
        <title>List Weapons - Sword Art Online : Unleash Blading - Database</title>
        <meta name="title" content="List Weapons - Sword Art Online : Unleash Blading - Database" />
        <meta name="description" content="List Weapons - Sword Art Online : Unleash Blading - Database" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.ico" />
      </Helmet>
      <div className="imgMid">
        <div className="cardList">
          {weapons.map((weapon) => (
            <CardWeapon
              key={weapon.idw}
              idw={weapon.idw}
              name_weapon={weapon.name_weapon}
              stars={weapon.stars}
              weaponType={weapon.weapon_type_w}
              weaponElement={weapon.weapon_element_w}
            ></CardWeapon>
          ))}
        </div>
      </div>
    </>
  )
}