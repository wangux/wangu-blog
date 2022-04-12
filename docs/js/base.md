# JS基础
## js数据类型
基本数据类型   number     string	boolean	null	  undefined    biginit      symbol<br />引用数据类型   object

<a name="a5dXL"></a>

## js类型校验方式
1.typeof  (基础类型typeof无法判断null，其他都正常判断，引用数据类型除了function为function其他都为object)<br />typeof null   // Object<br />typeof function  //function

2.instanceof(判断是否在同一原型链上)<br />arr instanceof Array //true<br />arr instanceof Object //true

3.arr.constructor === Array //true   constructor指向构造函数   null和undefined无法判断

4.Object.prototype.toString.call(123) //[Object Number] //全能判断法


<a name="SDls1"></a>

## 严格模式作用
1.全局变量声明时，必须加var<br />2.this无法指向全局对象<br />3.函数内部不允许出现重名参数<br />function test(a,b,b){}  严格模式会报错<br />4.arguments对象不允许被动态改变，不能被自调用

<a name="SQEDG"></a>

## var、let、const区别
var和let的区别<br />1.let声明的变量不能重复命名<br />2.let声明的变量具有块级作用域，不存在变量提升，在函数内会出现暂时性死区<br />const和let几乎一样，let有的属性const都有，const声明的是一个常量，不能被改变，引用类型可以改变因为改的是地址

<a name="hrQTT"></a>

## 普通函数和箭头函数的区别
1.箭头函数是一个匿名函数，不能做构造函数，不能new（箭头函数本身没有this，函数内部的this就是外层的this，所以不能作为构造函数）<br />2.箭头函数的this自动绑定外层this<br />3.箭头函数没有arguments属性，可以使用扩展运算符<br />4.bind、call、apply不能改变this指向（箭头函数的this是在js执行上下文创建阶段确定的，普通函数的this是在js执行上下文执行阶段也就是调用函数时确定的）

<a name="k0NUE"></a>

## new一个对象都做了什么
1.创建一个新的空对象<br />2.将新对象的原型属性指向构造函数的prototype<br />3.将构造函数的this指向新对象，执行构造函数，将属性添加给新对象<br />4.返回新对象

```javascript
function newObj (fn) {
	const obj = {};
  if (fn.prototype) {
      obj.setPrototypeOf(fn.prototype);
  }
  const res = fn.apply(obj, [].slice.call(arguments, 1))
  if ((typeof res === 'function' && res != null) || typeof res === 'object') {
  		return res;
  }
  return obj;
}
```

<a name="TMGIr"></a>

## __proto__、prototype、constructor的区别（原型和原型链）
1.__proto__和constructor是对象才有的属性，prototype是函数特有的属性<br />2.实例对象的__proto__指向构造函数的prototype,意识是实例对象的原型指向构造函数的prototype（原型对象）<br />(实例的__proto__  ===  构造函数的prototype)<br />3.prototype是函数特有的，它是由一个函数指向一个对象<br />4.constructor是对象的属性，它是由一个对象指向一个函数（实例的constructor === 构造函数）,意识就是指向该对象的构造函数，constructor的终点可以看成是Function这个函数<br />5.找一个对象的属性如果找不到，会沿着对象的__proto__属性继续往上找，找到__proto__属性指向的对象（父对象）,这样一直找就形成了一条链路，这条链路就叫做原型链。

<a name="gSWYM"></a>

## 闭包
闭包是由函数以及声明该函数的词法环境组合而成的。（原理：出发了js的垃圾回收机制）<br />闭包的作用？<br />1.能够读取函数内部的变量<br />2.能够使局部变量一直保存在内存中<br />闭包应用：1.for循环取异步值2.模拟私有变量<br />垃圾回收：将要删除的数据暂存在某个区域，并不是真正的删除，除非真的用不到了，再次清空这个暂存区域才会彻底删除


<a name="gXMHA"></a>

## ES6新增
let、const、扩展运算符、箭头函数、symbol、map、set、解构赋值、generator-yield、<br />for...in迭代一个对象的除了symbol外的所有可枚举属性。<br />for...of迭代类数组（没有key的数据）

