const path = require('path')
const custom = require('../build/webpack.config.base.js')

module.exports = {
  stories: ['../src/**/*.stories.([tj]s|mdx|tsx)'],
  addons: [
    {
      name: '@storybook/preset-typescript',
      options: {
        tsLoaderOptions: {
          configFile: path.resolve(__dirname, '../tsconfig.json'),
        },
        include: [path.resolve(__dirname, '../src')],
        transpileManager: true,
      },
    },
    '@storybook/addon-actions',
    '@storybook/addon-viewport/register',
    '@storybook/addon-storysource',
    '@storybook/addon-backgrounds/register',
  ],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('ts-loader'),
        },
        // Optional
        {
          loader: require.resolve('react-docgen-typescript-loader'),
        },
      ],
    })
    config.resolve.extensions.push('.ts', '.tsx')
    return { ...config, resolve: { ...config.resolve, ...custom.resolve } }
  },
}
