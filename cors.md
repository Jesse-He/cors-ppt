title: 跨域介绍以及前端常见解决方案
speaker: 何天翔

<slide class="bg-black-blue aligncenter" image="https://source.unsplash.com/C1HhAQrbykQ/ .dark">

# 跨域介绍 {.text-landing.text-shadow}

#### 及前端常见解决方案 {.text-subtitle.text-shadow}

By 何天翔 {.text-intro.animated.delay-500.fadeInUp}

[:fa-github: Github](https://github.com/Jesse-He){.button.ghost}

<slide :class="size-65" class="bg-light aligncenter">
# 什么是跨域 {.text-landing.text-shadow}
----
!![figure](./src/error@2x.png .aligncenter.size-70)

<slide :class="size-95" class="bg-light aligncenter">
# 什么是跨域 {.text-landing.text-shadow}
----
!![figure](./src/cors-1.png .aligncenter.size-70)

<slide class="bg-light aligntop" :class="size-95" >
#### 什么是跨域  {.text-subtitle.text-shadow}
---

:::comlumn{.sm.grid.vertical-align}

<div class="column">
#### 同源策略 {.text-subtitle.text-shadow}

浏览器的同源指 **"协议+域名+端口"** 三者相同

即便两个不同的域名指向同一个 ip 地址，也非同源。

###### 目的： 防止 XSS，CSRF 攻击 {.text-into.animated.delay-0.5s.fadeInUp}

</div>

<div class="column">
!![figure](./src/cors-2.png .text-into.animated.delay-1s.fadeInUp.wrap.size-80)
</div>
:::

<slide :class="size-95" class="bg-light aligncenter">
# 跨域解决方案 {.text-landing.text-shadow}
----
:::comlumn{.grid}

<div class="column aligncenter" :class="size-95">

#### 前端策略 {.text-subtitle.text-shadow}
***
* 1、 通过jsonp跨域
* 2、 document.domain + iframe跨域
* 3、 location.hash + iframe跨域
* 4、 window.name + iframe跨域
* 5、 postMessage跨域 
{.aligncenter}

</div>

<div class="column" :class="size-95">

#### 服务端策略 {.text-subtitle.text-shadow}
***
* 6、 跨域资源共享（CORS）
* 7、 nginx代理跨域
* 8、 nodejs中间件代理跨域
* 9、 WebSocket协议跨域 
{.aligncenter}

</div>

:::

<slide :class="size-95" class="bg-light aligntop">
#### 跨域解决方案 - jsonp {.text-subtitle.text-shadow}
----

:::comlumn{.grid.vertical-align}

<div class="contentright">

#### :fa-angellist:

##### 原理：
**script** 是可以跨域的，而且在跨域脚本中可以直接回调当前脚本的函数 

##### 缺点：
+ 只能是GET方法；
+ 受浏览器URL最大长度2083字符限制；
+ 无法调试，服务器错误无法检测到具体原因；
+ 有CSRF的安全风险；
+ 只能是异步，无法同步阻塞；
+ 需要特殊接口支持，不能基于REST的API规范。

#### :fa-github:

[:fa-github: JSONP](http://10.2.197.142:8081/){.button}

* demo地址 ：  [http://10.2.197.142:8081/](http://10.2.197.142:8081/) 

</div> 

<div class="column contentright">
!![figure](./src/cross-blocked-jsonp.jpg .animated.delay-0.6s.lightSpeedIn.size-90.alignright)
</div>

:::

<slide :class="size-95" class="bg-light aligntop">
#### 跨域解决方案 - document.domain + iframe {.text-subtitle.text-shadow}
----

:::comlumn{.grid.vertical-align}

<div class="column">

#### :fa-angellist:

##### 原理：
相同主域名 不同子域名下的页面，可以设置document.domain让它们同域

##### 缺点：
+ 同域document提供的是页面间的互操作，需要载入iframe页面

#### :fa-github:

[:fa-github: document.domain + iframe](http://domain.com/a.html){.button}

* demo地址 ：  [http://domain.com/a.html](http://domain.com/a.html) 

http://10.2.197.142:8081/src/test/domain.html

</div> 

<div class="column">
!![figure](./src/document-domain.png .animated.delay-0.6s.fadeInUp.size-90.alignright)
</div>

:::

<slide :class="size-95" class="bg-light aligntop">
#### 跨域解决方案 - location.hash + iframe {.text-subtitle.text-shadow}
----

:::comlumn{.grid.vertical-align}

<div class="column">

#### :fa-angellist:

##### 原理：
+ a欲与b跨域相互通信，通过中间页c来实现。 三个页面，不同域之间利用iframe的location.hash传值，相同域之间直接js访问来通信

##### 缺点：
+ iframe对浏览器性能影响较大；
+ 需要特殊接口支持，不能基于REST的API规范；
+ 循环检查哈希需要消耗性能；
+ 返回数据受浏览器URL最大长度2083字符限制。

</div> 

<div class="column contentright">
!![figure](./src/window-hash.png .animated.delay-0.6s.lightSpeedIn.size-90.alignright)
</div>

:::

<slide :class="size-95" class="bg-light aligntop">
#### 跨域解决方案 - window.name + iframe {.text-subtitle.text-shadow}
----
:::comlumn{.grid.vertical-align}

<div class="column">

#### :fa-angellist:

##### 原理：
+ window.name属性，如果没有被修改，那么其值在不同的页面（甚至不同域名）加载后依旧存在。另外，其值大小通常可达到2MB。

##### 缺点：
+ iframe对浏览器性能影响较大；
+ 需要特殊接口支持，不能基于REST的API规范；
+ 每当你想要获取一条新的消息时都不得不发起两次网络请求，网络成本大；
+ 需要准备空白页，对它的访问是无意义的，影响流量统计。

#### :fa-github:

[:fa-github: window.name + iframe](http://10.2.197.142:8081/src/test/window.name.html){.button}

* demo地址 ：  [http://10.2.197.142:8081/src/test/window.name.html](http://10.2.197.142:8081/src/test/window.name.html) 

</div> 

<div class="column contentright">
!![figure](./src/window-name.png .animated.delay-0.6s.fadeInUp.size-90.alignright)
</div>

:::


<slide :class="size-95" class="bg-light aligntop">
#### 跨域解决方案 - postMessage {.text-subtitle.text-shadow}
----
:::comlumn{.grid.vertical-align}

<div class="column">

#### :fa-angellist:

##### 原理： 
+ HTML5允许窗口之间发送消息
+ H5的window.postMessage为浏览器带来了一个安全的。基于事件的消息api

##### 缺点：
+ 浏览器需要支持HTML5
+ 获取窗口句柄后才能相互通信

#### :fa-github:

[:fa-github: postMessage](http://10.2.197.142:8081/src/test/postMessage.html){.button}


</div> 

<div class="column contentright">
!![figure](./src/postmessage.png .animated.delay-0.6s.fadeInUp.size-90.alignright)
</div>

:::


<slide :class="size-95" class="bg-light aligntop">
#### 跨域解决方案 - 跨域资源共享（CORS） {.text-subtitle.text-shadow}
----

:::comlumn{.grid.vertical-align}

<div class="column">

#### :fa-angellist:

##### 原理： 
+ 服务器设置Access-Control-Allow-OriginHTTP响应头之后，浏览器将会允许跨域请求
+ 可以支持POST，PUT等方法
+ 只服务端设置Access-Control-Allow-Origin即可，前端无须设置，若要带cookie请求：前后端都需要设置。


##### 缺点：
+ 浏览器需要支持HTML5

#### :fa-github:

[:fa-github: Cross-Origin](http://10.2.197.142:3000){.button}

https://sso.toutiao.com/  https://www.ixigua.com/

</div> 

<div class="column contentright">
!![figure](./src/Cross-Origin.png .animated.delay-0.6s.fadeInUp.size-90.alignright)
</div>

<slide :class="size-95" class="bg-light aligntop">
#### 跨域解决方案 - 跨域资源共享（CORS） {.text-subtitle.text-shadow}
----
#### 浏览器将CORS请求分成两类：
+  ####  简单请求（simple request）
+ 非简单请求（not-so-simple request）。

####  Request Header 
+ Origin: https://www.ixigua.com
####  Response Header
+ Access-Control-Allow-Credentials	true
+ Access-Control-Allow-Origin	https://www.ixigua.com

:::

<slide :class="size-95" class="bg-light aligntop">
#### 跨域解决方案 - 跨域资源共享（CORS） {.text-subtitle.text-shadow}
----
##### 简单请求（simple request）

<div>

#####  说明

+ CORS请求相关的字段，都以Access-Control-开头。
+ Access-Control-Allow-Origin
   - 该字段是必须的。它的值要么是请求时Origin字段的值，要么是一个*，表示接受任意域名的请求。
+ Access-Control-Allow-Credentials
   - 该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。
+ Access-Control-Expose-Headers
   - 该字段可选。CORS请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：
      - Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma。
----
+ :fa-chrome: withCredentials 属性 (CORS请求默认不发送Cookie和HTTP认证信息)
   - Access-Control-Allow-Credentials: true
   - 开发者必须在AJAX请求中打开withCredentials属性
{.animated.delay-1s.fadeInUp}

</div>
:::

<slide :class="size-95" class="bg-light aligntop">
#### 跨域解决方案 - nginx代理 {.text-subtitle.text-shadow}
----
#### 跨域解决方案 - Nodejs中间件代理 {.text-subtitle.text-shadow.animated.lightSpeedIn.delay-0.3s}
----
#### 跨域解决方案 - WebSocket协议 {.text-subtitle.text-shadow.animated.lightSpeedIn.delay-1s}
----

[:fa-github: WebSocket协议](http://10.2.197.142:8081/src/test/proxy.html){.button.text-subtitle.text-shadow.animated.lightSpeedIn.delay-1s}


<slide class="bg-blue aligncenter" video="https://webslides.tv/static/videos/working.mp4 poster='https://webslides.tv/static/images/working.jpg' .dark autoplay loop"> 
## 谢 谢 {.text-landing.text-shadow.animated.lightSpeedIn}

<slide class="bg-black aligncenter" image="https://source.unsplash.com/n9WPPWiPPJw/ .anim">
## Q&A {.text-landing.text-shadow}
