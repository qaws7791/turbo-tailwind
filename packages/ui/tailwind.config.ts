import sharedConfig from "@repo/tailwind-config";
import type { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";

const config: Pick<Config, "prefix" | "presets" | "content" | "plugins"> = {
  content: ["./src/**/*.tsx"],
  presets: [sharedConfig],
  plugins: [animatePlugin],
  prefix: "ui-",
};

export default config;
