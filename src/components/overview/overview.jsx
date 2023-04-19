import React, { useState } from "react";
import bankLogo from "@assets/img/banklogo2.png";
import "./overview.css";

export default function overview() {
  const [bannerInfo, updateBannerInfo] = useState(100);
  const [characterInfo, updateChracterInfo] = useState(100);
  const [weaponInfo, updateWeaponInfo] = useState(100);
  const [equipementInfo, updateEquipementInfo] = useState(100);
  const [abilityInfo, updateAbilityInfo] = useState(100);

  return (
    <div className="containerOverview">
      <p className="pOverview">DATABASE <span>:overview</span></p>
      <div className="divOverview"> 
        <div className="infoOverviewLeft">
          <p>{bannerInfo} <span>banner</span></p>
          <p>{characterInfo} <span>character</span></p>
          <p>{weaponInfo} <span>weapon</span></p>
        </div>
        <img src={bankLogo} alt="" />
        <div className="infoOverviewRight">
          <p>{equipementInfo} <span>equipement</span></p>
          <p>100 <span>imaginations</span></p>
          <p>{abilityInfo} <span>abilitys</span></p>
        </div>
      </div>
    </div>
  )
}