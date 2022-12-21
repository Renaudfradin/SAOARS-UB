import React from "react";
import "./cardImaginations.css"

export default function cardImaginations({name,imgImganationDefault,description}) {
  return(
    <div className="layoutImagination">
      <p>{name}</p>
      <img src={imgImganationDefault} alt="" />
      <p>{description}</p>
    </div>
  )
}