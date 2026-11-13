import React from "react";
import { useLang } from "@/context/LangContext.jsx";
import EntityList from "@components/ui/EntityList.jsx";
import { CharacterCard } from "@components/ui/EntityCard.jsx";

export default function Characters() {
  const { t } = useLang();
  return (
    <EntityList
      resource="characters"
      title={t("nav.characters")}
      label="PAGE: LIST/CHARACTER"
      elementKey="element"
      renderCard={(item) => <CharacterCard key={item.id} item={item} />}
    />
  );
}
