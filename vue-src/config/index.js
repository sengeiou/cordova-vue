/*
 * @Descripttion: 
 * @version: 
 * @Author: wyx
 * @Date: 2020-12-08 10:18:25
 * @LastEditors: wyx
 * @LastEditTime: 2020-12-09 19:05:08
 */
'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/apiCity': {
        target: 'https://geoapi.qweather.com/v2/city', //后端接口地址
        changeOrigin: true,               //是否允许跨越
        pathRewrite: {
            '^/apiCity': '/',              //重写,
        }
      },
      '/apicWeather': {
        target: 'https://api.qweather.com/v7/weather', //后端接口地址
        changeOrigin: true,               //是否允许跨越
        pathRewrite: {
            '^/apicWeather': '/',              //重写,
        }
      },
      '/apiWeather': {
        target: 'https://devapi.qweather.com/v7/weather', //后端接口地址
        changeOrigin: true,               //是否允许跨越
        pathRewrite: {
            '^/apiWeather': '/',              //重写,
        }
      },
      '/apiPicture': {
        target: 'https://www.bing.com', //后端接口地址
        changeOrigin: true,               //是否允许跨越
        pathRewrite: {
            '^/apiPicture': '/',              //重写,
        }
      },
      '/apiBg': {
        target: 'https://source.unsplash.com', //后端接口地址
        changeOrigin: true,               //是否允许跨越
        pathRewrite: {
            '^/apiBg': '/',              //重写,
        }
      },
      '/apiLogin': {
        target: 'http://localhost:3000', //后端接口地址
        changeOrigin: true,               //是否允许跨越
        pathRewrite: {
            '^/apiLogin': '/',              //重写,
        }
      },
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    
    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    // index: path.resolve(__dirname, '../dist/index.html'),
    index: path.resolve(__dirname, '../../www/index.html'),

    // Paths
    // assetsRoot: path.resolve(__dirname, '../dist'),
    assetsRoot: path.resolve(__dirname, '../../www'),
    assetsSubDirectory: 'static',
    // assetsPublicPath: '/',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
