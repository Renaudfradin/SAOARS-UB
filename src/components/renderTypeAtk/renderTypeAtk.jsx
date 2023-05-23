import AIcon from "@assets/img/icon_atk/icon_assult.svg"
import BIcon from "@assets/img/icon_atk/icon_break.svg"
import CIcon from "@assets/img/icon_atk/icon_charge.svg"
import EIcon from "@assets/img/icon_atk/icon_enhance.svg"
import EMIcon from "@assets/img/icon_atk/icon_enhance-1.svg"
import DIcon from "@assets/img/icon_atk/icon_debuff.svg"
import HIcon from "@assets/img/icon_atk/icon_heal.svg"
import SkillImg from "@assets/img/icon_atk/skill_i.svg"

export default function renderTypeAtk({type}){
  function renderTypeAtks(type) {
    switch (type) {
      case "A":
        return AIcon
      case "B":
        return BIcon
      case "C":
        return CIcon
      case "D":
        return DIcon
      case "E":
        return EMIcon
      case "EM":
        return EIcon
      case "H":
        return HIcon
      case "U":
        return SkillImg
      default:
        return null
    }
  }

  return(<img src={renderTypeAtks(type)} alt={renderTypeAtks(type)}/>)
}