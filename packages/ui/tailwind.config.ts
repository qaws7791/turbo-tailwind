import sharedConfig from "@repo/tailwind-config";
import type { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";

const config: Pick<Config, "prefix" | "presets" | "content" | "plugins"> = {
  content: ["./src/**/*.tsx", "./src/**/*.ts"],
  presets: [sharedConfig],
  plugins: [animatePlugin],
  prefix: "u-",
};

export default config;
