import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/lib/data/site";
import { Analytics } from "@/components/Analytics";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Ali Murtadho | AI & Data Solutions Lead - BangAl Labs",
  description:
    "AI and data solutions leadership, R&D engineering, solution architecture, and digital transformation portfolio by Ali Murtadho.",
  alternates: {
    canonical: "/"
  },
  icons: {
    icon: "/images/logo-web.svg",
    shortcut: "/images/logo-web.svg",
    apple: "/images/logo-transparent.png"
  },
  openGraph: {
    title: "Ali Murtadho | AI & Data Solutions Lead - BangAl Labs",
    description:
      "AI and data solutions leadership, R&D engineering, solution architecture, and digital transformation portfolio by Ali Murtadho.",
    url: site.url,
    siteName: site.name,
    images: [
      {
        url: "/images/logo-transparent.png",
        width: 1400,
        height: 1400,
        alt: "BangAl Labs logo"
      }
    ],
    locale: "en_ID",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Ali Murtadho | AI & Data Solutions Lead - BangAl Labs",
    description: "AI, data, R&D engineering, and digital transformation portfolio.",
    images: ["/images/logo-transparent.png"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Analytics measurementId={process.env.NEXT_PUBLIC_GA_ID} />
      </body>
    </html>
  );
}
