import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";
import reactAriaPlugin from "tailwindcss-react-aria-components";

const config: Pick<Config, "prefix" | "presets" | "content" | "plugins"> = {
  content: ["./src/**/*.tsx"],
  presets: [sharedConfig],
  plugins: [reactAriaPlugin],
};

export default config;
