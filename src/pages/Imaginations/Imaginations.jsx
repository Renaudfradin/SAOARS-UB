import React from "react";
import CardImaginations from "@components/cardImaginations/cardImaginations.jsx";
import imgImganationDefault from "@assets/img/imgDefault/imaginations.jpg"
import { Helmet } from "react-helmet-async";
import useImaginations from "@hook/useImaginations";

export default function contentImagination() {
  const { imaginations } = useImaginations();

  return(
    <div className="cardList">
      <Helmet>
        <title>List Imaginations - Sword Art Online : Unleash Blading - Database</title>
      </Helmet>
      {imaginations.map((imagination)=>(
        <CardImaginations
          key={imagination.idconst}
          name={imagination.name}
          imgImganationDefault={imgImganationDefault}
          description={imagination.description}
        ></CardImaginations>
      ))}
    </div>
  )
}