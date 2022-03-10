# http进阶

密码学<br />密码学的处理对象是数字和字符串<br />加密<br />对称加密（AES、DES、3DES）  加密秘钥和解密秘钥相同的叫对称加密<br />非对称加密（RSA）

密钥交换算法（对称加密）<br />Diffie-Hellman算法是一种著名的密钥协商算法，这种算法可以使得信息交换的双方通过公开的非安全的网络协商生成安全的共享密钥

SSL/TLS协议<br />传输层安全性协议(Transport Layer Security),及其前身  安全套接层(Secure Sockets Layer)是一种安全协议，目的是位互联网通信提供安全及数据完整性保障

HTTPS协议的安全性由SSL协议实现，当前使用的TLS协议1.2版本包含了四个核心子协议：握手协议、密钥配置切换协议、应用数据协议及报警协议。<br />（防钓鱼，钓鱼网站没有签发证书，也就是CA，浏览器会提示）<br />证书  CA（证书签发机构）<br />通过CA发放的证书完成密钥的交换<br />（根证书 =》 二级签发机构 =》 域名）


HTTPS协议分析<br />TLS握手的步骤：<br />1.Client Hello:客户端发送所支持的SSL/TLS最高协议版本号和所支持的加密算法集合及压缩方法集合等信息给服务器端<br />2.ServerHello: 服务器端收到客户端信息后。选定双方都能支持的SSL/TLS协议版本和加密方法及压缩方法，返回给客户端。<br />（前俩步双发统一版本号，协商）<br />3.SendCertificate: 服务器端发送服务端证书给客户端<br />4.RequestCertificate: 如果选择双向验证，服务器端向客户端请求客户端证书<br />5.ServerHelloDone： 服务端通知客户端初始协商结束<br />6.ResponseCertifacate:如果选择双向验证、客户端向服务器端发送客户端证书<br />7.ClientKeyExchange:客户端使用服务器端的公钥，对客户端公钥和密钥种子进行加密，再发送给服务端。<br />8.CertificateVerify:如果选择双向验证，客户端用本地私钥生成数字签名，并发送给服务器端，让其通过收到的客户端公钥进行身份验证<br />9.CreateSecretKey: 通讯双方基于密钥种子等信息生成通讯密钥<br />10.ChangeCipherSpec: 客户端通知服务器端已将通讯方式切换到加密模式<br />11.Finished：客户端做好加密通讯的准备<br />12.ChangeCipherSpec:服务器端通知客户端已将通讯方式切换到加密模式<br />13.Finished: 服务器端做好加密通讯的准备<br />14.Encrypted/DecryptedData: 双方使用客户端密钥，通过对称加密算法对通讯内容进行加密<br />15.ClosedConnection: 通讯结束后，任何一方发出断开SSL连接的消息


HTTP2协议<br />HTTP2没有改动HTTP的应用语义。http方法、状态代码、URI和标头字段等核心概念<br />http2修改了数据格式化（分帧）以及在客户端与服务器间传输的方式<br />http1用的文本，http2引入了一个新的二进制分帧层

http2的特点<br />使用二进制格式传输、更高效、更紧凑<br />对报头压缩、降低开销<br />多路复用，一个网络连接实现并行请求<br />服务器主动推送。减少请求的延迟<br />默认使用加密

http2：二进制分帧层（实际上就是一种编码）应用层<br />分俩层（Header frame   ,  Data frame）

1.1会创建多个TCP连接，2.0只会创建一个TCP连接，以流的形式传输<br />在一个链路上并行传输叫交织。

http2的服务器推送<br />http2新增的功能是，服务器可以对一个客户端请求发送多个响应。换句话说，除了对最初请求的响应外，服务器还可以向客户端推送额外资源，而无需客户端明确的请求

http2的伪头字段<br />伪头部字段是http2内置的几个特殊的以：开始的key，用于替代http1.x响应/请求头中的信息，比如请求方法、响应状态码等

HTTP3是谷歌开发的协议，是一个全新的web协议<br />基于UDP重新开发的QUIC（quick udp internet  connection）协议，<br />特点：<br />减少了握手的延迟<br />多路复用，并且没有TCP的阻塞问题<br />连接迁移（主要是在客户端）当由wifi转移到4g时，连接不会被断开

http1以及http2的队首阻塞问题<br />http1.x的队头阻塞，一个TCP连接同时传输10个请求，其中第1、2、3个请求已被客户端接收，但第四个请求丢失，那么后面第5-10个请求都被阻塞，需要等第四个请求处理完毕才能被处理

http2的多路复用虽然可以解决请求这个粒度的阻塞，但http2的基础TCP协议本身也存在队头阻塞的问题<br />http2必须使用https，https使用的TLS协议也存在对头阻塞问题<br />队头阻塞会导致http2在更容易丢包的弱网络环境下比http1更慢


http与反向代理<br />代理是在应用层做的事情<br />正向代理是要出去，从局域网拿外网的东西<br />反向代理是反过来，公网要从局域网拿东西


反向代理的用途<br />加密和ssl加速<br />负载均衡<br />缓存静态内容<br />压缩<br />减速上传（例如百度网盘的限速）<br />安全（必须通过代理层再进入服务器，相当于堡垒）<br />外网发布

nginx也是事件驱动的

upstream 上游服务器