string相关方法<br />charCodeAt(index)  //参数字符索引，返回utf-16编码单元<br />fromCharCode() //参数utf-16编码单元，返回字符串<br />codePointAt() //参数字符索引，返回Unicode编码点值的整数，没有这个索引返回undefined<br />fromCodePoint()  //参数Unicode编码点数，返回字符串

<a name="gqaBz"></a>

## Ajax
用来做异步无加载刷新

```javascript
var xhr = new XMLHttpRequest()
xhr.open('get', '/send')
xhr.onreadystatechange = function () {
	if (xhr.readystate === 4 && xhr.state === 200) {
      console.log(xhr.responseText)
  }
}
xhr.send();
//readystate: 0还没有调用send  1调用send，正在发送请求  2已接收响应内容  3解析响应内容  4解析完成
//state状态码   200成功  304缓存  401无权限  404找不到  500报错
//同源策略   同协议、同域名、同端口
```

<a name="InXrI"></a>

## 模块化
Amd	依赖前置    		require.js<br />Cmd	按需加载			sea.js<br />CommonJS	按需加载		node.js<br />Amd会先把所需要的依赖都加载完成，才进入回调<br />cmd需要的时候加载依赖

<a name="go0GP"></a>

## 本地存储
cookie：会话跟踪技术<br />cookie的信息存储在浏览器的缓存中（本地存储）<br />cookie的特点：<br />1.只能存文本<br />2.大小限制4-10k<br />3.数量限制，50条左右<br />4.不能跨域<br />5.不同浏览器的cookie也不相等<br />6.时间限制，默认为关闭浏览器销毁

操作cookie和localStorage
```javascript
//cookie
//增  			
document.cookie = 'name=admin'
//改			
document.cookie = 'name=test'
//设置有效期	
document.cookie = 'name=test;expires='+time; //time为日期对象
var time = new Date();
time.setDate(d.getDate() + 3); //设置三天后过期

//删
var d = new Date()
d.setDate(d.getDate() -1)
document.cookie = 'name=test;expires=' + d; //把有效期设为前一天，则自动销毁
//查
console.log(document.cookie)


//localStorage
localStorage.setItem(key,value)
localStorage.getItem(key)
localStorage.removeItem(key)
localStorage.clear()
```
cookie、localStorage和sessionStorage区别<br />不同点<br />1.cookie始终在同源的http请求中携带，即使不需要cookie在浏览器和服务器之间来回传递。而localStorage和SessionStorage始终存储在本地，不会和服务器通信，也不会把数据传递到服务器。<br />2.存储大小不同，cookie存储4-10k，而Storage存储空间可以达到5M<br />3.存储时间不同，cookie可以设置过期时间；localStorage是持久话存储；sessionStorage是会话级存储关闭浏览器会被清除<br />相同点：都不安全、不能跨域、不能跨浏览器


<a name="Vssyf"></a>

## 页面重绘（Repaint）和重排（Reflow）
重排就是dom元素尺寸和位置发生了变化，重排必定重绘<br />重绘是指dom元素的样式变了，例如颜色；重绘不一定重排

<a name="T5Tts"></a>

## js兼容问题
innerHtml和innerText<br />滚动条   document.ducumentElement.scrollTop || document.body.scrollTop<br />网页可视区域兼容   window.innerHeight || document.documentElement.ClientHeight<br />   window.innerWidth || document.documentElement.ClientWidth<br />非行内样式获取	dom.currentStyle[attr]	||	getComputedStyle(obj, false)[attr]<br />事件对象兼容		(event) => event || window.event<br />阻止事件冒泡兼容	e.cancleBubble = true || e.stopPropagation()<br />阻止默认事件		e.preventDefault() || return false(e.returnValue = false)<br />事件监听兼容		dom.onclick || dom.addEventListener('click', cb) || dom.AttachEvent('onclick', cb)<br />   dom.removeEventListener('click', cb) || dom.detachEvent('onclick', cb)<br />事件目标对象		e.target || e.srcElement


<a name="UOizN"></a>

## 手写promise

