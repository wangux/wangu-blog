# ts进阶

lib.d.dom.ts    //.d.ts   类型声明文件(为js做类型配对)

vue3 ts vite 开发  esbuild esmoudle

webpack生态完善<br />v8-compile-cahche + Sparkplug + commonjs + 插件代码

开发 sdk rollup + parcel/snowpack  +  rome(ts合辑)

Quokka （编译ts）


infer配合extends条件类型判断使用，表示在extends条件语句中待推断的类型变量<br />extends用法
```javascript
type Filter<T, U> = T extends U ? never : T;

type Values = Filter<"x" | "y" | "z", "x">;
// 得到 type Values = "y" | "z"
```
infer基础用法
```javascript
type ExtractSelf<T> = T extends (infer U) ? U : T;

type T1 = ExtractSelf<string>;        // string
type T2 = ExtractSelf<() => void>;    // () => void
type T3 = ExtractSelf<Date[]>;        // Date[]
type T4 = ExtractSelf<{ a: string }>; // { a: string }
```
与infer相关的内置类型

- Parameters 用来获取函数参数的类型
- ReturnType 用来获取函数返回值类型
```javascript
type Func = () => User;
type Test = ReturnType<Func>;   // Test = User
```
```javascript
// 用于提取函数类型的返回值类型
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
```
<a name="cQGhg"></a>

# Partial
将对象属性变为非必填<br />Required将对象的所有属性变为必填项
```javascript
type Partial<T> = {
	[P in keyof T]?: T[P]
}

type Required<T> = {
	[P in keyof T]-?: T[P]
}

//自定义深层Partial
type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends Object ? DeepPartial<T[P]> : T[P]
}
```
<a name="v3pRc"></a>

# Record
将一个类型的所有属性都映射到另一个类型上并创造一个新的类型
```javascript
type Record<K extends keyof any, T> = {
	[P in K]: T
}

type petsGroup = 'dog' | 'cat' | 'fish'
type numOrStr = number | string
type Ipets = Record<petsGroup, numOrStr>

//Ipets = {
//	dog: numOrStr
//  cat: numOrStr
//  fish: numOrStr
//}
```
<a name="jeHvs"></a>

# Pick
从一个复合类型中，取出几个想要的类型组合成一个新的类型
```javascript
type Pick<T, K extends keyof T> = {
	[P in K]: T[P]
}

interface B {
	id: number
  name: string
  age: number
}

type PickB = Pick<B, 'id' | 'name'>
//type PickB = {
//	id: number
//  name: string
//}
```
keyof：返回某种类型的所有键（key）<br />extends限制类型

<a name="rHbPU"></a>

# Exclude
Exclude<T, U>表示从T中排除可分配给U的类型，也就是取不是U的补集
```javascript
type Exclude<T, U> = T extends U ? never : T

type T = {
	name: string
  age: number
}
type U = {
	name: string
}
type IType = Exclude<keyof T, keyof U> //'age'
```
<a name="SAdbJ"></a>

# Extract
Extract<T, U>取T中U中都有的类型,也就是取交集
```javascript
type Extract<T, U> = T extends U ? T : never;

type T0 = Extract<'a' | 'b' | 'c', 'a' | 'f'> //'a'
```
<a name="tQqjc"></a>

# ConstructorParameters
取构造函数参数类型
```javascript
type ConstructorParameters<T extends new (...args: any) => any> = T extends new (...args: infer P) => any ? P : never

class People {
  name: string
  age: number
  
  constructor(name: string) {
  	this.name = name;
  }
}

type Itype = ConstructorParameters<typeof People> 
//Itype = [name: string]
//typeof是取类型的作用

```
<a name="YC49e"></a>

## infer
表示在extends条件语句中待推断的类型变量
```javascript
type ParamType<T> = T extends (param: infer P) => any ? P : T

interface IDog {
	name: string
  age: number
}

type Func = (dog: IDog) => void

type Param = ParamType<Func> // IDog
type TypeString = ParamType<string> //string
```
<a name="XqD42"></a>

# InstanceType
用于获取构造函数的返回类型
```javascript
type InstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : any

class People {
  name: string
  age: number
  
  constructor(name: string) {
  	this.name = name;
  }
}

type Itype = InstanceType<typeof People> 
//Itype = People
//constructor默认返回this
//constructor Perple(name: string): People

```
<a name="Kx35r"></a>

# NonNullable

```javascript
//NonNullable<T>从T中排除null和undefined
type NonNullable<T> = T extends null | undefined ? never : T
```
<a name="PakXU"></a>

# readonly & ReadonlyArray

- readonly 只读 被readonly 标记的属性只能在声明时或类的构造函数中赋值，之后将不可改（即只读属性）。
- ReadonlyArray 同理, 只读数组
```javascript
const arr = [1,2,3,4]
let ro: ReadonlyArray<number> = arr; //ro调用push会报错
```
