import webpack from 'webpack';
import path from 'path';
import fs from 'fs';
import _ from 'underscore';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const targetPath = path.resolve(__dirname, '../src/client')
  , files = fs.readdirSync(targetPath)

const folders = _.chain(files)
  .map(v => ({ name: v, path: path.resolve(targetPath, v) }))
  .filter(v => fs.statSync(v.path).isDirectory());
  console.log(folders.map(v => [v.name, path.resolve(v.path, 'index.js')])
  .object()
  .extend({
    vendor: ['underscore', 'jquery']
  })
  .value())
export default {
  entry: folders.map(v => [v.name, path.resolve(v.path, 'index.js')])
    .object()
    .extend({
      vendor: ['underscore', 'jquery']
    })
    .value(),
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.vue'],
  },
  plugins: folders
    .map(v => new HtmlWebpackPlugin({
      filename: `${v.name}.html`,
      template: path.resolve(v.path, 'index.html'),
      chunks: ['manifest', 'vendor', v.name],
    }))
    .concat([
      new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor', 'manifest'],
        minChunks: Infinity,
      }),
    ])
    .value(),
}
