# 前端面试题汇总
## 1.事件循环
### (macro)task（又称之为宏任务）
可以理解是每次执行栈执行的代码就是一个宏任务（包括每次从事件队列中获取一个事件回调并放到执行栈中执行）。

浏览器为了能够使得JS内部(macro)task与DOM任务能够有序的执行，会在一个(macro)task执行结束后，
在下一个(macro)task 执行开始前，对页面进行重新渲染，流程如下：

(macro)task->渲染->(macro)task->...
(macro)task主要包含：script(整体代码)、setTimeout、setInterval、I/O、UI交互事件、postMessage、MessageChannel、setImmediate(Node.js 环境)
### microtask（又称为微任务)
可以理解是在当前 task 执行结束后立即执行的任务。也就是说，在当前task任务后，下一个task之前，在渲染之前。

所以它的响应速度相比setTimeout（setTimeout是task）会更快，因为无需等渲染。也就是说，在某一个macrotask执行完后，就会将在它执行期间产生的所有microtask都执行完毕（在渲染前）。

microtask主要包含：Promise.then、MutaionObserver、process.nextTick(Node.js 环境)

### tick
在事件循环中，每进行一次循环操作称为 tick，每一次 tick 的任务处理模型是比较复杂的，但关键步骤如下：

执行一个宏任务（栈中没有就从事件队列中获取）
执行过程中如果遇到微任务，就将它添加到微任务的任务队列中
宏任务执行完毕后，立即执行当前微任务队列中的所有微任务（依次执行）
当前宏任务执行完毕，开始检查渲染，然后GUI线程接管渲染
渲染完毕后，JS线程继续接管，开始下一个宏任务（从事件队列中获取）

### async函数中在await之前的代码是立即执行的，遇到了await时，会将await后面的表达式执行一遍，将await后面的代码也就是加入到microtask中的Promise队列

## 2.渲染过程
dom tree + css tree = render tree  
完了以后回流  确定每个元素的几何位置  重绘确定每个元素的像素
### 重绘
节点的几何属性发生改变或者由于样式发生改变而不会影响布局的，称为重绘，
例如outline, visibility, color、background-color等，重绘的代价是高昂的，因为浏览器必须验证DOM树上其他节点元素的可见性。
### 回流
回流是布局或者几何属性需要改变就称为回流。回流是影响浏览器性能的关键因素，因为其变化涉及到部分页面（或是整个页面）的布局更新。
一个元素的回流可能会导致了其所有子元素以及DOM中紧随其后的节点、祖先节点元素的随后的回流。
回流必定会发生重绘，重绘不一定会引发回流。
### 优化
1. Dom操作
2. 位置信息获取
3. style、class
4. display:hidden再操作

### 优化：
1. 少获取元素的位置信息  每获取一次都会触发回流
2. 对元素样式进行统一修改  e.g.在style.cssText上一次性修改，更改出class名
3. 批量修改dom，可以将元素设置为none，将其脱离文档流以后再更改，全部插到一个dom里再插入这个dom
4. 使用treansform等方法触发gpu加速  使得css动画不会触发回流

