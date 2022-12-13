import React from "react";
import { Link } from "react-router-dom";
import defaultImg from '../../assets/img/stuff_303.png';

export default function cardEquipement(props) {
  const id = props.id
  const name = props.name
  const stars = props.stars

  return(
    <div>
      <p>card equipemnt</p>
      <p>{name}</p>
      <img src={defaultImg} alt="" />
      {stars}
      <Link to={`/equipement/${id}`}>{id}</Link>
    </div>
  )
}