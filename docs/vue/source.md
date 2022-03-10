# vue源码

vue的项目目录
```javascript
├─dist                   # 项目构建后的文件
├─scripts                # 与项目构建相关的脚本和配置文件
├─flow                   # flow的类型声明文件
├─packages               # 提供给第三方的包(vue提供出来的)，例如给服务端渲染、模板渲染（提供给vue-loader）等
├─src                    # 项目源代码
│    ├─complier          # 与模板编译相关的代码
│    ├─core              # 通用的、与运行平台无关的运行时代码
│    │  ├─observe        # 实现变化侦测的代码
│    │  ├─vdom           # 实现virtual dom的代码
│    │  ├─instance       # Vue.js实例的构造函数和原型方法
│    │  ├─global-api     # 全局api的代码
│    │  └─components     # 内置组件的代码
│    ├─server            # 与服务端渲染相关的代码
│    ├─platforms         # 特定运行平台的代码，如weex
│    ├─sfc               # 单文件组件的解析代码
│    └─shared            # 项目公用的工具代码
└─test                   # 项目测试代码
```
package  第三方的包<br />template   =>  编译成浏览器认识的代码js（通过vue-template-compiler）<br />script  构建源码的脚本和配置文件

vue运行的时候  对外部的一个表现形式（Runtime运行时），以下都是Runtime：<br />Vnode  dom  diff  dep  watcher  响应式数据

打包生成的vuejs俩种版本Runtime Only和Runtime+Compiler<br />Runtime Only （编译是在离线的时候做的）<br />这个版本只包含运行时的js代码，体积更轻量，在使用该版本的Vue.js时，需要webpack引入vue-loader把.vue文件编译成js。编译后我们得到的是一个with的render函数，render函数生成虚拟DOM。<br />Runtime + compiler（在线编译）<br />该版本包含全功能的Vue(runtime+compiler),体积更大，而且在线编译时的compiler转换js会消耗性能。<br />只有以下情况会用到compiler：（在没有使用webpack的情况可以引入全功能vue）<br />1.有指定template;<br />2.没指定template，也没指定render（这时候使用的就是被挂载元素的outerHtml）。

compiler生成Ast（抽象语法树），把vue模板编译成with语句，with的render函数生成虚拟DOM<br />（with的作用是能把template中的js语句直接拿过来用，不用编译管this的作用域）<br />vue2为什么要用with？<br />因为编译不了vue模板内（template）的js语句

模板编译阶段做的事情？<br />运行时版本的$mount方法获取到dom元素后直接进入挂载阶段，而在完整版的$mount方法中是先将模板进行编译，然后再调用运行时版本的$mount方法，进入挂载阶段。完整版的$mount方法是把用户传入的el选项或则template选项中获取到用户传入的内部或则外部模板，然后将获取到的模板编译成render函数，最后调用运行时版本的$mount方法进行挂载。


src => 核心源码<br />VNode<br />(html + css)  =>  渲染引擎解析（浏览器，webkit/blink） =>  调度解析，生成layer tree  paint  => 真实Dom<br />频繁操作真实DOM慢的原因是js获取dom属性，需要俩个线程之间进行交互（一个是webkit也叫渲染引擎另一个是v8）

js  =>  v8  => 执行js<br />babel => 2M大小（在线编译会下载到浏览器里，需要包含编译vue的js）

js<br />在线编译   浏览器中把vue编译成浏览器能识别的js语句<br />离线编译   上线前通过webpack、babel进行编译成浏览器能识别的js语句

双向绑定的核心<br />1.怎么知道别人在使用这个数据<br />2.怎么知道是谁在使用这个数据<br />3.怎么知道存在什么地方<br />4.怎么知道什么时候改了这个数据<br />5.怎么知道这个数据对应的callback使用者是谁

Watcher    回调以及要做的事情<br />dep  存储  关系  数据  = > watcher<br />Observer   响应式数据  =>  处理数据为可监听<br />deractive   指令


