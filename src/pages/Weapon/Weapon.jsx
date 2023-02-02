import axios from "axios";
import React from "react";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import imgDefault from "../../assets/img/imgDefault/stuff_370.png"
import RenderStart from "../../components/renderStars/renderStart";
import Stats from "../../components/stats/stats";
import Effect from "../../components/effect/effect";
import "./Weapon.css"
import { Helmet } from "react-helmet-async";

export default function Weapon() {
  const param = useParams();
  const idParam = param.id;
  const [weapon , updateWeapon] = useState([]);

  useEffect(() => {
    axios.get(`https://api-saoars.vercel.app/weapon/${idParam}`)
    .then((response) => {
      updateWeapon(response.data.weapon);
    })
  }, [])

  return(
    <div>
      <Helmet>
        <title>Weapon {idParam}</title>
      </Helmet>
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
          hp={weapon.hp_w}
          mp={weapon.mp_w}
          atk={weapon.atk_w}
          matk={weapon.matk_w}
          def={weapon.def_w}
          mdef={weapon.mdef_w}
          crit={weapon.crit_w}
          spd={weapon.spd_w}
        ></Stats>
      </div>
    </div>
  )
}