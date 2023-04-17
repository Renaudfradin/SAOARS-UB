import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "@pages/Home/Home.jsx";
import Weapons from "@pages/Weapons/Weapons.jsx"
import Weapon from "@pages/Weapon/Weapon.jsx";
import NotFound from "@pages/404/404.jsx"
import Banners from "@pages/Banners/Banners.jsx"
import Banner from "@pages/Banner/Banner.jsx";
import Equipements from "@pages/Equipments/Equipements.jsx"
import Equipement from "@pages/Equipement/Equipement.jsx";
import Imaginations from "@pages/Imaginations/Imaginations.jsx"
import Abilitys from "@pages/Abilitys/Abilitys.jsx"
import Ability from "@pages/Ability/Ability.jsx";
import Characters from "@pages/Characters/Characters.jsx"
import Character from "@pages/Character/Character.jsx";
import About from "@pages/About/About.jsx"
import Navbar from "@components/navbar/navbar.jsx";

export default function Router(){
  return(
    <div className="layout">
      <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weapons" element={<Weapons />}/>
          <Route path="/weapons/:id" element={<Weapon />}/>
          <Route path="/characters" element={<Characters />}/>
          <Route path="/characters/:id" element={<Character />}/>
          <Route path="/banners" element={<Banners />}/>
          <Route path="/banners/:id" element={<Banner />}/>
          <Route path="/equipements" element={<Equipements />}/>
          <Route path="/equipements/:id" element={<Equipement />}/>
          <Route path="/imaginations" element={<Imaginations />}/>
          <Route path="/abilitys" element={<Abilitys />}/>
          <Route path="/abilitys/:id" element={<Ability />}/>
          <Route path="/about" element={<About />} />
          {/* redirection 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <div className="linkBtn">
        <Link to="/about">About</Link>
      </div>
      </BrowserRouter>
    </div>
  )
}