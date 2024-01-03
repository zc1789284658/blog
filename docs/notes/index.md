---
title: 笔记
date: 2019-06-25
tags: [performance,js]
categories: [前端,优化]
---
# NOTES

## web 性能

<!--more-->

### 1.资源方向

- 图片压缩
- 小图片转 base64 嵌入页面
- 使用 fontCss 或者 svg（个人更习惯 svg）
- 使用 css-spirit 整合图片资源
- 文件 prefetch/preload
  - prefetch : 将来可能会用到，空闲加载
  - preload : 关键资源，优先加载
- 懒加载 ：需要使用时再发请求加载
- css/js 合并压缩：看具体情况，单文件太大也不是好事
- cdn
- 服务器开启 gzip 等压缩算法压缩资源文件
- 请求合并

### 2.js 方向

- 减少递归的使用，尤其是大流程
  - 递归的每一步堆栈信息都会保留，递归的深度太深时，会导致堆栈溢出
  - [使用缓存](#memorize)，但并不是所有递归都可以使用缓存
- 换成迭代,如[使用迭代优化归并排序](#merge)，但是迭代会引入大量循环，酌情使用
- 换成尾递归，然而，并不是所有的 js 解释器都支持尾递归优化
- **所有的递归都是可以优化成栈+循环的，将尾递归优化成栈+循环**。

- 使用事件委托处理
  - 子元素数量很多，并且绑定事件很多时，事件绑定到父元素，
  - 父元素捕获后，根据子元素的属性进行函数处理，推荐绑定到 data-xxx
- js 递归拆分
- js 大循环使用 [Duff's Device](#duff) 进行简化，下面还可优化为 while 循环，一般一次性 8 次

### 3.工具方向
  - tree-shaking（webpack4自带）
  - 首屏分离/骨架屏
  - 懒加载

### 4.框架方向
  - vue : mixin/render/slot/  ->  setup
  - react: mixin/HOC/jsx      ->  hooks






































---

## 代码示例

<h2 id='memorize'>memorize</h2>

```js
function memorizer(fn, cache) {
  cache = cache || {};
  var shell = function(arg) {
    if (!cache.hasOwnProperty(arg)) {
      cache[arg] = fn(shell, arg);
    }
    return cache[arg];
  };
  return shell;
}
```

<h2 id='duff'>duff's device</h2>

```js
function duff(arr, process) {
  var iterations = Math.floor(arr.length / 8),
    startAt = arr.length % 8,
    i = 0;

  do {
    switch (startAt) {
      case 0:
        process(arr[i++]);
      case 7:
        process(arr[i++]);
      case 6:
        process(arr[i++]);
      case 5:
        process(arr[i++]);
      case 4:
        process(arr[i++]);
      case 3:
        process(arr[i++]);
      case 2:
        process(arr[i++]);
      case 1:
        process(arr[i++]);
    }
    startAt = 0;
  } while (iterations--);
}
//test
duff([1, 2, 3, 4, 5, 6, 7, 8, 12], function(e) {
  console.log(e);
});
//$: 1 2 3 4 5 6 7 8 12
```

<h2 id='merge'>merge Sort</h2>

```js
//优化前-------------------------------
function merge(left, right) {
  var result = [];
  while (left.length > 0 && right.length > 0) {
    if (left[0] < right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  return result.concat(left).concat(right);
}

//采用递归实现的归并排序算法
function mergeSort(items) {
  if (items.length == 1) {
    return items;
  }
  var middle = Math.floor(items.length / 2),
    left = items.slice(0, middle),
    right = items.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}

//使用迭代替代递归：引入大量循环-------------------------------
function mergeSortOptimized(items) {
  if (items.length == 1) {
    return items;
  }
  var work = [];
  for (var i = 0, len = items.length; i < len; i++) {
    work.push([items[i]]);
  }
  work.push([]); //in case of odd number of items

  //是一个聚合的过程：总长度48，从48->25->13->7->3->3->1
  for (var lim = len; lim > 1; lim = (lim + 1) / 2) {
    for (var j = 0, k = 0; k < lim; j++, k += 2) {
      work[j] = merge(work[k], work[k + 1]);

      console.log(j,k,k+1)
    }
    work[j] = []; //in case of odd number of items
  }
  
  return work[0];
}

//TEST
mergeSort([12, 125, 98, 6, 25, 123, 4, 25, 68, 8, 6, 1, 232, 4]);
mergeSortOptimized([12, 125, 98, 6, 25, 123, 4, 25, 68, 8, 6, 1, 232, 4]);
```
