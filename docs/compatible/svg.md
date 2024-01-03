---
title: 兼容处理svg
date: 2019-06-25
tags: [svg]
categories: [前端,兼容]
---
# 兼容处理svg

## 1、svg image标签降级技术：

svg不能很好的在anroid2.3中得到支持，需要额外的补充，IE8-以及Android 2.3默认浏览器是不支持SVG的。

svg image标签降级技术，这是一个名叫Alexey Ten首先提出来的，类似下面的代码：

<!--more-->

```css
<svg width="96" height="96">
  <image xlink:href="svg.svg" src="svg.png" width="96" height="96" />
</svg>
```
即所有浏览器，包括IE，会把image标签渲染成img标签，而SVG中的image作用是：Provides a way to display a graphics image on the screen，也就是提供在屏幕上显示一个图形图像的方法。

于是，就有，如果浏览器支持SVG，则SVG显示；对于不支持的浏览器，例如IE8浏览器，会忽略svg标签的存在，直接渲染image，在其看来，这就是个img标签，于是，图像就以svg.png的形式显示了。

## 2、使用SVG作为background－image

Modernizr有一个SVG测试，可以判定设备是否支持SVG，于是，我们就可以通过在HTML元素上添加特定的类名(eg. no-svg)，做不同的样式控制。
```css
.my-element {
  background-image: url(image.svg);
}
.no-svg .my-element {
  background-image: url(image.png);
}
```
这样就不会出现双下载的问题了。但是，Modernizr毕竟是个外部依赖，且貌似膘肥体键，真要实际应用，不合适的来~

## 3、下面有个更优的方法，利用CSS支持的伪hack，如下使用：
```css
.my-element {
  background-image: url(fallback.png);
  background-image: url(image.svg), none;
}
```
　　其利用的技术是CSS3多背景，这是一个经验式技术，我们通过各种观察或者积累发现，浏览器只要支持了多背景，几乎无一例外支持SVG。于是，浏览器认识url(image.svg), none这个多背景声明，就使用SVG，否则，降级使用上面的png背景。