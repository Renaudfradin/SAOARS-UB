import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home.jsx";
import Weapons from "../pages/Weapons/Weapons.jsx"
import Weapon from "../pages/Weapon/Weapon.jsx";
import NotFound from "../pages/404/404.jsx"
import Banners from "../pages/Banners/Banners.jsx"
import Banner from "../pages/Banner/Banner.jsx";
import Equipements from "../pages/Equipments/Equipements.jsx"
import Imaginations from "../pages/Imaginations/Imaginations.jsx"
import Abilitys from "../pages/Abilitys/Abilitys.jsx"
import Ability from "../pages/Ability/Ability.jsx";
import Characters from "../pages/Characters/Characters.jsx"
import Character from "../pages/Character/Character.jsx";
import About from "../pages/About/About.jsx"

export default function Router(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/weapons" element={<Weapons />}></Route>
        <Route path="/weapon/:id" element={<Weapon />}></Route>
        <Route path="/characters" element={<Characters />}></Route>
        <Route path="/character/:id" element={<Character />}></Route>
        <Route path="/banners" element={<Banners />}></Route>
        <Route path="/banner/:id" element={<Banner />}></Route>
        <Route path="/equipements" element={<Equipements />}></Route>
        <Route path="/imaginations" element={<Imaginations />}></Route>
        <Route path="/abilitys" element={<Abilitys />}></Route>
        <Route path="/ability/:id" element={<Ability />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}