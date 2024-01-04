# 代理模式
> 不直接访问对象，而是通过代理进行访问。
- 代理可以进行请求过滤，控制权限。
- 代理还可以整合多个请求，等合适的时机再一次性处理。
```js
//本例中以xiaoming送花给A为例，先送给B，B等A心情好了之后在代送给A
var Flower = function (name) {
    this.name = name
}
var xiaoming = {
    sendFlower: function (target, flower) {
        target.receiveFlower(flower);
        console.log('xiaoming send a flower:', flower)
    }
}

var B = {
    receiveFlower: function (flower) {
        A.listenGoodMood(function () {
            A.receiveFlower(flower);
        })
    }
}

var A = {
    receiveFlower: function (flower) {
        console.log('received flower:', flower)
    },
    listenGoodMood: function (fn) {
        setTimeout(function () {
            fn()
        }, 1000)
    }
}

xiaoming.sendFlower(B, new Flower('丁香花'))
```
---

代理的分类：
- 保护代理
- 虚拟代理
- 缓存代理
- 防火墙代理
- 远程代理
- 智能引用代理
- 写时复制代理 