## 3.移动端1px问题
### 原因：window.devicePixelRatio查看，移动端DPR=2 就是设备物理像素与视觉像素的比值
### 解决：  
1. ```html
    <meta name='viewport' content='width=device-width,initial-scale=0.5'>
2.  微元素+transform 本元素position：relative：after position：absolute 宽度百分百  高度1px；background设个颜色  transform:scaleY(0.5);  
3. 如果是全边框  宽度高度都为百分之两百  缩小0.5  边框设置1px

## 4.双向绑定问题：
  Vue2.x:使用Object.defineProperty实现双向绑定，其实现的功能是数据劫持，在观察者订阅者模式当中是观察者的角色
         此外，当观察者发现变化时可以告知manager，manager告知订阅者，订阅者对相应的做出反应（compile）。
         p.s.:对于某些数组操作失灵，其采用的方法是，改写某个数组的原型链，使其指向改造过的方法原型。
  Vue3.x:使用Proxy来代替Object.defineProperty,优点总结就是，劫持能力比前者强大，可以监控整个对象，而且不会对
         数组的某些操作失灵。
## 5.虚拟dom：
  - 四个关键方法：pathch函数分为两种情况初始化时，将所有的虚拟dom实现再插入到container上  
              第二次当虚拟dom改变时，会使用diff算法找出不同，使用新dom替换旧dom（同层比较，不移动  
              说到渲染，有个h函数，作用是将虚拟dom渲染成为真实dom，本质是一个递归函数，当不是叶子节点时会不断的  
              向下调用h函数，参数有标签名，属性，子节点；叶子节点的调用是，标签名，属性，text
  - VNode：树形结构
    - tag: 当前节点的标签名
    - data: 当前节点对应的对象，包含了具体的一些数据信息，是一个VNodeData类型，可以参考VNodeData类型中的数据信息
    - children: 当前节点的子节点，是一个数组
    - text: 当前节点的文本
    - elm: 当前虚拟节点对应的真实dom节点
    - ns: 当前节点的名字空间
    - context: 当前节点的编译作用域
    - functionalContext: 函数化组件作用域
    - key: 节点的key属性，被当作节点的标志，用以优化
    - componentOptions: 组件的option选项
    - componentInstance: 当前节点对应的组件的实例
    - parent: 当前节点的父节点
    - raw: 简而言之就是是否为原生HTML或只是普通文本，innerHTML的时候为true，textContent的时候为false
    - isStatic: 是否为静态节点
    - isRootInsert: 是否作为跟节点插入
    - isComment: 是否为注释节点
    - isCloned: 是否为克隆节点
    - isOnce: 是否有v-once指令          
## 6.diff算法：
  同层递归顺序比较
  只比较同层的dom结构，比较是依次深度递归比较的，顺序是先看此节点还在不在，再看节点属性是否改变，再看文本内容，节点是否被替换
  ### key的作用
  1. key的作用是为了在diff算法执行时更快的找到对应的节点，提高diff速度。
  2. 在数据变化时强制更新组件，以避免“原地复用”带来的副作用。
  3. 主要是为了提升diff【同级比较】的效率。自己想一下自己要实现前后列表的diff，如果对列表的每一项增加一个key，即唯一索引，
  那就可以很清楚的知道两个列表谁少了谁没变。而如果不加key的话，就只能一个个对比了。
  4. 会根据新节点的key去对比旧节点数组中的key，从而找到相应旧节点（这里对应的是一个key => index 的map映射）。
  如果没找到就认为是一个新增节点。而如果没有key，那么就会采用一种遍历查找的方式去找到对应的旧节点。一种一个map映射，
  另一种是遍历查找。相比而言。map映射的速度更快。
## 性能剖析
1. 框架与原生js比较
  - 框架的意义在于为你掩盖底层的 DOM 操作，让你用更声明式的方式来描述你的目的，从而让你的代码更容易维护。
  - 没有任何框架可以比纯手动的优化 DOM 操作更快，因为框架的 DOM 操作层需要应对任何上层 API 可能产生的操作，它的实现必须是普适的。
2. DOM更新
  - innerHTML: render html string O(template size) + 重新创建所有 DOM 元素 O(DOM size)
  - Virtual DOM: render Virtual DOM + diff O(template size) + 必要的 DOM 更新 O(DOM change)
  - 后者的render与diff显然比较慢，但是其实基于纯js的计算的
  - innerHTML 的总计算量不管是 js 计算还是 DOM 操作都是和整个界面的大小相关，但 Virtual DOM 的计算量里面，只有 js 计算和界面大小相关，DOM 操作是和数据的变动量相关的。
## 7.axois相关配置：
  ![最佳实践](https://user-gold-cdn.xitu.io/2019/2/25/16922b90ca9d9ad3?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
  可以配置默认的url、transformRequest、transformResponse对请求体和响应体做对应的处理、headers自定义  
  timeout自定义、onUploadProgres  onDownloadProgress、proxy设置代理、cancelToken用于取消响应
  ```javascript
  axios.get('/user/12345', {
    cancelToken: new CancelToken(function executor(c) {
      // executor 函数接收一个 cancel 函数作为参数
      cancel = c;
    })
  });
  // 取消请求
  cancel(); 
  ```
  ### axois解决跨域问题
  Step1：配置BaseUrl
  在main.js中，配置下我们访问的Url前缀：Axios.defaults.baseURL = '/api'
  Step2：配置代理
  修改config文件夹下的index.js文件，在proxyTable中加上如下代码：
  <img src="https://img-blog.csdn.net/20180531130130812">
  Step3：修改请求Url
  修改刚刚的axios请求，把url修改如下：this.$axios.get("/movie/top250") http://api.douban.com/v2/movie/top250
  ## 8.事件机制：
  事件绑定：w3c事件委托 addEventListener，removeEventListener **第三个参数是false则为冒泡 true是捕获**
    事件捕获与冒泡：捕获是先触发父元素再触发子元素
    阻止冒泡：e.stopPropagation()、e.cancelBubble = true
    阻止默认事件：e.preventDefault()、e.returnValue = false;
    事件委托：将事件绑定在父元素上可以减少绑定的数量以及动态增减子元素都无所谓
    比如 focus、blur 之类的事件本身没有事件冒泡机制，所以无法委托；
    mousemove、mouseout 这样的事件，虽然有事件冒泡，但是只能不断通过位置去计算定位，对性能消耗高，因此也是不适合于事件委托的；
  
  ## 9.前端安全：
  ### xss-script标签
  任何可以输入的地方都有可能引起,包括URL
  XSS 常见的注入方法：
  1. 在 HTML 中内嵌的文本中，恶意内容以 script 标签形成注入。
  2. 在内联的 JavaScript 中，拼接的数据突破了原本的限制（字符串，变量，方法名等）。
  3. 在标签属性中，恶意内容包含引号，从而突破属性值的限制，注入其他属性或者标签。
  4. 在标签的 href、src 等属性中，包含 javascript: (伪协议)等可执行代码。
  5. 在 onload、onerror、onclick 等事件中，注入不受控制代码。
  6. 在 style 属性和标签中，包含类似 background-image:url("javascript:..."); 的代码（新版本浏览器已经可以防范）。
  7. 在 style 属性和标签中，包含类似 expression(...) 的 CSS 表达式代码（新版本浏览器已经可以防范）。
  --储存型：数据库返还数据未经转义直接渲染
  --反射型：将用户输入的存在XSS攻击的数据，发送给后台，后台并未对数据进行存储，也未经过任何过滤，直接返回给客户端。被浏览器渲染。就可能导致XSS攻击；
    
  防御：客户端求情参数：包括用户输入，url参数、post参数。
  1. 输入：参数变量类型限制，
         如果拼接 HTML 是必要的，就需要对于引号，尖括号，斜杠进行转义,但这还不是很完善.想对 HTML 模板各处插入点进行充分的转义,就需要采用合适的转义库.
         一般是用于对于输入格式的检查，例如：邮箱，电话号码，用户名，密码……等，按照规定的格式输入。
         不仅仅是前端负责，后端也要做相同的过滤检查。因为攻击者完全可以绕过正常的输入流程，直接利用相关接口向服务器发送设置。
  2. 输出：
  3. httpOnly: 在 cookie 中设置 HttpOnly 属性后，js脚本将无法读取到 cookie 信息。
  ### CSRF 跨站请求伪造
  csrf是让用户住不知情的情况下,冒用其身份发起了一个请求
  ![流程图](https://user-gold-cdn.xitu.io/2018/8/8/1651a22ce6858fd9?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
  在三方网站中，利用图片的url来执行get请求，表单执行post请求
#### 防范
  1. Get 请求不对数据进行修改
  2. 不让第三方网站访问到用户 Cookie  ——可以对 Cookie 设置 SameSite 属性，该属性设置 Cookie 不随着跨域请求发送，不是都兼容
  3. 阻止第三方网站请求接口
  4. 请求时附带验证信息，比如验证码或者 token  X-XSRF-TOKEN
  5. 验证 Referer对于需要防范 CSRF 的请求，我们可以通过验证 Referer 来判断该请求是否为第三方网站发起的。
  6. 验证码
#### 与XSS的差别
  在后台接收到请求的时候,可以通过请求头中的Referer请求头来判断请求来源
  通常来说 CSRF 是由 XSS 实现的，CSRF 时常也被称为 XSRF（CSRF 实现的方式还可以是直接通过命令行发起请求等）。
  本质上讲，XSS 是代码注入问题，CSRF 是 HTTP 问题。 XSS 是内容没有过滤导致浏览器将攻击者的输入当代码执行。CSRF 则是因为浏览器在发送 HTTP 请求时候自动带上 cookie，而一般网站的 session 都存在 cookie里面(Token验证可以避免)。
  ### iframe插件——可以通过配置沙盒属性来控制粒度权限、
  ### 点击劫持通过iframez-index显示在某小游戏上面，iframe设置为透明——通过X-Frame—Option：Deny、
  ### 错误的内容推断，使用假的文件格式隐藏脚本内容，再次请求上传的文件时，由于内容推断错误而导致脚本执行——X-Content-Type-Options来阻止浏览器自行推断文件类型
  ### npm第三方包可能存在xss漏洞
  ### 前端本地储存的数据可能会因为xss漏洞被读取
  ### cdn劫持，当分散的脚本被劫持时，可能会加载后出现问题，可以通过hash加密验证匹配不匹配

  ## 10. 0.2 + 0.1 = 0.300000000004 
  ——由于IEEE 754标准的原因
  解决办法可以将结果乘1000再除1000进行一个截尾操作 parseFloat((0.1 + 0.2).toFixed(10))

  ## 11.querySelector() 
  方法仅仅返回匹配指定选择器的第一个元素。如果你需要返回所有的元素，请使用 querySelectorAll() 方法替代。
  由于querySelector是按css规范来实现的，所以它传入的字符串中第一个字符不能是数字.
  最后再根据查询的资料总结一下： query选择符选出来的元素及元素数组是静态的，而getElement这种方法选出的元素是动态的。
  静态的就是说选出的所有元素的数组，不会随着文档操作而改变． 在使用的时候getElement这种方法性能比较好，query选择符则比较方便．

  ## 12.“==”运算符比较“喜欢”Number  先toString再valueOf
  ```javascript
  Boolean([]) //true

  Boolean(undefined) // false

  Boolean(null) // false 

  Boolean(0) // false 

  Boolean(NaN) // false 

  Boolean('') // false

  Number([]) // 0

  Number({}) // NaN。
  ```

## 13.对于 CommonJS 和 ES6 中的模块化的两者区别是：

前者支持动态导入，也就是 require(${path}/xx.js)，后者目前不支持，但是已有提案

前者是同步导入，因为用于服务端，文件都在本地，同步导入即使卡住主线程影响也不大。而后者是异步导入，因为用于浏览器，需要下载文件，如果也采用同步导入会对渲染有很大影响

前者在导出时都是值拷贝，就算导出的值变了，导入的值也不会改变，所以如果想更新值，必须重新导入一次。但是后者采用实时绑定的方式，导入导出的值都指向同一个内存地址，所以导入值会跟随导出值变化

后者会编译成 require/exports 来执行的

## 14.DNS：域名服务系统
  --浏览器搜索自身的DNS缓存：
    首先浏览器会去搜索自身的DNS缓存，看缓存有没有过期，过期的话缓存的解析就结束了（chrome缓存的时间只有一分钟，查看chrome的缓存可打开：chrome:/net-internals/#dns ）。
  --搜索操作系统自身的DNS缓存：
    如果浏览器没有找到缓存或者缓存过期失效，浏览器就会搜索操作系统自身的缓存，没有找到或者失效，解析结束（操作系统的缓存：window系统是一天，mac系统严格根DNS协议中的TTL）。
  --读取本地的hosts文件：
    若操作系统的缓存也没有找到或失效，浏览器就会去读取本地的hosts文件（Hosts文件也可以建立域名到IP地址的绑定关系，可以通过编辑Hosts文件来达到名称解析的的。 例如，我们需要屏蔽某个域名时，就可以将其地址指向一个不存在IP地址，以达到屏蔽的效果）。
  --浏览器发起一个DNS的系统调用：
    hosts中没有找到对应的配置项的话，浏览器发起一个DNS的调用（向本地主控DNS服务，一般来说是你的运营商提供的）。
    
  --通过 DNS 查询 IP 地址的操作称为域名解析，负责执行解析这一操作的就叫解析器。 解析器实际上是一段程序,它包含在操作系统的 Socket 库中 
  --调用解析器后,解析器会向 DNS 服务器（运营商提供的）发送查询消息。
   --运营商服务会先查找自身缓存找到对应条目，没有过期，解析成功，若没找到对应条目，主控服务器会代替浏览器发起一个迭代的DNS解析的请求，先查找根域的），
   运营商服务器拿到域名的IP，返回给操作系统的内核，同时缓存在了自己的缓存区，操作系统内核从DNS服务商拿来的IP地址返回给浏览器。
   --浏览器再向 Web 服务器发送消息时,只要从该内存地址取出 IP地址,将它与 HTTP 请求消息一起交给操作系统 .

   --首先运营商服务从已经配置好的信息中拿到根域名的IP地址（这里假设根域只有一个，实际是想13个根域发起请求），然后像根域发起请求群问:"请问http:/www.lab.glasscom.com的IP地址是多少？"，根域名查询记录数据后没有找到，回答："我不知道它的IP地址，不过我知道.com的权威服务器（ns)的地址，它xxx.xxx.xxx.xxx,你去问它吧"。运营商服务运营商服务拿到.com的IP地址，根据IP地址发起另一个请求去询问.com服务器问："请问 http:/www.lab.glasscom.com的ns的IP地址是多少？"，.com域服务器查找自身记录数据后回答：“我不知道，我只知道.http://glasscom.com的IP地址”。
   以此类推,只要重复前面的步骤,就可以顺藤摸瓜找到目标DNS服务器,只要向目标DNS 服务器发送查询消息,就能够得到我们需要的答案,也就是 http:/www.lab.glasscom.com 的 IP 地址了。


## 15.CDN：内容分发网络
  --SEO（Search Engine Optimization），网站的搜索引流。

  --而HTTP传输时延对web的访问速度的影响很大，在绝大多数情况下是起决定性作用的，这是由TCP/IP协议的一些特点决定的。物理层上的原因是光速有限、信道有限，协议上的原因有丢包、慢启动、拥塞控制等。
  要提高访问速度，最简单的做法当然就是多设置几个服务器，让终端用户离服务器“更近”。典型的例子是各类下载网站在不同地域不同运营商设置镜像站，或者是像Google那样设置多个数据中心。但是多设几个服务器的问题也不少，一是多地部署时的困难，二是一致性没法保障，三则是管理困难、成本很高。实际上，在排除多地容灾等特殊需求的情况下，对大多数公司这种做法是不太可取的。当然，这种方案真正做好了，甚至是比后续所说的使用CDN要好的。

  CDN是一种公共服务，他本身有很多台位于不同地域、接入不同运营商的服务器，而所谓的使用CDN实质上就是让CDN作为网站的门面，用户访问到的是CDN服务器，而不是直接访问到网站。由于CDN内部对TCP的优化、对静态资源的缓存、预取，加上用户访问CDN时，会被智能地分配到最近的节点，降低大量延迟，让访问速度可以得到很大提升。

  --原理：CDN做了两件事，一是让用户访问最近的节点，二是从缓存或者源站获取资源
  CDN有个源站的概念，源站就是提供内容的站点(网站的真实服务器), 从源站取内容的过程叫做回源。
  1)、用户向浏览器提供要访问的域名；
  2)、浏览器调用域名解析库对域名进行解析，由于CDN对域名解析过程进行了调整，所以解析函数库一般得到的是该域名对应的CNAME记录，为了得到实际IP地址，
  浏览器需要再次对获得的CNAME域名进行解析以得到实际的IP地址；在此过程中，使用的全局负载均衡DNS解析，
  如根据地理位置信息解析对应的IP地址，使得用户能就近访问。
  3)、此次解析得到CDN缓存服务器的IP地址，浏览器在得到实际的IP地址以后，向缓存服务器发出访问请求；
  4)、缓存服务器根据浏览器提供的要访问的域名，通过Cache内部专用DNS解析得到此域名的实际IP地址，再由缓存服务器向此实际IP地址提交访问请求；
  5)、缓存服务器从实际IP地址得得到内容以后，一方面在本地进行保存，以备以后使用，另一方面把获取的数据返回给客户端，完成数据服务过程；
  6)、客户端得到由缓存服务器返回的数据以后显示出来并完成整个浏览的数据请求过程。
  通过以上的分析我们可以得到，为了实现既要对普通用户透明(即加入缓存以后用户客户端无需进行任何设置，直接使用被加速网站原有的域名即可访问，
  又要在为指定的网站提供加速服务的同时降低对ICP的影响，只要修改整个访问过程中的域名解析部分，以实现透明的加速服务。

  -- 坏处：由于cdn导致的ip变化，很有可能出现404
## 16. ['1', '2', '3'].map(parseInt)
### answer[1,NaN,NaN]。
### why？ 因为parseInt第二个参数是默认进制，map使用时默认传入第二个参数是index，当第二个参数是0时默认是十进制，2大于一进制最大值，3大于二进制最大值

## 17. Set、WeakSet
### Set
ES6 新增的一种新的数据结构，类似于数组，但成员是唯一且无序的，没有重复的值。
Set 对象允许你储存任何类型的唯一值，无论是原始值或者是对象引用。
向 Set 加入值的时候，不会发生类型转换，所以5和"5"是两个不同的值。Set 内部判断两个值是否不同，使用的算法叫做“Same-value-zero equality”，
它类似于精确相等运算符（===），主要的区别是**NaN等于自身，而精确相等运算符认为NaN不等于自身。**
add(value)：新增，相当于 array里的push

delete(value)：存在即删除集合中value

has(value)：判断集合中是否存在 value

clear()：清空集合

Array.from 方法可以将 Set 结构转为数组

遍历方法（遍历顺序为插入顺序）
keys()：返回一个包含集合中所有键的迭代器

values()：返回一个包含集合中所有值得迭代器

entries()：返回一个包含Set对象中所有元素得键值对迭代器

forEach(callbackFn, thisArg)：用于对集合成员执行callbackFn操作，如果提供了 thisArg 参数，回调中的this会是这个参数，没有返回值

### WeakSet
WeakSet 与 Set 的区别：

WeakSet 只能储存对象引用，不能存放值，而 Set 对象都可以
WeakSet 对象中储存的对象值都是被弱引用的，即垃圾回收机制不考虑 WeakSet 对该对象的应用，如果没有其他的变量或属性引用这个对象值，
则这个对象将会被垃圾回收掉（不考虑该对象还存在于 WeakSet 中），所以，WeakSet 对象里有多少个成员元素，取决于垃圾回收机制有没有运行，
运行前后成员个数可能不一致，遍历结束之后，有的成员可能取不到了（被垃圾回收了），WeakSet 对象是无法被遍历的（ES6 规定 WeakSet 不可遍历），
也没有办法拿到它包含的所有元素

## 18.Map、WeakMap
集合 与 字典 的区别：

共同点：集合、字典 可以储存不重复的值
不同点：集合 是以 [value, value]的形式储存元素，字典 是以 [key, value] 的形式储存

### Map
```javascript
const m = new Map()
const o = {p: 'haha'}
m.set(o, 'content')
m.get(o)	// content

