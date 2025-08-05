import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import Navbar from './components/navbar/page';
import Footer from './components/footer/page';
import './globals.css';

export const metadata: Metadata = {
  title: 'Index - Sword Art Online : Unleash Blading - Database',
  description:
    'Unofficial Database of the game Sword Art Online Unleash Blading.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <html lang="en">
        <body>{children}</body>
      </html>
      <Footer />
      <Analytics />
    </>
  );
}
