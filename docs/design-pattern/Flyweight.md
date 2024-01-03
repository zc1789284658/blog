---
title: 享元模式
date: 2019-06-25
tags: [js]
categories: [设计模式]
---
# 享元模式
目录：
 - [涵义](#meaning)
 - [案例](#case)
 - [使用经验](#exp)
 - [以微云的上传第一版为反例](#bad)
 - [重新定义Upload对象](#good)
 - [对象池](#pool)

---

<span id='meaning'></span>
> 享元模式是一种用于性能优化的模式（主要考虑内存，而非效率），"fly"在这里是苍蝇的意思，意为蝇量级。享元模式的核心是运用共享技术来有效支持大量细粒度的对象。

如果系统因为创建了大量相似对象而导致内存占用过高，享元模式就非常有用了。

<span id='case'></span>

---

### 案例：
- 连接池
- 缓冲池
- String常量池
- 地图中对象（热点）

---

<span id='exp'></span>
### 使用经验
享元模式要求将对象的属性划分为内部状态与外部状态（状态在这里通常指属性）。享元模式的目标是尽量减少共享对象的数量，关于如何划分内部状态和外部状态，下面几条经验提供了一些指引
- 内部状态存储于对象内部
- 内部状态可以被一些对象分享
- 内部状态独立于具体的场景，通常不会改变
- 外部状态取决于具体的场景，并根据场景而变化，外部状态不能被共享

享元模式是一种用时间换空间的优化模式。

---

<span id='bad'></span>
### 以微云的上传第一版为反例
```js
var id = 0

class Upload {
    constructor(uploadType, fileName, fileSize) {
        this.uploadType = uploadType
        this.fileName = fileName
        this.fileSize = fileSize
    }
    init() {
        this.dom = document.createElement('div')
        this.dom.innerHTML =
            `<span>文件名:${this.fileName},文件大小：${this.fileSize}</span>
            <button class="delFile">删除</button>
            `;
        this.dom.querySelector('.delFile').onclick = () => {
            this.delFile();
        }
    }
    delFile() {
        if (this.fileSize < 3000) {
            return this.dom.parentNode.removeChild(this.dom)
        }
        if (window.confirm(`你确定删除该文件么,${this.fileName}`)) {
            return this.dom.parentNode.removeChild(this.dom)
        }
    }
}

window.startUpload = (uploadType, files) => {
    files.forEach(element => {
        var uploadObj = new upload(uploadType, element.fileName, element.fileSize);
        uploadObj.init()
    });
}

startUpload('plugin', [
    { fileName: '1.txt', fileSize: 1000 }, 
    { fileName: '2.txt', fileSize: 2000 }, 
    { fileName: '3.txt', fileSize: 3000 }, 
    ])
```

上述反例在上传很多文件的情况下，会创建很多upload对象。分析可以发现
- fileName，fileSize是定制化的东西，将它们剥离为外部状态
- 上述处理后init函数也不需要了

---

<span id='good'></span>
### 重新定义Upload对象
```js
class Upload {
    constructor(uploadType) {
        this.uploadType = uploadType
    }
    delFile(id) {
        //上传之外的操作都交给uploadManager进行统一处理
        uploadManager.setExternalState(id, this)
        if (this.fileSize < 3000) {
            return this.dom.parentNode.removeChild(this.dom)
        }
        if (window.confirm(`确定删除此文件么？${this.fileName}`)) {
            return this.dom.parentNode.removeChild(this.dom)
        }
    }
}
var UploadFactory = (function () {
    var createdFlyWeightObjs = {}
    return {
        create(uploadType) {
            if (!createdFlyWeightObjs[uploadType]) {
                createdFlyWeightObjs[uploadType] = new Upload(uploadType)
            }
            return createdFlyWeightObjs[uploadType]
        }
    }
})()

var uploadManager = (function () {
    var uploadDataset = []
    return {
        add(id, uploadType, fileName, fileSize) {
            var flyWeightObj = UploadFactory.create(uploadType)

            var dom = document.createElement('div')
            dom.innerHTML =
                `<span>文件名:${this.fileName},文件大小：${this.fileSize}</span>
            <button class="delFile">删除</button>`;
            dom.querySelector('.delFile').onclick = () => {
                flyWeightObj.delFile(id)
            }
            uploadDataset[id] = {
                fileName,
                fileSize,
                dom
            }
            return flyWeightObj

        },
        setExternalState(id, flyWeightObj) {
            var uploadData = uploadDataset[id]
            for (let i in uploadData) {
                flyWeightObj[i] = uploadData[i]
            }
        }
    }
})()
//触发上传函数
var id = 0
window.startUpload = (uploadType, files) => {
    files.forEach(element => {
        uploadManager.add(++id, uploadType, element.fileName, element.fileSize)
    });
}
```

上面的代码，将Upload对象进行拆分，实现了内部状态和外部状态的分离
- 外部状态：fileName,fileSize,id存储在uploadManager内
- 内部状态：Upload对象只维护uploadType,所以只需要创建几类上传方式即可，不关心具体需要上传的对象,无需大量创建Upload对象

---
<span id='pool'></span>
### 对象池

#### 对象池定义
对象池维护一个装在空闲对象的池子，如果需要对象，不是直接new，而是先从池子里取。如果对象池中没有空闲对象，则创建一个新对象，当取出的对象完成它的职责后，再进入池子等待被下次获取

#### 应用
- HTTP连接池
- 数据库连接池

在web中，对象池使用最多的场景是跟DOM有关的操作，需要思考如何避免频繁的创建和删除DOM

### 通用对象池
```js
var objectPoolFactory =function (createObjFn){
    var pool = []
    return {
        create:function(){
            if(pool.length ===0){
                return createObjFn.apply(this,arguments)
            }else{
                return pool.shift()
            }
        },
        recover:function(obj){
          pool.push(obj)  
        }
    }
}

//例子
var iframeFactory = objectPoolFactory(function(){
    var iframe =document.createElement('iframe')
    document.body.appendChild(iframe)

    iframe.onload=  function(){
        iframe.onload = null    //防止iframe重复加载
        iframeFactory.recover(iframe)   //回收节点
    }
    return iframe
})

var iframe1 = iframeFactory.create()
iframe1.src = 'http://baidu.com'

var iframe2 = iframeFactory.create()
iframe2.src = 'http://google.com'

setTimeout(()=>{
    var iframe3 = iframeFactory.create()
    iframe3.src = 'http://gaode.com'
},3000)
```

对象池可能和缓存有些类似，但是缓存会缓存个性的信息，而对象池只缓存共性的信息，即上面所说的内部状态和外部状态，以上面代码为例，只缓存创建的iframe，但是iframe中的src不进行缓存