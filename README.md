# Tailwind Monorepo Using Turborepo

### Apps and Packages

- `docs`: ui component storybook
- `web`: nextjs app
- `ui`: react component library with [Tailwind CSS](https://tailwindcss.com/), [React aria](https://react-spectrum.adobe.com/react-aria)
- `config`
  - eslint-config: eslint.config.js, .eslintrc.js ...
  - typescript-config: tsconfig.json
  - tailwind-config: tailwind.config.ts

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Building packages/ui

This example is set up to produce compiled styles for `ui` components into the `dist` directory. The component `.tsx` files are consumed by the Next.js apps directly using `transpilePackages` in `next.config.js`. This was chosen for several reasons:

- Make sharing one `tailwind.config.js` to apps and packages as easy as possible.
- Make package compilation simple by only depending on the Next.js Compiler and `tailwindcss`.
- Ensure Tailwind classes do not overwrite each other. The `ui` package uses a `ui-` prefix for it's classes.
- Maintain clear package export boundaries.

Another option is to consume `packages/ui` directly from source without building. If using this option, you will need to update the `tailwind.config.js` in your apps to be aware of your package locations, so it can find all usages of the `tailwindcss` class names for CSS compilation.

For example, in [tailwind.config.js](packages/tailwind-config/tailwind.config.js):

```js
  content: [
    // app content
    `src/**/*.{js,ts,jsx,tsx}`,
    // include packages if not transpiling
    "../../packages/ui/*.{js,ts,jsx,tsx}",
  ],
```

If you choose this strategy, you can remove the `tailwindcss` and `autoprefixer` dependencies from the `ui` package.

### Utilities

This Turborepo has some additional tools already setup for you:

- [Tailwind CSS](https://tailwindcss.com/) for styles
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Storybook 배포

1. chromatic 계정 생성 및 리포지토리 연결
2. 스토리북 앱에 `pnpm add -D chromatic` 설치
3. 앱 루트 디렉토리에서 `npx chromatic --project-token={PROJECT_TOKEN}` 실행하여 배포

https://www.chromatic.com/docs/github-actions/#run-chromatic-on-monorepos
https://www.chromatic.com/docs/github-actions/
https://turbo.build/repo/docs/guides/tools/storybook
https://turbo.build/repo/docs/reference/run#--filter-string
https://pnpm.io/continuous-integration#github-actions
