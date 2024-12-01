import "@repo/ui/styles.css";
import type { Metadata } from "next";
// 디자인 시스템 스타일보다 뒤에 위치해야 합니다.
import { siteConfig } from "@/lib/config.ts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: `%s | ${siteConfig.siteName.ko}`,
    default: siteConfig.siteName.ko,
  },
  description: siteConfig.siteDescription.ko,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteConfig.siteUrl,
    siteName: siteConfig.siteName.ko,
    title: siteConfig.siteName.ko,
    description: siteConfig.siteDescription.ko,
    images: [
      {
        url: `${siteConfig.siteUrl}/logo-256.png`,
        width: 256,
        height: 256,
        alt: siteConfig.siteName.ko,
      },
    ],
  },
  twitter: {
    title: siteConfig.siteName.ko,
    description: siteConfig.siteDescription.ko,
    card: "summary",
    images: [
      {
        url: `${siteConfig.siteUrl}/logo-256.png`,
        alt: siteConfig.siteName.ko,
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
