# vue基础

<a name="WEeLY"></a>

## vue组件注册
全局注册（**全局注册的行为必须在根 Vue 实例 (通过 new Vue) 创建之前发生**）

```javascript
Vue.component('my-component-name', {
  // ... 选项 ...
})
```

局部注册
```javascript
import ComponentA from './ComponentA.vue'

export default {
  components: {
    ComponentA
  },
  // ...
}
```

<a name="Knm1p"></a>

## vue组件间数据如何传递
1.父 =>子   通过props传递<br />  子 => 父   通过自定义事件传递
```javascript
//子组件
this.$emit('myEvent','额外参数')
//父组件
<my-component @my-event="doSomething"></my-component>
```
自定义组件v-model<br />a.单层类似input可以使用.native修饰符<br />多层级组件可以使用$listeners
```javascript
//子组件
computed: {
    inputListeners: function () {
      var vm = this
      // `Object.assign` 将所有的对象合并为一个新对象
      return Object.assign({},
        // 我们从父级添加所有的监听器
        this.$listeners,
        // 然后我们添加自定义监听器，
        // 或覆写一些监听器的行为
        {
          // 这里确保组件配合 `v-model` 的工作
          input: function (event) {
            vm.$emit('input', event.target.value)
          }
        }
      )
    }
 }
模板
<label>
    <input
      :value="value"
      v-on="inputListeners"
    >
  </label>
```
b.使用$emit配合.sync修饰符
```javascript
//子组件
this.$emit('update:title', newTitle)
//父组件
<son :title.sync="title"></son>
```
父子组件挂载顺序<br />父created => 子created  => 子mounted  => 父mounted

2.中间人<br />子a  =>  父  =>  子b

3.使用$refs、$root、$parent
```javascript
<base-input ref="usernameInput"></base-input>

//父访问子
this.$refs.usernameInput.数据名/方法()
//子访问父
this.$parent.数据名/方法()

this.$parent  //返回一个父组件
this.$children  //返回一堆组件  [vue1, vue2]
this.$root  //返回根实例  this.$root.$data.xx

```
4.订阅发布<br />a:  vue实现
```javascript
const bus = new Vue()
bus.$emit()/$on

//vm为vue实例
vm.$on('test', function (msg) {
  console.log(msg)
})//订阅
vm.$emit('test', 'hi') //发布 触发事件
// => "hi"

vm.$off(event, callback) //移除自定义事件监听器
```
b:  第三方库（pubsub）/自行封装

5.web存储（cookie/localStorage/sessionStorage）<br />6.存数据库<br />7.状态管理（vuex）

<a name="tEtDK"></a>

## 动态组件
组件动态化（数据化）
```javascript
<component v-bind:is="currentTabComponent"></component>
//currentTabComponent表示已注册组件的名字，或一个组件的选项对象
```
<a name="reQsz"></a>

## 插槽
```javascript
//子组件
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>


//父组件
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```
<a name="LqFJy"></a>

## 插件
使用插件
```javascript
// 调用 `MyPlugin.install(Vue)`
Vue.use(MyPlugin)
```
开发插件
```javascript
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或 property
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })

  // 3. 注入组件选项
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }
}
```
<a name="IQp26"></a>

## provide/inject
这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在其上下游关系成立的时间里始终生效(非响应式)
```javascript
provide：Object | () => Object
inject：Array<string> | { [key: string]: string | Symbol | Object }


// 父级组件提供 'foo'
var Provider = {
  provide: {
    foo: 'bar'
  },
  // ...
}

// 子组件注入 'foo'
var Child = {
  inject: ['foo'],
  created () {
    console.log(this.foo) // => "bar"
  }
  // ...
}
```
<a name="bJy0D"></a>

## 指令
内置指令：v-cloak 、v-for、v-html、v-click、v-show、v-if、v-model
```javascript
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
  bind: function() {}//只调用一次，指令第一次绑定到元素时调用。
	update: function() {} //更新时调用
	componentUpdated： function() {} //指令所在组件的 VNode 及其子 VNode 全部更新后调用。
	unbind: function() {} //只调用一次，指令与元素解绑时调用。
})

//使用
<input v-focus>
```
<a name="nYEZh"></a>

## 过滤器
```javascript
//使用
{{ message | capitalize }}

//定义
filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}
```
<a name="Xrqed"></a>

## 修饰符
@事件.prevent //阻止默认事件<br />@事件.stop //阻止事件冒泡<br />@keyup.ctrl.enter.exact    //精确匹配ctrl+enter按键<br />v-model.number //数值类型<br />v-model.trim  //自动过滤首尾空白字符<br />v-model.lazy  //提升性能，延缓响应
<a name="jeN9C"></a>

