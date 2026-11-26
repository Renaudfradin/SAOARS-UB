"use client";

import React, { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const count = banners.length;
  const track = count ? [...banners, ...banners, ...banners] : [];
  const [position, setPosition] = useState<number | null>(null);
  const [drag, setDrag] = useState(0);
  const [animate, setAnimate] = useState(true);
  const moved = useRef(false);
  const opened = useRef(false);
  const stopDrag = useRef<(() => void) | null>(null);
  const positionRef = useRef(position);
  const countRef = useRef(count);
  positionRef.current = position;
  countRef.current = count;
  const current = position ?? count;

  useEffect(() => () => stopDrag.current?.(), []);

  const settle = (next: number) => {
    if (!count) return next;
    if (next >= count && next < count * 2) return next;
    let wrapped = next;
    while (wrapped < count) wrapped += count;
    while (wrapped >= count * 2) wrapped -= count;
    return wrapped;
  };

  const go = (delta: number) => {
    const total = countRef.current;
    if (total < 2) return;
    const currentPos = positionRef.current ?? total;
    setAnimate(true);
    setPosition(currentPos + delta);
  };

  const onTransitionEnd = () => {
    const next = settle(current);
    if (next === current) return;
    setAnimate(false);
    setPosition(next);
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    const startX = event.clientX;
    const pointerId = event.pointerId;
    moved.current = false;
    opened.current = false;
    setAnimate(false);

    const onMove = (moveEvent: PointerEvent) => {
      if (moveEvent.pointerId !== pointerId) return;
      const delta = moveEvent.clientX - startX;
      if (Math.abs(delta) > 6) moved.current = true;
      setDrag(delta);
    };

    const onUp = (upEvent: PointerEvent) => {
      if (upEvent.pointerId !== pointerId) return;
      stopDrag.current = null;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      const delta = upEvent.clientX - startX;
      setDrag(0);
      setAnimate(true);
      if (Math.abs(delta) < 8) {
        if (upEvent.metaKey || upEvent.ctrlKey || upEvent.shiftKey || upEvent.altKey) return;
        const hit = document.elementFromPoint(upEvent.clientX, upEvent.clientY);
        const href = hit?.closest("a")?.getAttribute("href");
        if (!href?.startsWith("/banners/")) return;
        opened.current = true;
        router.push(href);
        return;
      }
      const slides = Math.max(1, Math.round(Math.abs(delta) / STRIDE));
      go(delta < 0 ? slides : -slides);
    };

    stopDrag.current?.();
    stopDrag.current = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
  };

  const offset = count ? -(current * STRIDE) + drag : 0;

  return (
    <div className="bannerRail">
      <div
        className="bannerRail__view"
        onPointerDown={onPointerDown}
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
                if (moved.current || opened.current) event.preventDefault();
                opened.current = false;
              }}
              draggable={false}
            >
              <SafeImage src={banner.image} fallback={banner.image_fallback} alt={banner.name || ""} draggable={false} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({ value, label, side = "left" }: { value?: number; label: string; side?: "left" | "right" }) {
  if (value == null) return null;
  return (
    <div className={side === "right" ? "overview__stat overview__stat--right" : "overview__stat"}>
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
      <div className="homeStage">
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

      </div>

      <section className="overview" aria-label={t("home.overview")}>
        <div className="overview__frame">
          <svg className="overview__rail" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <line x1="0" y1="0" x2="0" y2="100" />
          </svg>
          <p className="overview__title">
            {"<DATABASE>"}
            <br />
            <span>:overview</span>
          </p>
          <div className="overview__stage">
            <div className="overview__wire overview__wire--left">
              <div className="overview__wireCap">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M25 0 5 20 5 28 5 20M5 28C1 28 1 34 5 34C9 34 9 28 5 28" />
                </svg>
              </div>
            </div>
            <div className="overview__wire overview__wire--right">
              <div className="overview__wireJoin">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M0 0 20 20" />
                </svg>
              </div>
              <div className="overview__wireEnd">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M0 0 20 20 20 28 20 20M20 28C24 28 24 34 20 34C16 34 16 28 20 28" />
                </svg>
              </div>
            </div>
            <div className="overview__cube">
              <DatabaseCube />
            </div>
            <div className="overview__stats">
              <Stat value={stats?.Banner} label="Banner" />
              <Stat value={stats?.Character} label="Character" />
              <Stat value={stats?.Weapon} label="Weapon" />
            </div>
            <div className="overview__stats overview__stats--end">
              <Stat value={stats?.Equipment} label="Equipment" side="right" />
            </div>
          </div>
        </div>
      </section>
    </Frame>
  );
}