m.has(o)	// true
m.delete(o)	// true
m.has(o)	// false
```
#### 操作方法：
set(key, value)：向字典中添加新元素
get(key)：通过键查找特定的数值并返回
has(key)：判断字典中是否存在键key
delete(key)：通过键 key 从字典中移除对应的数据
clear()：将这个字典中的所有元素删除
#### 遍历方法:
Keys()：将字典中包含的所有键名以迭代器形式返回
values()：将字典中包含的所有数值以迭代器形式返回
entries()：返回所有成员的迭代器
forEach()：遍历字典的所有成员
#### 转换方法
1. Map 转 Array
```javascript
const map = new Map([[1, 1], [2, 2], [3, 3]])
console.log([...map])	// [[1, 1], [2, 2], [3, 3]]
```
2. Array 转 Map
```javascript
const map = new Map([[1, 1], [2, 2], [3, 3]])
console.log(map)	// Map {1 => 1, 2 => 2, 3 => 3}
```
3. Map 转 Object

因为 Object 的键名都为字符串，而Map 的键名为对象，所以转换的时候会把非字符串键名转换为字符串键名。
```javascript
function mapToObj(map) {
    let obj = Object.create(null)
    for (let [key, value] of map) {
        obj[key] = value
    }
    return obj
}
const map = new Map().set('name', 'An').set('des', 'JS')
mapToObj(map)
```
4. Object 转 Map
```javascript
function objToMap(map) {
    let map = new Map()
    for (let key of Object.keys(obj)) {
        map.set(key, obj[key])
    }
    return map
}

objToMap({'name': 'An', 'des': 'JS'})
```
5. Map 转 JSON
```javascript
function mapToJson(map) {
    return JSON.stringify([...map])
}

let map = new Map().set('name', 'An').set('des', 'JS')
mapToJson(map)	// [["name","An"],["des","JS"]]
```
6. JSON 转 Map
```javascript
function jsonToMap(jsonStr) {
  return objToMap(JSON.parse(jsonStr));
}

jsonToStrMap('{"name": "An", "des": "JS"}')
```

### WeakMap
WeakMap 对象是一组键值对的集合，其中的键是弱引用，其中，键必须是对象，而值可以是任意。

注意，WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。

WeakSet 中，每个键对自己所引用对象的引用都是弱引用，在没有其他引用和该键引用同一对象，这个对象将会被垃圾回收（相应的key则变成无效的），所以，WeakSet 的 key 是不可枚举的。

#### 方法：

has(key)：判断是否有 key 关联对象
get(key)：返回key关联对象（没有则则返回 undefined）
set(key)：设置一组key关联对象
delete(key)：移除 key 的关联对象

### Summary
#### Set
成员唯一、无序且不重复
[value, value]，键值与键名是一致的（或者说只有键值，没有键名）
可以遍历，方法有：add、delete、has
#### WeakSet
成员都是对象
成员都是弱引用，可以被垃圾回收机制回收，可以用来保存DOM节点，不容易造成内存泄漏
不能遍历，方法有add、delete、has
#### Map
本质上是键值对的集合，类似集合
可以遍历，方法很多可以跟各种数据格式转换
#### WeakMap
只接受对象最为键名（null除外），不接受其他类型的值作为键名
键名是弱引用，键值可以是任意的，键名所指向的对象可以被垃圾回收，此时键名是无效的
不能遍历，方法有get、set、has、delete

## 19.Array
### Are U An Array
1. Array.isArray()
2. Obeject.prototype.toString.call()  //这种方法对于所有基本的数据类型都能进行判断，即使是 null 和 undefined 。
3. instanceof // instanceof 只能用来判断对象类型，原始类型不可以。并且所有对象类型 instanceof Object 都是 true。
### 数组扁平化  [[[1,2,3]]]
1. arr.split(',')
2. arr.flat(Infinity);
## 20.ES6与ES5类的区别
1. class会类似变量提升，造成暂时性死区
2. ES5的类中不会自动开启严格模式，ES6会
3. ES6的方法不可枚举，ES5可以
4. ES6中的每一个方法都不可以作为构造函数new一个对象
5. ES5中可以重写类名，ES6不可以

## 21.ES6与ES5继承的区别
1. 原型链指向的区别
```javascript
// ES6
class Super {}
class Sub extends Super {}
const sub = new Sub();
Sub.__proto__ === Super;

// ES5
function Super() {}
function Sub() {}
Sub.prototype = new Super();
Sub.prototype.constructor = Sub;
var sub = new Sub();
Sub.__proto__ === Function.prototype;
```
2. this生成顺序的区别
ES5 和 ES6 子类 this 生成顺序不同。ES5 的继承先生成了子类实例，再调用父类的构造函数修饰子类实例，
ES6 的继承先生成父类实例，再调用子类的构造函数修饰父类实例。这个差别使得 ES6 可以继承内置对象。所以需要使用super
```javascript
function MyES5Array() {
  Array.call(this, arguments);
}

// it's useless
const arrayES5 = new MyES5Array(3); // arrayES5: MyES5Array {}

class MyES6Array extends Array {}

