# webpack基础

webpack是一个模块打包构建工具，用来做项目管理、打包、以及静态编译等

webpack用途？工程化、模块化、自动化

<a name="U8QSM"></a>

## 基础配置项
entry  入口文件<br />output  出口文件<br />Loaders  loader配置（module里配置）<br />plugins   plugin配置<br />mode    环境区分<br />resolve  配置模块如何解析，常用来配置路径别名、后缀名省略<br />DevServer   代理服务器配置


<a name="AssCg"></a>

## 入口配置
```javascript
1.来指定一个入口起点（或多个入口起点）
    1.1.单入口entry是一个字符串例如：
        module.exports = {
          entry: './path/to/my/entry/file.js'
        };
    1.2.多入口entry 是一个对象配置例如：
        entry: {
            app:'./src/app.js',
            adminApp:'./src/adminAPP.JS'
        }
```
<a name="Kmhis"></a>

##  出口配置
```javascript
output: {
        // 输出文件名称
        filename: 'bundle.js',
        // 值绝对路径  当前文件目录 + 新建文件夹
        path: path.join(__dirname, 'output') //必须是绝对路径
}
```
<a name="Rycvc"></a>

## loader配置
```javascript
const config = {
  ...,
  module: {
    rules: [
      { test: /\.vue$/, use: 'vue-loader' }
    ]
  }
};
```
loader让webpack能够去处理非js文件<br />webpack只支持js和json俩种文件类型，其他的文件需要各自loader解析例如：vue-loader、<br />css-loader、less-loader、sass-loader、ts-loader、file-loader、babel-loader(将es6转成es5)等

loader其实就是一个函数，传入参数以及内容，并对内容处理后返回

<a name="fZXxA"></a>

## plugins插件配置
插件一般用于bundle文件的优化
```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 用于访问内置插件

const config = {
  ...,
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'}) // 配置插件
  ]
};
```
<a name="C3RZm"></a>

## resolve配置
```javascript
const config = {
  ...,
  resolve: {
        alias: {
            "@": path.resolve("./src"),
        },
        extensions: ['.js', '.json', '.wasm'], //后缀名省略
  },
};
```



















