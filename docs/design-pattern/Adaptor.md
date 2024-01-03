---
title: 适配器模式
date: 2019-06-25
tags: [js]
categories: [设计模式]
---
# 适配器模式
目录
- [定义](#define)
- [案例](#case)
- [代码](#code)
- [意料之外的情况](#unexpected)
- [小结](#summary)

---

<span id='define'/>

### 1.定义
> 适配器的别名是包装器（wrapper）,这是一个相对简单的模式。在程序开发中有许多这样的场景，当我们试图使用某模块或者接口时，发现格式不符合目前的需求。我们有两种方法:
1. 修改接口
2. 为接口创建适配器，经过适配器把数据格式处理过后，再返回

---

<span id='case'/>

### 2.案例：
- 插头转换器
- USB转接口
- 电源适配器

---

<span id='code'/>

### 3.代码以地图为例，最好的情况如下
```js
var googleMap = {
    show(){
        console.log('render google map')
    }
}
var baiduMap = {
    show(){
        console.log('render baidu map')
    }
}
var renderMap = (map)=>{
    if(map.show instanceof Function){
        map.show()
    }
}

renderMap(baiduMap) //render baidu map'
renderMap(googleMap)//render google map
```

---

<span id='unexpected'/>

### 4.意料之外的情况

> 然而，并不是所有地图都拥有相同的接口，如果此时需要接入高德地图，且高德地图接口中取代show的函数为display函数,那么就需要适配器进行处理

```js
var googleMap = {
    show(){
        console.log('render google map')
    }
}
var baiduMap = {
    show(){
        console.log('render baidu map')
    }
}
//新增高德地图
var gaodeMap = {
    display(){
        console.log('render gaode map')
    }
}
//适配器处理适配高德地图
+var gaodeMapAdaptor ={
+   show(){
+       return  gaodeMap.display()
+   }
+}

renderMap(baiduMap)
renderMap(googleMap)
renderMap(gaodeMapAdaptor)  //对适配器进行处理
```

---

<span id='summary'/>

### 5.小结
- 有一些模式跟适配器模式的结构非常相似，比如[装饰者模式](https://github.com/zc1789284658/Code-Note/edit/master/design-pattern/Decorator.md)、[代理模式](https://github.com/zc1789284658/Code-Note/edit/master/design-pattern/proxy.md)、和[外观模式](https://github.com/zc1789284658/Code-Note/edit/master/design-pattern/Facade.md)。这几种模式都属于**包装模式**，都是由一个对象来包装另一个对象。区别它们的关键仍然是意图
- 适配器模式主要用来解决两个已有接口之间的不匹配问题，它不考虑这些接口是怎样实现的，也不考虑它们将来可能会如何变化。适配器模式不需要改变已有的接口，就能够是它们协同作用
- 装饰者模式和代理模式也不会改变原有对象的接口，但是装饰者模式是为了给对象增加功能。装饰者模式常常形成一条长的装饰链，而适配器模式通常只包装一次。代理模式是为了控制对象的访问，通常也只包装一次
- 外观模式的作用倒是与适配器模式类似，有人把外观模式看成一组对象的适配器，但外观模式最显著的特点是定义了一个新的接口