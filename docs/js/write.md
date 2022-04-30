# 基础手写

闭包就是函数的嵌套。<br />内层作用域访问外层函数作用域里的参数/变量/函数时，闭包就产生了。

闭包一般用来实现封装，以及保存数据（避免被GC回收）<br />缺点是过多的使用闭包会造成内存占用过多甚至内存泄漏。

```javascript
//可能report函数调用结束，image对象被GC回收了，http请求还没有发出导致上报失败
//解决办法就可以利用闭包的特性
var report = function(src) {
    var img = new Image();
    img.src = src;
}
report('http://www.xxx.com/getClientInfo');//把客户端信息上报数据

//使用闭包把image对象存起来，防止被GC回收
var report = (function() {
    var imgs = [];//在内存里持久化
    return function(src) {
        var img = new Image();
        imgs.push(img);//引用局部变量imgs
        img.src = src;
    }
}());
report('http://www.xxx.com/getClientInfo');//把客户端信息上报数据
```

基础手写
```javascript
Function.prototype.mycall = function(context) {
    context.fn = this;
    let args = Array.from(arguments).slice(1);
    let res = context.fn(...args);
    context.fn = null;
    return res;
}

Function.prototype.myapply = function (context) {
    context.fn = this;
    let args = Array.from(arguments);
    let res;
    if (args[1]) {
        res = context.fn(...args[1]);
    } else {
        res = context.fn();
    }
    context.fn = null;
    return res;
}

Function.prototype.mybind = function(target, ...params) {
    const bindfunc = this;
    const newFunc = function(...args) {
        const isNew = this instanceof newFunc;
        const newobj = isNew ? this : Object(target);
        return bindfunc.apply(newobj, [...params, ...args]);
    }
    newFunc.prototype = Object.create(bindfunc.prototype)
    return newFunc;
}

function myNew (func) {
    const obj = {}
    if (func.prototype) {
        Object.setPrototypeOf(obj, func.prototype)
    }
    const res = Func.apply(obj, [].slice.call(arguments, 1))
    if (typeof res === 'function' || (typeof res === 'object' && res !== null)) {
        return res;
    }
    return obj;
}


function debounce (fn, delay) {
    let timer = null
    return function (...args) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}

function throttle (fn, delay) {
    let flag = false
    return function (...args) {
        if (flag) {
            return
        }
        flag = true
        setTimeout(() => {
            fn.apply(this, args)
            flag = false
        }, delay);
    }
}

function curry (fn) {
    const args = []
    return function cb () {
        [].push.apply(args, [...arguments])
        if (args.length >= fn.length) {
            fn.apply(this, args)
        } else {
            return function (...args2) {
                cb.apply(this, args.concat[args2])
            }
        }
    }
}

function deepCopy (obj, cache = new WeakMap()) {
    if (!obj instanceof Object) return obj
    
    if (cache.get(obj)) return cache.get(obj)

    if (obj instanceof Function) {
        return function (...args) {
            obj.apply(this, args)
        }
    }

    const res = Array.isArray(obj) ? [] : {}
    cache.set(obj, res)

    Object.keys(obj).forEach((key) => {
        if (obj[key] instanceof Object) {
            res[key] = deepCopy(obj[key], cache)
        } else {
            res[key] = obj[key]
        }
    })

    return res;
}
```

异步流程控制
```js
//异步并发限制
function limit (count, promises, cb) {
    const tasks = []
    const doingtasks = []
    let i = 0
    const func = () => {
        //使所有微任务加到队列
        if (i === promises.length) {
            return Promise.resolve()
        }
        const task = Promise.resolve().then(() => {
            i++
            return cb(i)
        })
        tasks.push(task)
        const doingtask = task.then(() => { doingtasks.splice(doingtasks.indexOf(doingtask), 1) })
        doingtasks.push(doingtask)
        const res = doingtasks.length >= count ? Promise.race(doingtasks) : Promise.resolve()
        return res.then(func)
    }
    return func().then(() => Promise.all(tasks))
}

const request = (i) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(i)
            resolve()
        }, 1000);
    })
}

limit(4, [1,1,1,1,1], request).then(() => {
    console.log(22)
})
```
