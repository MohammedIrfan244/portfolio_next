import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mohammed Irfan – MERN Stack Developer",
  description: "Portfolio of Mohammed Irfan, a professional MERN Stack Developer showcasing fullstack web development projects and experience.",
  keywords: [
    "Mohammed Irfan",
    "Mohammed Irfan Portfolio",
    "Mohammed Irfan Mern Stack Developer",
    "zemdev",
    "MERN Stack Developer",
    "Fullstack Developer Portfolio",
    "React Developer",
    "Node.js Developer",
    "Next.js Portfolio",
    "MongoDB Projects",
    "JavaScript Developer",
  ],
  authors: [{ name: "Mohammed Irfan" }],
  creator: "Mohammed Irfan",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  metadataBase: new URL("https://mohammed-irfan.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Mohammed Irfan – MERN Stack Developer",
    description: "Explore the portfolio of Mohammed Irfan, fullstack MERN developer with expertise in building scalable web applications.",
    url: "https://mohammed-irfan.vercel.app",
    siteName: "Mohammed Irfan Portfolio",
    images: [
      {
        url: "https://mohammed-irfan.vercel.app/profile.png",
        width: 1200,
        height: 630,
        alt: "Mohammed Irfan Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Irfan – MERN Stack Developer",
    description: "Visit the personal portfolio of Mohammed Irfan, a fullstack JavaScript engineer specialized in the MERN stack.",
    images: ["https://mohammed-irfan.vercel.app/profile.png"]
  },
  icons: {
    icon: "/favicon.ico",
  },
  themeColor: "#000000",
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
