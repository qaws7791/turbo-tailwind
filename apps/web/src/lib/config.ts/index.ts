import { clientEnv } from "@/lib/env";

export const siteConfig = {
  siteName: "LinkBird",
  siteDescription: "LinkBird is a links sharing platform",
  siteUrl: clientEnv.NEXT_PUBLIC_URL,
} as const;
