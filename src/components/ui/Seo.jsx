import React from "react";
import { Helmet } from "react-helmet-async";

const SITE = "Sword Art Online : Unleash Blading - Database";
const DEFAULT_DESCRIPTION = "Unofficial Database of the game Sword Art Online Unleash Blading.";

export default function Seo({ title, description }) {
  const fullTitle = title ? `${title} - ${SITE}` : SITE;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || DEFAULT_DESCRIPTION} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || DEFAULT_DESCRIPTION} />
    </Helmet>
  );
}
