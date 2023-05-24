import React from "react";
import { Helmet } from "react-helmet-async";
import img404 from "@assets/img/bunis.gif"
import "./404.css";

export default function notFound(){
  return(
    <div className="containerNotFound">
      <Helmet>
        <title>Not found - Sword Art Online : Unleash Blading - Database</title>
        <meta name="description" content="Not found - Sword Art Online : Unleash Blading - Database" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.ico" />
      </Helmet>
      <div>
        <h1>"CODE:404"</h1>
        <img src={img404} alt={img404} />
      </div>
    </div>
  )
}