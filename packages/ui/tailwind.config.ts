import sharedConfig from "@repo/tailwind-config";
import type { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";

import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: ["./src/**/*.tsx", "./src/**/*.ts"],
  presets: [sharedConfig],
  plugins: [animatePlugin],
  prefix: "u-",
  corePlugins: {
    preflight: true,
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pretendard Variable", ...defaultTheme.fontFamily.sans],
      },
    },
  },
};

export default config;
