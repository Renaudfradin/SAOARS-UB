import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, theme } from "antd";
import Router from "./Router/Router";
import { LangProvider } from "./context/LangContext.jsx";
import "./components/layout/layout.css";
import "./app.css";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

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

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <LangProvider>
          <ConfigProvider theme={antdTheme}>
            <Router />
          </ConfigProvider>
        </LangProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}
