import React from "react";
import { useEffect } from "react";
import './Home.css'

export default function Home(){
  useEffect(()=>{
    document.title = "Home";
  })
  
  return(
    <div>
      <h1>home pages</h1>
    </div>
  )
}