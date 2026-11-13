import React from "react";
import { useLang } from "@/context/LangContext.jsx";
import EntityList from "@components/ui/EntityList.jsx";
import { ImaginationCard } from "@components/ui/EntityCard.jsx";

export default function Imaginations() {
  const { t } = useLang();
  return (
    <EntityList
      resource="imaginations"
      title={t("nav.imaginations")}
      label="PAGE: LIST/IMAGINATION"
      elementKey="element"
      showRarity={false}
      renderCard={(item) => <ImaginationCard key={item.id} item={item} />}
    />
  );
}