vue1   一个指令一个watcher(watcher太多dep炸了)     空间<br />vue2   一个组件一个watcher（组件内dom diff）  空间一部分（指的是dep回存储数据映射关系），时间一部分（dom diff）

react   空间0（从根组件开始遍历）   all in 时间（所以react需要时间分片）



为什么要重写array的双向绑定<br />数组也可以通过Object.defineProperty监听的，但因为性能问题，array在内存中是连续存储的，如果在数组的前面插入数据就会不断触发update（改变array的索引会多次触发Object.defineProperty的set，），引起多次render。

vue2性能差的原因？<br />小应用其实挺快的，慢的原因是因为需要空间存储watcher和Observer的关系，也就是需要维护的watcher越多，占用空间越大，应用越大越卡。




1.vue实例化  _init 挂载基本属性，初始化基本api、生命周期等<br />2.$mounted  (分为不同平台，使用updateComponent包一层)    =>  模板编译  render<br />3.mountComponent   =>  整个Vue实例<br />4.构建 updateComponent函数
```javascript
 updateComponent = () => {
    //TAG:绑定render ，
    vm._update(vm._render(), hydrating)
  })
```
5.构建一个Watcher<br />new Watcher(vm, updateComponent)<br />-Watcher中触发自己的get方法，当前watcher实例添加到Dep<br />-getter  =>  添加依赖到Dep，执行run方法<br />-run  =>  执行render生成Vnode

6.vm._update 接受Vnode<br />7.开始__patch__<br />-首次是挂载<br />-下一次更新（进行Dom diff 生成真实dom）


vue模板编译是通过正则匹配


vue编译时优化（dom diff 时可直接跳过静态节点）<br />只能做静态节点优化<br />-判断当前节点是否是静态节点<br />-递归遍历子节点是否都是静态节点，有一个不是，则标记当前节点不是静态节点

keep-alive LRU算法<br />静态节点标记<br />next-tick

computed和watch的区别<br />computed是基于响应式依赖进行缓存的，只有在响应式依赖改变的时候，才会重新更新值<br />watch是一个对数据监听的回调，只有依赖的data的数据变化是才会触发回调，回调中传入newVal和oldval，vue会在实例化的时候调用$watch()，会遍历watch对象的每一个属性

vue.$forceUpdate方法原理？<br />当实例依赖的数据发生变化时（数据的setter里会调用dep.notify()方法通知收集到的每一个watcher实例），变化的数据会通知其收集的依赖列表(watcher数组)里的依赖进行更新（执行watcher的update方法）。<br />根本上就是调用当前实例上watcher实例的update方法重新渲染。


vue.$nextTick原理<br />vue对DOM的更新策略是再侦听到数据变化时，vue会开启一个事件队列（就是把所有的watcher存到数组中），并在一个宏任务或则微任务中执行所有的数据变更（也就是执行watcher的update方法）。<br />设计的原因:如果同一个watcher被多次触发，每次都要更新，会触发一些没必要的DOM操作，增加性能损耗。

$nextTick方法会把回调函数放到callbacks中等待执行，然后将执行函数放到宏任务或则微任务中，事件循环到了宏任务或则微任务，执行函数依次执行callbacks中的回调。


讲一下keep-alive<br />keep-alive是vue中的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染DOM<br />keep-alive包裹动态组件时，会缓存不活动的组件实例，而不是销毁他们<br />使用场景：可以在路由中meta属性中配置需要缓存的组件，在使用keep-alive时再做判断<br />原理：<br />该组件是一个函数式组件，组件渲染时会执行render函数，在该组件内有一个存储组件对象以及存储组件唯一key的数组，在mounted中监听include和exclude的变化，destory中删除所有的缓存，核心在render中，render中会先取组件的key值，再判断缓存中是否有，如果有直接返回组件实例，同时删除该key并重新放到存储组件key数组末尾（LRU算法，有max时删除最久没有被使用的组件），如果没有则缓存该组件并直接返回Vnode。

缓存后如何取数据<br />1.可以在activated钩子函数中取（actived服务端渲染不会被调用）<br />2.可以再beforeRouterEnter中取


