---
title: 构造器模式
date: 2019-06-25
tags: [js]
categories: [设计模式]
---
# 构造器模式
> 使用构造器模式前
```js
var wangyi = {
    name:'wangyi',
    age:50,
    gender:'男'
}
var wanger = {
    name:'wanger',
    age:50,
    gender:'男'
}
var wangsan = {
    name:'wangsan',
    age:50,
    gender:'男'
}
var wangsi = {
    name:'wangsi',
    age:50,
    gender:'男'
}
console.log(wangyi,wanger,wangsan,wangsi)
```

> 使用构造器模式后
```js

function Person(name , age , gender){
    this.name = name;
    this.age = age;
    this.gender = gender;

    //此处函数会复制到每一个new出来的实例中，需要原型模式优化
    this.getAge = function(){
        return 'my age is :'+ this.age
    }
}

var wangyi = new Person('王一',50,'男')
var wanger = new Person('王二',50,'男')
var wangsan = new Person('王三',50,'男')
var wangsi = new Person('王四',50,'男')
console.log(wangyi,wanger,wangsan,wangsi)
```