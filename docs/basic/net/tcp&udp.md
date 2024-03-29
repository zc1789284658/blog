# TCP UDP

## TCP流程
### tcp 三次握手：确认双方收发信息能力的过程

    a->b    b:知道a能[发]，知道自己能[收]
    b->a    a:知道自己能[收发]，知道b能[收发]
    a->b    b:知道自己能[收发]，知道a能[收发],开始进行数据传输

### tcp 四次挥手：确认可以挂断的过程

    a->b    我要挂断
    b->a    可能有残留数据，再发一会
    b->a    发完了可以挂断了
    a->b    挂了，别回


## TCP与UDP基本区别

1. 基于连接与无连接
2. TCP要求系统资源较多，UDP较少； 
3. UDP程序结构较简单 
4. 流模式（TCP）与数据报模式(UDP); 
5. TCP保证数据正确性，UDP可能丢包 
6. TCP保证数据顺序，UDP不保证 


## TCP应用场景
当对网络通信质量有要求时，比如：整个数据要准确无误的传递给对方，这往往对于一些要求可靠的应用，比如HTTP,HTTPS,FTP等传输文件的协议，POP,SMTP等邮件的传输协议。常见使用TCP协议的应用： 
1. 浏览器使用的：HHTP 
2. FlashFXP:FTP 
3. Outlook:POP，SMTP 
4. QQ文件传输


## UDP应用场景

1. 面向数据报方式
2. 网络数据大多为短消息 
3. 拥有大量Client
4. 对数据安全性无特殊要求
5. 网络负担非常重，但对响应速度要求高
日常生活中常见使用UDP协议： 
1. QQ语音 
2. QQ视频 
3. TFTP

## 具体编程时的区别

1. socket()的参数不同 
2. UDP Server不需要调用listen和accept 
3. UDP收发数据用sendto/recvfrom函数 
4. TCP：地址信息在connect/accept时确定 
5. UDP：在sendto/recvfrom函数中每次均 需指定地址信息 
6. UDP：shutdown函数无效
 

## 编程区别

- 通常我们在说到网络编程时默认是指TCP编程，即用前面提到的socket函数创建一个socket用于TCP通讯，函数参数我们通常填为SOCK_STREAM。即socket(PF_INET, SOCK_STREAM, 0)，这表示建立一个socket用于流式网络通讯。 

- SOCK_STREAM这种的特点是面向连接的，即每次收发数据之前必须通过connect建立连接，也是双向的，即任何一方都可以收发数据，协议本身提供了一些保障机制保证它是可靠的. 有序的，即每个包按照发送的顺序到达接收方。 

- 而SOCK_DGRAM这种是User Datagram Protocol协议的网络通讯，它是无连接的，不可靠的，因为通讯双方发送数据后不知道对方是否已经收到数据，是否正常收到数据。任何一方建立一个socket以后就可以用sendto发送数据，也可以用recvfrom接收数据。根本不关心对方是否存在，是否发送了数据。它的特点是通讯速度比较快。大家都知道TCP是要经过三次握手的，而UDP没有。 


## 基于上述不同，UDP和TCP编程步骤也有些不同，如下

### TCP
 
- __TCP编程的服务器端一般步骤是：__

1. 创建一个socket，用函数socket()； 
2. 设置socket属性，用函数setsockopt(); * 可选 
3. 绑定IP地址. 端口等信息到socket上，用函数bind(); 
4. 开启监听，用函数listen()； 
5. 接收客户端上来的连接，用函数accept()； 
6. 收发数据，用函数send()和recv()，或者read()和write(); 
7. 关闭网络连接； 
8. 关闭监听； 

- __TCP编程的客户端一般步骤是：__ 
1. 创建一个socket，用函数socket()； 
2. 设置socket属性，用函数setsockopt();* 可选 
3. 绑定IP地址. 端口等信息到socket上，用函数bind();* 可选 
4. 设置要连接的对方的IP地址和端口等属性； 
5. 连接服务器，用函数connect()； 
6. 收发数据，用函数send()和recv()，或者read()和write(); 
7. 关闭网络连接；

### UDP
与之对应的UDP编程步骤要简单许多，分别如下： 
- __UDP编程的服务器端一般步骤是：__ 
1. 创建一个socket，用函数socket()； 
2. 设置socket属性，用函数setsockopt();* 可选 
3. 绑定IP地址. 端口等信息到socket上，用函数bind(); 
4. 循环接收数据，用函数recvfrom(); 
5. 关闭网络连接； 

