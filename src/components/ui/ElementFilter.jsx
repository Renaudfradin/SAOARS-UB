import React from "react";
import { useLang } from "@/context/LangContext.jsx";
import { ELEMENTS } from "./icons.jsx";

export default function ElementFilter({ value, onChange }) {
  const { t } = useLang();

  return (
    <div className="filters__elements" role="group" aria-label="Element filter">
      {ELEMENTS.map((element) => {
        const selected = value === element;
        const dimmed = Boolean(value) && !selected;
        return (
          <button
            key={element}
            type="button"
            className={`elementIcon elementIcon--${element} ${selected ? "elementIcon--active" : ""} ${dimmed ? "elementIcon--off" : ""}`}
            style={{ width: 34, height: 34 }}
            title={t(`element.${element}`)}
            aria-pressed={selected}
            onClick={() => onChange(selected ? null : element)}
          >
            <span className="elementIcon__inner" />
          </button>
        );
      })}
    </div>
  );
}
