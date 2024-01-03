---
title: BLOB URL / DATA URI / 
date: 2019-06-25
tags: [js]
categories: [前端,原生js]
---

# BLOB URL / DATA URI / 

## BLOB URL
在bilibili网站等网址查看视频地址时，发现一个没见过的玩意，src是一个blob
```js
<video preload="auto" src="blob:https://www.bilibili.com/63fda528-f30f-403e-a84a-91c63ee6ec19"></video>
```
Blob URL / Object URL是一种伪协议，允许Blob和File对象用作图像，下载二进制数据链接等的URL源。是html5中blob对象在赋给video标签后生成的一串标记，blob对象对象包含的数据，浏览器内部会解析；用于将二进制数据直接加载到浏览器内存中，

### 使用input将文件二进制流转为ObjectURL
可以将文件转为url连接进行播放，如<!--[测试页面](./blob.html)-->[测试页面](https://github.com/zc1789284658/Code-Note/edit/master/h5/blob.html)中,就将文件框中的视频转为ObjectUrl

```js
$('#video2').src = URL.createObjectURL($('#file').files[0])
```
### 获取后台发送的blob后，转ObjectURL
```js
//创建XMLHttpRequest对象
var xhr = new XMLHttpRequest();
//配置请求方式、请求地址以及是否同步
xhr.open('POST', './play', true);
//设置请求结果类型为blob
xhr.responseType = 'blob';
//请求成功回调函数
xhr.onload = function(e) {
    if (this.status == 200) {//请求成功
        //获取blob对象
        var blob = this.response;
        //获取blob对象地址，并把值赋给容器
        $("#sound").attr("src", URL.createObjectURL(blob));
    }
};
xhr.send();
```


特点：
- Blob是纯粹的二进制字节数组，它不像Data-URI那样具有任何重要的开销，这使得它们处理速度越来越快。
- 可以隐藏将源文件转移为浏览器内存，这样的话源文件地址就不必暴露出去，算是爬虫一种对策吧

注意点：

1. 需要将二进制数据封装为BLOB对象，然后使用它URL.createObjectURL()为其生成本地URL：
```js
var blob = new Blob([arrayBufferWithPNG], {type: "image/png"}),
    url = URL.createObjectURL(blob),
    img = new Image();

img.onload = function() {
    URL.revokeObjectURL(this.src);     // clean-up memory(清空blob占用的内存)
    document.body.appendChild(this);   // add image to DOM(添加到dom)
}

img.src = url;                         // can now "stream" the bytes
```
2. 请注意，URL可能会在webkit浏览器中添加前缀，因此请使用：
```js
var url = (URL || webkitURL).createObjectURL(...);
```

---

## DATA URI 

编码为Base-64的字符串的Data-URI也是更好的选择。

问题：
1. Data-URI的问题是每个char在JavaScript中占用两个字节。
2. 最重要的是，由于Base-64编码增加了33％。