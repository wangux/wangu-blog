# 变量、函数声明提升

即所有声明变量或声明函数都会被提升到当前函数的顶部。
例：如下代码
```javascript
console.log('x' in window);//true
var x;
x = 0;
```
js引擎会将声明语句提升到代码最上方
```javascript
var x;
console.log('x' in window);//true
x = 0;
```
声明函数提升例子如下：
```javascript
//var getName和function getName 都是声明语句，区别是var getName是函数表达式，
//function getName是函数声明
var getName = function () { alert (4);};
function getName() { alert (5);}

getName();//4
```
js引擎会将声明函数语句提到最上方
```javascript
var getName;//只提升变量声明
function getName() { alert (5);}//提升函数声明，覆盖var的声明
getName = function () { alert (4);};//最终的赋值再次覆盖function getName声明

getName();//最终输出4
```
变量作用域和this指向
```javascript
function Foo() {
  getName = function () { alert (1); };
  return this;
}
Foo.getName = function () { alert (2);};
Foo.prototype.getName = function () { alert (3);};
var getName = function () { alert (4);};
function getName() { alert (5);}

//请写出以下输出结果：
Foo.getName(); //2
getName(); //4
Foo().getName(); // 1
getName(); // 1
new Foo.getName(); //2
new Foo().getName(); //3
new new Foo().getName(); //3
```
Foo().getName()先执行了Foo函数，再调用getName
Foo函数内有个变量声明，getName会先判断函数作用域内有没有getName，没有再到外部找，外部window上有getName,遂改变getName值，并返回this，this指向当前函数的调用方（this的值在函数被调用的时候才会指定），Foo函数为window调用，this指向window，所以最后改变为执行window.getName，输出1
注意： 箭头函数能保存函数创建时的 this值，而不是调用时的值

第四个getName，访问的是window上的getName，遂输出1

第五个new Foo.getName() ，由于 '.' 的优先级高于new，遂先执行'.',执行Foo类上的静态方法输出2，并把Foo.getName作为构造函数new

第六个  new Foo().getName()
相当于 (new Foo()).getName()  ,new Foo返回实例，构造函数没有声明，沿着原型上继续找，prototype上声明了，遂输出3

第七个 new new Foo().getName()
相当于 new (new Foo()).getName()
先new Foo再把实例上的getName方法做为构造函数new, 所以输出3 


```javascript
var a = {n:1};
var b = a ;
a.x = a ={n:2}
// 写出 a,b,a.x 的值
```
a, b   =>    {n: 1}
a.x = a 先执行 ，因此a,b { n: 1, x: undefined }
执行a ={ n:2 } ,a的引用地址改变
执行a.x  相当于 b.x = { n: 1, x: { n: 2 } }
因此 a ={ n:2 }, b = { n: 1, x: { n : 2 } }
如下图：
<img :src="$withBase('/var1.png')" alt="展示图">

## 块级作用域
ES6之前js只有函数作用域和全局作用域，es6才有了块级作用域
```javascript
{
  function func(){//函数声明
    return 1;
  }
}
console.log(func());//>> 1


{
  var func = function (){//未使用let关键字的函数表达式
    return 1;
  }
}
console.log(func());//>> 1


{
  let func = function (){
    return 1;
  }
}
console.log(func());//>> func is not defined


(function() {
  for (var i = 0; i < 100; i++) {
    //……很多行代码
  }
  function func() {
    //……很多行代码
  }
  //……很多行代码
  console.log(i); //>> 100  //造成了全局污染
})();


(function() {
  for (let i = 0; i < 100; i++) {
    //……很多行代码
  }
  function func() {
    //……很多行代码
  }
  //……很多行代码
  console.log(i); //>> ReferenceError   会被垃圾回收
})();
```

## 执行上下文
执行上下文就是当前js代码被解析和执行时所在的环境，也叫做执行环境
三种：
1.全局执行上下文
2.函数执行上下文
3.eval执行上下文

在创建执行上下文的创建阶段中创建词法环境时确定this的指向。

词法环境由三个部分组成，
1.环境记录（也就是存一些类型相关的，如let还是Object、function等）
2.外部环境引用
3.绑定this

作用域链的来由？
对于外部环境的引用意味着在当前执行上下文中可以访问外部词法环境。也就是说，如果在当前的词法环境中找不到某个变量，那么JS引擎会试图在上层的词法环境中寻找。（JS引擎会根据这个属性来构成我们常说的作用域链）

作用域链和原型链的区别？
作用域是在代码执行上下文中确定的，作用域链是为了访问变量而存在的链，
原型链是为了访问变量的属性而存在的链。当访问一个变量的属性时，会现在这个对象的属性上找，如果找不到就回去这个对象的__proto__属性上找，如果没有继续在__proto__上找，直到最顶层的Object，如果找不到就是undefined，这样一层一层向上找就形成了一个链条，这个链条就是原型链。

为什么要有this？
函数作用域中要访问当前执行上下文的变量，但当前执行上下文不确定就会出现多个变量的指向问题了，所以需要this来准确的指向当前执行上下文。
