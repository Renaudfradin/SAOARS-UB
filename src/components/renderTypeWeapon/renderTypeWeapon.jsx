import React from "react";
import swordDark from "@assets/img/icon_typeCharacter/sword_dark1.svg"
import swordEarth from "@assets/img/icon_typeCharacter/sword_earth1.svg"
import swordFire from "@assets/img/icon_typeCharacter/sword_fire1.svg"
import swordLight from "@assets/img/icon_typeCharacter/sword_light1.svg"
import swordNeutre from "@assets/img/icon_typeCharacter/sword_none1.svg"
import swordWater from "@assets/img/icon_typeCharacter/sword_water1.svg"
import swordWind from "@assets/img/icon_typeCharacter/sword_wind1.svg"
import rapierDark from "@assets/img/icon_typeCharacter/rapier_dark.svg"
import rapierEarth from "@assets/img/icon_typeCharacter/rapier_earth.svg"
import rapierFire from "@assets/img/icon_typeCharacter/rapier_fire.svg"
import rapierLight from "@assets/img/icon_typeCharacter/rapier_light.svg"
import rapierNeutre from "@assets/img/icon_typeCharacter/rapier_none.svg"
import rapierWater from "@assets/img/icon_typeCharacter/rapier_water.svg"
import rapierWind from "@assets/img/icon_typeCharacter/rapier_wind.svg"
import riffleDark from "@assets/img/icon_typeCharacter/riffle_dark.svg"
import riffleEarth from "@assets/img/icon_typeCharacter/riffle_earth.svg"
import riffleNeutre from "@assets/img/icon_typeCharacter/riffle_none.svg"
import riffleWind from "@assets/img/icon_typeCharacter/riffle_wind.svg"
import maceDark from "@assets/img/icon_typeCharacter/mace_dark.svg"
import maceWind from "@assets/img/icon_typeCharacter/mace_wind.svg"
import dualbladeDark from "@assets/img/icon_typeCharacter/dualblade_dark.svg"
import dualbladeEarth from "@assets/img/icon_typeCharacter/dualblade_earth.svg"
import dualbladeFire from "@assets/img/icon_typeCharacter/dualblade_fire.svg"
import dualbladeLight from "@assets/img/icon_typeCharacter/dualblade_light.svg"
import dualbladeNeutre from "@assets/img/icon_typeCharacter/dualblade_none.svg"
import dualbladeWater from "@assets/img/icon_typeCharacter/dualblades_water.svg"
import dualbladeWind from "@assets/img/icon_typeCharacter/dualblade_wind.svg"
import bowEarth from "@assets/img/icon_typeCharacter/bow_earth.svg"
import bowFire from "@assets/img/icon_typeCharacter/bow_fire.svg"
import bowLight from "@assets/img/icon_typeCharacter/bow_light.svg"
import bowNeutre from "@assets/img/icon_typeCharacter/bow_void.svg"
import bowWater from "@assets/img/icon_typeCharacter/bow_water.svg"
import bowWind from "@assets/img/icon_typeCharacter/bow_wind.svg"
import daggerEarth from "@assets/img/icon_typeCharacter/dagger_earth.svg"
import daggerFire from "@assets/img/icon_typeCharacter/dagger_fire.svg"
import daggerLight from "@assets/img/icon_typeCharacter/dagger_light.svg"
import daggerNeutre from "@assets/img/icon_typeCharacter/dagger_void.svg"
import daggerWater from "@assets/img/icon_typeCharacter/dagger_water.svg"
import daggerWind from "@assets/img/icon_typeCharacter/dagger_wind.svg"
import daggerDark from "@assets/img/icon_typeCharacter/dagger_dark.svg"

export default function renderTypeWeapon({weapon_type, character_type}) {
  const type = weapon_type.concat(' ', character_type);
  function renderTypeWeapon(type) {
    switch (type) {
      case "epée une main neutre":
        return swordNeutre
      case "epée une main terre":
        return swordEarth
      case "epée une main feu":
        return swordFire
      case "epée une main lumiere":
        return swordLight
      case "epée une main ténèbres":
        return swordDark
      case "epée une main vent":
        return swordWind
      case "epée une main eau":
        return swordWater   
      case "rapière neutre":
        return rapierNeutre
      case "rapière terre":
        return rapierEarth
      case "rapière feu":
        return rapierFire
      case "rapière lumiere":
        return rapierLight
      case "rapière ténèbres":
        return rapierDark
      case "rapière vent":
        return rapierWind
      case "rapière eau":
        return rapierWater
      case "2 epée neutre":
        return dualbladeNeutre
      case "2 epée terre":
        return dualbladeEarth
      case "2 epée feu":
        return dualbladeFire
      case "2 epée lumiere":
        return dualbladeLight
      case "2 epée ténèbres":
        return dualbladeDark
      case "2 epée vent":
        return dualbladeWind
      case "2 epée eau":
        return dualbladeWater
      case "dague neutre": 
        return daggerNeutre
      case "dague terre":
        return daggerEarth
      case "dague feu":
        return daggerFire
      case "dague lumiere":
        return daggerLight
      case "dague ténèbres":
        return daggerDark
      case "dague vent":
        return daggerWind
      case "dague eau":
        return daggerWater    
      case "arc neutre":
        return bowNeutre
      case "arc terre":
        return bowEarth
      case "arc feu":
        return bowFire
      case "arc lumiere":
        return bowLight
      case "arc vent":
        return bowWind
      case "arc eau":
        return bowWater
      case "fusil neutre":
        return riffleNeutre
      case "fusil terre":
        return riffleEarth
      case "fusil ténèbres":
        return riffleDark
      case "fusil vent":
        return riffleWind
      case "massue ténèbres":
        return maceDark
      case "massue vent":
        return maceWind
    }
  }
  return(<img src={renderTypeWeapon(type)} alt="" />)
}