import React from "react";
import "./stats.css";

export default function stats({ stats }) {
  return(
    <div className="statsLayout">
      <div className="stat">
        <div className="flexName">
          <p>HP</p>
          <p>{stats.hp}</p>
        </div>
        <div className="barHP"></div>
      </div>
      <div className="stat">
        <div className="flexName">
          <p>MP</p>
          <p>{stats.mp}</p>
        </div>
        <div className="barMP"></div>
      </div>
      <div className="stat">
        <div className="flexName">
          <p>ATK</p>
          <p>{stats.atk}</p>
        </div>
        <div className="barATK"></div>
      </div>
      <div className="stat">
        <div className="flexName">
          <p>MATK</p>
          <p>{stats.matk}</p>
        </div>
        <div className="barMATK"></div>
      </div>
      <div className="stat">
        <div className="flexName">
          <p>DEF</p>
          <p>{stats.def}</p>
        </div>
        <div className="barDEF"></div>
      </div>
      <div className="stat">
        <div className="flexName">
          <p>MDEF</p>
          <p>{stats.mdef}</p>
        </div>
        <div className="barMDEF"></div>
      </div>
      <div className="stat">
        <div className="flexName">
          <p>CRIT</p>
          <p>{stats.crit}</p>
        </div>
        <div className="barCRIT"></div>
      </div>
      <div className="stat">
        <div className="flexName">
          <p>SPD</p>
          <p>{stats.spd}</p>
        </div>
        <div className="barSPD"></div>
      </div>
    </div>
  )
}