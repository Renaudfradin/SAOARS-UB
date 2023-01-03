import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import imgDefault from "../../assets/img/imgDefault/character_2502.png";
import RenderStart from "../../components/renderStars/renderStart.jsx";
import EnhanceBtn from "../../assets/img/btn_enhance_mode.png";
import RenderTypeAtk from "../../components/renderTypeAtk/renderTypeAtk.jsx"
import "./Character.css"

export default function Character() {
  const param = useParams();
  const idParam = param.id;
  const [character , updateCharacter] = useState([]);
  const [enhance, updateEnhance] = useState(true);

  useEffect(() => {
    //console.log(idParam);
    axios.get(`https://api-saoars.vercel.app/perso/${idParam}`)
    .then((response) => {
      updateCharacter(response.data.character[0]);
      console.log(response.data.character[0]);
    })
    .catch((error)=>{
      console.log(error);
    })
  }, [])

  useEffect(()=>{
    document.title = `${character.name_characters} [${character.description}]`;
  })

  function enhanceMode() {
    updateEnhance(!enhance);
  }

  return(
    <div>
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
            <div>
              <div className="containerAtk">
                <div className="">
                  <RenderTypeAtk type={character.atk1_type} />
                </div>
                <div className="">
                  <p>{character.atk1}</p>
                  <p>{character.description_atk1}</p>
                </div>
              </div>
              <p>{character.mp_atk1}</p>
            </div>
            <div>
              <div className="containerAtk">
                <div>
                  <RenderTypeAtk type={character.atk2_type} />
                </div>
                <div>
                  <p>{character.atk2}</p>
                  <p>{character.description_atk2}</p>
                </div>
              </div>
              <p>{character.mp_atk2}</p>
            </div>
            <div>
              <div className="containerAtk"> 
                <div>
                  <RenderTypeAtk type={character.atk3_type} />
                </div>
                <div>
                  <p>{character.atk3}</p>
                  <p>{character.description_atk3}</p>
                </div>
              </div>
              <p>{character.mp_atk3}</p>
            </div>
            <div>
              <p>{character.ultime}</p>
              <p>{character.ultime_description}</p>
            </div>
          </div> 
          : 
          <div className="atkLayout">
            <p>{character.enhance_atk1}</p>
            <p>{character.enhance_atk1_description}</p>
            <p>{character.enhance_atk1_mp}</p>

            <p>{character.enhance_atk2}</p>
            <p>{character.enhance_atk2_description}</p>
            <p>{character.enhance_atk2_mp}</p>

            <p>{character.enhance_ultime}</p>
            <p>{character.enhance_ultime_description}</p>
            <p>{character.enhance_ultime_mp}</p>
          </div> 
        }
        <div className="statsLayout">
          <div className="stat">
            <div className="flexName">
              <p>HP</p>
              <p>{character.hp}</p>
            </div>
            <div className="barHP"></div>
          </div>
          <div className="stat">
            <div className="flexName">
              <p>MP</p>
              <p>{character.mp}</p>
            </div>
            <div className="barMP"></div>
          </div>
          <div className="stat">
            <div className="flexName">
              <p>ATK</p>
              <p>{character.atk}</p>
            </div>
            <div className="barATK"></div>
          </div>
          <div className="stat">
            <div className="flexName">
              <p>MATK</p>
              <p>{character.matk}</p>
            </div>
            <div className="barMATK"></div>
          </div>
          <div className="stat">
            <div className="flexName">
              <p>DEF</p>
              <p>{character.def}</p>
            </div>
            <div className="barDEF"></div>
          </div>
          <div className="stat">
            <div className="flexName">
              <p>MDEF</p>
              <p>{character.mdef}</p>
            </div>
            <div className="barMDEF"></div>
          </div>
          <div className="stat">
            <div className="flexName">
              <p>CRIT</p>
              <p>{character.crit}</p>
            </div>
            <div className="barCRIT"></div>
          </div>
          <div className="stat">
            <div className="flexName">
              <p>SPD</p>
              <p>{character.spd}</p>
            </div>
            <div className="barSPD"></div>
          </div>
        </div>
      </div>
      <p>{character.special_partner}</p>
    </div>
  )
}