import React from "react";
import { useLang } from "@/context/LangContext.jsx";
import EntityList from "@components/ui/EntityList.jsx";
import { AbilityCard } from "@components/ui/EntityCard.jsx";

export default function Abilities() {
  const { t } = useLang();
  return (
    <EntityList
      resource="abilities"
      title={t("nav.abilities")}
      label="PAGE: LIST/ABILITY"
      showRarity
      renderCard={(item) => <AbilityCard key={item.id} item={item} />}
    />
  );
}
