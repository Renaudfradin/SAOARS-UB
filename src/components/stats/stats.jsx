import React from "react";
import "./stats.css"

export default function stats({hp,mp,atk,matk,def,mdef,crit,spd}) {

  return(
    <div className="statsLayout">
      <div className="stat">
        <div className="flexName">
          <p>HP</p>
          <p>{hp}</p>
        </div>
        <div className="barHP"></div>
      </div>
      <div className="stat">
        <div className="flexName">
          <p>MP</p>
          <p>{mp}</p>
        </div>
        <div className="barMP"></div>
      </div>
      <div className="stat">
        <div className="flexName">
          <p>ATK</p>
          <p>{atk}</p>
        </div>
        <div className="barATK"></div>
      </div>
      <div className="stat">
        <div className="flexName">
          <p>MATK</p>
          <p>{matk}</p>
        </div>
        <div className="barMATK"></div>
      </div>
      <div className="stat">
        <div className="flexName">
          <p>DEF</p>
          <p>{def}</p>
        </div>
        <div className="barDEF"></div>
      </div>
      <div className="stat">
        <div className="flexName">
          <p>MDEF</p>
          <p>{mdef}</p>
        </div>
        <div className="barMDEF"></div>
      </div>
      <div className="stat">
        <div className="flexName">
          <p>CRIT</p>
          <p>{crit}</p>
        </div>
        <div className="barCRIT"></div>
      </div>
      <div className="stat">
        <div className="flexName">
          <p>SPD</p>
          <p>{spd}</p>
        </div>
        <div className="barSPD"></div>
      </div>
    </div>
  )
}