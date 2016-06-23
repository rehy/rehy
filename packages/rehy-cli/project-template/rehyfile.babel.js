export const app = {
  name: 'Hello World',
  description: 'A hello world app.',
  author: {
    email: 'hello@example.com',
    url: 'http://example.com',
  },
  googleAnalyticsId: 'UA-xxxxxxxx-x',
}

export const intlConfig = {
  languages: ['en'],
}

export const cordovaConfig = {
  id: 'com.example',
  version: '0.0.1',
  plugins: [],
}

export const webpackConfig = {
  entry: {
    app: './main.js',
  },
  node: {
    fs: 'empty',
  },
  babel: {
    presets: [
      'es2015',
      'stage-0',
      'react',
    ],
    plugins: [
      'transform-runtime',
    ],
    env: {
      production: {
        presets: [
          'react-optimize',
        ],
        plugins: [
          'lodash',
        ],
      },
    },
  },
}