```javascript
function Promise (executor) {
    const self = this
    self.status = 'pending'
    self.onResolvedCallBacks = []
    self.onRejectedCallBacks = []

    function resolve (value) {
        if (value instanceof Promise) {
            return value.then(resolve, reject)
        }
        setTimeout(() => {
            if (self.status === 'pending') {
                self.status = 'resolved'
                self.data = value
                for (let i = 0; i < self.onResolvedCallBacks.length; i++) {
                    self.onResolvedCallBacks[i](value)
                }
            }
        });
    }

    function reject (reason) {
        setTimeout(() => {
            if (self.status === 'pending') {
                self.status = 'rejected'
                self.data = reason
                for (let i = 0; i < self.onRejectedCallBacks.length; i++) {
                    self.onRejectedCallBacks[i](reason)
                }
            }
        });
    }

    try {
        executor(resolve, reject)
    } catch (error) {
        reject(error)
    }

}

function resolvePromise (promise2, x, resolve, reject) {
    let then
    let thenCalledOrThrow = false
    
    if (promise2 === x) {
        return reject(new TypeError('循环报错'))
    }

    if (x instanceof Promise) {
        if (x.status === 'pending') {
            x.then(function (val) {
                resolvePromise(promise2, val, resolve, reject)
            }, reject)
        } else {
            x.then(resolve, reject)
        }
        return
    }

    if (x !== null && ((typeof x === 'function') || (typeof x === 'object'))) {
        try {
            then = x.then
            if (typeof then === 'function') {
                then.call(x, function rs (val) {
                    if (thenCalledOrThrow) return
                    thenCalledOrThrow = true
                    return resolvePromise(promise2, val, resolve, reject)
                }, function rj (reason) {
                    if (thenCalledOrThrow) return
                    thenCalledOrThrow = true
                    return reject(reason)
                })
            } else {
                resolve(x)
            }
        } catch (error) {
            if (thenCalledOrThrow) return
            thenCalledOrThrow = true
            return reject(error)
        }
    } else {
        resolve(x)
    }

    
}

Promise.prototype.then = function (onResolved, onRejected) {
    const self = this
    let promise2

    onResolved = typeof onResolved === 'function' ? onResolved : function(v) {return v}
    onRejected = typeof onRejected === 'function' ? onRejected : function(e) {throw e}

    if (self.status === 'resolved') {
        return promise2 = new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const x = onResolved(self.data)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            });
        })
    }

    if (self.status === 'rejected') {
        return promise2 = new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const x = onRejected(self.data)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            });
        })
    }

    if (self.status === 'pending') {
        return promise2 = new Promise((resolve, reject) => {
            self.onResolvedCallBacks.push(function (val) {
                try {
                    const x = onResolved(val)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            })
    
            self.onRejectedCallBacks.push(function (reason) {
                try {
                    const x = onRejected(reason)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            })
        })
    }
}

Promise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected)
}

Promise.prototype.finally = function (onSettled) {
    return this.then((res) => {
        onSettled()
        return res
    }, (e) => {
        onSettled()
        throw e
    })
}

Promise.prototype.any = function (promises) {
    return new Promise((resolve, reject) => {
        promises = Array.isArray(promises) ? promises : []
        let len = promises.length
        // 用于收集所有 reject 
        let errs = []
        // 如果传入的是一个空数组，那么就直接返回 AggregateError
        if(len === 0) return reject(new AggregateError('All promises were rejected'))
        promises.forEach((promise)=>{
        promise.then(value=>{
            resolve(value)
        },err=>{
            len--
            errs.push(err)
            if(len === 0){
            reject(new AggregateError(errs))
            }
        })
        })
    })
}

Promise.prototype.all = function (promises) {
    const arr = []
    let index = 0
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(function (res) {
                arr[i] = res
                index++
                if (index === promises.length) {
                    resolve(arr)
                }
            }, reject)
        }
    })
}

Promise.prototype.race = function (promises) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(resolve, reject)
        }
    })
}

Promise.prototype.allSettled = function (promises) {
    const arr = []
    const count = promises.length
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(function (res) {
                arr[i] = { status: 'fulfilled', value: res }
            }, function (reason) {
                arr[i] = { status: 'rejected', reason }
            }).finally(() => {
                if (!--count) {
                    resolve(arr)
                }
            })
        }
    })
}

Promise.prototype.resolve = function (val) {
    return new Promise((resolve, reject) => {
        resolve(val)
    })
}

Promise.deferred = Promise.defer = function () {
    const dfd = {}
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return dfd
}

try {
    module.exports = Promise
} catch (error) {
    
}
```


