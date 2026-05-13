import type { Preview } from '@storybook/react';
import { withThemeByDataAttribute } from '@storybook/addon-themes';

import '@pluto/tokens/css'; // :root — light mode default
import '@pluto/tokens/css/themes/dark'; // [data-theme="dark"] overrides
import '@pluto/tokens/css/themes/high-contrast'; // [data-theme="high-contrast"] overrides
import '@pluto/tokens/css/themes/high-contrast-media'; // @media (prefers-contrast: more)
import '@pluto/foundations/reset.css';
import '@pluto/foundations/base.css';
import '@pluto/foundations/a11y.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'label', enabled: true },
          { id: 'button-name', enabled: true },
        ],
      },
    },
    backgrounds: { disable: true },
    layout: 'padded',
  },

  decorators: [
    withThemeByDataAttribute({
      themes: {
        Light: 'light',
        Dark: 'dark',
        'High Contrast': 'high-contrast',
      },
      defaultTheme: 'Light',
      attributeName: 'data-theme',
    }),
  ],

  globalTypes: {
    theme: {
      description: 'Global theme',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark', 'high-contrast'],
        dynamicTitle: true,
      },
    },
    locale: {
      description: 'Internationalization locale',
      defaultValue: 'en',
      toolbar: {
        title: 'Locale',
        icon: 'globe',
        items: [
          { value: 'en', title: 'English' },
          { value: 'ar', title: 'Arabic (RTL)', right: '→←' },
        ],
      },
    },
  },
};

export default preview;
