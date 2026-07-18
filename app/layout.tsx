import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DirectCuts — Invest in the Future of Barbering",
  description:
    "DirectCuts is the on-demand barber marketplace raising its pre-seed round. 48 states. 100 days. One barber movement. Request investor access.",
  openGraph: {
    title: "DirectCuts — Invest in the Future of Barbering",
    description:
      "The on-demand barber marketplace. 48 states. 100 days. One barber movement.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bebas.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
