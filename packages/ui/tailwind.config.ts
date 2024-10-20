import sharedConfig from "@repo/tailwind-config";
import type { Config } from "tailwindcss";
import reactAriaPlugin from "tailwindcss-react-aria-components";

const config: Pick<Config, "prefix" | "presets" | "content" | "plugins"> = {
  content: ["./src/**/*.tsx"],
  presets: [sharedConfig],
  plugins: [reactAriaPlugin],
  prefix: "ui-",
};

export default config;
