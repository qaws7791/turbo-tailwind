import sharedConfig from "@repo/tailwind-config";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./stories/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  presets: [sharedConfig],
};
