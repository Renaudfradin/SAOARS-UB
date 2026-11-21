"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/context/LangContext.jsx";
import { LOCALES } from "@/i18n/locale.js";
import { LANG_LABELS } from "@/i18n/ui.js";
import { moreLinks, navItems } from "./navItems.js";

const FLAGS = {
  fr: "/ui/flags/flag_fr.png",
  en: "/ui/flags/flag_us.png",
  zh: "/ui/flags/flag_tw.png",
  ko: "/ui/flags/flag_ko.png",
  ja: "/ui/flags/flag_ja.png",
  de: "/ui/flags/flag_de.png",
  es: "/ui/flags/flag_es.png",
};

function LangButton() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <div className="langBtn">
      <button type="button" className="langBtn__toggle" aria-label="Language" onClick={() => setOpen((value) => !value)}>
        <img src={`/ui/flags/button_${lang}.png`} alt="" />
      </button>
      {open && (
        <div className="langBtn__menu">
          {LOCALES.map((code) => (
            <button
              key={code}
              type="button"
              className={code === lang ? "is-active" : ""}
              onClick={() => {
                setLang(code);
                setOpen(false);
              }}
            >
              <img src={FLAGS[code]} alt="" />
              <span>{LANG_LABELS[code]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function NavItem({ to, icon, text, textKey, mark, end }) {
  const pathname = usePathname();
  const { t } = useLang();
  const active = end ? pathname === to : pathname === to || pathname.startsWith(`${to}/`);
  const label = textKey ? t(textKey) : text;
  return (
    <Link href={to} className={`navBtn ${active ? "navBtn--active" : ""}`}>
      {icon ? <img src={icon} alt="" /> : <span className="navBtn__mark">{mark}</span>}
      <span className="navBtn__label">{label}</span>
    </Link>
  );
}

export default function Layout({ children }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  const { t } = useLang();

  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={`shell ${open ? "shell--open" : ""}`}>
      <header className="topbar">
        <div className="topbar__strip" />
        <div className="topbar__trap" aria-hidden="true">
          <div className="topbar__slant topbar__slant--left" />
          <div className="topbar__mid" />
          <div className="topbar__slant topbar__slant--right" />
        </div>
        <button type="button" className="topbar__menu" onClick={() => setOpen(!open)} aria-label="Menu">
          <img src="/ui/nav/navigation.png" alt="" />
        </button>
        <LangButton />
      </header>

      <aside className="sidebar">
        <Link href="/" className="sidebar__title">
          <h2>SAO UB</h2>
          <span>Database</span>
        </Link>
        <nav className="sidebar__nav">
          {navItems.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </nav>
      </aside>

      <div className="shell__main">
        <main className="shell__content">{children}</main>
        <footer className="footer">
          <div className="footer__links">
            {moreLinks.map(({ to, label }) => (
              <Link key={to} href={to}>
                {t(label)}
              </Link>
            ))}
          </div>
          <div className="footer__actions">
            <div className="footerBtn">
              <Link href="/about">{t("footer.about")}</Link>
            </div>
            <div className="footerBtn">
              <Link href="/privacy">{t("footer.privacy")}</Link>
            </div>
          </div>
          <p>
            SAOUB&apos;s Database v4. {t("footer.dev")}{" "}
            <a href="https://github.com/Renaudfradin" target="_blank" rel="noreferrer">
              RenaudFradin
            </a>
            . {t("footer.credits")}
          </p>
        </footer>
      </div>
    </div>
  );
}
