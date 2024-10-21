import sharedConfig from "@repo/tailwind-config";
import defaultTheme from "tailwindcss/defaultTheme";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./stories/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Spoqa Han Sans Neo", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
  presets: [sharedConfig],
};
