# 编写plugin

基础Plugin
```javascript
class BasicPlugin{
  // 在构造函数中获取用户给该插件传入的配置
  constructor(options){
  }

  // Webpack 会调用 BasicPlugin 实例的 apply 方法给插件实例传入 compiler 对象
  apply(compiler){
    compiler.plugin('compilation',function(compilation) {
    })
  }
}

// 导出 Plugin
module.exports = BasicPlugin;
```
webpack启动后，在读取配置的过程中会先执行new BasicPlugin(options)初始化一个BasicPlugin获得其实例。在初始化compiler对象后，再调用basePlugin.apply(compiler)给插件实例传入compiler对象。插件实例获取到compiler对象后，就可以通过compiler.plugin(事件名称，回调函数)监听到webpack广播出来的事件。并且可以通过compiler对象去操作webpack。

**Compiler和Compilation**<br />Compiler对象包含了webpack环境所有的配置信息，包含options，loaders，plugins这些信息，这个对象在webpack启动时被实例化，它是全局唯一的，可以简单的理解为webpack实例。

compilation对象包含了当前的模块资源、编译生成资源、变化的文件等。当webpack以开发模式运行时，每当检测到一个文件变化，一次新的Compilation将被创建。Compilation对象也提供了很多事件回调供插件做扩展。通过Compilation也能读取到Compiler对象。

compiler和compilation区别在于：compiler代表了整个webpack从启动到关闭的生命周期，而compilation只是代表了一次新的编译。
