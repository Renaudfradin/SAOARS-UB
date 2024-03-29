import React from "react";
import { Link, useParams } from "react-router-dom";
import imgDefault from "@assets/img/imgDefault/character_250.png";
import { Helmet } from "react-helmet-async";
import useBanner from "@hook/useBanner.jsx";
import "./Banner.css";

export default function Banner() {
  const param = useParams();
  const idParam = param.id;
  const { banner } = useBanner(idParam);

  return(
    <>
      <Helmet>
        <title>{banner.name_b}</title>
        <meta name="title" content="List Banners - Sword Art Online : Unleash Blading - Database" />
        <meta name="description" content="List Banners - Sword Art Online : Unleash Blading - Database" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.ico" />
      </Helmet>
      <div className="imgMid">
        <div className="infoTitle">
          <p>{banner.name_b}</p>
          <img className="imgBanner" src={banner.img_baner} alt={banner.img_baner} />
        </div>
      <div className="infoBanners">
        <div className="infoPeriode">
          <h3>periode</h3>
          <div className="periode">
            <div className="periodeFrom">
              <p className="From">From</p>
              <p className="FromP">{banner.from}</p>
            </div>
            <div className="periodeTo">
              <p className="To">To</p>
              <p className="ToP">{banner.to}</p>
            </div>
          </div>
        </div>
        <div className="infoPerso">
          <h3>personnage</h3>
          <Link to={`/characters/${banner.chracters}`}><img className="imgPerso" src={imgDefault} alt={imgDefault} /></Link>
        </div>
      </div>
      </div>
    </>
  )
}