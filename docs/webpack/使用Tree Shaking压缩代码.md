# Tree Shaking

Tree Shaking 可以用来剔除 JavaScript 中用不上的死代码。它依赖静态的 ES6 模块化语法，例如通过 import 和 export 导入导出。 Tree Shaking 最先在 Rollup 中出现，Webpack 在 2.0 版本中将其引入。

package.json 文件中有两个字段：
```javascript
{
  "main": "lib/index.js", // 指明采用 CommonJS 模块化的代码入口
  "jsnext:main": "es/index.js" // 指明采用 ES6 模块化的代码入口
}
```


```javascript
module.exports = {
  resolve: {
    // 针对 Npm 中的第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法的文件
    mainFields: ['jsnext:main', 'browser', 'main']
  },
};
```
以上配置的含义是优先使用 jsnext:main 作为入口，如果不存在 jsnext:main 就采用 browser 或者 main 作为入口。 虽然并不是每个 Npm 中的第三方模块都会提供 ES6 模块化语法的代码，但对于提供了的不能放过，能优化的就优化。<br />目前越来越多的 Npm 中的第三方模块考虑到了 Tree Shaking，并对其提供了支持。 采用 jsnext:main 作为 ES6 模块化代码的入口是社区的一个约定，假如将来你要发布一个库到 Npm 时，希望你能支持 Tree Shaking， 以让 Tree Shaking 发挥更大的优化效果，让更多的人为此受益。

**sideEffects**<br />sideEffects 是什么呢？我用一句话来概括就是：让 webpack 去除 tree shaking 带来副作用的代码。

treeshaking的副作用举个很常见的例子，一般我们在项目里写代码的时候会区分开发环境和生产环境，比如开发阶段会引入一些调试工具包，如：
```javascript
import DevTools from 'mobx-react-devtools';
class MyApp extends React.Component {
  render() {
    return (
      <div>
        ...
        { process.env.NODE_ENV === 'production' ? null : <DevTools /> }
      </div>
    );
  }
}
```
乍一看，还以为如果生产环境下 mobx-react-devtools 就完全不会被引入了，但其实如果没有 sideEffects 的话 mobx-react-devtools 并没有被完全移除，里面的副作用代码仍然是会被引入的。

使用：<br />sideEffects 支持两种写法，一种是 false，一种是数组

- false 为了告诉 webpack 我这个 npm 包里的所有文件代码都是没有副作用的
- 数组则表示告诉 webpack 我这个 npm 包里指定文件代码是没有副作用的

npm库
```javascript
// package.json
{
    "sideEffects": false
}
// antd package.json
{
  "sideEffects": [
    "dist/*",
    "es/**/style/*",
    "lib/**/style/*"
  ]
}
```
会只引入import的内容

业务代码使用
```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
        sideEffects: false || []
      }
    ]
  },
}
```
