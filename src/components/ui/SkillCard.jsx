import React from "react";
import { Link } from "react-router-dom";
import { useLang } from "@/context/LangContext.jsx";
import { translated } from "@/i18n/ui.js";
import { AttackTypeIcon } from "./icons.jsx";

export default function SkillCard({ attack, type, title, description, mp, to }) {
  const { lang, t } = useLang();
  const name = attack ? translated(attack.name, lang) : title;
  const text = attack ? translated(attack.description, lang) : description;
  const atkType = attack?.type_atk ?? type;
  const cost = attack?.mp_cost ?? mp;
  const link = to ?? (attack?.slug ? `/attacks/${attack.slug}` : null);

  if (!name && !text) return null;

  const heading = link ? <Link to={link}>{name}</Link> : name;

  return (
    <div className="skill">
      <div className="skill__icon">
        <AttackTypeIcon type={atkType} />
        {atkType && <span className="skill__type">{t(`attack.${atkType}`)}</span>}
      </div>
      <div className="skill__body">
        <div className="skill__name">{heading}</div>
        {text && <p className="skill__desc">{text}</p>}
        {cost != null && cost !== "" && (
          <div className="skill__mp">
            {cost} MP
          </div>
        )}
      </div>
    </div>
  );
}
