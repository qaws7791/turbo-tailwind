import { clientEnv } from "@/lib/env";

interface SiteConfig {
  siteName: {
    ko: string;
    en: string;
  };
  siteDescription: {
    ko: string;
    en: string;
  };
  siteUrl: string;
}

export const siteConfig: SiteConfig = {
  siteName: {
    ko: "링크버드",
    en: "LinkBird",
  },
  siteDescription: {
    ko: "링크버드는 링크를 공유하고 관리하는 서비스입니다.",
    en: "LinkBird is a service for sharing and managing links.",
  },
  siteUrl: clientEnv.NEXT_PUBLIC_URL,
} as const;
