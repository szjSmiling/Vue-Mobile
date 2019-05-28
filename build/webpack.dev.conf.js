'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
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

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    // overlay: config.dev.errorOverlay? { warnings: false, errors: true }: false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
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
            // 引用自己的模板
            format: 'retinaOnly'
          }]
        ]
      },
      customTemplates: {
        'retinaOnly': templateFunction
      },
      apiOptions: { // 样式文件中调用雪碧图地址写法
        cssImageRef: '../src/assets/sprites/sprite.png'
      },
      spritesmithOptions: {
        padding: 4, // 让合成的每个图片有一定的距离
        // algorithm: 'top-down'
      }
    }),
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
