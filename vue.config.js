// vue.config.js
module.exports = {
  baseUrl: "./",
  devServer: {
    // 设置默认端口
    port: 8081,
    host: "localhost",
    // 设置代理
    proxy: {
      "/": {
        // websocket协议代理
        ws: false,
        // 目标 API 地址
        target: "http://localhost:8080/",
        // 将主机标头的原点更改为目标URL
        changeOrigin: true
      }
    }
  },
  pages: {
    index: {
      // page 的入口
      entry: "src/views/index/main.js",
      // 模板来源
      template: "src/views/index/index.html",
      // 在 dist/index.html 的输出
      filename: "index.html",
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: "Index Page",
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ["chunk-vendors", "chunk-common", "index"]
    },
    login: {
      // page 的入口
      entry: "src/views/login/main.js",
      // 模板来源
      template: "src/views/login/login.html",
      // 在 dist/index.html 的输出
      filename: "login.html",
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: "login Page",
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ["chunk-vendors", "chunk-common", "login"]
    }
  }
};
