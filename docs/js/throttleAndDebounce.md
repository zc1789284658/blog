---
title: js 防抖和节流
date: 2019-06-25
tags: [js]
categories: [前端,优化]
---

# js 防抖和节流

本节代码实例主要为防抖和节流

<!--more-->

```js
/**
 * 本节代码实例主要为防抖和节流
 * 防抖(debounce)：抖动时，不执行函数，抖动停止一定事时间后才进行执行
 * 节流 (throttle)：抖动时，按固定的时间间隔执行函数
 */
 //防抖
let debounce =(fn,delay)=>{
    let timer;
    return function(...args){
        timer? clearTimeout(timer):'';
        timer = setTimeout(()=>{
            fn(...args)
        },delay)
    }
}

 //节流
let throttleByTimestamp=(fn,interval)=>{
    let lasttimestamp;
    return (...args)=>{
        if(!lasttimestamp){
            lasttimestamp = Date.now();
            return fn(...args)
        }
        if( Date.now()-lasttimestamp > interval){
            lasttimestamp = Date.now();
            fn(...args)
        }
    }
}

let throttleByTimer=(fn,interval)=>{
    let timer
    return (...args)=>{
        if(!timer){
            timer=setTimeout(()=>{
                timer=null;
                fn(...args);
            },interval)
        }
    }
}

module.exports =  {
    debounce,
    throttleByTimestamp,
    throttleByTimer
}

```