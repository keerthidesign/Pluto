import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
    '@storybook/addon-themes',
    {
      name: '@storybook/addon-docs',
      options: {
        csfPluginOptions: null,
        mdxPluginOptions: {},
      },
    },
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
    defaultName: 'Docs',
  },
  staticDirs: ['../public'],
  viteFinal: async (config) => {
    // Resolve workspace packages from source so Vite handles TS + CSS modules
    // directly — avoids hashed-CSS issues in tsup-compiled dist files
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      '@pluto/ui': path.resolve(__dirname, '../../../packages/ui/src/index.ts'),
    };

    // When building for GitHub Pages, set the base path to the repo name
    // so all assets load correctly from https://keerthidesign.github.io/Pluto/
    if (process.env.GITHUB_ACTIONS) {
      config.base = '/Pluto/';
    }
    return config;
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
};

export default config;
