const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}

module.exports = {
  devServer: {
    host: '0.0.0.0',  // 解决在局域网下无法访问
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true
      }
    },
  },

  pages:{
    index:{
      entry:'examples/main.js',
      template:'public/index.html',
      filename:'index.html'
    },
  },
  // 提取css代码 因为js会动态的加载出css，所以js文件包会比较大，那么需要提取css代码到文件. 这里我们只需要将css配置一下
  css: {
      extract: false
  },
  // 配置
  chainWebpack:config=>{
    // 用cdn方式引入
    config.externals({
      'vue': 'Vue',
      'vuex': 'Vuex',
      'vue-router': 'VueRouter',
    })
    // 配置别名
    config.resolve.alias
    .set('@', resolve('examples'))
    config.module.rule('js')
    .include
    .add(resolve('packages'))
    .end()
    .use('babel')
    .loader('babel-loader')
    .tap(options=>options)
  }
}