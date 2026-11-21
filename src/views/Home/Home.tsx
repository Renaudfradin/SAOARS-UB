"use client";

import React, { useRef, useState, type PointerEvent } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { assetSrc } from "@/lib/assetSrc";
import { useLang } from "@/context/LangContext";
import { useRandomBanners, useRandomCharacters, useStats } from "@/hook/queries";
import logo from "@assets/img/logoSAO.png";
import pop1 from "@assets/img/pop_data1.png";
import pop2 from "@assets/img/pop_data2.png";
import pop3 from "@assets/img/pop_data3.png";
import pop4 from "@assets/img/pop_data4.png";
import Frame from "@components/ui/Frame";
import SafeImage from "@components/ui/SafeImage";
import type { ApiRecord } from "@/types/api";

const DatabaseCube = dynamic(() => import("./DatabaseCube"), { ssr: false });

const CARD = 250;
const GAP = 18;
const STRIDE = CARD + GAP;

const GALLERIES = [
  {
    href: "/gallery/characters",
    image: "https://saoub.fanadata.com/_next/static/image/images/ui/button_gallery_c.8297eead17369cb69075892a68980aca.png",
    title: "Gallery",
    subtitle: "Characters",
  },
  {
    href: "/gallery/home/characters",
    image: "https://saoub.fanadata.com/_next/static/image/images/ui/button_gallery_home_c.7d5067fb8e626dfd9398e7c27bbd0b9d.png",
    title: "Gallery",
    subtitle: "Home Characters",
  },
  {
    href: "/gallery/home/backgrounds",
    image: "https://saoub.fanadata.com/_next/static/image/images/ui/button_gallery_home_b.95ac01acccc359bf0db1fc7385c26147.png",
    title: "Gallery",
    subtitle: "Home Backgrounds",
  },
];

function Arrow({ dir }: { dir: "prev" | "next" }) {
  const left = dir === "prev";
  return (
    <svg width="35" height="60" viewBox="0 0 35 60" aria-hidden="true">
      {left ? (
        <>
          <path d="M16 4 32 4 16 30 32 56 16 56 0 30 16 4" fill="rgb(164, 164, 164)" />
          <path d="M32 4 25 4 10 30 25 56 32 56 16 30 32 4" fill="rgba(200, 200, 200, 0.5)" />
        </>
      ) : (
        <>
          <path d="M16 4 0 4 16 30 0 56 16 56 32 30 16 4" fill="rgb(164, 164, 164)" />
          <path d="M0 4 7 4 22 30 7 56 0 56 16 30 0 4" fill="rgba(200, 200, 200, 0.5)" />
        </>
      )}
    </svg>
  );
}

function BannerSlider({ banners }: { banners: ApiRecord[] }) {
  const count = banners.length;
  const track = count ? [...banners, ...banners, ...banners] : [];
  const [position, setPosition] = useState<number | null>(null);
  const [drag, setDrag] = useState(0);
  const [animate, setAnimate] = useState(true);
  const dragStart = useRef<{ x: number; pointerId: number } | null>(null);
  const moved = useRef(false);
  const current = position ?? count;

  const settle = (next: number) => {
    if (!count) return next;
    if (next >= count && next < count * 2) return next;
    let wrapped = next;
    while (wrapped < count) wrapped += count;
    while (wrapped >= count * 2) wrapped -= count;
    return wrapped;
  };

  const go = (delta: number) => {
    if (count < 2) return;
    setAnimate(true);
    setPosition(current + delta);
  };

  const onTransitionEnd = () => {
    const next = settle(current);
    if (next === current) return;
    setAnimate(false);
    setPosition(next);
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button != null && event.button !== 0) return;
    dragStart.current = { x: event.clientX, pointerId: event.pointerId };
    moved.current = false;
    setAnimate(false);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragStart.current) return;
    const delta = event.clientX - dragStart.current.x;
    if (Math.abs(delta) > 6) moved.current = true;
    setDrag(delta);
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragStart.current) return;
    const delta = event.clientX - dragStart.current.x;
    dragStart.current = null;
    setDrag(0);
    setAnimate(true);
    if (Math.abs(delta) < 8) return;
    const slides = Math.max(1, Math.round(Math.abs(delta) / STRIDE));
    go(delta < 0 ? slides : -slides);
  };

  const offset = count ? -(current * STRIDE) + drag : 0;

  return (
    <div className="bannerRail">
      {count > 1 && (
        <button type="button" className="hero__arrow hero__arrow--prev bannerRail__arrow" onClick={() => go(-1)} aria-label="Previous">
          <Arrow dir="prev" />
        </button>
      )}
      <div
        className="bannerRail__view"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div
          className={`bannerRail__track${animate ? " is-animated" : ""}`}
          style={{ transform: `translateX(${offset}px)` }}
          onTransitionEnd={onTransitionEnd}
        >
          {track.map((banner, index) => (
            <Link
              key={`${banner.id}-${index}`}
              href={`/banners/${banner.slug}`}
              className="bannerRail__card"
              onClick={(event) => {
                if (moved.current) event.preventDefault();
              }}
              draggable={false}
            >
              <SafeImage src={banner.image} fallback={banner.image_fallback} alt={banner.name || ""} draggable={false} />
            </Link>
          ))}
        </div>
      </div>
      {count > 1 && (
        <button type="button" className="hero__arrow hero__arrow--next bannerRail__arrow" onClick={() => go(1)} aria-label="Next">
          <Arrow dir="next" />
        </button>
      )}
    </div>
  );
}

