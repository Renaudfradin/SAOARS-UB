import React from "react";
import { useLang } from "@/context/LangContext.jsx";
import EntityList from "@components/ui/EntityList.jsx";
import { BannerCard } from "@components/ui/EntityCard.jsx";

export default function Banners() {
  const { t } = useLang();
  return (
    <EntityList
      resource="banners"
      title={t("nav.banners")}
      label="PAGE: LIST/SCOUT"
      showRarity={false}
      gridClassName="cardGrid cardGrid--banners"
      pageSize={20}
      renderCard={(item) => <BannerCard key={item.id} item={item} />}
    />
  );
}
