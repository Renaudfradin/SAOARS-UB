import React, { useMemo, useState } from "react";
import { Segmented } from "antd";
import { useLang } from "@/context/LangContext.jsx";

const STATS = [
  { key: "hp", label: "HP", max: 10000 },
  { key: "mp", label: "MP", max: 400 },
  { key: "atk", label: "ATK", max: 3500 },
  { key: "matk", label: "MATK", max: 3500 },
  { key: "def", label: "DEF", max: 2500 },
  { key: "mdef", label: "MDEF", max: 2500 },
  { key: "crit", label: "CRIT", max: 1200 },
  { key: "spd", label: "SPD", max: 600 },
];

export default function StatsPanel({ item }) {
  const { t } = useLang();
  const stages = useMemo(
    () => [...(item.stats || [])].sort((a, b) => a.stage - b.stage),
    [item.stats]
  );
  const [selected, setSelected] = useState("base");

  const current = selected === "base" ? item : stages.find((s) => s.stage === selected) || item;

  return (
    <div className="panel stats">
      <div className="panel__title">
        <span>{t("detail.stats")}</span>
      </div>
      {stages.length > 0 && (
        <Segmented
          className="stats__stages"
          size="small"
          value={selected}
          onChange={setSelected}
          options={[
            { label: "Max", value: "base" },
            ...stages.map((s) => ({ label: `${t("detail.stage")} ${s.stage}`, value: s.stage })),
          ]}
        />
      )}
      <ul className="stats__list">
        {STATS.map(({ key, label, max }) => {
          const value = Number(current[key] ?? 0);
          return (
            <li key={key} className={`stats__row stats__row--${key}`}>
              <span className="stats__label">{label}</span>
              <span className="stats__value">{value}</span>
              <span className="stats__bar">
                <span style={{ width: `${Math.min(100, (value / max) * 100)}%` }} />
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
