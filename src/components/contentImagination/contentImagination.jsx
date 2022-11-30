import axios from "axios";
import React, { useEffect, useState } from "react";
import imgImganationDefault from "../../assets/img/imaginations.jpg"

export default function contentImagination(params) {
  const [Imaginations , updateImaginations] = useState([])

  useEffect(()=>{
    axios.get('https://api-saoars.vercel.app/imagination')
      .then((response)=>{
        console.log(response.data.imaginations);
        updateImaginations(response.data.imaginations)
      })
      .catch((error)=>{
        console.log(error);
      })
  }, [])

  return(
    <div>
      {Imaginations.map((imagination)=>(
        <div key={imagination.idconst}>
          <p>{imagination.name}</p>
          <img src={imgImganationDefault} alt="" />
          <p>{imagination.description}</p>
        </div>
      ))}
    </div>
  )
}