<a name="pQywH"></a>

## Proxy
创建一个代理对象，通过代理对象拦截对对象的操作<br />Reflect不是一个函数对象，没有构造函数不能new，直接调用静态方法，类似Math。<br />//handler.apply拦截函数的操作
```javascript
function sum(a, b) {
	return a + b;
}
const handler = {
  apply: function(target, thisArg, argumentsList) {
    console.log('参数', target, thisArg, argumentsList)

    return target(argumentsList[0], argumentsList[1]) * 10;
  }
};
const proxy1 = new Proxy(sum, handler);
console.log(sum(1, 2));
// expected output: 3

const obj = {
  a: 1
}
console.log(proxy1.apply(obj, [1,2]));
// expected output: 30
```
//handler.defineProperty
```javascript
const obj = {};
const handle = {
  defineProperty: (target, key, value) => {
    console.log(target, key, value)
    return Reflect.defineProperty(target, key, value)
  },
  get: function (target, property, receiver) {
    console.log('触发get')
    return Reflect.get(target, property, receiver)
  },
  set: function (target, key ,value) {
    console.log('触发set')
    return Reflect.set(target, key, value)
  }
}
const p = new Proxy(obj, handle)
var desc = { configurable: true, enumerable: true, value: 10 };
Object.defineProperty(p, 'a', desc)
console.log(p.a)
p.b = 2;
console.log(p.b)
```

<a name="oWejb"></a>

## 零碎
DOM（文档对象模型）、Shadow DOM、Virtual DOM区别以及BOM（浏览器对象模型）<br />DOM浏览器真实DOM，document是它的一个对象<br />Shadow Dom依赖于DOM，使用[Element.attachShadow()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/attachShadow)方法将一个shadow root附加到一个dom元素上（WebComponent原理）<br />Virtual DOM就是用js表示DOM的数据结构<br />BOM是浏览器对象模型，window是他的一个对象

arguments.length访问实参个数

递归函数<br />1.有判断条件<br />2.有参数变化<br />3.有return

数组操作<br />1.增加（都会改变原数组长度）<br />arr.push() //末尾添加元素<br />arr.unshift()  //开头添加元素

2.删除（会改变原数组长度）<br />arr.shift() //从末位删除  返回被删除元素，<br />arr.pop()//从首位删除   返回被删除元素<br />arr.splice(n,u,num)  //n开始位置，u删除个数，num增加元素


3.截取<br />arr.slice(n,m)  //n开始位置，m结束位置，不包括m（不会改变数组长度）

arr.sort((a,b) => b-a)   （会改变原数组排序）<br />arr.reverse()   （会改变原数组排序）<br />arr.join()<br />arr.concat()   （不会改变原数组）<br />arr.tostring() //默认分割符','

for...in迭代一个对象的除了symbol外的所有可枚举属性。遍历key<br />for...of迭代类数组（没有key的数据）遍历值


严格模式的好处（"use strict"）<br />1.消除js的不合理，不严谨，减少一些怪异行为<br />2.消除代码运行的一些不安全之处<br />3.提供编译器效率<br />4.为未来的js做好铺垫（es5，6）

匿名函数的好处             缺点<br />1.较少函数命名		1.代码复用性差<br />2.安全性更高(闭包)<br />3.方便运行

数组es5新增方法<br />indexof<br />foreach<br />map<br />filter


字符串方法<br />str.indexof() //参数是字符，返回在字符串中的索引位置,不存在返回-1<br />str.charat()  //参数是索引，返回索引对应的字符<br />str.charCodeat()  //参数是索引，返回索引对应字符的Utf-16编码单元<br />str.fromCharCode() //参数是UTF-16编码单元，返回字符

