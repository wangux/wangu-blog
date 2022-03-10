<a name="mDwW6"></a>

### boolean
```javascript
let isDone: boolean = false;
```
<a name="sjBQH"></a>

### number
```javascript
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;
```
<a name="tR4Ye"></a>

### string
```javascript
let name: string = "bob";
name = "smith";
```
<a name="R9OPM"></a>

### null和undefined
**null和undefined是所有类型的子类型（可以赋值给任何类型）**
```javascript
// Not much else we can assign to these variables!
let u: undefined = undefined;
let n: null = null;
```
<a name="VnYG4"></a>

### 数组
```javascript
let list: number[] = [1, 2, 3];//元素类型后面接上 []
let list: Array<number> = [1, 2, 3];//使用数组泛型，Array<元素类型>
```
<a name="lluVi"></a>

### 元组Tuple
元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。
```javascript
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ['hello', 10]; // OK
// Initialize it incorrectly
x = [10, 'hello']; // Error
```
<a name="BTfxO"></a>

### 枚举
```javascript
enum Color {Red, Green, Blue}

enum Color {Red = 1, Green, Blue}
let c: Color = Color.Green;

enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green;

enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2];

console.log(colorName);  // 显示'Green'因为上面代码里它的值是2
```
<a name="EYklv"></a>

### Any
```javascript
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean
```
<a name="QLuyp"></a>
### Void(表示没有任何类型)
声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null：
```javascript
let unusable: void = undefined;
```

<a name="fOrNb"></a>

### never
never类型表示的是那些永不存在的值的类型<br />never类型是任何类型的子类型，也可以赋值给任何类型；然而，_没有_类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使 any也不可以赋值给never
```javascript
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}
```
<a name="zbfNe"></a>

### object
object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。<br />使用object类型，就可以更好的表示像Object.create这样的API。例如：
```javascript
declare function create(o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK

create(42); // Error
create("string"); // Error
create(false); // Error
create(undefined); // Error
```

<a name="jFQLG"></a>

### 类型断言
```javascript
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```
<a name="lA6i0"></a>

### 联合类型
联合类型 表示取值可以为多种类型中的一种。<br />可以使用typeof以及in语法来做类型保护
```javascript
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;

// typeof 做类型保护
function add(first: string | number, second: string | number) {
    if (typeof first === "string" || typeof second === "string") {
        return `${first} ${second}`
    }
    return first + second
}

// in 语法做类型保护
function trainAnialSecond(animal: Brid | Dog) {
    if ("sing" in animal) {
        animal.sing()
    } else {
        animal.bark()
    }
}
```

<a name="Mgvli"></a>

## 函数

<a name="Rdt2e"></a>
### 函数声明
两种常见的定义函数的方式——函数声明（Function Declaration）和函数表达式（Function Expression）<br />一个函数有输入和输出，要在 TypeScript 中对其进行约束，需要把输入和输出都考虑到，其中函数声明的类型定义较简单：
```javascript
function sum(x: number, y: number): number {
    return x + y;
}
```

<a name="FtYN7"></a>

### 函数表达式
写一个对函数表达式（Function Expression）的定义，可能会写成这样：
```javascript
let mySum = function (x: number, y: number): number {
    return x + y;
};
```
<a name="DIPx8"></a>

### 可选参数
与接口中的可选属性类似，我们用 ? 表示可选的参数：
```javascript
function buildName(firstName: string, lastName?: string) {
   // do
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');
//需要注意的是，可选参数必须接在必需参数后面。换句话说，可选参数后面不允许再出现必需参数了：
```
<a name="jcRi8"></a>

### 默认参数
在 ES6 中，我们允许给函数的参数添加默认值，TypeScript 会将添加了默认值的参数识别为可选参数
```javascript
function buildName(firstName: string, lastName: string = 'Cat') {
    return firstName + ' ' + lastName;
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');
```
<a name="fEPxC"></a>

