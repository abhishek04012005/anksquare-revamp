import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar/navbar";
import StructuredData from "../components/seo/StructuredData";
import Footer from "@/components/footer/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ank Square - Digital Services for Business Growth | Merchant Account Management & Website Development",
  description: "Transform your business with Ank Square's expert digital service. We specialize in merchant account management for Amazon, Flipkart & more, custom website development, and digital marketing solutions. 5+ years experience, 500+ projects completed.",
  keywords: "digital service, merchant account management, website development, digital marketing, SEO, Amazon seller account, Flipkart seller, e-commerce solutions, business growth, online marketplace management",
  authors: [{ name: "Ank Square" }],
  creator: "Ank Square",
  publisher: "Ank Square",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://anksquare.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Ank Square - Digital Services for Business Growth",
    description: "Expert merchant account management, custom website development, and digital marketing solutions. 500+ projects completed with 300+ happy clients.",
    url: "https://anksquare.com",
    siteName: "Ank Square",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ank Square - Digital Services Company",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ank Square - Digital Services for Business Growth",
    description: "Expert merchant account management, custom website development, and digital marketing solutions.",
    images: ["/og-image.jpg"],
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
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    other: {
      'msvalidate.01': 'your-bing-verification-code',
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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <StructuredData />
        <Navbar />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
