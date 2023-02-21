import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import imgDefault from "@assets/img/imgDefault/character_2502.png";
import RenderStart from "@components/renderStars/renderStart.jsx";
import EnhanceBtn from "@assets/img/btn_enhance_mode.png";
import Stats from "@components/stats/stats";
import Effect from "@components/effect/effect";
import "./Character.css";
import { Helmet } from "react-helmet-async";
import useCharacter from "@hook/useCharacter";

export default function Character() {
  const param = useParams();
  const idParam = param.id;
  const [enhance, updateEnhance] = useState(true);
  const { character } = useCharacter(idParam);

  function enhanceMode() {
    updateEnhance(!enhance);
  }

  return(
    <div>
      <Helmet>
        <title>Character {idParam}</title>
      </Helmet>
      <div className="infoCharacters">
        <div className="nameCharacter">
          <p>{character.name_characters}</p>
          <p>{character.description}</p>
        </div>
        <img className="imgCharacters" src={imgDefault} alt={imgDefault} />
        <RenderStart list={false} stars={character.stars} />
        <p>{character.profile}</p>
      </div>
      { character.enhance_atk1 ? 
        <span>
          <img className="imgEnhance" onClick={enhanceMode} src={EnhanceBtn} alt={EnhanceBtn} />
        </span>
        :
        ""
      }
      <div className="layoutAtkStat">
        {enhance ? 
          <div className="atkLayout">
            <Effect
              character={true}
              typeAtk={character.atk1_type}
              title={character.atk1}
              description={character.description_atk1}
              mp={character.mp_atk1}
            ></Effect>
            <Effect
              character={true}
              typeAtk={character.atk2_type}
              title={character.atk2}
              description={character.description_atk2}
              mp={character.mp_atk2}
            ></Effect>
            <Effect
              character={true}
              typeAtk={character.atk3_type}
              title={character.atk3}
              description={character.description_atk3}
              mp={character.mp_atk3}
            ></Effect>
            <Effect
              character={true}
              typeAtk={"U"}
              title={character.ultime}
              description={character.ultime_description}
            ></Effect>
          </div> 
          : 
          <div className="atkLayout">
            <Effect
              character={true}
              title={character.enhance_atk1}
              description={character.enhance_atk1_description}
              mp={character.enhance_atk1_mp}
            ></Effect>
            <Effect
              character={true}
              title={character.enhance_atk2}
              description={character.enhance_atk2_description}
              mp={character.enhance_atk2_mp}
            ></Effect>
            <Effect
              character={true}
              title={character.enhance_ultime}
              description={character.enhance_ultime_description}
              mp={character.enhance_ultime_mp}
            ></Effect>
          </div> 
        }
        <Stats 
          hp={character.hp}
          mp={character.mp}
          atk={character.atk}
          matk={character.matk}
          def={character.def}
          mdef={character.mdef}
          crit={character.crit}
          spd={character.spd}
        ></Stats>
      </div> 
      <p>{character.special_partner}</p>
    </div>
  )
}