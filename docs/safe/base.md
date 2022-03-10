# xss与csrf攻击

## xss攻击

Cross Site Script跨站脚本攻击。是指攻击者在网站上注入恶意客户端代码，通过恶意脚本对客户端网页进行篡改，从而在用户浏览网页时，对用户浏览器进行控制或则获取用户隐私数据的一种攻击方式。

xss攻击类型<br />存储型(持久型)、反射型（非持久型），基于DOM

1.反射型<br />反射型xss攻击把用户输入的数据‘反射’给浏览器。该攻击方式通常诱使用户点击一个恶意链接，或者提交一个表单，在用户点击链接或提交表单的同时向用户访问的网站注入脚本。
```javascript
//模拟反射型xss攻击，用户点击恶意链接进入localhost:3000网站，就会执行恶意注入的脚本
//例如能获取用户隐私数据（cookie）的脚本
const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();

router.get('/', async ctx => {
  ctx.body = '<script>alert("XSS攻击")</script>';
});

app.use(router.routes())
app.listen('3000', ()=> {
  console.log('Listening 3000');
});

```
2.存储型<br />存储型xss把用户输入的带有恶意脚本数据存储到服务器端。当浏览器请求数据时，浏览器返回脚本并执行。<br />例如攻击者在社区或论坛写下一篇包含恶意js代码的文章，文章发表后会存到数据库，其他用户访问，就会在他们的浏览器执行这段恶意脚本代码。
```javascript
//用户发布脚本存到服务器，返回如下，执行攻击
<div>
  <p>用户1</p>
  <div>哈哈哈说得真好</div>
</div>
<div>
  <p>用户2</p>
  <div>赞同</div>
</div>
<div>
  <p>XSS攻击者</p>
  <div><script>alert("XSS攻击")</script>
</div>
</div>
```
3.基于DOM<br />基于DOM的XSS是指通过恶意脚本修改页面的DOM结构。是纯粹发生在 **客户端**的攻击。<br />**实践：模拟基于DOM的XSS攻击**
```javascript
//某正常网站的内容会显示url地址的中的参数。例如url为：
1
http://xxx.com?name=abc
//其页面smarty模板为:
1
<div><%$smarty.get.name%></div>
//得到页面为:
1
<div>abc</div>
//那么XSS攻击者可以制作出这样的链接；
1
http://xxx.com?name=<script>alert("XSS攻击")</script>
//那么其页面最终得到的是:
1
<div>
2
<script>alert("XSS攻击")</script>
3
</div>
```
如果其他用户点击了XSS攻击者构造的链接，那么页面中就多了一段可执行脚本。这种攻击也可以说是反射型的。

<a name="saB90"></a>

## 如何防范xss攻击
1.现代浏览器内置CSP<br />csp（content security policy）内容安全策略<br />csp本质上是建立白名单，规定了浏览器只能执行特定来源的代码<br />通过设置http header来开启csp<br />Content-Security-Policy: default-src 'self'  只允许加载本站资源<br />Content-Security-Policy: img-src https://*  只允许加载https协议图片<br />Content-Security-Policy: child-src 'none'   允许加载任何来源框架

2.httponly阻止cookie劫持攻击<br />Set-Cookie: HttpOnly    document.cookie无法访问带有httponly属性的cookie，从而能够有效防御xss攻击

3.输入检查<br />对用户输入的任务内容都会进行检查、过滤、转义

4.输出检查<br />用第三种方法同样方式检查输出内容


<a name="DPcbS"></a>

## CSRF攻击
Cross Site Request Forgery 跨站请求伪造，劫持受信任用户向服务器发送非预期请求的攻击方式<br />简单的说csrf攻击就是利用用户的登录态发起恶意请求。

<a name="VZs4i"></a>

## 如何防范csrf攻击
get请求不对数据进行修改<br />不让第三方网站访问到cookie<br />防止第三方网站请求接口<br />请求时附带验证信息，如验证码或token

1.验证码<br />2.Referer Check<br />在http头中有一个字段叫做Referer，它记录了该http请求的来源地址，通过Referer Check 可以检查是否来自合法的‘源’<br />3.请求地址添加token验证<br />4.SameSite cookie<br />给cookie设置SameSite属性，这样服务器就可以要求某个cookie在跨站请求时不会被发送，从而阻止csrf


总结<br />xss攻击是利用用户对指定网站的信任<br />csrf攻击是利用网站对用户的信任
