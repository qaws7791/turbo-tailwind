/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";

import sharedConfig from "@repo/tailwind-config";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  presets: [sharedConfig],
} satisfies Config;
