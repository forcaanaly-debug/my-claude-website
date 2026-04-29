import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LiveEditor from "@/components/admin/LiveEditor";
import { getContent } from "@/lib/content";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Silk Route Expeditions — Curated Luxury Tours to Central Asia",
    template: "%s | Silk Route Expeditions",
  },
  description:
    "Destination Management Company specialising in curated luxury expeditions to Uzbekistan, Pakistan, Afghanistan, and China's Silk Road. Private guides, exclusive access, extraordinary places.",
  keywords: ["Silk Road tours", "Central Asia luxury travel", "Pakistan tours", "Uzbekistan tours", "Afghanistan travel", "Dunhuang tours", "Karakoram Highway"],
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Silk Route Expeditions",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme } = getContent();
  const themeVars = `
    :root {
      --color-charcoal: ${theme.charcoal};
      --color-stone: ${theme.stone};
      --color-sand: ${theme.sand};
      --color-offwhite: ${theme.offwhite};
      --color-bronze: ${theme.bronze};
      --color-bronze-pale: ${theme.bronzePale};
    }
  `;

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${plusJakarta.variable}`}
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeVars }} />
      </head>
      <body suppressHydrationWarning style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
        <LiveEditor />
      </body>
    </html>
  );
}
