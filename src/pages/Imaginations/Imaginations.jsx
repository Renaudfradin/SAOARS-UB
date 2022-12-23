import axios from "axios";
import React, { useEffect, useState } from "react";
import CardImaginations from "../../components/cardImaginations/cardImaginations.jsx";
import imgImganationDefault from "../../assets/img/imgDefault/imaginations.jpg"
import "./Imaginations.css"

export default function contentImagination(params) {
  const [Imaginations , updateImaginations] = useState([])

  useEffect(()=>{
    document.title = "List Imaginations";

    axios.get('https://api-saoars.vercel.app/imagination')
      .then((response)=>{
        updateImaginations(response.data.imaginations)
      })
      .catch((error)=>{
        console.log(error);
      })
  }, [])

  return(
    <div className="layoutImaginations">
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