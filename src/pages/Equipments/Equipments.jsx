import React from "react";
import { useLang } from "@/context/LangContext.jsx";
import EntityList from "@components/ui/EntityList.jsx";
import { EquipmentCard } from "@components/ui/EntityCard.jsx";

export default function Equipments() {
  const { t } = useLang();
  return (
    <EntityList
      resource="equipments"
      title={t("nav.equipments")}
      label="PAGE: LIST/EQUIPMENT"
      elementKey="type_equipment"
      typeKey="type"
      typeOptions={[
        { value: "armour", label: t("equipment.armour") },
        { value: "accessory", label: t("equipment.accessory") },
      ]}
      renderCard={(item) => <EquipmentCard key={item.id} item={item} />}
    />
  );
}
