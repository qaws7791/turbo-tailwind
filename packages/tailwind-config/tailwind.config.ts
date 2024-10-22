import type { Config } from "tailwindcss";

// We want each package to be responsible for its own content.
const config: Omit<Config, "content"> = {
  theme: {
    extend: {
      backgroundImage: {
        "glow-conic":
          "conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)",
      },
      aria: {
        invalid: "invalid=true",
      },
      spacing: {
        px: "1px",
        ...Array.from({ length: 101 }, (_, i) => i / 2).reduce(
          (acc, cur) => {
            acc[cur] = `${cur * 4}px`;
            return acc;
          },
          {} as Record<string, string>
        ), //w-0 ~ w-50
        52: "208px",
        56: "224px",
        60: "240px",
        64: "256px",
        72: "288px",
        80: "320px",
        96: "384px",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
export default config;