## 动画组件
transition || transtion-group<br />animate.css
```javascript
<transition name="fade">
    <p v-if="show">hello</p>
  </transition>

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
```
<a name="Zy6df"></a>

## 路由
vue-router
```javascript
//路由跳转组件（类似一个能跳转的button）
<router-link to="/about">Go to About</router-link>

<!-- 路由匹配到的组件将渲染在这里 -->
 <router-view></router-view>
```
<a name="ua9hV"></a>

## 路由基本使用
```javascript
// 1. 定义路由组件.
// 也可以从其他文件导入
const Home = { template: '<div>Home</div>' }
const About = { template: '<div>About</div>' }

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = VueRouter.createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: VueRouter.createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

// 5. 创建并挂载根实例
const app = Vue.createApp({})
//确保 _use_ 路由实例使
//整个应用支持路由。
app.use(router)

app.mount('#app')

// 现在，应用已经启动了！

this.$router.push() //$router路由实例
this.$route.query //$route路由信息
```
<a name="XacSl"></a>

## 动态路由
```javascript
const routes = [
  // 动态字段以冒号开始
  { path: '/users/:id', component: User },
  { path: '/users/:id?', component: User }, //?表示可有可没有
  // /:orderId -> 仅匹配数字
  { path: '/:orderId(\\d+)' },
  // /:productName -> 匹配其他任何内容
  { path: '/:productName' },
]
```
| 匹配模式 | 匹配路径 | $route.params |
| --- | --- | --- |
| /users/:username | /users/eduardo | { username: 'eduardo' } |
| /users/:username/posts/:postId | /users/eduardo/posts/123 | { username: 'eduardo', postId: '123' } |

<a name="biTRp"></a>

## 嵌套路由
```javascript
const routes = [
  {
    path: '/user/:id',
    component: User,
    alias: '/home'， //别名
    children: [
      // 当 /user/:id 匹配成功
      // UserHome 将被渲染到 User 的 <router-view> 内部
      { path: '', component: UserHome },
      redirect: to => { //重定向
        // 方法接收目标路由作为参数
        // return 重定向的字符串路径/路径对象
        return { path: '/search', query: { q: to.params.searchText } }
      },

      // ...其他子路由
    ],
  },
]
```
<a name="k964A"></a>

## 全局前置守卫
```javascript
const router = createRouter({ ... })

router.beforeEach((to, from, next) => {//next(url)//重定向
  // ...
  // 返回 false 以取消导航
  return false
})
```
<a name="wN0dy"></a>

