# 执行上下文和执行栈

执行上下文是对JS代码执行环境的一种抽象概念，也就是说只要有js代码执行，那么它就一定是运行在执行上下文中。

执行上下文可分为三种<br />全局执行上下文：这是一个默认的或则基础的执行上下文，所有不在函数中的代码都在全局执行上下文中执行。它会做俩件事：创建一个全局的window对象（浏览器环境下），并将this的值设置为该全局对象，另外一个程序中只能有一个全局上下文。<br />函数执行上下文：每次调用函数时，都会为该函数创建一个执行上下文，每一个函数都有自己的一个执行上下文，但注意是该执行上下文是在函数被调用的时候才会被创建。函数执行上下文会有很多个，每当一个执行上下文被创建的时候，都会按照他们定义的顺序去执行相关代码。<br />Eval函数执行上下文


执行栈（也被称为调用栈）<br />这是一种后进先出的数据结构，被用来储存在代码运行阶段创建的所有执行上下文。

引擎会执行位于执行栈栈顶的执行上下文(一般是函数执行上下文)，当该函数执行结束后，对应的执行上下文就会被弹出，然后控制流程到达执行栈的下一个执行上下文。<br />结合下面的代码来理解下：
```javascript
let a = 'Hello World!';
function first() {
  console.log('Inside first function');
  second();
  console.log('Again inside first function');
}
function second() {
  console.log('Inside second function');
}
first();
console.log('Inside Global Execution Context');
```
<img :src="$withBase('/stack1.png')" alt="执行上下文"><br />当上述代码在浏览器中加载时，Javascript引擎首先创建一个全局执行上下文并将其压入执行栈中，然后碰到first()函数被调用，此时再创建一个函数执行上下文压入执行栈中。<br />当second()函数在first()函数中被调用时，引擎再针对这个函数创建一个函数执行上下文将其压入执行栈中，second函数执行完毕后，对应的函数执行上下文被推出执行栈销毁，然后控制流程到下一个执行上下文也就是first函数。<br />当first函数执行结束，first函数执行上下文也被推出，引擎控制流程到全局执行上下文，直到所有的代码执行完毕，全局执行上下文也会被推出执行栈销毁，然后程序结束。

执行上下文的生命周期<br /><img :src="$withBase('/stack2.png')" alt="执行上下文">


执行上下文是怎么创建的<br />执行上下文的创建分为两个阶段：

1. 创建阶段；
1. 执行阶段；

执行上下文是在创建阶段被创建的，创建阶段包括以下几个方面<br />1.创建词法环境<br />2.创建变量环境
```javascript
ExecutionContext = {
  LexicalEnvironment = <ref. to LexicalEnvironment in memory>,
  VariableEnvironment = <ref. to VariableEnvironment in  memory>,
}
```
## 词法环境

词法环境是一种规范类型，用于根据ECMAScript代码的词法嵌套结构来定义标识符与特定变量和函数的关联。词法环境由一个环境记录和一个可能为空的外部词法环境引用组成。

简单说，词法环境就是一种标识符-变量映射的结构（这里的标识符指的是变量/函数的名字，变量是对实际对象【包含函数和数组类型的对象】或基础数据类型的引用）

例子：
```javascript
var a = 20;
var b = 40;
function foo() {
  console.log('bar');
}

//上面代码对应的词法环境
lexicalEnvironment = {
  a: 20,
  b: 40,
  foo: <ref. to foo function>
}
```
每一个词法环境由下面三部分组成：<br />1.环境记录；<br />2.外部环境引用<br />3.绑定this

环境记录是词法环境中记录变量和函数声明的地方<br />环境记录也有俩种类型：<br />1.**声明类环境记录。**顾名思义，它存储的是变量和函数声明，函数的词法环境内部就包含着一个声明类环境记录。<br />2.**对象环境记录。**全局环境中的词法环境中就包含的就是一个对象环境记录。除了变量和函数声明外，对象环境记录还包括全局对象（浏览器的window对象）。因此，对于对象的每一个新增属性（对浏览器来说，它包含浏览器提供给window对象的所有属性和方法），都会在该记录中创建一个新条目。  

**注意：**对函数而言，环境记录还包含一个arguments对象，该对象是个类数组对象，包含参数索引和参数的映射以及一个参数函数的参数的长度属性。举个例子，一个arguments对象像下面这样：
```javascript
function foo(a, b) {
  var c = a + b;
}
foo(2, 3);
// argument 对象类似下面这样
Arguments: { 0: 2, 1: 3, length: 2 }
```
环境记录对象在创建阶段也被称为**变量对象（VO）**，在执行阶段被称为**活动对象（AO）。**<br />之所以被称为变量对象是因为此时刻该对象只是存储执行上下文中变量和函数声明，之后代码开始执行，变量会逐渐被初始化或修改，然后这个对象就被称为活动对象。

