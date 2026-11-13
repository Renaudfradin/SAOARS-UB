import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useLang } from "@/context/LangContext.jsx";
import { LOCALES } from "@/api/client.js";
import { LANG_LABELS } from "@/i18n/ui.js";
import { moreLinks, navItems } from "./navItems.js";
import "./layout.css";

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
        <img src="/ui/flags/button_us.png" alt="" />
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

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const { t } = useLang();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    setOpen(false);
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
        <Link to="/" className="sidebar__title">
          <h2>SAO UB</h2>
          <span>Database</span>
        </Link>
        <nav className="sidebar__nav">
          {navItems.map(({ to, icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              title={t(label)}
              className={({ isActive }) => `navBtn ${isActive ? "navBtn--active" : ""}`}
            >
              <img src={icon} alt="" />
              <span className="navBtn__label">{t(label)}</span>
            </NavLink>
          ))}
        </nav>
        <a className="sidebar__discord" href="https://discord.com/invite/QuZwZBw" target="_blank" rel="noreferrer" aria-label="Discord">
          <img src="/ui/nav/icon_discord.png" alt="" />
        </a>
      </aside>
      {open && <div className="shell__backdrop" onClick={() => setOpen(false)} />}

      <div className="shell__main">
        <main className="shell__content">{children}</main>
        <footer className="footer">
          <div className="footer__links">
            {moreLinks.map(({ to, label }) => (
              <Link key={to} to={to}>
                {t(label)}
              </Link>
            ))}
            <Link to="/about">{t("footer.about")}</Link>
            <Link to="/privacy">{t("footer.privacy")}</Link>
          </div>
          <p>
            SAOUB's Database v4. {t("footer.dev")}{" "}
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
