import React from "react";
import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import Layout from "@components/layout/Layout.jsx";
import Home from "@pages/Home/Home.jsx";
import Characters from "@pages/Characters/Characters.jsx";
import Character from "@pages/Character/Character.jsx";
import Weapons from "@pages/Weapons/Weapons.jsx";
import Weapon from "@pages/Weapon/Weapon.jsx";
import Equipments from "@pages/Equipments/Equipments.jsx";
import Equipment from "@pages/Equipment/Equipment.jsx";
import Banners from "@pages/Banners/Banners.jsx";
import Banner from "@pages/Banner/Banner.jsx";
import Abilities from "@pages/Abilities/Abilities.jsx";
import Ability from "@pages/Ability/Ability.jsx";
import Attacks from "@pages/Attacks/Attacks.jsx";
import Attack from "@pages/Attack/Attack.jsx";
import Imaginations from "@pages/Imaginations/Imaginations.jsx";
import Imagination from "@pages/Imagination/Imagination.jsx";
import GalleryCharacters from "@pages/Gallery/GalleryCharacters.jsx";
import About from "@pages/About/About.jsx";
import Privacy from "@pages/Privacy/Privacy.jsx";
import NotFound from "@pages/404/404.jsx";

function LegacyRedirect({ to }) {
  const { slug } = useParams();
  return <Navigate to={slug ? `${to}/${slug}` : to} replace />;
}

export default function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/characters/:slug" element={<Character />} />
          <Route path="/weapons" element={<Weapons />} />
          <Route path="/weapons/:slug" element={<Weapon />} />
          <Route path="/equipments" element={<Equipments />} />
          <Route path="/equipments/:slug" element={<Equipment />} />
          <Route path="/banners" element={<Banners />} />
          <Route path="/banners/:slug" element={<Banner />} />
          <Route path="/abilities" element={<Abilities />} />
          <Route path="/abilities/:slug" element={<Ability />} />
          <Route path="/attacks" element={<Attacks />} />
          <Route path="/attacks/:slug" element={<Attack />} />
          <Route path="/imaginations" element={<Imaginations />} />
          <Route path="/imaginations/:slug" element={<Imagination />} />
          <Route path="/gallery/characters" element={<GalleryCharacters />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/equipements" element={<LegacyRedirect to="/equipments" />} />
          <Route path="/equipements/:slug" element={<LegacyRedirect to="/equipments" />} />
          <Route path="/abilitys" element={<LegacyRedirect to="/abilities" />} />
          <Route path="/abilitys/:slug" element={<LegacyRedirect to="/abilities" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
