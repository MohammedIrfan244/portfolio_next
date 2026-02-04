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
  title: "Mohammed Irfan – MERN Stack Developer | Full Stack JavaScript Engineer Portfolio",
  description: "Hi, I'm Mohammed Irfan, a professional MERN Stack Developer. I specialize in building full-stack web applications using React, Node.js, MongoDB, and Express.js. Explore my portfolio to see the projects I’ve built, the problems I solve, and how I can help bring scalable digital solutions to life. I'm currently open to freelance gigs and full-time roles.",
  keywords: [
    "Mohammed Irfan",
    "Mohammed Irfan Portfolio",
    "Mohammed Irfan MERN Stack Developer",
    "zemdev",
    "MERN Stack Developer",
    "Full Stack Developer",
    "React Developer",
    "Node.js Developer",
    "Next.js Developer",
    "MongoDB Developer",
    "Express.js Developer",
    "JavaScript Developer",
    "TypeScript Developer",
    "Web Developer Portfolio",
    "Frontend Developer",
    "Backend Developer",
    "API Development",
    "Responsive Web Design",
    "Software Engineer",
    "Web Application Development",
    "Freelance Developer",
    "Bangalore Developer",
    "India Developer",
    "Portfolio Website",
    "Developer Portfolio 2025"
  ],
  authors: [{ name: "Mohammed Irfan", url: "https://mohammed-irfan.vercel.app" }],
  creator: "Mohammed Irfan",
  publisher: "Mohammed Irfan",
  category: "Technology",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  metadataBase: new URL("https://mohammed-irfan.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Mohammed Irfan – Professional MERN Stack Developer Portfolio",
    description: "Hi, I'm Mohammed Irfan, a professional MERN Stack Developer. I specialize in building full-stack web applications using React, Node.js, MongoDB, and Express.js. Explore my portfolio to see the projects I’ve built, the problems I solve, and how I can help bring scalable digital solutions to life. I'm currently open to freelance gigs and full-time roles.",
    url: "https://mohammed-irfan.vercel.app",
    siteName: "Mohammed Irfan Portfolio",
    images: [
      {
        url: "https://mohammed-irfan.vercel.app/images/profile.png",
        width: 1200,
        height: 630,
        alt: "Mohammed Irfan - MERN Stack Developer Portfolio",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "profile",
    countryName: "India",
    firstName: "Mohammed",
    lastName: "Irfan",
    username: "zemdev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Irfan – MERN Stack Developer Portfolio",
    description: "Hi, I'm Mohammed Irfan, a professional MERN Stack Developer. I specialize in building full-stack web applications using React, Node.js, MongoDB, and Express.js. Explore my portfolio to see the projects I’ve built, the problems I solve, and how I can help bring scalable digital solutions to life. I'm currently open to freelance gigs and full-time roles.",
    images: ["https://mohammed-irfan.vercel.app/images/profile.png"],
  },
  verification: {
    google: "dWv250TjsDYBXWhQVgmudpB-oGlTqk8Ipl7KUeRwYDY",
  },
  // themeColor moved to viewport export below
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url:"/favicon.ico", sizes: "any", type: "image/x-icon" },
      { url: "/images/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/images/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  other: {
    "application-name": "Mohammed Irfan Portfolio",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "format-detection": "telephone=no",
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="dWv250TjsDYBXWhQVgmudpB-oGlTqk8Ipl7KUeRwYDY" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <link rel="icon" href="/images/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="image_src" href="/images/profile.png" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Mohammed Irfan",
              "alternateName": "zemdev",
              "jobTitle": "MERN Stack Developer",
              "description": "Hi, I'm Mohammed Irfan, a professional MERN Stack Developer. I specialize in building full-stack web applications using React, Node.js, MongoDB, and Express.js. Explore my portfolio to see the projects I’ve built, the problems I solve, and how I can help bring scalable digital solutions to life. I'm currently open to freelance gigs and full-time roles.",
              "url": "https://mohammed-irfan.vercel.app",
              "image": "https://mohammed-irfan.vercel.app/images/profile.png",
              "sameAs": [
                "https://github.com/mohammedIrfan244",
                "https://linkedin.com/in/mohammed-irfan-n",
              ],
              "knowsAbout": [
                "JavaScript",
                "TypeScript",
                "React",
                "Node.js",
                "MongoDB",
                "Express.js",
                "Next.js",
                "Full Stack Development",
                "Web Development",
                "API Development"
              ],
              "worksFor": {
                "@type": "Organization",
                "name": "Freelance Developer"
              },
              "email": "mailto:irfanndmb@gmail.com",
              "telephone": "+91-8891555811"
            })
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Mohammed Irfan Portfolio",
              "alternateName": "Mohammed Irfan - MERN Stack Developer",
              "url": "https://mohammed-irfan.vercel.app",
              "description": "Professional portfolio showcasing MERN stack development projects and skills",
              "author": {
                "@type": "Person",
                "name": "Mohammed Irfan"
              },
              "inLanguage": "en-US",
              "copyrightHolder": {
                "@type": "Person",
                "name": "Mohammed Irfan"
              },
              "copyrightYear": new Date().getFullYear(),
              "keywords": "MERN Stack Developer, Full Stack Developer, React Developer, Node.js Developer, MongoDB, Express.js, JavaScript, TypeScript, Portfolio"
            })
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Mohammed Irfan - MERN Stack Development Services",
              "description": "Professional MERN Stack development services including web application development, API development, and full-stack solutions",
              "provider": {
                "@type": "Person",
                "name": "Mohammed Irfan"
              },
              "areaServed": {
                "@type": "Country",
                "name": "India"
              },
              "serviceType": "Web Development",
              "url": "https://mohammed-irfan.vercel.app",
              "priceRange": "₹",
              "availableLanguage": "English"
            })
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}