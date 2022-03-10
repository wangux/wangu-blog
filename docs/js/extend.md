# js继承

<a name="cdHw4"></a>
## class继承
class BMW extends Car{<br />}

使用es5的继承方式<br />

## 类式继承
```javascript
function father () {}
function son() {}
//关键
son.protoType = new father();

const son1 = new son()
const son2 = new son()
console.log(son1 instanceof father) //true

//缺点:修改实例时会对其他子类实例产生影响
son1.books.push('hello')
console.log(son1.books); // [hello]
console.log(son2.books); // [hello]
```
## 构造函数式继承
```javascript
//缺陷
//无法通过instanceof 测试
//并没有继承父类原型上的方法
function User (name,pass) {
	this.pass = pass;
  this.name = name;
  User.prototype.login = function() {
  }
}
function CoffUser (username, password) {
	User.call(this, username, password) //通过call向父类的构造函数传递参数
}
const user1 = new CoffUser(1,2)
const user2 = new CoffUser(1,2)

console.log(user1 instanceof User) //false   
console.log(user1.login()) //user1.login is not a function
console.log(user1.pass) // 2
```
## 组合式继承
```javascript
function User (username, password) {
	this.password = password;
  this.username = username;
 	User.prototype.login = function () {}
}

function CoffUser (username, password) {
	User.call(this, username, password) //通过call向父类的构造函数传递参数
}
CoffUser.prototype = new User();

const user1 = new CoffUser('coff', '123');

console.log(user1 instanceof User); //true
user1.login() //可以调用
//缺点
//父类构造函数被调用俩次
//再创建了子类，并添加方法，那么其他子类都会拥有这个方法
```
## 原型式继承
```javascript
//和类式继承拥有一样的问题，修改子类实例会影响其他子类实例
function createObject (o) {
	//创建临时中间类
  function F () {}
  //修改类的原型为o，于是f的实例都将继承o上的方法
  F.prototype = o
  return new F();
}
```
## 寄生式继承
```javascript
const UserSample = {
   username: "coffe1891",
   password: "123456"
}

function CoffeUser(obj) {
   var o = Object.create(obj);//o继承obj的原型
   o.__proto__.readArticle = function () {//扩展方法
      console.log('Read article');
   }
   return o;
}

var user = new CoffeUser(UserSample);
user.readArticle();//>> Read article
console.log(user.username, user.password);//>> coffe1891 123456
```
## 寄生组合式继承
```javascript
//寄生组合式继承的核心方法
function inherit(child, parent) {
	//继承父类的实例
  const p = Object.create(parent.prototype);
  //重写子类的原型,将父类原型和子类原型合并并赋值给子类原型
  child.prototype = Object.assign(p, child.prototype);
  //重写被污染的子类的constructor(防止子类实例互相污染)
  p.constructor = child
}

//User 父类
function User (username, password) {
	let _password = password;
  this.username = username;
}

User.prototype.login = function () {
	console.log(this.username + '要登陆，密码是' + _password)； //报错，_password is not undefined
}

function CoffUser (username, password) {
	User.call(this, username, password); //继承属性
  this.article = 3
}

//继承
inherit(CoffUser, User);

//在原型上添加新方法
CoffUser.prototype.readArticle = function () {
	console.log('read article');
}

const user1 = new CoffUser('coffuser', '123');
```
