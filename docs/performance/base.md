# 性能优化

1.合并请求<br />cdn   5个script<br />js代码压缩进图片里（把js代码转成charcode），再gzip压缩，比普通的gzip更小

http2多路复用<br />浏览器请求xx.cn/a.js    =》  解析域名   =》 HTTP连接   =》  服务器处理文件  =》  返回数据  =》  浏览器解析、渲染文件。<br />Keep-Alive解决的核心问题就在此，一定时间内，同一域名多次请求数据，只建立一次http请求，其他请求可复用每一次建立的连接通道，以达到提高请求效率的问题。<br />http2对同一域名下的所有请求都是基于流，也就是说同一域名不管访问多少文件，也只建立一路连接。

Connection:keep-alive;<br />在http1.0中，每次http请求都要创建一个连接，而创建连接的过程需要消耗资源和时间，为了减少资源消耗，缩短响应时间，就要重用连接。http1.1中默认支持keep-alive（长连接）。keep-alive需要服务端支持配置，一般服务端都会设置keep-alive超时时间（超过一定时间，服务器会主动关闭连接），也会设置最大请求数，超过最大请求数，即使没到超时时间，服务端也会主动关闭连接。<br />使用Transfer-Encoding和Content-Length来告诉客户端服务器已经x

获取用户网速<br />navigator.connection拿网速（存在兼容性问题）<br />多普勒测速（分五次请求，计算公式）<br />Performance API

网络请求时间<br />t1为发送方发送第一个bite的时间<br />t2接收方接收到最后一个bite的时间，同时发送ACK报文确认已接收完毕<br />t3发送方接收到ACK确认报文的时间<br />RTT = t3 - t2<br /> <br />网页装载流程

Prompt for unload  => rediect =>  App cache  =>   DNS解析  =>  TCP  =>  Request  =>  response   =>   Processing  =>   onLoad

缓存优先级<br />cache-control<br />expires<br />etag<br />last-modified

css会阻塞dom渲染（chrome浏览器,但不会影响dom的解析）<br />css加载会阻塞后面的js语句的执行<br />css会堵塞DOMContentLoaded（同时存在css和js的时候）<br />js需要等待css回来后再加载（引起了css in js的发展）

网页整体渲染流程<br />1-1  获取dom后分割为多个图层<br />1-2  对每个图层的节点计算样式结果（Recalculate style--样式重计算）<br />1-3  为每个节点生成图形和位置（Layout--回流和重布局 重排）<br />1-4  将每个节点绘制填充到图形位图中(Paint Setup和Paint -- 重绘)<br />1-5  图层作为纹理上传至GPU<br />1-6  符合多个图层到页面上生成最终屏幕图像（Composite Layers --图层重组  合成线程干）

总结就是渲染三个阶段：Layout、Paint、Composite、Layers

哪些属性会渲染出独立的层？<br />根元素、position、transform、半透明、css滤镜、canvas、video、Overflow<br />那些属性渲染出独立的层且会让GPU参与渲染？<br />CSS3D、Video、webGL、Transform、css滤镜<br />GPU和CPU的区别<br />相同在于俩者都有总线和外界联系，有自己的缓存体系，以及数字和逻辑运算单元。一句话，俩者都为了完成计算任务而设计。<br />不同在于：CPU主要负责操作系统和应用程序，GPU主要负责跟显示相关的数据处理，GPU的活一般CPU都能干，但效率低下

GPU进程合成线程作用<br />cpu进行commit到GPU合成，在合成线程里在GPU里会画小tiles，小tiles再经过raster光栅到GPU，最后通过draw quad发送回浏览器进程进行display。

gpu.js让代码跑在gpu

