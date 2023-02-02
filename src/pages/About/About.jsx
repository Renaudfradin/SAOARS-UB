import React from "react";
import "./About.css";
import { Helmet } from "react-helmet-async";

export default function About(params) {
  return(
    <div>
      <Helmet>
        <title>About - Sword Art Online : Unleash Blading - Database</title>
      </Helmet>
      <p>About page</p>
      <p>The Database
        We are players who wish to set up a "guide" to help players in their adventure on the game.
        This website is completed by the contribution of the players of the game Sword Art Online Unleash Blading.
        Made by Players for Players.
      </p>
      <p>Some important dates
      Database Version 1.0
      Decembre 2022
      Opening API Database
      Janvier 2021
      </p>
    </div>
  )
}