//截取<br />str.slice(n, m) //n代表开始位置，m结束位置（取到前一位），负数从末尾开始，返回截取的字符串（原字符串不变）<br />str.substring() //同slice，参数不能为负数，返回截取的字符串（原字符串不变）<br />str.substr(n, m) //n开始位置， m截取位数， 返回截取的字符串（原字符串不变）

str.split(',') //以,号为分隔转换成数组，返回数组<br />str.replace('-', '') //把str中'-'替换成空字符串, 返回替换后的字符（原字符串不变）<br />str.includes('a') //str中是否包含'a', 返回boolean<br />str.startsWith('a') //str是否是以'a'开头

toLowerCase() //返回小写的字符串（原字符串不变）<br />toUppercase() //返回大写的字符串（原字符串不变）


基础类<br />Math.round() //四舍五入<br />Math.ceil() //向上取整<br />Math.floor() //向下取整<br />Math.abs() //取绝对值<br />Math.max(a,b,c) //取所有参数中的最大值<br />Math.min() //同max<br />Math.random() //取随机数,返回0-1之间的浮点数（不包括1）<br />Math.pow(n, m) //指数函数，n表示底数，m表示指数<br />Math.PI

进制转换<br />x.toString(2) //2进制<br />x.toString(8) //8进制<br />x.toString(16) //16进制<br />parseInt(x, n)  //其他进制转10进制    x输入内容，n表示要转换为什么进制，es5默认转换为10进制，之前是可能为8进制或10进制，且不能不传

日期对象<br />const date = new Date()<br />date.getFullYear()<br />date.getMonth()<br />date.getDate()<br />date.getHours()<br />date.getMinutes()<br />date.getSeconds()<br />date.getMillSeconds() //毫秒<br />date.getDay() //星期几，返回0-6,0表示星期日<br />date.getTime() //时间戳，返回距离1970.1.1日的毫秒数

JS三大组成部分<br />EcmaScript  Bom  Dom<br />Bom是Browser Object Model浏览器对象模型（核心对象window）<br />Dom是Document Object Model 文档对象模型 （核心对象document）

history<br />history.forward() //前进<br />history.back() //后退<br />history.reload() //刷新<br />history.go(num) //num为正数，0，-1，0代表刷新，-1代表后退，num大于0代表前进num个页面

location 统一资源定位符(管理/访问URL)<br />location.href = 'www.baidu.com'

Navigator 获取浏览器信息<br />navigator.userAgent //返回浏览器信息。名称、版本号、操作系统

window.onload() //页面结构加载完成<br />window.onscroll() //页面滚动<br />window.onresize() //监听页面大小改变

//获取页面滚动条距离顶部距离（兼容性问题）<br />document.documentElement.scrollTop<br />document.body.scrollTop

document.documentElementScollLeft<br />document.body.scrollLeft

DOM节点<br />1.元素节点（html标签）<br />2.属性节点（标签属性）<br />3.文本节点（文字）<br />4.文档节点（document）<br />5.注释节点（注释内容）

获取dom选择器方法<br />1.getElementById('#box')<br />2.getElementsByTagName('h5')//返回集合<br />3.getElementsByName('input') //通过name属性获取<br />4.getElementsByClassName() //通过class名获取<br />5.document.querySelector()//获取单个元素<br />6.document.querySelectorAll() //返回集合

属性操作<br />//内置属性获取<br />div.id = 'box'<br />div.title = 'title'

//非内置属性<br />div.getAttribute('data')<br />div.setAttribute('data', '1')<br />div.removeAttribute('data')

innerHtml //低版本不兼容<br />innerText

div.children //获取元素子节点<br />div.childNodes //获取所有子节点（所有类型节点）<br />                     nodetype<br />元素节点       	1<br />属性节点 	2<br />文本节点		3<br />文档节点		9<br />注释节点		8

删除节点<br />obj.remove()<br />父级.removeChild()<br />obj.outerHtml = ''

DOM元素的基本操作<br />//元素节点操作<br />var div = document.createElement('div')<br />div.innerHTML = '这是新创建的div'<br />div.className = 'box'<br />div.style.cssText = 'width:200px;height:200px;'<br />div.appendChild(child)<br />div.removeChild(child)<br />div.outerHtml = '';

文本节点的操作<br />document.createTextNode('你好')

