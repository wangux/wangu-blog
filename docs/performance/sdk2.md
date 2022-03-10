# 前端埋点、性能监控sdk实现

<a name="kal93"></a>

## -监控JS报错
- 当JS运行时错误（包括语法错误）发生时，window会触发一个ErrorEvent接口的error事件，并执行window.onerror()
- 资源加载失败（例如img或script）也会触发一个Event接口的error事件，并执行**该元素**上的onerror()处理函数。但不会向上冒泡到window，但可以被window.addEventListener捕获
- unhandledrejection。捕获promise异常。当Promise 被 reject 且没有 reject 处理器的时候，会触发 unhandledrejection 事件
- ajax请求异常，XMLHttpRequest.error,XMLHttpRequest.abort,XMLHttpRequest.load
```javascript
// error 监听js执行抛出的未被捕获的错误，包括throw err等。
// addEventListener第三个参数设置为true，才能捕获到资源下载错误的异常
window.addEventListener('error', function(event){
  console.log('未捕获的js异常。。', event)
}, true)
```
```javascript
window.addEventListener('unhandledrejection', function(event){
  console.log('未捕获的promise异常', event);
}, true)
```
```javascript
this.addEventListener('load', handler('load'), false)
this.addEventListener('error', handler('error'), false)
this.addEventListener('abort', handler('abort'), false)
```
