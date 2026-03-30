import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import SplashScreen from "../components/SplashScreen";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Ömer Özbay | Full-Stack Engineer",
    template: "%s | Ömer Özbay"
  },
  description: "Computer Engineering student at Bandırma 17 Eylül University. Building AI-powered SaaS applications, mobile apps, and modern web experiences with React, Next.js, and TypeScript.",
  keywords: [
    "Ömer Özbay",
    "Full-Stack Developer",
    "Software Engineer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Frontend Developer",
    "Backend Developer",
    "Mobile App Developer",
    "Quran App",
    "SaaS Developer",
    "AI Integration",
    "Web Development",
    "Turkey Developer",
    "Bandırma"
  ],
  authors: [
    { name: "Ömer Özbay", url: "https://gucluyumhe.dev" }
  ],
  creator: "Ömer Özbay",
  publisher: "Ömer Özbay",
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
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://gucluyumhe.dev",
    title: "Ömer Özbay | Full-Stack Engineer",
    description: "Computer Engineering student building AI-powered SaaS applications and modern web experiences",
    siteName: "Ömer Özbay Portfolio",
    images: [
      {
        url: "https://gucluyumhe.dev/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ömer Özbay - Full-Stack Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ömer Özbay | Full-Stack Engineer",
    description: "Computer Engineering student building AI-powered SaaS applications and modern web experiences",
    creator: "@gucluyumhe",
    images: ["https://gucluyumhe.dev/twitter-image.png"],
  },
  icons: {
    icon: '/favicon.svg',
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://gucluyumhe.dev',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark">
      <head>
        <meta name="google-site-verification" content="S4AmguZUsl3R0caFt-YZ0ztkck_dYM1yOZPH-j22X_4" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <style>{`
          .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            display: inline-block;
            vertical-align: middle;
          }
        `}</style>
        {/* JSON-LD Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Ömer Özbay",
              "jobTitle": "Full-Stack Engineer",
              "url": "https://gucluyumhe.dev",
              "image": "https://gucluyumhe.dev/images/author.jpg",
              "sameAs": [
                "https://github.com/sandrotonal",
                "https://x.com/gucluyumhe",
                "https://wa.me/905314803809",
                "https://t.me/islamakhachev"
              ],
              "worksFor": {
                "@type": "Organization",
                "name": "Freelance"
              },
              "alumniOf": {
                "@type": "CollegeOrUniversity",
                "name": "Bandırma 17 Eylül University"
              },
              "knowsAbout": ["Full-Stack Development", "React", "Next.js", "TypeScript", "Node.js", "AI Integration", "SaaS"]
            })
          }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetBrainsMono.variable} antialiased min-h-screen flex flex-col bg-background text-on-surface font-body selection:bg-primary/30 selection:text-primary-fixed`}
      >
        <SplashScreen />
        <Navbar />
        <Sidebar />
        <main className="flex-grow pt-32 pb-20 px-8 max-w-screen-2xl mx-auto w-full relative">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
