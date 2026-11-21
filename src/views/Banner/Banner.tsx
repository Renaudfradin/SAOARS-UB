"use client";

import React from "react";
import Link from "next/link";
import { useLang } from "@/context/LangContext";
import { translated } from "@/i18n/ui";
import Frame from "@components/ui/Frame";
import SafeImage from "@components/ui/SafeImage";
import { placeholders } from "@components/ui/media";
import type { Locale } from "@/i18n/locale";
import type { BannerCharacter, BannerDetail } from "@/types/api";
import type { ReactNode } from "react";

const DATE_LOCALE: Record<Locale, string> = { fr: "fr", en: "en", zh: "zh-CN", ko: "ko", ja: "ja", de: "de", es: "es" };

function splitDate(value: string | null | undefined, lang: Locale) {
  if (!value) return null;
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return null;
  const month = date.toLocaleDateString(DATE_LOCALE[lang] || lang, { month: "long" });
  return {
    day: date.getDate(),
    month: month.charAt(0).toUpperCase() + month.slice(1),
    year: date.getFullYear(),
  };
}

function characterName(character: BannerCharacter | null | undefined, lang: Locale) {
  if (!character) return "";
  if (typeof character.name === "string") return character.name;
  return translated(character.name, lang) || "";
}

function Folder({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="folder">
      <div className="folder__top" aria-hidden="true">
        <div className="folder__tl" />
        <div className="folder__tm" />
        <div className="folder__tr" />
      </div>
      <div className="folder__body">
        <h2>{title}</h2>
        {children}
      </div>
      <div className="folder__bot" aria-hidden="true">
        <div className="folder__bl" />
        <div className="folder__bm" />
        <div className="folder__br" />
      </div>
    </section>
  );
}

function PeriodRow({ label, date }: { label: string; date: { day: number; month: string; year: number } | null }) {
  if (!date) return null;
  return (
    <div className="period">
      <div className="period__label">{label}</div>
      <div className="period__value">
        <span className="period__day">{date.day}</span>
        <span>
          <strong>{date.month}</strong> {date.year}
        </span>
      </div>
    </div>
  );
}

export default function Banner({ data }: { data: BannerDetail }) {
  const { t, lang } = useLang();
  const characters = Array.isArray(data.characters) ? data.characters : [];

  return (
    <>
      <Frame label="SCOUT TYPE: CHARACTER">
        <div className="scout">
          <div className="scout__name">
            <span>{data.name}</span>
            <i className="scout__elbow" />
          </div>
          <div className="scout__art">
            <SafeImage src={data.image} fallback={data.image_fallback || placeholders.character} alt={data.name} />
          </div>

          <div className="scout__cols">
            <Folder title="&lt;PERIOD&gt;">
              <div className="periods">
                <PeriodRow label={t("detail.from")} date={splitDate(data.from, lang)} />
                <PeriodRow label={t("detail.to")} date={splitDate(data.to, lang)} />
              </div>
            </Folder>
            <Folder title="&lt;CHARACTER&gt;">
              <div className="scout__faces">
                {characters.map((character) => {
                  const name = characterName(character, lang);
                  const face = (
                    <SafeImage src={character.image} fallback={placeholders.character} alt={name} />
                  );
                  return character.slug ? (
                    <Link key={character.id} href={`/characters/${character.slug}`} title={name}>
                      {face}
                    </Link>
                  ) : (
                    <span key={character.id} title={name}>
                      {face}
                    </span>
                  );
                })}
              </div>
            </Folder>
          </div>
        </div>
      </Frame>
    </>
  );
}
