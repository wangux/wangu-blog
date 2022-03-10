# 浏览器架构以及渲染流程

渲染引擎<br />把html、css、js解析成DOM Tree（解析html和js）<br />生成渲染树结构（解析css）<br />进行布局（排列Render Tree）<br />绘制（Painting Render Tree）<br />显示


解析html（html Parser）<br />解析js生成Dom Tree（js解释器，js加载可以阻止解析）<br />解析css生成Render Tree(css Parser)<br />排列布局<br />渲染


Chrome架构<br />每个域名都有一个单独的渲染进程（防止一个崩溃，其他跟着崩溃）

Renderer Process（渲染进程）<br />浏览器进程（主要控制chrome的功能部分以及地址栏、书签、后退，网络请求和文件访问等）<br />小工具进程（Utility Process）<br />GPU进程<br />Plugin Process（控制网站使用的插件）

Renderer Process包括主线程（Main thread），工作线程（worker threads）

web worker和service worker（工作线程）


webkit引擎<br />给开发用的api <br />WebCore(处理html和css)<br />JSCore（处理js，在谷歌中就是V8）<br />底层api（处理网络，图形等）
