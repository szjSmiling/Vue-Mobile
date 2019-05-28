'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

/* sprites */
var SpritesmithPlugin = require('webpack-spritesmith');
var templateFunction = function (data) {
  const shared = '.s-icon { display:inline-block;background-image: url(I); }'
    .replace('I', data.sprites[0].image);
  // 注意：此处默认图标使用的是二倍图
  const perSprite = data.sprites.map(function (sprite) {
    return '.s-icon-N { width: Wpx;height: Hpx;background-position: Xpx Ypx;background-size: SWpx SHpx; }'
    .replace(/N/g, sprite.name)
    .replace(/SW/g, sprite.width / 2)
    .replace(/SH/g, sprite.height / 2)
    .replace(/W/g, sprite.width / 2)
    .replace(/H/g, sprite.height / 2)
    .replace(/X/g, sprite.offset_x / 2)
    .replace(/Y/g, sprite.offset_y / 2);
  }).join('\n');
  return shared + '\n' + perSprite;
}

const env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : require('../config/prod.env')

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    new SpritesmithPlugin({
      src: { // 目标小图标
        cwd: path.resolve(__dirname, '../src/assets/sprites/images'),
        glob: '*.png'
      },
      target: { // 输出雪碧图文件及样式文件
        image: path.resolve(__dirname, '../src/assets/sprites/sprite.png'),
        css: [
          [path.resolve(__dirname, '../src/assets/sprites/sprite.css'), {
            format: 'retinaOnly'
          }]
        ]
      },
      apiOptions: { // 样式文件中调用雪碧图地址写法
        cssImageRef: '../src/assets/sprites/sprite.png'
      },
      spritesmithOptions: {
        padding: 4,
        algorithm: 'top-down'
      },
      customTemplates: {
        'retinaOnly': templateFunction
      }
    }),
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    new ExtractTextPlugin({ // extract css into its own file
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      allChunks: true,
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),
    new CopyWebpackPlugin([ // copy custom static assets
      {from: path.resolve(__dirname, '../static'),to: config.build.assetsSubDirectory,ignore: ['.*']},
      {from: path.resolve(__dirname, "../bridge.html"), to:path.resolve(__dirname, "../dist/bridge.html")}
    ])
  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')
  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
