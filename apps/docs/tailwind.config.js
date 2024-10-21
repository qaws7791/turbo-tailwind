import sharedConfig from "@repo/tailwind-config";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./stories/*.{ts,tsx}"],

  plugins: [],
  presets: [sharedConfig],
};
