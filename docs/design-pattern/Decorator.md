---
title: 装饰器模式
date: 2019-06-25
tags: [js]
categories: [设计模式]
---
# 装饰器模式
目录
- [定义](#define)
- [模拟传统面向对象语言的装饰器模式](#simular)
- [js装饰器](#jsdecorator)
- [用AOP装饰函数](#aop)
    - [在Function原型上添加装饰器函数](#withProto)
    - [不污染Function原型的处理](#withoutProto)
- [ES6/7装饰器](#ES6decorator)
- [应用](#use)
- [装饰器模式和代理模式](#compare)
- [装饰器模式和适配器模式](#diff)

<span id='define'/>

### 1.定义
- 为对象添加新功能，并且不改变原有的结构和功能。
- 装饰器模式将一个对象嵌入另一个对象址中，实际上相当于这个对象被另一个对象包装起来，形成一条包装链，请求随着这条链依次传递到所有的对象，每个对象都有处理这条请求的机会。

<span id='simular'/>

### 2.模拟传统面向对象语言的装饰器模式
```js
class Plane{
    fire(){
        console.log('plane')
    }
}

class MissleDecorator{
    constructor(plane){
        this.plane = plane
    }
    fire(){
        this.plane.fire()
        console.log('missle')
    }
}
class AtomDecorator{
    constructor(plane){
        this.plane = plane
    }
    fire(){
        console.log('Atom')
    }
}

var plane = new Plane()
plane = new MissleDecorator(plane)
plane = new AtomDecorator(plane)

plane.fire()
/**
plane
missle
Atom
*/
```

<span id='jsdecorator' />

### 3.js装饰器
```js
var plane ={
    fire(){
        console.log('plane')
    }
}
var missleDecorator = ()=>{
    console.log('missle')
}
var atomDecorator = ()=>{
    console.log('atom')
}

var fire1 = plane.fire
plane.fire = ()=>{
    fire1()
    missleDecorator()
}

var fire2 = plane.fire
plane.fire = ()=>{
    fire2()
    atomDecorator()
}

plane.fire()
/** 
plane
missle
atom
*/
```
这种方式存在两个问题：
- 装饰链较长时，中间变量多
- this被劫持

<span id='aop'/>

### 4.用AOP装饰函数

<span id='withProto'/>

#### 4.1在Function原型上添加装饰器函数
```js
Function.prototype.before = function(beforefn){
    var __self = this   //保存原函数的引用

    return function(){  //返回包含了原函数和新函数的’代理‘函数
        beforefn.apply(this,arguments)
        return __self.apply(this.arguments)
    }
}
Function.prototype.after = function(afterfn){
    var __self = this   //保存原函数的引用
    
    return function(){  //返回包含了原函数和新函数的’代理‘函数
        var ret =  __self.apply(this.arguments)
        afterfn.apply(this,arguments)
        return ret
    }
}

var fn = ()=>{
    console.log("fn")
}
fn = fn.after(()=>{
    console.log('after')
})
fn = fn.before(()=>{
    console.log('before2')
})
fn = fn.after(()=>{
    console.log('after2')
})
fn()

/**
before2
fn
after
after2*/
```

上面函数对Function的原型进行了处理，如果不习惯，可以进行拆离

<span id='withoutProto'/>

#### 4.2不污染Function原型的处理

主要新增变量用于绑定this

```js
var before = (fn , beforefn)=>{
    return function(){
        beforefn.apply(this,arguments)
        return fn.apply(this,arguments)
    }
}
var after = (fn , afterfn)=>{
    return function(){
        var ret = fn.apply(this,arguments)
        afterfn.apply(this,arguments)
        return ret
    }
}

var a = function(){
    console.log('a')
}

a = after( a ,function(){console.log('after')})
a = before( a , function(){console.log('before')})
a()
```

<span id='ES6decorator'/>

### 5.ES6/7装饰器
- babel插件已支持
- 第三方库：core-decorators已封装常用装饰器
```js
/**
 #下载babel decorator插件
 #.babelrc中添加decorator支持
 $ npm i @babel/core babel-loader @babel/preset-env -D
 $ npm i @babel/preset-es2015 -S
 $ npm i --save-dev @babel/plugin-proposal-decorators
.babelrc  {
    "presets": [
        "@babel/preset-env"
    ],
    "plugins": [
        [
            "@babel/plugin-proposal-decorators",
            {
                "decoratorsBeforeExport": true
            }
        ]
    ]
}
*/
//装饰类，等同于testDec(Demo)
@testDec
class Demo{

}
/** 
装饰方法,本质就是将@testDec下的Demo传进testDec()内，
@param target : 装饰对象
@param name : 装饰对象字面量名
@param descriptor:装饰对象的属性描述符
*/
function testDec(target ,name ,descriptor){
    target.isDec = true
}

console.log(Demo.isDec)//true

```
一个属性描述符是一个记录，由下面属性当中的某些组成的：
- value：该属性的值(仅针对数据属性描述符有效)
- writable：当且仅当属性的值可以被改变时为true。(仅针对数据属性描述有效)
- get：获取该属性的访问器函数（getter）。如果没有访问器， 该值为undefined。(仅针对包含访问器或设置器的属性描述有效)
- set：获取该属性的设置器函数（setter）。 如果没有设置器， 该值为undefined。(仅针对包含访问器或设置器的属性描述有效)
- configurable：当且仅当指定对象的属性描述可以被改变或者属性可被删除时，为true。
- enumerable：当且仅当指定对象的属性可以被枚举出时，为 true。

<span id='use'/>

### 6.应用
- 数据上报
- 统计函数的执行时间
- 动态改变函数参数
- 等等等等

<span id='compare'/>

### 7.装饰器模式和代理模式

装饰器模式和[代理模式](https://github.com/zc1789284658/Code-Note/edit/master/design-pattern/proxy.md)的结构很像
- 这两种模式都描述了怎样为对象提供一定程度上的间接引用，
- 它们的实现部分都保留了对另外一个对象的引用，并且向那个对象发送请求

代理模式和装饰器模式最重要的区别是他们的意图和设计目的：
- 代理模式：当直接访问本体不方便或者不符合需求时，为这个本体提供一个替代者
    - 本体定义了关键功能，而代理提供或拒绝对它的访问，或者在访问前做一些额外的事情。
- 装饰器模式：为对象动态添加行为。
- 代理模式强调一种关系（Proxy和本体之间的关系），这种关系可以静态的表达， 即一开始就可以确定关系。而装饰器模式用于一开始不能确定对象的全部功能时。
- 代理模式通常只有一层代理-本体的引用，而装饰器模式经常会形成一条长长的装饰链

<span id='diff'/>

### 8.装饰器模式和[适配器模式](./Adaptor.md)
- 适配器模式是之前的接口不能用，需要加个适配器进行适配，不添加新功能
- 装饰器模式是原有的结构和功能继续使用，需要新增一些装饰性的东西来完善现有的功能