// it's ok
const arrayES6 = new MyES6Array(3); // arrayES6: MyES6Array(3) []
```
## 22.作用域链
### 作用域
负责收集并维护由所有声明的标识符（变量、函数）组成的一系列查询，并实施一套非常严格的规则，确定当前执行的代码对这些标识符的访问权限。
### 作用域链
当执行一段JavaScript代码（全局代码或函数）时，JavaScript引擎会创建为其创建一个作用域又称为执行上下文（Execution Context），在页面加载后会首先创建一个全局的作用域，然后每执行一个函数，会建立一个对应的作用域，从而形成了一条作用域链。每个作用域都有一条对应的作用域链，链头是全局作用域，链尾是当前函数作用域。作用域链的作用是用于解析标识符，当函数被创建时（不是执行），会将this、arguments、命名参数和该函数中的所有局部变量添加到该当前作用域中，当JavaScript需要查找变量X的时候（这个过程称为变量解析），它首先会从作用域链中的链尾也就是当前作用域进行查找是否有X属性，如果没有找到就顺着作用域链继续查找，直到查找到链头，也就是全局作用域链，仍未找到该变量的话，就认为这段代码的作用域链上不存在x变量，并抛出一个引用错误（ReferenceError）的异常。
### 变量查找
1. 作用域嵌套
引擎从当前的执行作用域开始查找变量，如果找不到就向上一级继续查找。当抵达最外层的全局作用域时，无论找到还是没有找到，查找过程都会停止。
2. 作用域查找会在找到第一个匹配的标识符时停止。
3. 在多层嵌套作用域中可以定义同名的标识符，内部的标识符会“遮蔽”外部的标识符。
4. 全局变量会自动变成全局对象的属性
5. 词法作用域只由函数被声明时所处的位置决定
6. 
### LHS、RHS
L和R分别代表一个赋值操作的左侧和右侧，当变量出现在赋值操作的左侧时进行LHS查询，出现在赋值操作的**非左侧**时进行RHS查询。

LHS查询（左侧）：找到变量的容器本身，然后对其赋值
RHS查询（非左侧）：查找某个变量的值，可以理解为 retrieve his source value，即取到它的源值
### ERROR
ReferenceError和作用域判别失败相关，TypeError表示作用域判别成功了，但是对结果的操作是非法或不合理的。

RHS查询在作用域链中搜索不到所需的变量，引擎会抛出ReferenceError异常。
非严格模式下，LHS查询在作用域链中搜索不到所需的变量，全局作用域中会创建一个具有该名称的变量并返还给引擎。
严格模式下（ES5开始，禁止自动或隐式地创建全局变量），LHS查询失败会抛出ReferenceError异常
在RHS查询成功情况下，对变量进行不合理的操作，引擎会抛出TypeError异常。（比如对非函数类型的值进行函数调用，或者引用null或undefined类型的值中的属性）
### 函数作用域
1. 属于这个函数的全部变量都可以在整个函数的范围内使用及复用————闭包原理、规避冲突、模块原理
2. 函数声明的提升与函数表达式的提升区别————一个普通块内部的函数声明通常会被提升到所在作用域的顶部，不会被条件判断所控制。尽量避免在普通块内部声明函数。
### 块作用域
1. try、catch catch中会创建
2. let——不会有变量提升、用于for循环可以绑定每次循环的作用域
3. const
4. const与let，他们声明的变量绑定在块作用域上（script）
### 闭包
将内部函数传递到所在的词法作用域以外，它都会持有对原始定义作用域的引用，无论在何处执行这个函数都会使用闭包。
一个拥有许多变量和绑定了这些变量的环境的表达式（通常是一个函数），因而这些变量也是该表达式的一部分。
+ 特点
1. 作为一个函数变量的一个引用，当函数返回时，其处于激活状态。　　
2. 一个闭包就是当一个函数返回时，一个没有释放资源的栈区。　　
  简单的说，Javascript允许使用内部函数---即函数定义和函数表达式位于另一个函数的函数体内。
  而且，这些内部函数可以访问它们所在的外部函数中声明的所有局部变量、参数和声明的其他内部函数。
  当其中一个这样的内部函数在包含它们的外部函数之外被调用时，就会形成闭包。
+ 缺点 闭包的内存泄露，是IE的一个 bug，闭包使用完成之后，收回不了闭包的引用，导致内存泄露
### 动态作用域——函数执行上下文——this
### 面试题
```javascript
var b = 10;
(function b() {
  b = 20;       // var b = 20  就会输出20
  console.log(b)  // this.b 就会输出10
})()
// 严格模式下会报错，因为函数的额变量提升相当于声明了一个const变量 第一行再次赋值就会报错
// 非严格模式下是将函数打印出来
// 原因：在非匿名自执行函数中，函数变量为只读状态无法修改；
```

## 23.Koa的中间件机制
app.use()——挂载中间件
在app.listen()方法中compose函数调用了中间件对其进行处理，之后就是this.handleRequest
### 洋葱模型
Koa中间件机制采用洋葱模型，在处理请求时，从最外层开始往里执行，各个中间件采用ctx上下文来通讯。
### 如何执行
1. compose函数对中间件处理，返回fnMiddleware函数
2. fnMiddleware的执行过程（context,next）两个参数，
其执行中标识了变量index，表示上次执行到了哪个函数
3. 确定目前要执行哪个函数（dispach（i+1））以后对其执行结果进行promise包装
### 特点
存储：以数组形式存储中间件。
状态管理：所有的状态变更，都交给ctx对象，无需跨中间件传递参数。
流程控制：以递归的方式进行中间件的执行，将下一个中间件的执行权交给正在执行的中间件，即洋葱圈模型。
异步方案：用Promise包裹中间件的返回结果，以支持在上一个中间件内部实现Await逻辑。
### 中间件开发
``` javascript
  module.exports = async(ctx,next) => {
    let start = Date.now()
    await next()
    let end = Date.now() - start
  }
