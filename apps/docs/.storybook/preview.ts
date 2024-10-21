import type { Preview } from "@storybook/react";
import "../src/globals.css";
//
import "@repo/ui/styles.css";
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {},
    },
  },
};

export default preview;
