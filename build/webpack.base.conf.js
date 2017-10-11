// webpack的基本配置文件
var path = require('path')
var utils = require('./utils')
var config = require('../config') // 获取配置
var vueLoaderConfig = require('./vue-loader.conf') // 获取loader配置

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  // 入口起点。这里应用程序开始执行，webpack 开始打包
  entry: {
    app: './src/main.js'
  }, 
  // 输出。webpack如何输出结果的相关选项
  output: {
    path: config.build.assetsRoot, // 所有输出文件的目标路径。必须是绝对路径
    filename: '[name].js', // 入口分块（entry chunk） 的文件名模块
    // 输出解析文件的目录。 url 相对于 HTML 页面
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  // 解析模块请求的选项 (不适用于对 loader 解析)
  resolve: {
    // 使用的扩展名
    extensions: ['.js', '.vue', '.json'],
    // 模块别名列表
    alias: {
      // 起别名 'vue$' -> 'vue/dist/vue.esm.js'
      'vue$': 'vue/dist/vue.esm.js',
      // 起别名： '@' ->  'src的绝对路径'
      '@': resolve('src')
    }
  },
  // 模块配置
  module: {
    // 模块规则(配置 loader、解析器等选项)
    rules: [
      {
        // 匹配条件,每个选项都接收一个正则表达式或字符串
        // test 和 inclue 具有相同的作用， 都是必须匹配选项
        // exclude 是必不匹配选项(优先于 test 和 include)
        // 最佳实践：
        // - 只在 test 和 文件名匹配 中使用正则表达式
        // - 在 include 和 exclude 中使用绝对路径数组
        // - 尽量避免 exclude，更倾向于使用 include
        test: /\.vue$/, 
        loader: 'vue-loader', // 应该应用的loader,它相对上下文解析
        options: vueLoaderConfig  // loader的可选项
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
