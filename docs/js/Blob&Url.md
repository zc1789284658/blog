# Blob & Url

## 拓展
- File​Reader
- MediaSource
- Data URI

## URL.create​ObjectURL()
`URL.createObjectURL()` 静态方法会创建一个 DOMString，其中包含一个表示参数中给出的对象的URL。这个 URL 的生命周期和创建它的窗口中的 document 绑定。这个新的URL 对象表示指定的 File 对象或 Blob 对象。

Note: 此特性在 `Web Worker` 中可用。

注意：此特性在 `Service Worker` 中不可用，因为它有可能导致内存泄漏。

### **内存管理**
在每次调用 `createObjectURL()` 方法时，都会创建一个新的 URL 对象，即使你已经用相同的对象作为参数创建过。当不再需要这些 URL 对象时，每个对象必须通过调用 `URL.revokeObjectURL()` 方法来释放。浏览器会在文档退出的时候自动释放它们，但是为了获得最佳性能和内存使用状况，你应该在安全的时机主动释放掉它们。


## URL.revoke​ObjectURL()
静态方法用来释放一个之前已经存在的、通过调用 `URL.createObjectURL()` 创建的 URL 对象。当你结束使用某个 URL 对象之后，应该通过调用这个方法来让浏览器知道不用在内存中继续保留对这个文件的引用了。

你可以在 sourceopen 被处理之后的任何时候调用 `revokeObjectURL()`。这是因为 `createObjectURL()` 仅仅意味着将一个媒体元素的 `src` 属性关联到一个 `MediaSource` 对象上去。调用`revokeObjectURL()` 使这个潜在的对象回到原来的地方，允许平台在合适的时机进行垃圾收集。

此特性在 [Web Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API) 中可用。

## Blob URL / DATA URI / 

### Blob URL

在bilibili网站等网址查看视频地址时，发现src是一个blob

```js
<video preload="auto" src="blob:https://www.bilibili.com/63fda528-f30f-403e-a84a-91c63ee6ec19"></video>
```

`Blob URL / Object URL`是一种伪协议，允许Blob和File对象用作图像，下载二进制数据链接等的URL源。是html5中blob对象在赋给video标签后生成的一串标记，blob对象对象包含的数据，浏览器内部会解析；用于将二进制数据直接加载到浏览器内存中，

#### 使用input将文件二进制流转为ObjectURL
可以将文件转为url连接进行播放

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

### Data URI 

编码为Base-64的字符串的Data-URI也是更好的选择。

问题：
1. Data-URI的问题是每个char在JavaScript中占用两个字节。
2. 最重要的是，由于Base-64编码增加了33％。