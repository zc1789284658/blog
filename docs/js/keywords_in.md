---
title: in 关键字
date: 2019-06-25
tags: [js]
categories: [前端,原生js]
---

# 关键字 in
- for-in 循环应该用在非数组对象的遍历上，使用 for-in 进行循环也被称为“枚举”。

```js
var Person = function() {};
Person.prototype.name = "Person";

var person = new Person();

console.log("name" in person); //true
console.log(person.hasOwnProperty("name")); //false
//上述console说明person本身没有name属性，但是其所属原型链中有
```