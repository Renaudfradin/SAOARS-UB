import React from "react"
import Router from "./Router/Router"
import { HelmetProvider , Helmet } from "react-helmet-async";
import "./app.css"

export default function App() {
  return (
    <HelmetProvider>
      <Router></Router>
      <Helmet>
        <meta
          name="description"
          content="Unofficial Database of the game Sword Art Online Unleash Blading."
        />
      </Helmet>
    </HelmetProvider>
  )
}
