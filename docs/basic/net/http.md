# HTTP


## HTTP的发展

[HTTP的发展](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/Evolution_of_HTTP#%E4%B8%87%E7%BB%B4%E7%BD%91%E7%9A%84%E5%8F%91%E6%98%8E)

- 万维网的发明
- HTTP/0.9——单行协议
- HTTP/1.0——构建可扩展性
- HTTP/1.1——标准化的协议
- 超过 15 年的扩展
- HTTP/2——为了更优异的表现
- 后 HTTP/2 进化
- HTTP/3——基于 QUIC 的 HTTP

## http 状态码

[https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status)

| Code |                               Description |
| ---- | ----------------------------------------: |
| 1xx  |                                      信息 |
| 2xx  |                                      成功 |
| 3xx  |                                    重定向 |
| 301  |              moved permanently 永久重定向 |
| 302  |               moved temprarily 临时重定向 |
| 304  | not modified 未修改，请使用客户端缓存文件 |
| 4xx  |                                客户端错误 |
| 5xx  |                                服务端错误 |
| 6xx  |                            + 自定义状态码 |

成功：2xx 304

### 重定向作用

    1.对不同端进行不同url的跳转
        如PC ->www.taobao.com , 手机-> m.taobao.com
    2.做各种判断

## jsonp

- 本端获取请求，远端根据请求不同返回不同 js 文件，本端执行 js 文件
- 需要远端进行设置，以便返回的数据可以自动执行代码

::: code-group

```js [客户端]
var script = document.createElement("script");
script.src =
  "https://api.douban.com/v2/book/search?q=javascript&count=1&callback=handleResponse";

document.body.insertBefore(script, document.body.firstChild);
```

```js [服务端]

const onRequest = (req: Request)=>{
    return `;(()=>{
        const { callback, count, q } = req;
        return `alert(`your request param is ${callback}, ${count}, ${q}`)`
    })();`;
}
```

:::

### 缺点：

- 1.只能 get 不能 post
- 2.安全问题
- 3.跨域 session 问题
- 4.本质：script 标签的免跨域，以及后台返回时返回一段立即执行的函数

## http option 请求

- 1.获取服务器支持的 http 请求类型
- 2.预检请求（Preflighted Requests）
  这是 CORS 中一种透明服务器验证机制，需要向跨域的资源发送一个 OPTION 请求，验证实际发送的请求是否是安全的

## XHR

```js
//1.创建对象
let xhr = new XMLHttpRequest();
//2.建立连接（设置请求类型，请求地址，http类型，是否异步，true异步， false同步）
xhr.open('GET','xxxxx',true);
//3.发送
xhr.send()
//4.接收
xhr.onreadystatechange=(){}
```

### xhr 参数

[https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)

- `readystate`
- `status`
- `statusText`
- `timeout`
- `upload`
- `withCredientials`
- `response`
- `responseText`
- `responseURL`
- `responseType`
- `responseXML`
- `onabort`
- `onerror`
- `onload`
- `onload`
- `onloadend`
- `onloadstart`
- `onprogress`
- `onreadystatechange`
- `ontimeout`

### xhr 状态码

|值	|状态|	描述|
|--|--|--:|
|0	|UNSENT|	代理被创建，但尚未调用 `open()` 方法。|
|1	|OPENED|	`open()` 方法已经被调用。|
|2	|HEADERS_RECEIVED|	`send()` 方法已经被调用，并且头部和状态已经可获得。|
|3	|LOADING|	下载中；`responseText` 属性已经包含部分数据。|
|4	|DONE|	下载操作已完成。|


### xhr 中保存有 http 状态码

```js
    // xhr.status
    const isHttpSuccess=(status){
        return (status >= 200 && status < 300) ||status===304
    }
    isHttpSuccess(xhr.success);
```

### FormData

```js
let data = new FormData();
data.append("name", "zhangsan");
data.append("file", file || new Blob(xxx));
xhr.send(data);
```