**外部环境引用**<br />对于外部环境的引用意味着在当前执行上下文中可以访问外部词法环境。也就是说，如果在当前的词法环境中找不到某个变量，那么JS引擎会试图在上层的词法环境中寻找。（JS引擎会根据这个属性来构成我们常说的作用域链）

**绑定this**<br /> 在词法环境创建阶段中，会确定this的值。<br />在全局执行上下文中，this值会被映射到全局对象中（在浏览器中，也就是window对象）

在函数执行上下文中，this值取决于谁调用了该函数，如果是对象调用了 它，那就就将this值设置为该对象，否则将this值设置为全局对象或是undefined（严格模式下）。
```javascript
const person = {
  name: 'peter',
  birthYear: 1994,
  calcAge: function() {
    console.log(2018 - this.birthYear);
  }
}
person.calcAge(); 
// 上面calcAge的 'this' 就是 'person',因为calcAge是被person对象调用的
const calculateAge = person.calcAge;
calculateAge();
// 上面的'this' 指向全局对象(window)，因为没有对象调用它，或者说是window调用了它(window省略不写)

```
词法环境伪代码：
```javascript
GlobalExectionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
     	// 标识符在这里绑定
    }
    outer: <null>,
    this: <global object>
  }
}
FunctionExectionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // 标识符在这里绑定
    }
    outer: <Global or outer function environment reference>,
    this: <depends on how function is called>
   }
}
```
## 变量环境

其实变量环境也是词法环境的一种，它的环境记录包含了变量声明语句在执行上下文中创建的变量和具体值的绑定关系。<br />变量环境也是词法环境的一种，因此它具有词法环境所有的属性。<br />在ES6中，词法环境和变量环境的不同就是前者用来存储函数声明和变量声明（let和const）绑定关系，后者只用来存储var声明的变量绑定关系。

**执行阶段**<br />在这个阶段，将完成所有变量的赋值操作，然后执行代码。<br />例子：
```javascript
let a = 20;
const b = 30;
var c;
function multiply(e, f) {
 var g = 20;
 return e * f * g;
}
c = multiply(20, 30);
```
全局执行上下文创建阶段伪代码如下：
```javascript
GlobalExectionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // 标识符在这里绑定
      a: < uninitialized >,
      b: < uninitialized >,
      multiply: < func >
    }
    outer: <null>,
    ThisBinding: <Global Object>
  },
  VariableEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // 标识符在这里绑定
      c: undefined,
    }
    outer: <null>,
    ThisBinding: <Global Object>
  }
}
```
在执行阶段，将完成变量的赋值操作，因此在执行阶段全局执行上下文看起来会像下面这样：
```javascript
GlobalExectionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // 标识符在这里绑定
      a: 20,
      b: 30,
      multiply: < func >
    }
    outer: <null>,
    ThisBinding: <Global Object>
  },
  VariableEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // 标识符在这里绑定
      c: undefined,
    }
    outer: <null>,
    ThisBinding: <Global Object>
  }
}
```
当调用multiply(20, 30)时，将为该函数创建一个函数执行上下文，该函数执行上下文在创建阶段像下面这样：
```javascript
FunctionExectionContext = {
	LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // 标识符在这里绑定
      Arguments: { 0: 20, 1: 30, length: 2 },
    },
    outer: <GlobalLexicalEnvironment>,
    ThisBinding: <Global Object or undefined>,
  },
	VariableEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
     	// 标识符在这里绑定
      g: undefined
    },
    outer: <GlobalLexicalEnvironment>,
    ThisBinding: <Global Object or undefined>
  }
}
```
然后，执行上下文进入执行阶段，这时候已经完成了变量的赋值操作。该函数上下文在执行阶段像下面这样：
```javascript
FunctionExectionContext = {
	LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // 标识符在这里绑定
      Arguments: { 0: 20, 1: 30, length: 2 },
    },
    outer: <GlobalLexicalEnvironment>,
    ThisBinding: <Global Object or undefined>,
  },
	VariableEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // 标识符在这里绑定
      g: 20
    },
    outer: <GlobalLexicalEnvironment>,
    ThisBinding: <Global Object or undefined>
  }
}
```
函数执行完成后，返回值存储在变量c中，此时全局词法环境被更新。之后，全局代码执行完成，程序结束。<br />**注意：**你可能已经注意到上面代码，let和const定义的变量a和b在创建阶段没有被赋值，但var声明的变量从在创建阶段被赋值为undefined。<br />这是因为，在创建阶段，会在代码中扫描变量和函数声明，然后将函数声明存储在环境中，但变量会被初始化为undefined(var声明的情况下)和保持uninitialized(未初始化状态)(使用let和const声明的情况下)。<br />这就是为什么使用var声明的变量可以在变量声明之前调用的原因，但在变量声明之前访问使用let和const声明的变量会报错(TDZ)的原因。<br />这其实就是我们经常听到的**变量声明提升。**<br />**注意：在执行阶段**，如果Javascript引擎找不到let和const声明的变量的值，也会被赋值为undefined。