```
## 24.HTTPS
### 区别
1. 这是身披SSL的HTTP运行基于TCP的SSL上，添加了加密和认证机制
2. 端口在443而非80
3. 需要证书、共享密钥加密和公开密钥加密并用的混合加密机制
4. https运行在传输层，http运行在应用层
### 作用
+ 一是用于确定请求的目标服务器的身份；
+ 二是保证传输的数据不会被网络中间窃听或者篡改，即是防止中间人攻击。
### 缺点
1. 相同网络环境下，HTTPS协议会使页面的加载时间延长近50%，增加10%到20%的耗电。此外，HTTPS协议还会影响缓存，增加数据开销和功耗。
2. HTTPS协议的安全是有范围的，在黑客攻击、拒绝服务攻击、服务器劫持等方面几乎起不到什么作用。
3. 最关键的，SSL 证书的信用链体系并不安全。特别是在某些国家可以控制 CA 根证书的情况下，中间人攻击一样可行。
### 加密原理
+ 对称加密与非对称加密的结合
  1. 当你的浏览器向服务器请求一个安全的网页(通常是 https://)
  2. 服务器就把它的证书和公匙发回来
  3. 浏览器检查证书是不是由可以信赖的机构颁发的，确认证书有效和此证书是此网站的。
  4. 浏览器中随机生成一对对称秘钥，并使用公钥（服务器端的）加密该对称秘钥，将它和对称加密后的URL一起发送到服务器
  5. 服务器用自己的私匙解密了你发送的钥匙。然后用这把对称加密的钥匙给你请求的URL链接解密。
  6. 服务器用你发的对称钥匙给你请求的网页加密。你也有相同的钥匙就可以解密发回来的网页了
  - 对称密钥加密是指加密和解密使用同一个密钥的方式
  - 非对称加密是指使用一对非对称密钥，即公钥和私钥，公钥可以随意发布，但私钥只有自己知道。发送密文的一方使用对方的公钥进行加密处理，对方接收到加密信息后，使用自己的私钥进行解密。
## 25.HTTP版本比较
1. 2版本的多路复用
  - 在 HTTP/1 中，每次请求都会建立一次TCP连接，也就是我们常说的3次握手4次挥手，这在一次请求过程中占用了相当长的时间，即使开启了 Keep-Alive ，解决了多次连接的问题，但是依然有两个效率上的问题：

  - 第一个：串行的文件传输。当请求a文件时，b文件只能等待，等待a连接到服务器、服务器处理文件、服务器返回文件，这三个步骤。我们假设这三步用时都是1秒，那么a文件用时为3秒，b文件传输完成用时为6秒，依此类推。（注：此项计算有一个前提条件，就是浏览器和服务器是单通道传输）
  - 第二个：连接数过多。我们假设Apache设置了最大并发数为300，因为浏览器限制，浏览器发起的最大请求数为6（Chrome），也就是服务器能承载的最高并发为50，当第51个人访问时，就需要等待前面某个请求处理完成。
  - 多路复用代替了HTTP1.x的序列和阻塞机制，所有的相同域名请求都通过同一个TCP连接并发完成。在HTTP1.x中，并发多个请求需要多个TCP连接，浏览器为了控制资源会有6-8个TCP连接都限制。
  - HTTP2中同域名下所有通信都在单个连接上完成，消除了因多个 TCP 连接而带来的延时和内存消耗。单个连接上可以并行交错的请求和响应，之间互不干扰，但是合并请求仍然是哟哟必要的，因为可以减少头部的发送。
2. 2版本的数据传输格式
  - HTTP2采用二进制格式传输，取代了HTTP1.x的文本格式，二进制格式解析更高效。
3. 2版本Header压缩
  - 对首部表进行比较，如果重复则不发送，只发不同的部分
4. 3版本的基于 UDP 协议的 QUIC 协议
  - 由于2版本使用的是基于TCP的协议，所以当丢包的时候总是需要重新建立连接重传，0RTT 建连速度快
    + 传输层 0RTT 就能建立连接。
    + 加密层 0RTT 就能建立加密连接。
  - 更高级的多路复用
    + QUIC是基于UDP的，一个连接上的多个stream之间没有依赖
  - 加密认证的报文
  - 向前纠错机制
    + 假如说这次我要发送三个包，那么协议会算出这三个包的异或值并单独发出一个校验包，也就是总共发出了四个包。当出现其中的非校验包丢包的情况时，可以通过另外三个包计算出丢失的数据包的内容。当然这种技术只能使用在丢失一个包的情况下，如果出现丢失多个包就不能使用纠错机制了，只能使用重传的方式了。 
**HTTP/1.x 有连接无法复用、队头阻塞、协议开销大和安全因素等多个缺陷**
**HTTP/2 通过多路复用、二进制流、Header 压缩等等技术，极大地提高了性能，但是还是存在着问题的**
**QUIC 基于 UDP 实现，是 HTTP/3 中的底层支撑协议，该协议基于 UDP，又取了 TCP 中的精华，实现了即快又可靠的协议**


## 26.Restful接口
REST即Representational State Transfer的缩写，可译为"表现层状态转化”。REST最大的几个特点为：资源、统一接口、URI和无状态。
1. 每一个URI代表一种资源；
2. 客户端和服务器之间，传递这种资源的某种表现层；
3. 客户端通过四个HTTP动词，对服务器端资源进行操作，实现"表现层状态转化"。
![Restful接口的流程与优点](https://user-gold-cdn.xitu.io/2016/11/30/e2e3a0049c608678a64960cd0c1caf11?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### 优点
1. 前后端分离，减少流量
2. 安全问题集中在接口上，由于接受json格式，防止了注入型等安全问题
3. 前端无关化，后端只负责数据处理，前端表现方式可以是任何前端语言（android，ios,html5）
4. 前端和后端人员更加专注于各自开发，只需接口文档便可完成前后端交互，无需过多相互了解
5. 服务器性能优化：由于前端是静态页面，通过nginx便可获取，服务器主要压力放在了接口上
6. 轻量，直接基于http，不在需要任何别的诸如消息协议。get/post/put/delete为CRUD操作
7. 面向资源，一目了然，具有自解释性。
8. 数据描述简单，一般以xml，json做数据交换

## 27.前端加密
即在数据发送前将数据进行哈希或使用公钥加密。如果数据被中间人获取，拿到的则不再是明文。
当然还有其他一些优点:例如避免后端等打印日志直接暴露明文密码,还可以避免明文撞库等.
### 缺点：
1. 密文被hacker获取以后仍然可以直接使用密文冒用用户登录
2. 前端加密算法容易被hacker获取到，使得加密无意义

## 28.Cookie --内容主要包括name(名字)、value(值)、maxAge(失效时间)、path(路径),domain(域)和secure.
### 使用
浏览器会先检查是否有相应的cookie，有则自动添加在request header中的cookie字段中。这些是浏览器自动帮我们做的，而且每一次http请求浏览器都会自动帮我们做。这个特点很重要，因为这关系到“什么样的数据适合存储在cookie中”。
存储在cookie中的数据，每次都会被浏览器自动放在http请求中，如果这些数据并不是每个请求都需要发给服务端的数据，浏览器这设置自动处理无疑增加了网络开销；但如果这些数据是每个请求都需要发给服务端的数据（比如身份认证信息），浏览器这设置自动处理就大大免去了重复添加操作。所以对于那种设置“每次请求都要携带的信息（最典型的就是身份认证信息）”就特别适合放在cookie中，其他类型的数据就不适合了。
### 特征
不同的浏览器存放的cookie位置不一样，也是不能通用的。
cookie的存储是以域名形式进行区分的，不同的域下存储的cookie是独立的。
我们可以设置cookie生效的域（当前设置cookie所在域的子域），也就是说，我们能够操作的cookie是当前域以及当前域下的所有子域
一个域名下存放的cookie的个数是有限制的，不同的浏览器存放的个数不一样,一般为20个。
每个cookie存放的内容大小也是有限制的，不同的浏览器存放大小不一样，一般为4KB。
cookie也可以设置过期的时间，默认是会话结束的时候，当时间到期自动销毁。
### 用途
1. 会话状态管理（如用户登录状态、购物车、游戏分数或其它需要记录的信息）
2. 个性化设置（如用户自定义设置、主题等）
3. 浏览器行为跟踪（如跟踪分析用户行为等）
### 设置选项
1. expires、max-age来设置cookie的过期时间
2. domain与path限制cookie可以被访问的域与目录——domain的默认值为设置该cookie的网页所在的域名，path默认值为设置该cookie的网页所在的目录。
3. secure 
document.cookie = "username=cfangxu; secure"
把cookie设置为secure，只保证 cookie 与服务器之间的数据传输过程加密，而保存在本地的 cookie文件并不加密。就算设置了secure 属性也并不代表他人不能看到你机器本地保存的 cookie 信息。 机密且敏感的信息绝不应该在 cookie 中存储或传输，因为 cookie 的整个机制原本都是不安全的
注意：如果想在客户端即网页中通过 js 去设置secure类型的 cookie，必须保证网页是https协议的。在http协议的网页中是无法设置secure类型cookie的。
4. httpOnly 在客户端是不能通过js代码去设置一个httpOnly类型的cookie的，这种类型的cookie只能通过服务端来设置。
原因：如果任何 cookie 都能被客户端通过document.cookie获取会发生什么可怕的事情。当我们的网页遭受了 XSS 攻击，有一段恶意的script脚本插到了网页中。这段script脚本做的事情是：通过document.cookie读取了用户身份验证相关的 cookie，并将这些 cookie 发送到了攻击者的服务器。攻击者轻而易举就拿到了用户身份验证信息，于是就可以摇摇大摆地冒充此用户访问你的服务器了（因为攻击者有合法的用户身份验证信息，所以会通过你服务器的验证）。
### js操作
```javascript
document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
document.cookie= name + "="+cval+";expires="+exp.toGMTString(); //时间设置为过去的时间
```
### 服务端session
--服务端的session的实现对客户端的cookie有依赖关系的
1. 服务端执行Session机制
2. 生成对应而唯一的session_id(通过对这个session_id的解析和处理，服务端可以找到，该session保存的文件；再从文件中提取出session的信息)
3. 服务端会将这个session_id发送给客户端
4. 客户端接受到session_id,以cookie作为保存的容器保存起来
5. 客户端在每次请求的时候都会带这个session_id给服务端
6. 服务端自行解析session
7. **禁用cookie仍然可以使用session**
创建session的时候会附带着创建一个cookie，它的MaxAge为-1，也就是说只能存在于内存中。当浏览器端禁用cookie时，这个cookie依然会被创建。
**二者关系**只要有session_id就可以找到session。。。cookie 是保存唯一识别（session_id）的手段;
8. 当浏览器提交的请求中有sessionid参数或cookie报头时，容器不再新建session，而只是找到先前的session进行关联。这里又分为两种情况：
1）使用sessionid。该值若能与现有的session对应，就不创建新的session，否则，仍然创建新的session。
2）使用cookie。该值若能与现有的session对应，也不创建新的session；
但若没有session与之对应（就如上面的重启服务器之后）容器会根据cookie信息恢复这个与之对应的session，就好像是以前有过一样。
9. 何时销毁
当我们关闭浏览器，再打开它，连接服务器时，服务器端会分配一个新的session，也就是说会启动一个新的会话。

### localStorage实现多标签页通信
+ 监听storage事件 handle回调函数中有个e参数
  - key	设置或删除或修改的键。调用clear()时，则为null。
  - oldValue	改变之前的旧值。如果是新增元素，则为null。
  - newValue	改变之后的新值。如果是删除元素，则为null。
  - storageArea	该属性是一个引用，指向发生变化的sessionStorage或localStorage对象
  - url	触发这个改变事件的页面的URL
+ 5M
+ 同源

## 29.三栏布局
  常用三种方法
  1. float 左右设个宽度，一个浮动左边一个浮动右边 ————会产生浮动影响，需要创建BFC来清除浮动
  2. absolute left/center/right 均给绝对定位，左右给 300px，中间设置 left 300 right 300，
  3. flex 左右元素设置宽度后  中间元素设置flex：1
  
## 30.Vue上$emit与$on的粗略实现
**这是一种发布订阅者模式**
我们使用一个eventList = {} 来储存事件及其对应的cb
对象的key值是事件名称，对象的value值是一个数组，存放着每个cb函数
$emit('type',cb)，此时我们查找eventList中有没有type键值，如果有的话就将cb函数push没有就创建一个再push
$on('type')，查找eventList中是否有type键值，有的话把其中的数组拿出来forEach，item.apply(this,arguments)
```javascript
  class EventEmitter {
  constructor(){
    this.queue = {}
    this.onceQueue = {}
  }
  on(event,fn){
    if (!this.queue[event]) {
      this.queue[event] = []
    }
    this.queue[event].push(fn)
  }
  once(event,fn){
    if (!this.queue[event]) {
      this.queue[event] = {
        fns: [],
        hasFired: false
      }
    }
    this.onceQueue[event].fns.push(fn)
  }
  emit(){
    let event = [...arguments].shift()
    let fns = this.queue[event]
    let onceFns = this.onceQueue[event].fns
    if(fns && fns.length != 0) {
      fns.forEach(fn => {
        fn.apply(this,arguments)
      })
    }
    if(onceFns && onceFns.length != 0 && !this.onceQueue[event].hasFired) {
      onceFns.forEach(fn => {
        fn.apply(this,arguments)
      })
    }
    this.onceQueue[event] = {}
  }
}
```

## 31.ES中的比较算法
1. The Abstract Equality Comparison Algorithm ————’==‘
  + 类型相同时——特殊性在于 0与-0  NaN与NaN  前者相等，后者不等
  + 类型不同时  null == undefined， 基本数据类型转换为 Number 类型再 == 比较。引用数据类型执行内部 ToPrimitive方法后再 == 比较。

2. The Strict Equality Comparison Algorithm
  + 类型相同时——特殊性在于 0与-0  NaN与NaN  前者相等，后者不等

3. SameValue
  + Object.is(NaN,NaN) --true,Object.is(0,-0) --false

4. SameValueZero
  + 在Set中以及ES7里的include中，是不区分正负0的，但是区分NaN

## 32.强制类型转换
1. null undefined false +0 -0 NaN "" 转换为Boolean值的false 其他全部为真
2. 转换为Number类型
  + true = 1，false=0
  + null为0 undefined为NaN
  + 空字符串为0 包含各种进制的数字的话就会变成对应的十进制数字 其余为NaN
  + parseInt --两个参数，第一个参数是字符串，如果不是字符串其会先转换成字符串，第二个参数是进制，字符串的处理是从左到右最先寻找一个数字，
  如果全程没有或者字符串是空的话就转换成NaN
3. 转换为String类型
4. 对象转换为基本类型
  + Boolean 都为true
  + String 判断对象是否有 toString() 方法，如果有 toString() 方法且返回的结果是基本类型值，就返回这个结果并转换为字符串；
    如果对象没有 toString 方法或者该方法返回的不是原始值，就判断该对象是否有 valueOf 方法。
    如果存在 valueOf 方法且返回值是基本类型值，就返回并转换为字符串；否则就抛出错误。
  + Namber 和转换为String的顺序相反
5. 隐式强制类型转换
  + ’+‘ 作为一元运算符时相当于Number转化，二元运算符时，
    如果两个操作数都是字符串，则进行简单的字符串拼接；
    如果只有一个操作数是字符串，则将另一个转换为字符串再进行拼接，转换为字符串的操作与显示转换时规则相同；
    如果有一个操作数是对象、数值或布尔值，则调用它们的 toString 方法取得相应的字符串值，然后再应用前面关于字符串的规则
6. 抽象相等比较规则（一条条从上到下的去匹配规则，匹配到那一条应用那一条规则）
  1. NaN 与任何值不相等，包括NaN自己本身
  2. null 与任何值不相等，除了null和undefined
  3. undefined 与任何值不相等，除了null和undefined
  4. 如果操作数有布尔类型或者是数字，把操作数都转成数值进行比较
  5. 如果操作数有一个是字符串，把操作数都转成字符串进行比较
  6. 如果操作数两边都是复杂数据类型，比较的是地址
  console.log([]==[]);
  console.log([] == ![]);  // true
  console.log([] == false);  // +[] ==> 0  +false ==> 0   0 == 0 

## 33.data-attribute
HTML5新增的可以为元素添加自己的data-*键名的属性
我们可以用js的getAttribute(data-category)方法与dom.dataset.data-category方法
以及可以在css [data-category]属性选择器上使用

## 34.let、const、var的区别 --前两者不会将变量绑定在顶层对象上而是绑定在块级作用域script当中，后者会绑定在window对象中

## 35.渐进增强和优雅降级
  对于css3新特性，不同的浏览器厂家都有不一样的支持程度，
  在我们书写样式时，先写w3c标准的样式再写浏览器个别兼容支持写法时，这种写法叫做**优雅降级**，高版本为基准，向下兼容。
  顺序相反的话我们就是实现最基础功能为基本，向上兼容，即**渐近增强**。

### 问题
采用优雅降级的写法，
如果一个浏览器同时支持前缀写法和正常写法，后面的旧版浏览器样式就覆盖了新版样式，出现一些奇怪的问题 ，但是用渐进增强的写法就不存在这个问题。

## 36.css字符的水平间距与垂直间距
lette-spacing line-hight 前者设置为负值可以水平重叠  后者设置小于百分百会垂直重叠

## 37.大方面的前端优化
+ 网络传输与加载速度
  + 减少HTTP请求次数或者减少请求数据的大小 
    + 使用雪碧图
    + 我们最好把CSS或者JS文件进行合并压缩webpack
    + 图片懒加载技术
    + 对于不经常更新的数据，最好采用浏览器的304缓存做处理（主要由服务器端处理）
    + 使用字体图标代替一些页面中的位图（图片）像上次那个性别符号
    + AUDIO或者VIDEO标签，我们最好设置它们的preload=none：页面加载的时候，音视频资源不进行加载，播放的时候再开始加载（减少页面首次加载HTTP请求的次数）
    + 采用CDN加速
    + 对于返回内容相同的请求，没必要每次都直接从服务端拉取，合理使用 AJAX 缓存能加快 AJAX 响应速度并减轻服务器压力。cache:true
    + webpack打包
  + gzip压缩
    - 后台在Nginx开启gzip压缩
      - 开启和关闭gzip模式  
      gzip on;
      - nginx对于静态文件的处理模块，开启后会寻找以.gz结尾的文件，直接返回，不会占用cpu进行压缩，如果找不到则不进行压缩  
      gzip_static on;
      - gizp压缩起点，文件大于1k才进行压缩  
      gzip_min_length 1k;
      - 设置压缩所需要的缓冲区大小，以4k为单位，如果文件为7k则申请2*4k的缓冲区   
      gzip_buffers 4 16k;
      - gzip 压缩级别，1-9，数字越大压缩的越好，也越占用CPU时  
      gzip_comp_level 2;
      - 进行压缩的文件类型。  
      gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php application/vnd.ms-fontobject font/ttf font/opentype font/x-woff image/svg+xml;
      - 是否在http header中添加Vary: Accept-Encoding，建议开启  
      gzip_vary on;
      - 禁用IE 6 gzip  
      gzip_disable "MSIE [1-6]\.";
    - 使用
      - 在浏览器发送请求是会在request header中设置属性accept-encoding:gzip。表明浏览器支持gzip
      - 服务器检查头部决定是否发送压缩包
      - 浏览器解析压缩包
+ CSS性能优化
  + 高消耗的样式
    - bos-shadow、border-radius
    - 避免回流重绘
    - 少用float
    - CSS选择器是从右至左的，所以就需要对其嵌套的选择器限制进行限制‘
      - 避免使用通用选择器
      - 避免使用标签或 class 选择器限制 id 选择器
      - 避免使用标签限制 class 选择器
      - 避免使用多层标签选择器。使用 class 选择器替换，减少css查找
      - 避免使用子选择器
## 38.this指向
1. 全局函数
2. 对象中的方法
3. 箭头函数
4. call、aplly(俩参数)、bind(指向对象)会创建一个新函数
5. new绑定（new创建实例）new会在内存中创建一个新的空对象，new 会让this指向这个新的对象，执行构造函数 目的：给这个新对象加属性和方法，new会返回这个新对象
6. 闭包中的this，指向window
## 39.TCP、UDP协议
+ 三次握手原因，可能存在网络延迟，如果不进行第三次，可能会因为网络延迟而导致不必要的连接，服务端并不知道客户端的接收能力以及自己的发送能力是否正常
+ 四次挥手的原因，双向传递，一遍告诉说我发完啦，可以关闭了，另一边说，我知道啦但是我还没发完，你等我下，然后等他发完了他说我发完咯，这边回答知道了拜拜👋
+ UDP协议全称是用户数据报协议，在网络中它与TCP协议一样用于处理数据包，是一种无连接的协议。在OSI模型中，在第四层——传输层，处于IP协议的上一层。UDP有不提供数据包分组、组装和不能对数据包进行排序的缺点，也就是说，当报文发送之后，是无法得知其是否安全完整到达的。
  - 面向无连接
    - 在发送端，应用层将数据传递给传输层的 UDP 协议，UDP 只会给数据增加一个 UDP 头标识下是 UDP 协议，然后就传递给网络层了
    - 在接收端，网络层将数据传递给传输层，UDP 只去除 IP 报文头就传递给应用层，不会任何拼接操作
  - 单播，多播，广播
    - UDP 不止支持一对一的传输方式，同样支持一对多，多对多，多对一的方式，也就是说 UDP 提供了单播，多播，广播的功能。
  - 不可靠
  - 头部开销小
    - 两个十六位的端口号，分别为源端口（可选字段）和目标端口
    - 整个数据报文的长度
    - 整个数据报文的检验和（IPv4 可选 字段），该字段用于发现头部信息和数据中的错误
+ tcp、udp的区别
  - TCP面向连接，udp是无连接的，即发送数据之前是不需要建立连接的
  - TCP提供可靠地服务，也就是说，通过TCP连接传送的数据无差错，不丢失，不重复，且按序到达，UDP尽最大努力交付。
  - TCP面向字节流，实际是TCP把数据看成一连串无结构的字节流，UDP是面向报文的，UDP没有拥塞控制
  - TCP连接是点对点的，UDP支持一对一，一对多，多对一，多对多的交互通信。
  - TCP首部开销20字节，UDP8个字节。
  - TCP的逻辑信道是全双工的可靠信道，UDP是不可靠信道。
+ tcp拥塞控制
  - 慢启动--指数翻倍拥塞窗口
  - 拥塞避免--当达到阈值的时候就线性增长，至丢失响应
  - 快速重传--发送方只要一连收到三个重复确认就应当立即重传对方尚未收到的报文段，而不必继续等待设置重传计时器时间到期。
  - 快速恢复--阈值减半
## 40.http协议格式
+ request： request-line（由三部分组成 1.请求方法；2.请求地址；3.请求协议和版本） head body
+ response response-line（由三部分组成 1。状态码；2.状态文本；3.请求协议和版本) head body
+ request-header:
  - cache-control 控制缓存的时效性
  - connection 连接方式 如果是 keep-alive 且浏览器支持，会用复用连接
  - host http访问使用的域名
  - if-modified-since 上次访问时的更改时间，如果服务器端认为此后没有更新，则会返回304
  - if-none-match 上次访问的etag，通常是页面的信息摘要
  - cookie 客户端缓存的cookie 字符串
+ response-header: 
  - cache-control 缓存控制 用于通知各级缓存保存的时间
  - content-encoding 内容编码 通常是 gzip
  - content-type 内容类型，所有请求网页的都是 text/html
  - expires 过期时间，用于判断下次请求是否要到服务器端取回页面
  - keep-alive 保持连接不断时需要的一些信息，如 timeout，max
  - last-modifiled 上次修改时间
  - set-cookie 设置cookie
+ response-body
  - application/json
  - application/x-www-form-ulencoded
  - multipart/form-data
  - text/html

## 41.Vue页面的优化加载
component:()=>import('../components/Home.vue'),meta:{keepAlive:true,title:'首页'}}来动态加载组件路由

## 42.前端鉴权
  1. HTTP Basic Authentication
  - 用户向服务器发请求
  - 服务器返还401
  - 客户端弹出登录页面
  - 客户端将第一步的请求中加入用户名及密码以BASE64加密方式加密
  - 将Authorization字段后的用户信息取出、解密，将解密后的用户名及密码与用户数据库进行比较验证，如正确，服务器则根据请求，将所请求资源发送给客户端
  2. session-cookie 见上文
  3. Token验证
  - 最简单的token组成:uid(用户唯一的身份标识)、time(当前时间的时间戳)、sign(签名，由token的前几位+盐以哈希算法压缩成一定长的十六进制字符串，可以防止恶意第三方拼接token请求服务器)。还可以把不变的参数也放进token，避免多次查库。
  - 储存客户端收到 Token 以后可以把它存储起来，比如放在 Cookie 里或者 Local Storage 里
  - 优点
    + Token 完全由应用管理，所以它可以避开同源策略. (Cookie是不允许垮域访问的,token不存在)
    + Token 可以避免 CSRF 攻击(也是因为不需要cookie了)
    + Token 可以是无状态的，可以在多个服务间共享
    + Token 支持手机端访问(Cookie不支持手机端访问)
  - 特点
    + 使用Token,服务端不需要保存状态
    + 不借助cookie
    + 具有时效性
    + Refresh Token --豚鼠项目
  4. JWT (JSON Web Tokens)
  - JWT 默认是不加密，但也是可以加密的。生成原始 Token 以后，可以用密钥再加密一次。
  - JWT 不加密的情况下，不能将秘密数据写入 JWT。
  - JWT 不仅可以用于认证，也可以用于交换信息。有效使用 JWT，可以降低服务器查询数据库的次数。
  - JWT 的最大缺点是，由于服务器不保存 session 状态，因此无法在使用过程中废止某个 token，或者更改 token的权限。也就是说，一旦 JWT 签发了，在到期之前就会始终有效，除非服务器部署额外的逻辑。
  - JWT 本身包含了认证信息，一旦泄露，任何人都可以获得该令牌的所有权限。为了减少盗用，JWT的有效期应该设置得比较短。 对于一些比较重要的权限，使用时应该再次对用户进行认证。
  - 为了减少盗用，JWT 不应该使用 HTTP 协议明码传输，要使用 HTTPS 协议传输。
    ![img](https://www.wangbase.com/blogimg/asset/201807/bg2018072303.jpg)
  - 缺点解决方案：在payload上添加session_id这样可以将其加入黑名单
  5. Single Sign On --SSO
  - 同域SSO --因为a、b页面在同一个域名底下所以在访问页面时cookie都会发送
  - 同父域 SSO --只需要把cookie的域设置为父域就可以了
  - 跨域 SSO CAS方案

## 43.小程序实现原理解析
  1. 打包 -- nwjs+react，nwjs是什么：简单是说就是node+webkit，node提供给我们本地api能力，
            而webkit提供给我们web能力，两者结合就能让我们使用JS+HTML实现本地应用程序。 
  2. 打包目录
  ![打包目录](https://img-blog.csdn.net/20170326214333007?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQveGlhbmd6aGlob25nOA==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast
  - WAService.js 框架JS库，提供逻辑层基础的API能力 
  - WAWebview.js 框架JS库，提供视图层基础的API能力 
  - WAConsole.js 框架JS库，控制台 
  - app-config.js 小程序完整的配置，包含我们通过app.json里的所有配置，综合了默认配置型 
  - app-service.js 我们自己的JS代码，全部打包到这个文件 
  - page-frame.html 小程序视图的模板文件，所有的页面都使用此加载渲染，且所有的WXML都拆解为JS实现打包到这里 
  - pages 所有的页面，这个不是我们之前的wxml文件了，主要是处理WXSS转换，使用js插入到header区域。
  3. 架构 --微信小程序的框架包含两部分View视图层、App Service逻辑层，View层用来渲染页面结构，AppService层用来逻辑处理、数据请求、接口调用，
    它们在两个进程（两个Webview）里运行。 
    视图层和逻辑层通过系统层的JSBridage进行通信，逻辑层把数据变化通知到视图层，触发视图层页面更新，视图层把触发的事件通知到逻辑层进行业务处理。
  4. 视图实现 --小程序的UI视图和逻辑处理是用多个webview实现的，逻辑处理的JS代码全部加载到一个Webview里面，称之为AppService，整个小程序只有一个，并且整个生命周期常驻内存，而所有的视图（wxml和wxss）都是单独的Webview来承载，称之为AppView。所以一个小程序打开至少就会有2个webview进程，正式因为每个视图都是一个独立的webview进程，考虑到性能消耗，小程序不允许打开超过5个层级的页面，当然同是也是为了体验更好。
  ![实现架构](https://img-blog.csdn.net/20170326215724891?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQveGlhbmd6aGlob25nOA==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
  **微信JSbrige--开发环境为window.postMessage, IOS下为WKWebview的window.webkit.messageHandlers.invokeHandler.postMessage，android下用WeixinJSCore.invokeHandler**--发布订阅者模式

## 44.http请求取消类问题
  1. xhr对象自带的abort方法来取消请求
  ``` javascript
    var currentAjax = null
    function fetchData() {
      currentAjax = $.ajax({
        type: 'GET',
        url: 'http://jsonplaceholder.typicode.com/comments',
        success: function (res) {
          console.log(res)
        },
        error: function (err) {
          console.log("获取失败")
        }
      })
    }
    $('.get-msg').click(fetchData())
    $('.get-msg').click(function () {
      if (currentAjax.readyState !== 4) {   // 如果前一个请求没有结束，就让它结束，并且新起一个请求
        currentAjax.abort()
        fetchData()
      }
    })
  ```
  2. axois-cancelToken
  ``` javascript
  let pending = []
  let cancelToken = axios.CancelToken
  let removePending = (config) => {
    for(let p in pending) {
      if(pending[p].u === config.url + '&' + config.method) {
        pending[p].f()
        pending.splice(p,1)
      }
    }
  }
  axois.interceptors.request.use(config => {
    removePending(config)
    config.cancelToken = new cancelToken(c => {
      pending.push({u: config.url + '&' + config.method,f: c})
    })
    return config
  })
  axois.interceptors.response.use(res => {
    removePending(res.config)
    return res
  })
  ```

## 45.call、apply、bind实现
  ``` javascript
  Function.prototype.myCall = function(target) { //call/apply都可以用这一套代码
    target = target || window
    let fn = new Symblo(target)
    target[fn] = this
    let args = [...arguments].slice(1)
    console.log(args)
    target.fn(...args)
    delete target.fn
  }

  Function.prototype.myBind = function(target) {
    let func = this
    let args = [...arguments].slice(1)
    return function() {
      return func.apply(target,args)
    }
  }
  ```
## 46.HTMLCollection与NodeList对象
  1. HTMLCollection
    + like document.image这类的都是返还这个
    + 一定是动态的
    + 有nameItem()方法，可以返回集合中name属性和id属性值得元素
    + 只能是Element节点
  2. NodeList对象
    + like document.getElementById('')这类的都是返还这个
    + 可以动态可以静态
## 47.运算符
  1. ~运算符表示对数字按位取反
  2. ~~它代表双非按位取反运算符，如果你想使用比Math.floor()更快的方法，那就是它了。需要注意，对于正数，它向下取整；对于负数，向上取整；非数字取值为0
  3. +运算符
    - 将字符串转换成数字
    - +function() {}()，等效于(function(){})()
  4. &运算符，用于逻辑与操作
    - const isOdd = num => !!(num & 1) //判断奇偶数，末位是否能为1
## 48.http请求在服务器上的过程
  - 服务器上有个MVC架构的请求会首先进入到Controller中进行相关的逻辑处理和请求的分发——调用Model层（负责和数据进行交互）数据交互的过程中Model会去读取redis和数据库里面的数据——获取到数据之后叫渲染好的页面通过View层返回给网络
## 49.Nginx实现跨域
  - 在nginx.conf文件下的配置中
  ```
    location /apis { #添加访问目录为/apis的代理配置
			rewrite  ^/apis/(.*)$ /$1 break;
			proxy_pass   http://localhost:82;
    }
  ```
  - 由配置信息可知，我们让nginx监听localhost的80端口，网站A与网站B的访问都是经过localhost的80端口进行访问。

  - 我们特殊配置了一个“/apis”目录的访问，并且对url执行了重写，最后使以“/apis”开头的地址都转到“http://localhost:82”进行处理。

  - rewrite  ^/apis/(.*)$ /$1 break; 代表重写拦截进来的请求，并且只能对域名后边以“/apis”开头的起作用，例如www.a.com/apis/msg?x=1重写。只对/apis重写。rewrite后面的参数是一个简单的正则 ^/apis/(.*)$ ,$1代表正则中的第一个(),$2代表第二个()的值,以此类推。break代表匹配一个之后停止匹配。

  - “http://localhost:82/api/values” -> “/apis/api/values” --访问地址的改变

  - ps:jsonp中后端需要做的是将返还的请求包裹上cb函数名--即p的含义
## 50.PWA 渐进式网页应用
- 常见web应用缺点
  - 在 pc 上是没有缓存的，打开页面的时去请求数据。
  - 没有像 app 一样的小图标放在桌面，一点开就进入了应用，而是通过打开浏览器输入网址，
  - 不能像 app 一样给用户推送消息，像微博会跟你推送说有谁评论了你的微博之类的功能。
- 实现--cacheStorage提供了一个ServiceWorker类型的工作者在window范围可以访问的所有命名缓存的主目录, 并维护字符串的映射名称到相应的 Cache 对象。 主要方法包括：
![API](https://user-gold-cdn.xitu.io/2018/3/6/161fb4eccdc2700f?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
- ServiceWorker 相当于浏览器和网络之间的代理服务器，可以拦截网络请求，做一些你可能需要的处理(请求资源从缓存中获取等)
```javascript
// 注册serviceWorker
if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register(sw.js) // 注册sw.js 文件中变成的服务对象，返回注册成功的对象
	.then(function(swReg){
          swRegistration = swReg;
     }).catch(function(error) {
          console.error('Service Worker Error', error);
     });
}
// sw.js 用来记录缓存文件
'use strict'
let cacheName = 'pwa-demo-assets'; // 缓存名字
let imgCacheName = 'pwa-img';
let filesToCache;
filesToCache = [ // 所需缓存的文件
    '/',
    '/index.html',
    '/scripts/app.js',
    '/assets/imgs/48.png',
    '/assets/imgs/96.png',
    '/assets/imgs/192.png',
    '/dist/js/app.js',
    '/manifest.json'
];

