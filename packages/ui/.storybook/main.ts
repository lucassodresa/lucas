import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import { tokensPlugin } from '../plugins/tokens';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-themes'],
  framework: { name: '@storybook/react-vite', options: {} },

  async viteFinal(config) {
    return mergeConfig(config, { plugins: [tokensPlugin()] });
  },
};

export default config;