## 全局解析守卫
你可以用 router.beforeResolve 注册一个全局守卫。这和 router.beforeEach 类似，因为它在 **每次导航**时都会触发，但是确保在导航被确认之前，**同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被正确调用**。这里有一个例子，确保用户可以访问[自定义 meta](https://router.vuejs.org/zh/guide/advanced/meta.html) 属性 requiresCamera 的路由：
```javascript
router.beforeResolve(async to => {
  if (to.meta.requiresCamera) {
    try {
      await askForCameraPermission()
    } catch (error) {
      if (error instanceof NotAllowedError) {
        // ... 处理错误，然后取消导航
        return false
      } else {
        // 意料之外的错误，取消导航并把错误传给全局处理器
        throw error
      }
    }
  }
})
```
router.beforeResolve 是获取数据或执行任何其他操作（如果用户无法进入页面时你希望避免执行的操作）的理想位置。
<a name="oF7iw"></a>

## 全局后置钩子
```javascript
router.afterEach((to, from, failure) => {
  if (!failure) sendToAnalytics(to.fullPath)
})
```
<a name="IQwEZ"></a>

## 路由独享守卫
```javascript
const routes = [
  {
    path: '/users/:id',
    component: UserDetails,
    beforeEnter: (to, from) => {
      // reject the navigation
      return false
    },
  },
]
```
<a name="V0eqD"></a>

## 组件内守卫
```javascript
const UserDetails = {
  template: `...`,
  beforeRouteEnter(to, from) {
    // 在渲染该组件的对应路由被验证前调用
    // 不能获取组件实例 `this` ！
    // 因为当守卫执行时，组件实例还没被创建！
  },
  beforeRouteUpdate(to, from) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 `/users/:id`，在 `/users/1` 和 `/users/2` 之间跳转的时候，
    // 由于会渲染同样的 `UserDetails` 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 因为在这种情况发生的时候，组件已经挂载好了，导航守卫可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from) {
    // 在导航离开渲染该组件的对应路由时调用
    // 与 `beforeRouteUpdate` 一样，它可以访问组件实例 `this`
    //可用来做离开前确认弹窗
    //const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
  	//if (!answer) return false
  },
}

//解决拿不到组件实例
beforeRouteEnter (to, from, next) {
  next(vm => {
    // 通过 `vm` 访问组件实例
  })
}

```
<a name="sPVrz"></a>

## 路由元信息
```javascript
const routes = [
  {
    path: '/posts',
    component: PostsLayout,
    children: [
      {
        path: 'new',
        component: PostsNew,
        // 只有经过身份验证的用户才能创建帖子
        meta: { requiresAuth: true }
      },
      {
        path: ':id',
        component: PostsDetail
        // 任何人都可以阅读文章
        meta: { requiresAuth: false }
      }
    ]
  }
]

//meta配合全局前置守卫做权限管理
router.beforeEach((to, from) => {
  // 而不是去检查每条路由记录
  // to.matched.some(record => record.meta.requiresAuth)
  if (to.meta.requiresAuth && !auth.isLoggedIn()) {
    // 此路由需要授权，请检查是否已登录
    // 如果没有，则重定向到登录页面
    return {
      path: '/login',
      // 保存我们所在的位置，以便以后再来
      query: { redirect: to.fullPath },
    }
  }
})
```
<a name="MPWA0"></a>

## 路由懒加载
```javascript
// 将
// import UserDetails from './views/UserDetails'
// 替换成
const UserDetails = () => import('./views/UserDetails')

const router = createRouter({
  // ...
  routes: [{ path: '/users/:id', component: UserDetails }],
})
```
<a name="bQNu5"></a>

## 动态添加路由
动态路由主要通过两个函数实现。router.addRoute() 和 router.removeRoute()。它们**只**注册一个新的路由，也就是说，如果新增加的路由与当前位置相匹配，就需要你用 router.push() 或 router.replace() 来**手动导航**，才能显示该新路由
```javascript
const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/:articleName', component: Article }],
})


//异步请求后
router.addRoute({ path: '/about', component: About })
```
删除路由<br />有几个不同的方法来删除现有的路由：<br />a. 通过添加一个名称冲突的路由。如果添加与现有途径名称相同的途径，会先删除路由，再添加路由：
```javascript
router.addRoute({ path: '/about', name: 'about', component: About })
// 这将会删除之前已经添加的路由，因为他们具有相同的名字且名字必须是唯一的
router.addRoute({ path: '/other', name: 'about', component: Other })
```
b. 通过调用 router.addRoute() 返回的回调：
```javascript
const removeRoute = router.addRoute(routeRecord)
removeRoute() // 删除路由如果存在的话
```
c.  通过使用 router.removeRoute() 按名称删除路由：
```javascript
router.addRoute({ path: '/about', name: 'about', component: About })
// 删除路由
router.removeRoute('about') // 当路由被删除时，所有的别名和子路由也会被同时删除
```

- [router.hasRoute()](https://router.vuejs.org/zh/api/#hasroute)：检查路由是否存在。
- [router.getRoutes()](https://router.vuejs.org/zh/api/#getroutes)：获取一个包含所有路由记录的数组。

<a name="ueLkL"></a>

## vue路由与react路由的区别
vue路由是分离式路由，统一位置配置，是静态路由，具有排他性特点（只会匹配一个路由）<br />react路由是嵌套式路由，是动态路由，具有包容性特点（能够匹配多个路由）

静态路由是启动应用的时候把所有路由模块都加载进来<br />动态路由是当你访问到这个页面，才把对应的组件加载

<a name="GJNfS"></a>

# 服务端渲染（SSR、SSG）
SSR（Server-side-Render）也可以称之为同构，代码既可以在服务端渲染也可以在客户端渲染<br />nuxt.js

SSG(预渲染)  静态资源站点   <br />使用[prerender-spa-plugin](https://github.com/chrisvfritz/prerender-spa-plugin)<br />原理：就是在 webpack 构建阶段的最后，在本地启动一个 phantomjs，访问配置了预渲染的路由，再将 phantomjs 中渲染的页面输出到 html 文件中，并建立路由对应的目录。
```javascript
//webpack配置
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
const path = require('path');

module.exports = {
	...,
 	plugins: [
      new PrerenderSPAPlugin({
        // 生成文件的路径，也可以与webpakc打包的一致。
        // 下面这句话非常重要！！！
        // 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动。
        staticDir: path.join(__dirname,'dist'),
        // 对应自己的路由文件，比如a有参数，就需要写成 /a/param1。
        routes: ['/', '/product','/about'],
        // 这个很重要，如果没有配置这段，也不会进行预编译
        renderer: new Renderer({
          inject: {
            foo: 'bar'
          },
          headless: false,
          // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
          renderAfterDocumentEvent: 'render-event'
        })
      }),
  ], 
}
  
//main.js中
new Vue({
  router,
  store,
  render: h => h(App),
  mounted () {
    document.dispatchEvent(new Event('render-event'))
  }
}).$mount('#app')
```

<a name="FFhEl"></a>

## 状态管理
如何理解vue的状态管理<br />vue的状态管理其实就是一种状态管理模式，用于数据传输，其实就是把需要共享的变量存储在一个对象中，然后将这个对象放在顶层组件中供其它子组件使用。这种思路其实也是flux思想的实现，vue通过引入vue生态圈的vuex来实现，具体是从vuex中解构出Store类创建store实例并传入action、mutation、state、getters参数。整体数据流向是component通过dispatch方法发送请求给action，action中处理业务逻辑，action通过commit发送请求给mutation，在mutation中修改state数据，最后在component中通过mapgetters接管computed获取state中数据，也可以通过直接引入store实例获取数据。

如何理解react状态管理<br />react状态管理其实就是一种状态管理模式，用于数据传输，也运用了flux思想，主要实现是从redux中解构出createStore方法传入reducer和state以及applymiddleware方法三个参数创建一个store对象，applymiddleware方法传入redux-think中间件，dispatch方法默认接收的是一个对象，我们使用redux-think中间件来改造dispatch使得disptach能够接收一个函数来处理异步的业务逻辑。接着从react-redux中解构出Provider组件，在main.js中把store对象以属性方式注入到Provider中,以使子组件能够使用state中数据。整体的数据流向是组件中dispatch一个异步action到reducer中，reducer中拷贝合并state。最后我们在组件中通过高阶组件connect来获取state，connect接收俩个参数initMapStatetoProps和initMapDispatchToProps来实现state和props的映射。
<a name="UC11L"></a>

## 生命周期
<a name="cbGP5"></a>
## vue生命周期
首次渲染<br />beforeCreate<br />created<br />render<br />beforeMount<br />mounted<br />beforeDestroy<br />destroyed

更新<br />beforeUpdate<br />render<br />updated

<a name="rvizo"></a>
### vue触发钩子的完整顺序：
将路由导航、keep-alive、和组件生命周期钩子结合起来的，触发顺序，假设是从a组件离开，第一次进入b组件：

1. beforeRouteLeave:路由组件的组件离开路由前钩子，可取消路由离开。
1. beforeEach: 路由全局前置守卫，可用于登录验证、全局路由loading等。
1. beforeEnter: 路由独享守卫
1. beforeRouteEnter: 路由组件的组件进入路由前钩子。
1. beforeResolve:[路由全局解析守卫](https://link.juejin.cn/?target=https%3A%2F%2Frouter.vuejs.org%2Fzh%2Fguide%2Fadvanced%2Fnavigation-guards.html#%E5%C2%85%A8%E5%B1%C2%80%E8%A7%A3%E6%9E%C2%90%E5%AE%C2%88%E5%8D%AB)
1. afterEach:路由全局后置钩子
1. beforeCreate:组件生命周期，不能访问this。
1. created:组件生命周期，可以访问this，不能访问dom。
1. beforeMount:组件生命周期
1. deactivated: 离开缓存组件a，或者触发a的beforeDestroy和destroyed组件销毁钩子。
1. mounted:访问操作dom。
1. activated:进入缓存组件，进入a的嵌套子组件(如果有的话)。
1. 执行beforeRouteEnter回调函数next。

<a name="b9OmR"></a>

## react生命周期
实例化 => 更新期 =>  销毁期

实例化<br />getDefaultProps()<br />getInitialState()<br />componentWillMount<br />render<br />componentDidMount

更新期<br />componentWillReceiveProps(next) {}<br />shouldComponentUpdate () {return boolean} //是否更新视图<br />componentWillUpdate<br />render<br />componentDidUpdate

销毁时<br />componentWillUnMount

<a name="XTcCx"></a>

# vue和react区别
1.数据流向的不同。vue的思想是响应式，双向数据流，而react整体是函数式思想，是单向数据流的<br />2.vue有很多内置功能，例如过滤器、指令、修饰符等api，react基本都要自己去实现<br />3.vue是把js、html、css糅合在一起，通过muatach模板语法来连接js和html、css；而react是使用jsx语法
