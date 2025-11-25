import type { Metadata } from "next";
import { Inter, Inter_Tight, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MYSELF INCLUDED | Electronic Music Producer",
  description: "Alex Cope is a producer, multi instrumentalist, and the creator of the electro/Hip Hop/Bass project out of Columbus, Ohio called \"Myself Included\".",
  keywords: ["electronic music", "hip hop", "bass music", "producer", "Columbus Ohio", "Myself Included", "Alex Cope"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${interTight.variable} ${plusJakartaSans.variable} ${inter.variable} antialiased`}
      >
        <Header />
        <main className="min-h-screen bg-background">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