self.addEventListener('install', function(e) {
    e.waitUntil(
	    // 安装服务者时，对需要缓存的文件进行缓存
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(filesToCache);
        })
    );
});


self.addEventListener('fetch', (e) => {
    // 判断地址是不是需要实时去请求，是就继续发送请求
    if (e.request.url.indexOf('/api/400/200') > -1) {
        e.respondWith(
            caches.open(imgCacheName).then(function(cache){
                 return fetch(e.request).then(function (response){
                    cache.put(e.request.url, response.clone()); // 每请求一次缓存更新一次新加载的图片
                    return response;
                });
            })
        );
    } else {
        e.respondWith(
	        // 匹配到缓存资源，就从缓存中返回数据
            caches.match(e.request).then(function (response) {
                return response || fetch(e.request);
            })
        );
    }

});

```
## 51.HTML5 drag API
- ondragstart:源对象开始被拖动
- ondrag:源对象被拖动的过程中
- ondragend:源对象被拖动结束
- ondragenter:目标对象被源对象拖动进入
- ondragover:目标对象被源对象悬浮在上面
- ondragleave:源对象拖动着离开了目标对象
- ondrop:源对象拖动着在目标对象上
- 源对象数据保存：e.data.Transfer.setData(k,v)//k-v必须都是string类型 ondragstart(e)
- 目标对象获取数据：e.data.Transfer.getData(k,v)  // ondrop(e)

## 52.函数柯里化
``` javascript
function curry(fn, args) {
    let length = fn.length;
    let args = args || [];
    return function(){
        let newArgs = [args,...arguments]
        if(newArgs.length < length){
            return curry.call(this,fn,newArgs);
        }else{
            return fn.apply(this,newArgs);
        }
    }
}
```
### 应用
- 延迟执行 --不断地进行柯里化，累积传入的参数，最后执行
- 固定易变因素，like bind()

## 53.箭头函数
1. this指向规则
  - 本身没有this因为其没有prototype
  - 其this指向是继承其外层第一个有this指向的地方（被继承的this指向改变，箭头函数的指向也会改变）
  - 不能使用call、bind、apply来改变this指向
2. arguments
  - 如果箭头函数的this指向window(全局对象)使用arguments会报错，未声明arguments
  - 箭头函数的this指向普通函数时,它的argumens继承于该普通函数
3. 箭头函数没有constructor所以不能new一个新对象

## IndexDB
1. 优点
- 基于 JavaScript 对象的键值对存储，简单易用。
- 异步 API。这点对前端来说非常重要，意味着访问数据库不会阻塞调用线程。
- 非常大的存储空间。理论上没有最大值限制，假如超过 50 MB 会需要用户确认请求权限。
- 支持事务，IndexedDB 中任何操作都发生在事务中。
- 支持 Web Workers。同步 API 必须在同 Web Workers 中使用。
- 同源策略，保证安全。
- 还算不错的兼容性

## Web实时推送技术
1. 轮询
- 实现 --在发送请求的函数外面包上一层setInterval
- 优点：实现简单，无需做过多的更改
- 缺点：轮询的间隔过长，会导致用户不能及时接收到更新的数据；轮询的间隔过短，会导致查询请求过多，增加服务器端的负担
2. 长轮询
- 客户端发送HTTP给服务器之后，看有没有新消息，如果没有新消息，就一直等待。当有新消息的时候，才会返回给客户端。在某种程度上减小了网络带宽和CPU利用率等问题。由于http数据包的头部数据量往往很大（通常有400多个字节），但是真正被服务器需要的数据却很少（有时只有10个字节左右），这样的数据包在网络上周期性的传输，难免对网络带宽是一种浪费。
- 实现
  - 在获取到数据的时候再次发送请求
  - 在timeout的时候再次发送请求
- 优点：比 Polling 做了优化，有较好的时效性
- 缺点：保持连接会消耗资源; 服务器没有返回有效数据，程序超时。
3. WebSocket
- 是建立在HTTP基础上的协议，因此连接的发起方仍是客户端，而一旦确立WebSocket通信连接，不论服务器还是客户端，任意一方都可直接向对方发送报文。
- 单个TCP连接提供全双工（双向通信）通信信道的计算机通信协议
- WebSocket API可在用户的浏览器和服务器之间进行双向通信。用户可以向服务器发送消息并接收事件驱动的响应，而无需轮询服务器。 它可以让多个用户连接到同一个实时服务器，并通过API进行通信并立即获得响应。
- HTTP的局限性
  - HTTP是半双工协议，也就是说，在同一时刻数据只能单向流动，客户端向服务器发送请求(单向的)，然后服务器响应请求(单向的)。
  - 服务器不能主动推送数据给浏览器。这就会导致一些高级功能难以实现，诸如聊天室场景就没法实现。
- 优点
  - 支持双向通信，实时性更强
  - 可以发送文本，也可以发送二进制数据
  - 减少通信量：只要建立起WebSocket连接，就希望一直保持连接状态。和HTTP相比，不但每次连接时的总开销减少，而且由于WebSocket的首部信息很小，通信量也相应减少了
- 实现
  - 客户端new一个socket对象，onopen、onmessage、socket.send()
  - 服务端new WebSocketServer，server.on('connection'/'message')

## 网络概述
1. 物理层
- 规定了激活、维持、关闭通信端点之间的机械特性、电气特性、功能特性以及过程特性，为上层协议提供了一个传输数据的物理媒体。 
- 协议数据单元为比特（bit）。 
- 在物理层的互联设备包括：集线器（Hub）、中继器（Repeater）等。
2. 数据链路层
- 它控制网络层与物理层之间的通信，其主要功能是在不可靠的物理介质上提供可靠的传输。该层的作用包括：物理地址寻址、数据的成帧、流量控制、数据的检错、重发等。 
- 协议数据单元为帧（frame）。 
- 在数据链路层的互联设备包括：网桥（Bridge）、交换机（Switch）等。
3. 网络层
- 主要功能是将网络地址翻译成对应的物理地 ，并决定如何将数据从发送方路由到接收方。该层的作用包括：对子网间的数据包进行路由选择，实现拥塞控制、网际互连等功能。 
- 协议数据单元为数据包（packet）。 
- 在网络层的互联设备包括：路由器（Router）等。
- ip协议
4. 传输层
- 第一个端到端，即主机到主机的层次。其主要功能是负责将上层数据分段并提供端到端的、可靠的或不可靠的传输。此外，传输层还要处理端到端的差错控制和流量控制问题。 
- 协议数据单元为数据段（segment）。 
- 传输层协议的代表包括：TCP、UDP、SPX等。
5. 会话层
- 管理主机之间的会话进程，即负责建立、管理、终止进程之间的会话。其主要功能是建立通信链接，保持会话过程通信链接的畅通，利用在数据中插入校验点来同步两个结点之间的对话，决定通信是否被中断以及通信中断时决定从何处重新发送。
6. 表现层
- 应用程序和网络之间的翻译官，负责对上层数据或信息进行变换以保证一个主机应用层信息可以被另一个主机的应用程序理解。表示层的数据转换包括数据的解密和加密、压缩、格式转换等。
7. 应用层
- 负责为操作系统或网络应用程序提供访问网络服务的接口。术语“应用层”并不是指运行在网络上的某个特别应用程序，应用层提供的服务包括文件传输、文件管理以及电子邮件的信息处理。
- 在应用层的互联设备包括：网关（Gateway）等。 
- 文件传输协议FTP（File Transfer Protocol），端口号为21； 
- 超文本传输协议HTTP（HypertextTransfer Protocol），端口号为80； 
- 简单网络管理协议SNMP（SimpleNetwork Management Protocol） 
- 域名服务协议DNS（Domain Name Service） 
- 网络文件系统NFS（Network File System）

## 异步script
1. async
- 规定一旦脚本可用，则会异步执行。
- async 属性仅适用于外部脚本（只有在使用 src 属性时）。
- 脚本相对于页面的其余部分异步地执行（当页面继续进行解析时，脚本将被执行）
- 不会阻塞DOM的渲染
2. defer --只有ie支持
- 脚本将在页面完成解析时执行
- 不会阻塞DOM的渲染
3. 啥都不使用
- 在浏览器继续解析页面之前，立即读取并执行脚本

## MVVM
1. VM做了什么
- 从 M 到 V 的映射（Data Binding），这样可以大量节省你人肉来 update View 的代码
- 从 V 到 M 的事件监听（DOM Listeners），这样你的 Model 会随着 View 触发事件而改变

## 输出index
```javascript
for (var i = 0; i< 10; i++){
   setTimeout((i) => {
   	  console.log(i);
   }, 1000,i)
}
for (var i = 0; i< 10; i++){
  ((i) => {
    setTimeout(() => {
      console.log(i);
    }, 1000)
 })(i)
}
for (let i = 0; i< 10; i++){
  setTimeout(() => {
    console.log(i);
  }, 1000)
}
```

## inline 和 inline-block 的区别
- inline 只能设置左右 margin、padding, 不能设置 width 和 height
- inline-block 生成一个块级别框，但是框的行为跟内联元素一样

## 计算属性和 watch 的区别
计算属性是自动监听依赖值的变化，从而动态返回内容，监听是一个过程，在监听的值变化时，可以触发一个回调，并做一些事情。
所以区别来源于用法，只是需要动态值，那就用计算属性；需要知道值的改变后执行业务逻辑，才用 watch，用反或混用虽然可行，但都是不正确的用法。
说出一下区别会加分
- computed 是一个对象时，它有哪些选项？
- computed 和 methods 有什么区别？
- computed 是否能依赖其它组件的数据？
- watch 是一个对象时，它有哪些选项？
1. 有get和set两个选项
2. methods是一个方法，它可以接受参数，而computed不能，computed是可以缓存的，methods不会。
3. computed可以依赖其他computed，甚至是其他组件的data
4. watch 配置
  - handlerdeep 是否深度
  - immeditate 是否立即执行

## nextTick()
在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后，立即使用这个回调函数，获取更新后的 DOM。

## 三栏布局
- 水平三栏布局
``` html
// 1.浮动布局/BFC --没有办法优先加载内容模块
<!DOCTYPE html>
<html lang="en">
<head>
    <style>
      .left {
          float: left;
          height: 200px;
          width: 100px;
          margin-right: 20px;
          background-color: red;
      }
      .right {
          width: 200px;
          height: 200px;
          float: right;
          margin-left: 20px;
          background-color: blue;
      }	
      .main {
          height: 200px;
          overflow: hidden; // margin-left: 120px; margin-right: 220px;
          background-color: green;
      }
    </style>
