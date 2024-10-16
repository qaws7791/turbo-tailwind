const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    ...[
      "plugin:@typescript-eslint/recommended",
      "plugin:prettier/recommended",
    ].map(require.resolve),
  ],
  plugins: ["@typescript-eslint/eslint-plugin"],
  parserOptions: {
    project,
  },
  root: true,
  env: {
    node: true,
    jest: true,
  },
  globals: {
    React: true,
    JSX: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
      node: {
        extensions: [".mjs", ".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  ignorePatterns: ["node_modules/", ".eslintrc.js"],
  // add rules configurations here
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
};
