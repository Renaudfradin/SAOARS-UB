import React from "react";

export default function cardImaginations(props) {
  const name = props.name
  const imgImganationDefault = props.imgImganationDefault
  const description = props.description
  return(
    <div>
      <p>{name}</p>
      <img src={imgImganationDefault} alt="" />
      <p>{description}</p>
    </div>
  )
}