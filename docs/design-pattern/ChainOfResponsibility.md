---
title: 职责链模式
date: 2019-06-25
tags: [js]
categories: [设计模式]
---
# 职责链模式
目录
- [定义](#define)
- [场景](#scene)
- [代码案例](#codeCase)
    - [不使用职责链](#unuse)
    - [使用职责链](#use)
    - [职责链优化](#optimize)

---

<span id='define'/>

### 1.定义

> 职责链模式的定义是：使多个对象都有机会处理请求，从而避免请求的发送者到接收者之间的耦合关系，将这些对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它为止。

---

<span id='scene'/>

### 2.场景
1. 上公交车时，人太多，无法直接将票钱传递到售票员手中，此时需要通过其他乘客进行传递
2. 传递小纸条

---

<span id='codeCase'/>

### 3.代码案例

> 场景：商城打折，普通用户不打折，会员打95折，超级会员打8折，

<span id='codeCase'/>

3.1 __不使用职责链的代码__
```js
var orderRate = function(type){
    if(type===0){
        console.log('非会员')
        return 1
    }else if(type ===1 ){
        console.log('普通会员')
        return 0.95
    }else if(type ===2){
        console.log('超级会员')
        return 0.8
    }
}

orderRate(0);
orderRate(1);
orderRate(2);
```

<span id='use'/>

3.2 __使用职责链重构代码__
```js
var SuperVipRate=(type)=>{
    if(type === 2){
        console.log("超级会员")
        return 0.8
    }else{
        return VipRate(type)
    }
}
var VipRate=(type)=>{
    if(type === 1){
        console.log("普通会员")
        return 0.95
    }else{
        return NotVipRate(type)
    }
}

var NotVipRate=(type)=>{
    console.log("普通用户")
    return 1
}

SuperVipRate(2)
SuperVipRate(1)
SuperVipRate(0)
```

<span id='optimize'/>

3.3 __优化职责链__
> 上述职责链模式代码未免耦合性太大，进行解耦
```js
/*超级会员逻辑*/
var SuperVipRate=(type)=>{
    if(type === 2){
        console.log("超级会员")
        return 0.8
    }else{
        return false
    }
}

/*普通逻辑*/
var VipRate=(type)=>{
    if(type === 1){
        console.log("普通会员")
        return 0.95
    }else{
        return false
    }
}

/*普通用户逻辑*/
var NotVipRate=(type)=>{
    console.log("普通用户")
    return 1
}

/*职责链原型*/
var Chain = function(fn){
    this.fn = fn
}
Chain.prototype.setNext=function(next){
    this.next = next
}
Chain.prototype.run = function(arg){
    if(!this.fn(arg)){
        this.next.run(arg)
    }
}

/*创建职责链节点*/
var Chain1= new Chain(SuperVipRate);
var Chain2= new Chain(VipRate);
var Chain3= new Chain(NotVipRate);

/*建立节点之间的关系*/
Chain1.setNext(Chain2)
Chain2.setNext(Chain3)

/*职责链进行运作*/
Chain1.run(2);      //超级会员
Chain1.run(1);      //普通会员
Chain1.run(0);      //普通用户

```

---

<span id='aop'/>

### 4.使用AOP实现职责链模式
```js
Function.prototype.after = function(fn){
    var self = this;
    return function(){
        var ret = self.apply(this,arguments);
        if(!ret){
            return fn.apply(this,arguments)
        }
        return ret
    }
}
var AopChain = SuperVipRate.after(VipRate).after(NotVipRate);
AopChain(2)     //超级会员
AopChain(1)     //普通会员
AopChain(0)     //普通用户
```

---

### 5.AOP实现装饰者模式 / AOP实现职责链模式 的区别
- [AOP实现装饰者模式](./Decorator.md/#aop)：
> 在不改变已有函数内部的情况下**添加一些新的功能**，你可以想象一下同心圆，你每调用一次after，就相当于给你的圆外面又加了一个圆来包裹住它。**注意它们是包含关系**

- AOP实现职责链模式：
> 在函数执行之后**确定是否执行下一个函数**，你每次调用after，都相当于在已有函数之后添加一个函数，至于是否执行后面这个函数，取决于前一个函数的返回值。**注意它们是链式关系**