function Stat({ value, label }: { value?: number; label: string }) {
  if (value == null) return null;
  return (
    <div className="overview__stat">
      <p>{value}</p>
      <span>{label}</span>
    </div>
  );
}

export default function Home() {
  const { t } = useLang();
  const { data: bannerData } = useRandomBanners();
  const { data: characterData } = useRandomCharacters(8);
  const banners = bannerData ?? [];
  const characters = characterData ?? [];
  const { data: stats } = useStats();
  const [index, setIndex] = useState(0);
  const artworks = characters.filter((item) => item.artwork);
  const artwork = artworks.length ? artworks[index % artworks.length] : null;

  const step = (delta: number) => {
    if (!artworks.length) return;
    setIndex((current) => (current + delta + artworks.length) % artworks.length);
  };

  return (
    <Frame>
      <div className="hero">
        <div className="hero__logo">
          <img className="pop pop--3" src={assetSrc(pop3)} alt="" />
          <img className="pop pop--2" src={assetSrc(pop2)} alt="" />
          <img className="pop pop--1" src={assetSrc(pop1)} alt="" />
          <img className="pop pop--4" src={assetSrc(pop4)} alt="" />
          <img className="hero__mark" src={assetSrc(logo)} alt="SAO:UB DB" />
        </div>

        <div className="hero__show">
          <svg className="rings" viewBox="0 0 100 100" aria-hidden="true">
            <circle cx="50" cy="50" r="49" strokeWidth="0.2" />
            <g className="rings__spin">
              <circle cx="50" cy="50" r="37" strokeWidth="0.2" />
              <circle cx="50" cy="50" r="38" strokeWidth="2" strokeDasharray="30" />
            </g>
            <circle cx="50" cy="50" r="35.5" strokeWidth="0.2" />
            <circle cx="50" cy="50" r="30" strokeWidth="0.2" />
            <g className="rings__spin rings__spin--rev">
              <circle cx="50" cy="50" r="27" strokeWidth="2" strokeDasharray="0.4 3" />
              <circle cx="50" cy="50" r="26" strokeWidth="0.2" />
            </g>
          </svg>

          <button type="button" className="hero__arrow hero__arrow--prev" onClick={() => step(-1)} aria-label="Previous">
            <Arrow dir="prev" />
          </button>
          <div className="hero__art">
            {artwork?.artwork && (
              <Link href={`/characters/${artwork.slug}`}>
                <img src={artwork.artwork} alt={artwork.name || ""} />
              </Link>
            )}
          </div>
          <button type="button" className="hero__arrow hero__arrow--next" onClick={() => step(1)} aria-label="Next">
            <Arrow dir="next" />
          </button>
        </div>

        <BannerSlider banners={banners} />

        <div className="galleryEntries">
          {GALLERIES.map((entry) => (
            <Link key={entry.href} href={entry.href} className="galleryEntry" style={{ backgroundImage: `url(${entry.image})` }}>
              <span>
                {entry.title}
                <br />
                <strong>{entry.subtitle}</strong>
              </span>
            </Link>
          ))}
        </div>

        <section className="overview" aria-label={t("home.overview")}>
          <p className="overview__title">
            {"<DATABASE>"}
            <br />
            <span>:overview</span>
          </p>
          <div className="overview__stage">
            <div className="overview__stats">
              <Stat value={stats?.Banner} label={t("home.stat.banner")} />
              <Stat value={stats?.Character} label={t("home.stat.character")} />
              <Stat value={stats?.Weapon} label={t("home.stat.weapon")} />
            </div>
            <div className="overview__cube">
              <DatabaseCube />
            </div>
            <div className="overview__stats overview__stats--end">
              <Stat value={stats?.Equipment} label={t("home.stat.equipment")} />
            </div>
          </div>
        </section>
      </div>
    </Frame>
  );
}
