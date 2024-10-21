import "@repo/ui/styles.css";
import type { Preview } from "@storybook/react";
// 마지막에 import
import "../src/globals.css";
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {},
    },
  },
};

export default preview;
