---
title: HTTP
date: 2019-06-25
tags: [net]
categories: [后端]
---
# HTTP
## http状态码
    1xx         信息
    2xx         成功
    3xx         重定向
        301     moved permanently   永久重定向
        302     moved temprarily   临时重定向
        304     not modified        未修改，请使用客户端缓存文件
    4xx         客户端错误
    5xx         服务端错误      
    6xx+        自定义状态码
    
    成功：2xx 304

<!--more-->

## 重定向作用
    1.对不同端进行不同url的跳转
        如PC ->www.taobao.com , 手机-> m.taobao.com
    2.做各种判断

# jsonp
- 本端获取请求，远端根据请求不同返回不同js文件，本端执行js文件
- 需要远端进行设置，以便返回的数据可以自动执行代码

- 本端    
    ```
    var script = document.createElement("script");
    script.src = "https://api.douban.com/v2/book/search?q=javascript&count=1&callback=handleResponse";

    document.body.insertBefore(script, document.body.firstChild);   
    ```
- 服务端  
    ```
    return ';(()=>{xxxxx})();'
    ```
- 缺点：
* 1.只能get不能post
* 2.安全问题
* 3.跨域session问题
* 4.本质：script标签的免跨域，以及后台返回时返回一段立即执行的函数

# http option请求
- 1.获取服务器支持的http请求类型
- 2.预检请求（Preflighted Requests）
    这是CORS中一种透明服务器验证机制，需要向跨域的资源发送一个OPTION请求，验证实际发送的请求是否是安全的

# XHR
```js
    //1.创建对象
    let xhr = new XMLHttpRequest();
    //2.建立连接（设置请求类型，请求地址，http类型，是否异步，true异步， false同步）
    xhr.open('GET','xxxxx',true);       
    //3.发送
    xhr.send()
    //4.接收
    xhr.onreadystatechange=(){

    }
```
## xhr参数
- readystate

- status
- statusText

- timeout

- upload

- withCredientials

- response
- responseText
- responseURL
- responseType
- responseXML


- onabort
- onerror
- onload
- onload 
- onloadend
- onloadstart
- onprogress
- onreadystatechange
- ontimeout

## xhr状态码
    xhr.readystate：{
        0:'对象创建完',
        1:'连接完成',
        2:'发送请求完成',
        3:'接受head完成',
        4:'接受body完成',
    }
## xhr中保存有http状态码 
    xhr.status
    const isHttpSuccess=(status){
        return (status >= 200 && status < 300) ||status===304
    }
    isHttpSuccess(xhr.success);

## FormData
```js
    let data = new FormData();
    data.append('name','zhangsan')
    data.append('file',file||new Blob(xxx))
    xhr.send(data);
```