### 剩余参数
ES6 中，可以使用 ...rest 的方式获取函数中的剩余参数（rest 参数）：
```javascript
function push(array: any[], ...items: any[]) {
    // do
}

let a = [];
push(a, 1, 2, 3);
```
<a name="mYHgq"></a>

### 重载
重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。
```javascript
// 上边是声明
function add(arg1: string, arg2: string): string
function add(arg1: number, arg2: number): number
// 因为我们在下边有具体函数的实现，所以这里并不需要添加 declare 关键字

// 下边是实现
function add(arg1: string | number, arg2: string | number) {
    // 在实现上我们要注意严格判断两个参数的类型是否相等，而不能简单的写一个 arg1 + arg2
    if (typeof arg1 === 'string' && typeof arg2 === 'string') {
        return arg1 + arg2
    } else if (typeof arg1 === 'number' && typeof arg2 === 'number') {
        return arg1 + arg2
    }
}
```

<a name="T5L31"></a>

## 接口
在 TypeScript 中，我们使用接口（Interfaces）来定义对象的类型。
<a name="YWqfn"></a>
### [#](https://lilixikun.github.io/blog/ts/%E5%9F%BA%E7%A1%80.html#%E4%BB%80%E4%B9%88%E6%98%AF%E6%8E%A5%E5%8F%A3)什么是接口
在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）。<br />TypeScript 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对「对象的形状（Shape）」进行描述。
<a name="bVxOu"></a>

### [#](https://lilixikun.github.io/blog/ts/%E5%9F%BA%E7%A1%80.html#%E5%AE%9A%E4%B9%89%E6%8E%A5%E5%8F%A3)定义接口
如下,我们定义一个接单的接口
```javascript
interface Person {
    name: string;
    age: number;
}

let tom: Person = {
    name: 'Tom',
    age: 25
};
```
<a name="sb9NR"></a>

### 可选属性
有时我们希望不要完全匹配一个形状，那么可以用可选属性:
```javascript
interface Person {
    name: string;
    age?: number;
}

let tom: Person = {
    name: 'Tom'
};
```
可选属性的含义是该属性可以不存在。这时**仍然不允许添加未定义的属性**
```javascript
interface Person {
    name: string;
    age?: number;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};
// 报错 'gender' does not exist in type 'Person'.
```
<a name="f2oIJ"></a>

### 任意属性
有时候我们希望一个接口允许有任意的属性，可以使用如下方式：
```javascript
interface Person {
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    name: 'Tom',
    gender: 'male'
};
```
使用 [propName: string] 定义了任意属性取 string 类型的值<br />需要注意的是，**一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集**,如下:
```javascript
interface Person {
    name: string;
    age?: number;
    [propName: string]: string;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};
// 报错 Type 'number' is not assignable to type 'string'.
```
上例中，任意属性的值允许是 string，但是可选属性 age 的值却是 number，number 不是 string 的子属性，所以报错了。<br />一个接口中只能定义一个任意属性。如果接口中有多个类型的属性，则可以在任意属性中使用**联合类型**:
```javascript
interface Person {
    name: string;
    age?: number;
    [propName: string]: string | number;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
}
```
<a name="XuYQv"></a>

### 只读属性
有时候我们希望对象中的一些字段只能在创建的时候被赋值，那么可以用 readonly 定义只读属性:
```javascript
interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    id: 89757,
    name: 'Tom',
    gender: 'male'
};

tom.id = 9527;
// index.ts(14,5): error TS2540: Cannot assign to 'id' because it is a constant or a read-only property.
```
上例中，使用 readonly 定义的属性 id 初始化后，又被赋值了，所以报错了。<br />**注意，只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候：**
```javascript
interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    name: 'Tom',
    gender: 'male'
};

tom.id = 89757;
// index.ts(13,5): error TS2540: Cannot assign to 'id' because it is a constant or a read-only property.
```
上例中，报错信息有两处，第一处是在对 tom 进行赋值的时候，没有给 id 赋值。<br />第二处是在给 tom.id 赋值的时候，由于它是只读属性，所以报错了。
