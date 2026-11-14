import React from "react";
import { Link } from "react-router-dom";
import { Spin } from "antd";
import { useLang } from "@/context/LangContext.jsx";

export function Loading({ label }) {
  const { t } = useLang();
  return (
    <div className="state">
      <Spin />
      <p>{label || t("state.loading")}</p>
    </div>
  );
}

export function ErrorState({ error, backTo }) {
  const { t } = useLang();
  const status = error?.response?.status;
  let message = t("state.error");
  if (status === 404) message = t("state.notFound");
  if (status === 429) message = t("state.rateLimited");

  return (
    <div className="state state--error">
      <p>{message}</p>
      {status && status !== 404 && <p className="state__detail">HTTP {status}</p>}
      {backTo && (
        <Link className="btnTag" to={backTo}>
          {t("state.back")}
        </Link>
      )}
    </div>
  );
}

export function Empty() {
  const { t } = useLang();
  return (
    <div className="state">
      <p>{t("list.empty")}</p>
    </div>
  );
}