</head>
<body>
    <div class="container">
        <div class="left"></div>
        <div class="right"></div>
        <div class="main"></div>
    </div>
</body>
</html>

// 圣杯布局和双飞翼布局基本上是一致的，都是两边固定宽度，中间自适应的三栏布局，其中，中间栏放到文档流前面，保证先行渲染。解决方案大体相同，都是三栏全部float:left浮动，区别在于解决中间栏div的内容不被遮挡上，圣杯布局是中间栏在添加相对定位，并配合left和right属性，效果上表现为三栏是单独分开的（如果可以看到空隙的话），而双飞翼布局是在中间栏的div中嵌套一个div，内容写在嵌套的div里，然后对嵌套的div设置margin-left和margin-right，效果上表现为左右两栏在中间栏的上面，中间栏还是100%宽度，只不过中间栏的内容通过margin的值显示在中间。

// 双飞翼布局
<!DOCTYPE html>
<html lang="en">
<head>
    <style>
        .content {
  	    float: left;
  	    width: 100%;
        }
        .main {
  	    height: 200px;
  	    margin-left: 110px;
  	    margin-right: 220px;
  	    background-color: green;
        }
	.left {
	    float: left;
	    height: 200px;
	    width: 100px;
	    margin-left: -100%;
	    background-color: red;
	}
	.right {
	    width: 200px;
	    height: 200px;
	    float: right;
	    margin-left: -200px;
	    background-color: blue;
	}	
    </style>
