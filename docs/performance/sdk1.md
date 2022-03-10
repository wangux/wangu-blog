# 前端埋点、性能监控sdk设计

为什么要做前端监控？<br />-更快发现问题<br />-做产品的决策依据<br />-提升前端开发的技术深度和广度<br />-为业务扩展提供更多可能性

要收集那些数据？<br />前端数据其实有很多，从大众普遍关注的PV、UV、广告点击量，到客户端的网络环境、登陆状态，再到浏览器、操作系统信息，最后到页面性能，js异常等

-访问相关的数据<br />-PV/UV : 最基础的PV(页面访问量)、UV(独立访问用户数量)<br />-页面来源： 页面的refer，可以定位页面的入口<br />-操作系统： 了解用户OS状况，帮助分享用户群体的特征，特别是移动端，ios和Android的分布<br />-浏览器： 可以统计到各种浏览器的占比，对比是否兼容IE6、新技术（html5，css3等）的运用调研提供参考价值<br />-分辨率： 对页面设计提供参考，特别是响应式设计<br />-登录率： 登录用户具有更高的分析价值，引导用户登录时非常重要的<br />-地域分布：<br />-网络类型<br />-访问时段<br />-停留时长<br />-到达深度

-性能相关数据<br />-白屏时间<br />-首屏时间<br />-用户可操作时间<br />-页面总下载时间<br />-自定义的时间点

-点击相关数据<br />-页面总点击量<br />-人均点击量<br />-流出url<br />-点击时间<br />-首次点击时间<br />-点击热力图

-异常相关数据（js的异常）<br />-异常的提示信息<br />-JS文件名<br />-异常所在行<br />-发生异常的浏览器<br />-堆栈信息：必要的时候需要函数调用的堆栈信息，但是注意堆栈信息可能会比较大，需要截取

<a name="b59dc021"></a>

### 性能指标

- FP(First Paint)。首次绘制时间，包括了任何用户自定义的背景绘制，它是首先将像素绘制到屏幕的时刻。
- FCP(First Content Paint)。首次内容绘制。是浏览器将第一个DOM渲染到屏幕的时间，可能是文本、图像、SVG等。这其实就是白屏时间
- FMP(First Meaningful Paint)。首次有意义绘制。页面有意义的内容渲染的时间
- LCP(Largest Contentful Paint)。最大内容渲染。代表在viewport中最大的页面元素加载的时间。
- DCL(DomContentLoaded)。DOM加载完成。当HTML文档被完全加载和解析完成之后，DOMContentLoaded事件被触发。无需等待样式表，图像和子框架的完成加载。
- L(onload)。当依赖的资源全部加载完毕之后才会触发。
- TTI(Time to Interactive)。可交互时间。用于标记应用已进行视觉渲染并能可靠响应用户输入的时间点。
- FID(First Input Delay)。首次输入延迟。用户首次和页面交互(单击链接、点击按钮等)到页面响应交互的时间。

<a name="ae47f506"></a>

## 前端监控目标(监控分类)

-  稳定性(stability) 
   - JS错误。JS执行错误或者promise异常
   - 资源异常。script、link等资源加载异常
   - 接口错误。ajax或fetch请求接口异常
   - 白屏。页面空白
-  用户体验(experience) 
   - 加载时间。各个阶段的加载时间
   - TTFB(Time To First Byte 首字节时间)。是指浏览器发起第一个请求到数据返回第一个字节所消耗的时间，这个时间包含了网络请求时间、后端处理时间。
   - FP(First Paint 首次绘制)。首次绘制包括了任何用户自定义的背景绘制，它是将第一个像素点绘制到屏幕的时间。
   - FCP(First Content Paint 首次内容绘制)。首次内容绘制是浏览器将第一个DOM渲染到屏幕的时间，可以是任何文本、图像、SVG等的时间。
   - FMP(First Meaningful Paint 首次有意义绘制)。 首次有意义绘制是页面可用性的量度标准。
   - FID(First Input Delay 首次输入延迟)。用户首次和页面交互到页面响应交互的时间。
   - 卡顿。 超过50ms的任务。
-  业务(business) 
   - PV。 page view 即页面浏览量或点击量
   - UV。指访问某个站点的不同IP地址的人数。
   - 页面停留时间。用户在每一个页面的停留时间。

<a name="1281be93"></a>

## 前端监控流程

- 前端埋点
- 数据上报
- 分析和计算 将采集到的数据进行加工汇总。
- 可视化展示 将数据按各种纬度进行展示
- 监控报警 发现问题后按一定的条件触发报警

<a name="cd067da9"></a>

## 常见的埋点方案

-  代码埋点 
   - 代码埋点，就是以嵌入代码的形式进行埋点，比如要监控用户的点击事件，会选择在用户点击时插入一段代码，保存这个监听行为或者直接将监听行为<br />以某一种数据格式直接传递给服务器端。
   - 优点是可以在任意时刻，精确的发送或保存所需要的数据信息。
   - 缺点是工作量大
-  可视化埋点 
   - 通过可视化交互的手段，代替代码埋点。
   - 将业务代码和埋点代码分离，提供一个可视化交互的页面，输入为业务代码，通过这个可视化系统，可以在业务代码中自定义<br />的增加埋点事件等等。最后输出的代码耦合了业务代码和埋点代码
   - 可视化埋点其实是用系统来代替手工插入埋点代码。
-  无痕埋点 
   - 前端的任意一个事件都被绑定一个标识，所有的事件都被记录下来。
   - 通过定期上传记录文件，配合文件解析，解析出来我们想要的数据，并生成可视化报告供专业人员分析
   - 无痕埋点的优点是采集全量数据，不会出现漏埋和误埋等现象
   - 缺点是给数据传输和服务器增加压力，也无法灵活定制数据结构

<a name="fb6d04ed"></a>

## 编写监控采集脚本

-  监控错误 
   - 错误分类。 
      - JS错误
      - Promise异常
   - 资源异常 
      - 监听error
   - ajax请求异常
-  数据结构设计 