- __UDP编程的客户端一般步骤是：__ 
1. 创建一个socket，用函数socket()； 
2. 设置socket属性，用函数setsockopt();* 可选 
3. 绑定IP地址. 端口等信息到socket上，用函数bind();* 可选 
4. 设置对方的IP地址和端口等属性; 
5. 发送数据，用函数sendto(); 
6. 关闭网络连接；

> TCP和UDP是OSI模型中的运输层中的协议。TCP提供可靠的通信传输，而UDP则常被用于让广播和细节控制交给应用的通信传输。


## UDP补充

- UDP不提供复杂的控制机制，利用IP提供面向无连接的通信服务。
- 并且它是将应用程序发来的数据在收到的那一刻，立刻按照原样发送到网络上的一种机制。
- 即使是出现网络拥堵的情况下，UDP也无法进行流量控制等避免网络拥塞的行为。
- 此外，传输途中如果出现了丢包，UDO也不负责重发。
- 甚至当出现包的到达顺序乱掉时也没有纠正的功能。
- 如果需要这些细节控制，那么不得不交给由采用UDO的应用程序去处理。
- 换句话说，UDP将部分控制转移到应用程序去处理，自己却只提供作为传输层协议的最基本功能。
- UDP有点类似于用户说什么听什么的机制，但是需要用户充分考虑好上层协议类型并制作相应的应用程序。


## TCP补充

- TCP充分实现了数据传输时各种控制功能，可以进行`丢包的重发控制`，还可以对次序乱掉的分包进行`顺序控制`。而这些在`UDP中都没有`。
- 此外，TCP作为一种面向有连接的协议，只有在`确认通信对端存在时`才会发送数据，从而可以控制通信流量的浪费。
- TCP通过检验和. 序列号. 确认应答. 重发控制. 连接管理以及窗口控制等机制实现可靠性传输。


## TCP与UDP区别总结

1. `TCP面向连接`（如打电话要先拨号建立连接）;`UDP是无连接的`，即发送数据之前不需要建立连接
2. `TCP提供可靠的服务`。也就是说，通过TCP连接传送的数据，无差错，不丢失，不重复，且按序到达；UDP尽最大努力交付，即不保证可靠交付
3. 每一条TCP连接只能是`点到点`的;UDP支持`一对一，一对多，多对一和多对多`的交互通信
4. TCP首部开销`20字节`;UDP的首部开销小，只有`8个字节`
5. TCP的逻辑通信信道是`全双工的可靠信道`，UDP则是`不可靠信道`
6.  TCP`面向字节流`，实际上是TCP把数据看成一连串无结构的字节流; UDP是`面向报文`的UDP没有拥塞控制，因此网络出现拥塞不会使源主机的发送速率降低（对实时应用很有用，如IP电话，实时视频会议等）


## 网络攻击

> 由于`TCP`三次握手过程中，服务器会向客户端发起确认请求。并且由于有重试机制，未经过特殊处理时（网关/增加最大半连接/缩短超时时间/SynAttackProtect保护机制/SYN cookies技术等），如果客户端迟迟不进行响应，那么服务器则会一致对客户端进行重试，这属于DDOS中的SYN-Flood。

- DOS（Denial Of Service）：来单挑，看谁性能好
- DDOS（Distributed Denial Of Service）：控制一堆‘肉鸡’发起DOS攻击
- DRDOS（Distributed Reflection Of Service）：伪装成被害者，往其他机器上发起请求，此时其他机器会响应到被害者身上。

- 黑客向广播地址发送请求包。全部的计算机得到请求后，却不会把回应发到黑客那里，而是发到被攻击主机。这是由于黑客冒充了被攻击主机。黑客发送请求包所用的软件是能够伪造源地址的。接到伪造数据包的主机会依据源地址把回应发出去，这当然就是被攻击主机的地址。黑客同一时候还会把发送请求包的时间间隔减小，这样在短时间能发出大量的请求包，使被攻击主机接到从被欺骗计算机那里传来的洪水般的回应，就像遭到了DDoS攻击导致系统崩溃。骇客借助了网络中全部计算机来攻击受害者，而不须要事先去占据这些被欺骗的主机，这就是Smurf攻击。
- DRDoS攻击正是这个原理，黑客相同利用特殊的发包工具，首先把伪造了源地址的SYN连接请求包发送到那些被欺骗的计算机上，依据TCP三次握手的规则，这些计算机会向源IP发出SYN+ACK或RST包来响应这个请求。同Smurf攻击一样。黑客所发送的请求包的源IP地址是被攻击主机的地址，这样受欺骗的主机就都会把回应发到被攻击主机处，造成被攻击主机忙于处理这些回应而瘫痪。