import React from "react";
import { Link, useParams } from "react-router-dom";
import imgDefault from "@assets/img/imgDefault/character_250.png";
import { Helmet } from "react-helmet-async";
import useBanner from "@hook/useBanner.jsx";
import "./Banner.css";

export default function Banner() {
  const param = useParams();
  const idParam = param.id;
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const { banner } = useBanner(idParam);

  return(
    <div className="containerBanner">
      <Helmet>
        <title>{banner.name_b}</title>
      </Helmet>
      <div className="infoTitle">
        <p>{banner.name_b}</p>
        <img className="imgBanner" src={baseUrl+banner.img_baner} alt={baseUrl+banner.img_baner} />
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
  )
}