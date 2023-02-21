import React from "react";
import "./About.css";
import { Helmet } from "react-helmet-async";

export default function About() {
  return(
    <div className="containerAbout">
      <Helmet>
        <title>About - Sword Art Online : Unleash Blading - Database</title>
      </Helmet>
      <div>
        <h2>The Database</h2>
        <p>We are players who wish to set up a "guide" to help players in their adventure on the game.This website is completed by the contribution of the players of the game Sword Art Online Unleash Blading.</p>
        <p>Made by Players for Players.</p>
      </div>
      <div>
        <h2>Privacy Policy</h2>
        <p>This Privacy Policy may be changed at our discretion forms of additions or deletions.Your continued use of the website after any changes indicates that you accept the changes.</p>
        <p>You must refer to this web page, which displays the most recent version of our privacy policy.</p>
      </div>
    </div>
  )
}