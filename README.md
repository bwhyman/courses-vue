## Courses-Vue

### 2020.06.01
添加github actions持续部署  
添加上传文件尺寸动态限制  
更友好的超过截至时间显示  

### 2019.03.22

#### New Feature

添加首页浏览器类型版本判断，提供 IE 浏览器提示

添加学生上传/下载实验报告进度条

添加日期时间选择器

增大上传文件尺寸限制

#### Improvement

Material design icons 使用国内镜像

#### Bug

修复日期时间选择器显示兼容性问题

#### New Feature

升级 Vue 2.6.10，支持 v-slot 插槽  
添加查看学生作业上/下一个导航，避免反复打开/关闭窗口

### 2019.02.04

#### Tasks

预，基于 TypeScript，重构

### New Feature

前端部署在 nginx Docker 容器，通过反向代理实现跨域请求  
启用 HTTP2/HTTPS 支持  
取消 material-design-icons 导入，通过 cdn 在 html 引入 css，减少编译体积  
取消 prismjs 导入，通过 cdn 引入，在 unpkg 基于版本引入，阻止 2 次跳转影响性能  
基于 VuePrismEditor 点亮作业中程序语言语法，整合了输入与输出，但 css 样式与 vuetify 冲突  
添加下载动画，显示已下载大小；为减少内存占用，后端基于缓存压缩文档并同时以字节流发送，无法确定文件大小  
导入学生信息处理过慢，加入 progress 动画  
将可读性差的，样式相同但权限不同内容略有差异的组件，拆分。能力不够，抽象出来太麻烦  
vuex store 拆分为 module  
基于 vuex 调用远程请求 API ，vuex 作为本地 Respository？  
调用 JS 异步方法时，基于 Promise 封装，基于 ES7 async & await 简化，但异步错误依然使用 Promise  
基于 xlsx 在客户端直接分析读取学生选课 excel 表格  
随着移植，数据状态变得复杂，取消 event bus，引入 vuex 管理数据状态  
取消原表单请求类型设计，使用 axios 默认请求配置，后端设计 DTO 层封装请求  
基于权限创建路由表  
组件延迟加载  
基于 Material Design Card 设计，有贴片，阴影，悬浮等，效果不错  
按多页面配置  
~~axios 默认使用 application/json 发送表单请求，但后台必须单独封装或手动处理，不利于维护  
使用拦截器将表单类型设为 application/x-www-form-urlencoded，使用 qs 库将 json 对象拼接转为 url 字符串~~

vue 2.5; vuex 3.01; vuetify 1.40，axios 0.81; prismjs 1.15; xlsx 0.14;

[后台微服务源码](https://github.com/bwhyman/Courses)
