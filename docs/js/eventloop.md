# 事件循环 EventLoop

JS是单线程的脚本语言，在同一时间，只能做同一件事，为了协调事件、交互、UI渲染和网络请求等行为，防止主线程阻塞，才有了EventLoop

为什么js是单线程？<br />js设计之初主要运行在浏览器的脚本语言，主要用途是操作DOM。<br />假设如果有俩个线程，同时对同一个dom进行操作，浏览器就不知道听哪一个了，所以从一开始js就设计为单线程的

JS的Engine和Runtime<br />简单点说，为了让js运行起来，要完成俩部分工作（实际更复杂）<br />1.Engine（JS引擎）：编译并执行js代码，完成内存分配，垃圾回收（V8提供了ECMAScript标准中的所有数据类型，操作符、对象、方法，注意没有DOM）<br />2.Runtime（运行时）：为js提供一些对象或机制，使它能够与外界交互。（Chrome浏览器提供window，DOM，nodejs则是require，process等）

JS是单线程的，但浏览器是多线程的，例如：<br />GUI渲染线程<br />JS引擎线程（V8）<br />事件触发线程<br />定时器触发线程<br />异步http请求线程

EventLoop并不是ECMAScript标准定义的，而是HTML标准定义的，JS引擎只是实现了ECMAScript标准，并不关心EventLoop.<br />EventLoop是属于JS Runtime的，是由宿主环境（比如浏览器以及nodejs中的libuv）提供的

浏览器和node环境下，microtask任务队列的执行时机不同<br />


nodejs中，microtask在事件循环的各个阶段之间执行<br />在node版本小于11时，若第一个定时器任务出队并执行完，发现队首的任务仍然是一个定时器，那么就将微任务暂时保存，直接去执行新的定时器任务，当新的定时器任务执行完后，再一一执行中途产生的微任务。<br />
浏览器中，microtask在事件循环的macrotask执行之后执行（宏任务推入执行栈，先执行所有微任务）<br />nodejs递归的调用process.nextTick()会导致I/O starving，官方推荐使用setImmediate()（也就是递归调用process.nextTick会阻塞IO）<br />在主线程中setImmediate和settimeout的执行顺序是非确定性的，而在一个IO中setImmediate会先执行<br />nodejs的事件循环包括六个阶段，timer =》IO =》idle，prepare =》poll （异步操作，轮询通知JS主线程回调）=》 check =》 close callback


- JavaScript V8引擎是在**渲染进程**的**主线程**上工作的
- 主线程有**循环机制**，能在线程运行过程中，能接收并执行新的任务
- 交给主线程执行的任务会先放入**任务队列**中，等待主线程空闲后依次调用
- 渲染进程会有一个IO线程：**IO线程负责和其它进程IPC通信，接收其他进程传进来的消息**

<img :src="$withBase('/eventloop1.png')" alt="队列">
<a name="ZeYM2"></a>

## 执行栈
执行栈会将当前的执行上下文（说通俗点可以理解成当前的函数调用）压入到执行栈中，执行完成后会把它弹出去。

js有一个main thread主线程和call-stack执行栈，所有的任务都会被放到执行栈中等待主线程执行。<br />
<img :src="$withBase('/eventloop2.png')" alt="堆栈">
<br />函数调用形成了一个由若干帧组成的栈。

```javascript
function foo(b) {
  let a = 10;
  return a + b + 11;
}

function bar(x) {
  let y = 3;
  return foo(x * y);
}

console.log(bar(7)); // 返回 42
```

当调用 bar 时，第一个帧被创建并压入栈中，帧中包含了 bar 的参数和局部变量。 当 bar 调用 foo 时，第二个帧被创建并被压入栈中，放在第一个帧之上，帧中包含 foo 的参数和局部变量。当 foo 执行完毕然后返回时，第二个帧就被弹出栈（剩下 bar 函数的调用帧 ）。当 bar 也执行完毕然后返回时，第一个帧也被弹出，栈就被清空了。

<a name="cFYVL"></a>

## 任务队列
任务队列就是存放异步任务的队列，在js中有俩种任务队列，一种是宏任务队列，一种是微任务队列。<br />宏任务队列（macrotask）：<br />script整体代码(指的是一整个大的script)、setTimeout、setInterval、setImmediate、I/O、postMessage、 MessageChannel、UI Rendering<br />微任务队列（microtask）<br />Process.nextTick（Node独有）、Promise、Object.observe(废弃)、MutationObserver

- 任务队列中的任务都是**宏观任务**
- **每个宏观任务都有一个自己的微观任务队列**
- 微任务在当前宏任务中的JavaScript快执行完成时，也就在V8引擎**准备退出全局执行上下文并清空调用栈**的时候，V8引擎会**检查全局执行上下文中的微任务队列**，然后按照顺序执行队列中的微任务。
- V8引擎一直循环执行微任务队列中的任务，直到队列为空才算执行结束。也就是说在执行微任务**过程中产生的新的微任务并不会推迟到下个宏任务中执行**，而是在当前的宏任务中继续执行。

<a name="HqyON"></a>

## 事件循环
EventLoop中，每一次循环曾为一个tick，每一次tick分为：<br />1.执行全局script代码<br />2.全局script代码执行完成后，执行栈会清空<br />3.执行栈为空，从宏任务队列取出一个任务<br />4.检查是否存在微任务，如果有就执行，直至清空<br />5.浏览器更新渲染（render）<br />6.重复3，4，5

<a name="Gv2XZ"></a>

### 面试：介绍一下EventLoop吧
JS是单线程的，在同一时间只能做一件事情，为了协调事件、交互、UI渲染、网络请求等行为，防止主线程阻塞，故此引入了EventLoop的设计。具体的解决办法就是使用一个执行栈和任务队列，任务队列又分为宏任务和微任务队列俩种。简单的讲，就是把代码从上执行到下，主线程会把同步任务压入到执行栈，遇到异步的任务，根据任务类型放入不同的任务队列等待执行。当执行完同步代码，执行栈清空了，就会从任务队列中取出任务，放到执行栈中执行。EventLoop的每一个循环称为一个tick，具体是先执行script全局代码，全局代码执行完后，执行栈清空，从宏任务队列中取出宏任务，然后检查是否有微任务，有的话就执行所有的微任务，结束之后执行一次渲染。再拿出一个宏任务按照上述步骤继续执行.
