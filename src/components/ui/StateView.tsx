import React from "react";
import Link from "next/link";
import { Spin } from "antd";
import { useLang } from "@/context/LangContext";
import { ApiError } from "@/types/api";

export function Loading({ label }: { label?: string }) {
  const { t } = useLang();
  return (
    <div className="state">
      <Spin />
      <p>{label || t("state.loading")}</p>
    </div>
  );
}

export function ErrorState({ error, backTo }: { error?: unknown; backTo?: string }) {
  const { t } = useLang();
  const status = error instanceof ApiError ? error.response.status : undefined;
  let message = t("state.error");
  if (status === 404) message = t("state.notFound");
  if (status === 429) message = t("state.rateLimited");

  return (
    <div className="state state--error">
      <p>{message}</p>
      {status && status !== 404 && <p className="state__detail">HTTP {status}</p>}
      {backTo && (
        <Link className="btnTag" href={backTo}>
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
