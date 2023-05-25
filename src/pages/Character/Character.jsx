import React,{ useState } from "react";
import { useParams } from "react-router-dom";
import EnhanceBtn from "@assets/img/btn_enhance_mode.png";
import imgPartner from "@assets/special_partner.png";
import RenderStart from "@components/renderStars/renderStart.jsx";
import Stats from "@components/stats/stats";
import Effect from "@components/effect/effect";
import { Helmet } from "react-helmet-async";
import useCharacter from "@hook/useCharacter";
import "./Character.css";

export default function Character() {
  const param = useParams();
  const idParam = param.id;
  const [enhance, updateEnhance] = useState(true);
  const { character } = useCharacter(idParam);

  function enhanceMode() {
    updateEnhance(!enhance);
  }

  return(
    <>
      <Helmet>
        <title>Character {idParam}</title>
        <meta name="description" content="List Characters - Sword Art Online : Unleash Blading - Database" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.ico" />
      </Helmet>
      <div className="imgMid">
        <div className="infoCharacterss">
          <div className="bg1">
            <div className="bg2">
              <p>{character.name_characters} {character.description}</p>
              <img src={character.img} alt={character.img} />
            </div>
          </div>
        </div>
        <div className="infoCharacters">
          <div className="starrss">
            <RenderStart list={false} stars={character.stars} />
          </div>
        </div>
        { character.enhance_atk1 ?
          <span>
            <img className="imgEnhance" onClick={enhanceMode} src={EnhanceBtn} alt={EnhanceBtn} />
          </span>
          : null }
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
            stats={{ ...character }}
          ></Stats>
        </div>
        <div className="profileInfo">
          <div className="profile">
            <h3 className="titleProfil">Description</h3>
            <p>{character.profile}</p>
          </div>
          {/* <div className="partner">
            <img src={imgPartner} alt={imgPartner} />
            <p>{character.special_partner}</p>
          </div> */}
        </div>
      </div>
    </>
  )
}