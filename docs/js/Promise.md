---
title: Promise
date: 2019-06-25
tags: [js]
categories: [前端,原生js]
---
# Promise

目录
- [.then](#then)
- [手写Promise](#hwpromise)
- [执行顺序](#order)

<!--more-->

<span id='then' />

## .then
### 说明以下四种then的区别
```js
func().then(function () {
    return cb();
});

func().then(function () {
    cb();
});

func().then(cb());

func().then(cb);
```
### 说出以下四种then的输出
```js
let func = function () {
    return new Promise((resolve, reject) => {
        resolve('返回值');
    });
};

let cb = function () {
    return '新的值';
}

func().then(function () {
    return cb();
}).then(resp => {
    console.warn(resp);
    console.warn('1 =========<');
});

func().then(function () {
    cb();
}).then(resp => {
    console.warn(resp);
    console.warn('2 =========<');
});

func().then(cb()).then(resp => {
    console.warn(resp);
    console.warn('3 =========<');
});

func().then(cb).then(resp => {
    console.warn(resp);
    console.warn('4 =========<');
});

/**
新的值
1 =========<
undefined
2 =========<
返回值
3 =========<
新的值
4 =========<
*/
```

### .then的定义

首先要明白Promise中then方法会干什么事情！

#### 官方文档是这样定义的：

    一个 promise 必须提供一个 then 方法以访问其当前值、终值和据因。

    promise 的 then 方法接受两个参数：

    promise.then(onFulfilled, onRejected) Todo:这里只介绍onFulfilled，所以删除了关于onRejected的规范定义

    onFulfilled 和 onRejected 都是可选参数。

    如果 onFulfilled 不是函数，其必须被忽略
    如果 onFulfilled 是函数：

    当 promise 执行结束后其必须被调用，其第一个参数为 promise 的终值
    在 promise 执行结束前其不可被调用
    其调用次数不可超过一次

#### 用通(ren)俗（hua）的话来说：
    then方法提供一个供自定义的回调函数，若传入非函数，则会忽略当前then方法。

    回调函数中会把上一个then中返回的值当做参数值供当前then方法调用。

    then方法执行完毕后需要返回一个新的值给下一个then调用（没有返回值默认使用undefined）。

    每个then只可能使用前一个then的返回值。

#### 直观的图
![image](https://raw.githubusercontent.com/zc1789284658/Code-Note/master/js/image/then.png)

#### 有了上面的定义我们带着三个疑问来回答问题：
1. 上一个then中传入了回调函数吗？
2. 上一个then中提供了返回值吗?
3. 若上一个then中若提供了返回值，返回了什么？

#### 执行第一个方法:
```js
func().then(function () {
    return cb();        <!--重点，函数，有返回值-->
}).then(resp => {
    console.warn(resp);
    console.warn('1 =========<');
});
```
> 显而易见，是`传入了回调函数的`,回调函数中`把cb执行后的返回值当做then中的返回值`，所以输出了“新的值”；

####  执行第二个方法:

```js
func().then(function () {
    cb();           <!--重点，函数，无返回值-->
}).then(resp => {
    console.warn(resp);
    console.warn('2 =========<');
});
```
> then回调方法，只是执行了cb方法，`并没有return值`，定义中讲过若then没有返回值，`提供给下一个then使用的参数就是undefined`，所以打印出来的是undefined;

#### 执行第三个方法:

```js
func().then(
    cb()        <!--重点，非函数-->
).then(resp => {
    console.warn(resp);
    console.warn('3 =========<');
});
```

> then中cb()执行后返回的`并不是一个函数`，在Promise规范中会`自动忽略调当前then`，所以会把func中的返回值`供下一个then`使用，输出了“返回值”

#### 执行第四个方法:

```js
func().then(
    cb          <!--重点,函数，有返回值-->
).then(resp => {
    console.warn(resp);
    console.warn('4 =========<');
});
```
> 第一个方法在回调内部返回cb执行后的值，第四个方法则直接把cb当做回调，第一个方法与第四个方法异曲同工之妙，所以也输出了“新的值”。

---

<span id='hwpromise'/>

## [手写Promise(部分功能)](./Promise.js)

- [手动实现Promise.pdf](https://github.com/zc1789284658/Code-Note/edit/master/js/pdf/手动实现Promise.pdf)

- [手动实现Promise.md](./Promise_hw.md)

---

<span id='order'/>

## 执行顺序

```js

//macroTask
setTimeout(function(){
    console.log('定时器开始啦')
});

new Promise(function(resolve){
    //normalTask
    console.log('马上执行for循环啦');
    for(var i = 0; i < 10000; i++){
        i == 99 && resolve();
		i>99 &&console.log('n')
    }
}).then(function(){
    
    //microTask
    return console.log('执行then函数啦')
});

//normalTask
console.log('代码执行结束');

/*
马上执行for循环啦
9900 * n
代码执行结束
执行then函数啦
undefined
VM37:2 定时器开始啦
*/
```

> normalTasks -> microTasks [FIFO] -> macroTasks [FIFO] x N