import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import Providers from "./providers";
import Layout from "@components/layout/Layout";
import { getLang } from "@/i18n/getLang";
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from "@/i18n/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s - ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  icons: { icon: "/logo.ico" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
  },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const lang = await getLang();

  return (
    <html lang={lang}>
      <body>
        <Providers lang={lang}>
          <Layout>{children}</Layout>
        </Providers>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-0KZZ3F6FWK" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0KZZ3F6FWK');
          `}
        </Script>
      </body>
    </html>
  );
}
