import React from "react";
import "./404.css";
import { Helmet } from "react-helmet-async";

export default function notFound(){
  return(
    <div>
      <Helmet>
        <title>404 - Sword Art Online : Unleash Blading - Database</title>
      </Helmet>
      <h1>"CODE:404"</h1>
    </div>
  )
}