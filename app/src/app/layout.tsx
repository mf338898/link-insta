import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import "@/components/ProfileCard.css";
import ScrollHint from "@/components/ScrollHint";

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
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
          <ScrollHint />
        </div>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
