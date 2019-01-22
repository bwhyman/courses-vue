## 2019.01.08

vue, vue-router  
vuetify，axios

vuex 的 store 拆分为 module
重构，基于 vuex 调用远程请求 API ，vuex 作为本地 Respository？
return 竟然不能终止 foreach 循环，JS 果然够奇葩  
调用 JS 异步方法时，基于 Promise 封装，基于 ES7 async & await 简化，但 异步错误依然使用 reject

基于 xlsx 在客户端直接读取学生选课 excel 表格，导入学生数据

随着移植开发，数据状态变得复杂，取消 event bus，引入 vuex 管理数据状态
取消表单提交全部转为 application/x-www-form-urlencoded 的设计，全部使用 axios 默认请求配置，后端设计 DTO 层封装请求

组件延迟加载  
基于 Material Design Card 设计，有贴片，阴影，悬浮等，效果不错

按多页面配置

~~axios 默认使用 application/json 发送表单请求，但后台必须单独封装或手动处理，不利于维护  
使用拦截器将表单类型设为 application/x-www-form-urlencoded，使用 qs 库将 json 对象拼接转为 url 字符串~~

[后台微服务源码](https://github.com/bwhyman/Courses)
