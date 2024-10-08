import "@repo/ui/styles.css";
import type { Preview } from "@storybook/react";
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {},
    },
  },
};

export default preview;
