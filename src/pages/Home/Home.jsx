import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "@assets/img/logoSAO.png";
import pop1 from "@assets/img/pop_data1.png";
import pop2 from "@assets/img/pop_data2.png";
import pop3 from "@assets/img/pop_data3.png";
import pop4 from "@assets/img/pop_data4.png";
import { useLang } from "@/context/LangContext.jsx";
import Seo from "@components/ui/Seo.jsx";
import Frame from "@components/ui/Frame.jsx";
import "./Home.css";

const ARTWORKS = [
  "character_237",
  "character_45",
  "character_44",
  "character_250",
  "character_200",
  "character_100",
];

const SCOUTS = [
  { file: "scout_1.jpg", name: "Release Celebration Scout" },
  { file: "scout_82.jpg", name: "Fulfilling Life" },
  { file: "scout_16.jpg", name: "Wanting to Know True Strength" },
  { file: "scout_73.jpg", name: "The Last Battle" },
  { file: "scout_130.jpg", name: "Fresh Dark Knight Recruit" },
];

const asset = (path) => `https://saoub.fanadata.com${path}`;

function Arrow({ dir }) {
  const left = dir === "prev";
  return (
    <svg width="35" height="60" viewBox="0 0 35 60" aria-hidden="true">
      {left ? (
        <>
          <path d="M16 4 32 4 16 30 32 56 16 56 0 30 16 4" fill="rgb(164, 164, 164)" />
          <path d="M32 4 25 4 10 30 25 56 32 56 16 30 32 4" fill="rgba(200, 200, 200, 0.5)" />
        </>
      ) : (
        <>
          <path d="M16 4 0 4 16 30 0 56 16 56 32 30 16 4" fill="rgb(164, 164, 164)" />
          <path d="M0 4 7 4 22 30 7 56 0 56 16 30 0 4" fill="rgba(200, 200, 200, 0.5)" />
        </>
      )}
    </svg>
  );
}

export default function Home() {
  const { t } = useLang();
  const [index, setIndex] = useState(0);
  const artwork = ARTWORKS[index % ARTWORKS.length];

  const step = (delta) => {
    setIndex((current) => (current + delta + ARTWORKS.length) % ARTWORKS.length);
  };

  return (
    <>
      <Seo title={t("nav.home")} description={t("home.intro")} />
      <Frame>
        <div className="hero">
          <div className="hero__logo">
            <img className="pop pop--3" src={pop3} alt="" />
            <img className="pop pop--2" src={pop2} alt="" />
            <img className="pop pop--1" src={pop1} alt="" />
            <img className="pop pop--4" src={pop4} alt="" />
            <img className="hero__mark" src={logo} alt="SAO:UB DB" />
          </div>

          <div className="hero__show">
            <svg className="rings" viewBox="0 0 100 100" aria-hidden="true">
              <circle cx="50" cy="50" r="49" strokeWidth="0.2" />
              <g className="rings__spin">
                <circle cx="50" cy="50" r="37" strokeWidth="0.2" />
                <circle cx="50" cy="50" r="38" strokeWidth="2" strokeDasharray="30" />
              </g>
              <circle cx="50" cy="50" r="35.5" strokeWidth="0.2" />
              <circle cx="50" cy="50" r="30" strokeWidth="0.2" />
              <g className="rings__spin rings__spin--rev">
                <circle cx="50" cy="50" r="27" strokeWidth="2" strokeDasharray="0.4 3" />
                <circle cx="50" cy="50" r="26" strokeWidth="0.2" />
              </g>
            </svg>

            <button type="button" className="hero__arrow hero__arrow--prev" onClick={() => step(-1)} aria-label="Previous">
              <Arrow dir="prev" />
            </button>
            <div className="hero__art">
              <img
                src={asset(`/assets/characters/artwork/${artwork}.png`)}
                alt=""
                referrerPolicy="no-referrer"
              />
            </div>
            <button type="button" className="hero__arrow hero__arrow--next" onClick={() => step(1)} aria-label="Next">
              <Arrow dir="next" />
            </button>
          </div>

          <div className="hero__scouts">
            {SCOUTS.map((scout) => (
              <Link key={scout.file} to="/banners" className="hero__scout">
                <img
                  src={asset(`/assets/banners/en/${scout.file}`)}
                  alt={scout.name}
                  referrerPolicy="no-referrer"
                />
              </Link>
            ))}
          </div>
        </div>
      </Frame>
    </>
  );
}
