import "@repo/ui/styles.css";
import type { Metadata } from "next";
// 디자인 시스템 스타일보다 뒤에 위치해야 합니다.
import "./globals.css";
import { siteConfig } from "@/lib/config.ts";

export const metadata: Metadata = {
  title: siteConfig.siteName,
  description: siteConfig.siteDescription,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteConfig.siteUrl,
    siteName: siteConfig.siteName,
    title: siteConfig.siteName,
    description: siteConfig.siteDescription,
    images: [
      {
        url: `${siteConfig.siteUrl}/logo-256.png`,
        width: 256,
        height: 256,
        alt: siteConfig.siteName,
      },
    ],
  },
  twitter: {
    title: siteConfig.siteName,
    description: siteConfig.siteDescription,
    card: "summary",
    images: [
      {
        url: `${siteConfig.siteUrl}/logo-256.png`,
        alt: siteConfig.siteName,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
