import React from "react";
import Router from "./Router/Router";
import { HelmetProvider , Helmet } from "react-helmet-async";
import "./app.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <Router />
        <Helmet>
          <meta
            name="description"
            content="Unofficial Database of the game Sword Art Online Unleash Blading."
          />
        </Helmet>
      </HelmetProvider>
    </QueryClientProvider>
  )
}