</head>
<body>
    <div class="content">
        <div class="main"></div>
    </div>
    <div class="left"></div>
    <div class="right"></div>
</body>
</html>

// 圣杯布局
<!DOCTYPE html>
<html lang="en">
<head>
    <style>
	.container {
	    margin-left: 120px;
	    margin-right: 220px;
	}
	.main {
	    float: left;
	    width: 100%;
	    height: 300px;
	    background-color: red;
	}
	.left {
	    float: left;
	    width: 100px;
	    height: 300px;
	    margin-left: -100%;
	    position: relative;
	    left: -120px;
	    background-color: blue;
	}
	.right {
	    float: left;
	    width: 200px;
	    height: 300px;
	    margin-left: -200px;
	    position: relative;
	    right: -220px;
	    background-color: green;
	}
    </style>
</head>
<body>
    <div class="container">
      <div class="main"></div>
      <div class="left"></div>
      <div class="right"></div>
    </div>
</body>
</html>
// 相对、绝对布局
<!DOCTYPE html>
<html lang="en">
<head>
    <style>
	.container {
	    position: relative;
	}
	.main {
	    height: 400px;
	    margin: 0 120px;
	    background-color: green;
	}
	.left {
	    position: absolute;
	    width: 100px;
	    height: 300px;
	    left: 0;
	    top: 0;
	    background-color: red;
	}
	.right {
	    position: absolute;
	    width: 100px;
	    height: 300px;
	    background-color: blue;
            right: 0;
	    top: 0;
	}
    </style>
</head>
<body>
    <div class="container">
        <div class="main"></div>
	<div class="left"></div>
	<div class="right"></div>
    </div>
</body>
</html>
```

## 判断对象是否为空
1. 对象中的symbol属性获取 getOwnPropertySymbols --其length !== 0 则false
2. 判断对象中有没有正常的属性 --forin、Object.keys()、getOwnPropertyNames、JSON.stringify() === '{}'