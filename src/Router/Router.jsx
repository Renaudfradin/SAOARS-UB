import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home.jsx";
import Weapons from "../pages/Weapons/Weapons.jsx"
import NotFound from "../pages/404/404.jsx"
import Banners from "../pages/Banners/Banners.jsx"
import Equipements from "../pages/Equipments/Equipements.jsx"
import Imaginations from "../pages/Imaginations/Imaginations.jsx"
import Abilitys from "../pages/Abilitys/Abilitys.jsx"

export default function Router(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/weapons" element={<Weapons />}></Route>
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/banners" element={<Banners />}></Route>
        <Route path="/equipements" element={<Equipements />}></Route>
        <Route path="/imaginations" element={<Imaginations />}></Route>
        <Route path="/abilitys" element={<Abilitys />}></Route>
      </Routes>
    </BrowserRouter>
  )
}