Composite Layers具体由完成什么<br />1.图层的绘制列表准备好之后，主线程会把该绘制列表提交给合成线程<br />2.合成线程根据视口（viewport）图层划分为图块（tile），这些图块的大小通常是256*256或则512*512<br />3.合成线程把图块来优先生成位图，生成位图的操作是由栅格化来执行的。（栅格化raster，是指将图块转化成位图，使用GPU来加速生成。生成的位图保存在GPU的内存中）<br />4.所有图块都被光栅化后，合成线程会生成一个绘制图块的命令--“DrawQuad”，然后将该命令提交给浏览器进程<br />5.浏览器进程里面有一个叫 viz 的组件，用来接收合成线程发过来DrawQuad命令，然后根据DrawQuad命令，将其页面内容会知道内存中，最后再将内存显示在屏幕上。

6.offset/scroll/client/width,height会触发重排、重绘<br />最好是把读放一块，写放一块<br />更改属性都放到下一帧<br />requestAnimationFrame(function() {<br />element.style.height = (h1*2)+ 'px';<br />})

强缓存不怎么用的文件vue-router，离线缓存业务文件

## 性能优化相关知识
TTFB  首字节时间<br />FP   First Paint  首次绘制  （仅有一个div根节点）<br />FCP   First Contentful Paint ，首次有内容的绘制（首屏渲染时间）  （包含页面的基本框架，但没有数据内容）<br />FMP   FirstMeaningful Paint,首次有意义的绘制    （包含页面所有元素即数据）<br />TTI    time to Interactive, 可交互时间，推荐响应时间100ms以内，否则有延迟感<br />Long tasks   超过了50ms的任务<br />SSR&&CSR  服务端渲染和客户端渲染<br />Isomorphic JavaScript  同构

LCP   最大内容绘制（Largest Contentful Paint）,用于记录视窗内最大的元素绘制时间<br />FID   首次输入延迟（First input Delay），记录在FCP和TTI之间用户首次与页面交互时响应的延迟<br />TBT   阻塞总时间（Total Blocking Time），记录在FCP到TTI之间所有长任务的阻塞时间总和<br />CLS   累计位移偏移，CLS（Cumulative Layout Shift）,记录了页面上非预期的位移波动。使用按钮动态添加了某个元素，导致页面上其他位置的代码发生了偏移，造成页面乱了

LCP代表了页面的速度指标，LCP能体现的东西更多一些，最大元素的快速载入能让用户感觉性能较好<br />FID代表页面交互体验指标，交互响应的块会让用户觉得网页流畅<br />CLS代表页面稳定指标，手机上更明显，因为手机屏幕小，CLS值大的话会让用户觉得页面体验做的很差



QPS每秒有多少用户<br />pv  页面访问量<br />uv  用户访问量


结构模式<br />spa<br />mpa<br />mpa  + spa 混合  historyfallback解决前后台路由冲突<br />spa[pre-render]  解决SEO,白屏时间过长<br />同构 （需要node，服务器资源限制）<br /> <br />监控白屏时间（performance.timing）

为什么会出现白屏？<br />1.css&js文件获取<br />2.JS文件解析<br />3.DOM生成<br />4.CSSOM生成

白屏时间过长问题原因：<br />DNS  =>  TCP  =>  index.html =>  vue.js全家桶  =>  runtime.js  =>  common.js  =>  main.js  => fetch  =>  虚拟DOM  =>  diff  =>  patch  =>  render

预渲染是   index.html =>  render


CSR(客户端渲染)<br />优点：不依赖数据、FP时间最快、客户端用户体验好、内存数据共享<br />缺点：SEO不友好、FCP、FMP慢

预渲染<br />优点：不依赖数据、FCP时间比CSR快，客户端用户体验好、内存数据共享<br />缺点：SEO不友好、FMP慢

SSR<br />优点：SEO友好、首屏性能高，FMP比CSR和预渲染快<br />缺点：客户端数据共享成本高、模板维护成本高

同构<br />优点：SEO友好、首屏性能高，FMP比CSR和预渲染快、客户端用户体验好、内存数据共享、客户端与服务端代码共用，开发效率高<br />缺点：Node容易形成性能瓶颈（开发瓶颈）
