import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ank Square - Digital Services for Business Growth",
  description: "Empower your business with Ank Square's comprehensive digital services including merchant account management, website development, and digital marketing solutions.",
  keywords: "digital services, merchant account management, website development, digital marketing, SEO, business growth",
  authors: [{ name: "Ank Square" }],
  creator: "Ank Square",
  publisher: "Ank Square",
  openGraph: {
    title: "Ank Square - Digital Services for Business Growth",
    description: "Empower your business with Ank Square's comprehensive digital services including merchant account management, website development, and digital marketing solutions.",
    url: "https://anksquare.com",
    siteName: "Ank Square",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ank Square - Digital Services for Business Growth",
    description: "Empower your business with Ank Square's comprehensive digital services including merchant account management, website development, and digital marketing solutions.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
