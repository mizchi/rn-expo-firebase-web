/* eslint-disable */
// $ yarn add webpack babel-loader
const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: ['babel-polyfill', path.join(__dirname, '../index.web.js')],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: process.env.NODO_ENV === 'development',
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        PLATFORM_ENV: JSON.stringify('web')
      }
    })
  ],
  resolve: {
    alias: {
      // for react-native-easy-grid
      'react-native/Libraries/Renderer/shims/ReactNativePropRegistry': path.join(
        __dirname,
        '../node_modules/react-native-web/dist/modules/ReactNativePropRegistry'
      ),
      'styled-components': 'styled-components/primitives',
      'react-native': 'react-native-web'
    },
    extensions: ['.web.js', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.ttf$/,
        loader: 'url-loader',
        include: path.resolve(
          __dirname,
          '../node_modules/react-native-vector-icons'
        )
      },
      {
        // Many react-native libraries do not compile their ES6 JS.
        test: /\.js$/,
        include: [
          /node_modules\/react-native-/,
          path.join(__dirname, '../src')
        ],
        exclude: /node_modules\/react-native-web\//,
        loader: 'babel-loader',
        query: { cacheDirectory: true }
      },
      {
        test: /\.(gif|jpe?g|png|svg)$/,
        loader: 'url-loader',
        query: { name: 'images/[name]-[hash:16].[ext]' }
      },
      {
        test: /\.(mp3|wav)$/,
        loader: 'file-loader',
        query: { name: 'sounds/[name]-[hash:16].[ext]' }
      }
    ]
  }
}
