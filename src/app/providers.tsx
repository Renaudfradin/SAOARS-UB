"use client";

import React, { useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, theme } from "antd";
import { LangProvider } from "@/context/LangContext";
import type { Locale } from "@/i18n/locale";

const antdTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: "#a64ee6",
    colorBgContainer: "#1c1335",
    colorBgElevated: "#241a45",
    colorBorder: "#5b4bc4",
    borderRadius: 2,
    fontFamily: "'Roboto', 'Segoe UI', Arial, sans-serif",
  },
};

export default function Providers({ lang, children }: { lang: Locale; children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { refetchOnWindowFocus: false } },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <LangProvider lang={lang}>
        <ConfigProvider theme={antdTheme}>{children}</ConfigProvider>
      </LangProvider>
    </QueryClientProvider>
  );
}
