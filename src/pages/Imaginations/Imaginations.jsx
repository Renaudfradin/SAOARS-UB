import React from "react";
import CardImaginations from "@components/cardImaginations/cardImaginations.jsx";
import imgImganationDefault from "@assets/img/imgDefault/imaginations.jpg"
import { Helmet } from "react-helmet-async";
import useImaginations from "@hook/useImaginations";

export default function contentImagination() {
  const { imaginations } = useImaginations();

  return (
    <>
      <Helmet>
        <title>List Imaginations - Sword Art Online : Unleash Blading - Database</title>
        <meta name="description" content="List Imaginations - Sword Art Online : Unleash Blading - Database" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.ico" />
      </Helmet>
      <div className="imgMid">
        <div className="cardList">
          {imaginations.map((imagination)=>(
            <CardImaginations
              key={imagination.idconst}
              name={imagination.name}
              imgImganationDefault={imgImganationDefault}
              description={imagination.description}
            ></CardImaginations>
          ))}
        </div>
      </div>
    </>
  )
}