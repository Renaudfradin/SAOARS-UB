import axios from "axios";
import React, { useEffect, useState } from "react";
import CardImaginations from "../../components/cardImaginations/cardImaginations.jsx";
import imgImganationDefault from "../../assets/img/imgDefault/imaginations.jpg"
import { Helmet } from "react-helmet-async";

export default function contentImagination() {
  const [Imaginations , updateImaginations] = useState([])

  useEffect(()=>{
    axios.get('https://api-saoars.vercel.app/imagination')
      .then((response)=>{
        updateImaginations(response.data.imaginations)
      })
      .catch((error)=>{
        console.log(error);
      })
  }, [])

  return(
    <div className="cardList">
      <Helmet>
        <title>List Imaginations - Sword Art Online : Unleash Blading - Database</title>
      </Helmet>
      {Imaginations.map((imagination)=>(
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