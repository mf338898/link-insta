import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/components/ProfileCard.css";
import dynamic from "next/dynamic";

const InstagramRedirectBanner = dynamic(() => import("@/components/InstagramRedirectBanner"), {
  ssr: false,
});

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
        <InstagramRedirectBanner />
        {children}
      </body>
    </html>
  );
}
