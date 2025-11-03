import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/components/ProfileCard.css";
import InstagramBrowserBanner from "@/components/InstagramBrowserBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Matthis Foveau – Conseiller immobilier Finistère",
  description: "Conseiller immobilier en Finistère. Expertise et accompagnement personnalisé pour vos projets immobiliers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <InstagramBrowserBanner />
        {children}
      </body>
    </html>
  );
}