非行内样式获取<br />1.现代浏览器 ：getComputedStyle(obj, false)[attr]<br />obj:dom元素<br />false：是否获取的是伪元素的属性样式，如果没有伪元素，那么给false或则null<br />attr: 属性名称 er:width<br />2.ie低版本浏览器：obj.currentStyle[attr]<br />obj:dom元素<br />attr:属性名称

offsetLeft<br />offsetTop<br />offsetWidth  //element.width + element.padding + element.border(不包括margin，有滚动条还包括滚动条的宽度)<br />offsetHeight //同上<br />offsetParent  //获取元素的最近的具有定位属性的父级元素，如果都没有则返回body

clientWidth  //视口宽度<br />clientHeight  //视口高度

事件<br />div.onmousemove = function (event) {<br />var e = event || window.event;<br />console.log(e.target)  //事件源<br />console.log(e.type)  //事件类型<br />console.log(e.buttons)  //鼠标按键， 1左按钮，2右按钮，4滑轮<br />console.log(e.offsetX, e.offsetY)   //相对事件源的偏移<br />console.log(e.clientX, e.clientY)    //相对于页面可视区域的坐标<br />console.log(e.pageX, e.pageY)     //相对于页面的坐标<br />console.log(e.screenX, e.screenY) //相对于电脑屏幕的坐标<br />}

onclick<br />onmousedown  //鼠标按下事件 <br />onmousemove  //鼠标移动事件<br />onmouseup       //鼠标抬起事件<br />onmouseover    //鼠标放上去<br />onmouseenter   //鼠标进入<br />onmouseout      //鼠标离开<br />onmouseleave   //鼠标离开<br />oncontextmenu //鼠标右键点击事件<br />onmousewheel  //鼠标中键

onkeyDown //键盘按下<br />onkeyUp  //键盘抬起<br />onkeyPress  //键盘按下并抬起

document.onkeydown = function (event) {<br />var e = event || window.event;<br />var code = e.keyCode || e.which;  //键盘按键对应的ASCII码<br />//空格32    回车13   左37  上38  右39  下40<br />}

阻止事件冒泡<br />var e = event || window.event;<br />//e.cancleBubble = true;<br />if (e.stopPropagation) {<br />e.stopPropagation(); //现代浏览器<br />} else {<br />e.cancleBubble = true; //ie浏览器支持<br />}<br />事件冒泡：当最里面的元素触发事件时，会依次向上触发所有元素的相同事件

阻止默认事件<br />if (e.preventDefault) {<br />e.preventDefault(); //现代浏览器<br />} else {<br />//e.returnValue = false; //IE浏览器<br />return false； //也可以清除默认事件<br />}

清除事件  obj.onmouseup = null;

事件监听绑定事件<br />obj.onclick<br />obj.addEventListener('click', function() {}) //现代浏览器<br />obj.attachEvent('click', function () {})  //IE浏览器

解决事件绑定兼容
```javascript
function addEvent (ele, type, cb) {
			if (ele.addEventListener) {
      	ele.addEventListener(type, cb);
      } else if (ele.attachEvent) {
      	ele.attachEvent('on'+ type, cb);
      } else {
      	ele['on'+type] = cb;
      }
}

//赋值式删除
obj.onclick = null;

//删除事件监听
obj.removeEventListener('click', cb) //现代浏览器
obj.detachEvent('onclick', cb)  //IE浏览器

//onclick添加事件不能绑定多个事件，后面的会覆盖前面的
//addEventListener('click', callback, false)
//第三个参数为true时，浏览器采用Capture(捕捉)
//为false时，浏览器采用bubbling(冒泡)
//事件onblur,onfocus不支持冒泡
```

事件委托<br />事件委托就是将多个子元素的相同事件，添加给共有的父元素，利用事件冒泡的原理，配合事件对象身上的事件源属性，找到对应的元素做对应的处理
```javascript
//处理事件委托兼容
var oul = document.querySelector('ul')
oul.onclick = function(event) {
	var e = event || window.event;
  var target = e.target || e.srcElement;
  if ( target.nodeName == 'LI' ) {
  	console.log(target.innerHTML)    
  }
}
```
<a name="SU9lG"></a>






