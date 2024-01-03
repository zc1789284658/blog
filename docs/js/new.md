---
title: new关键字
date: 2019-06-25
tags: [js]
categories: [前端,原生js]
---
# new 
- [只能通过new调用函数](#onlynew)
    - [this instanceof xx](#instanceof)
    - [new.target](#newtarget)
- [用原生js实现一个new方法](#hwnew)


<!--more-->

<span id='onlynew'/>

## __必须使用 new 关键字生成的写法__

<span id='instanceof'/>

### __this instanceof xx__

在 JS 中一个实例对象的创建必须使用 new 操作符。

但是限于 JS 的语法特征， 实际上 构造函数 同样可以像普通函数那样直接执行，这就使用了 函数作为构造函数的意义。

为了避免这种情况的发生，很多 JS 库使用下面的这种方式：

```js
function Person () {
	if(!this instanceof Person){
		console.warn('should be called with the new !')
	}
}
```
为了了解这种方式的原理，我们先要理解当我们使用 new 时做了些什么。

当时用 new 操作符的时候，实际上会经历以下 4 个步骤：

- 创建一个新的对象。
- 将构造函数的作用域赋值给这个新对象。（this 指向该对象）。
- 执行构造函数中的代码。
- 返回新对象。

在执行了这四个步骤后，除了将作用域赋值给了新的对象，还将 够构造函数的 prototype 赋值给了 实例的 `__proto__`，最终：

```js
let person1 = new Person()
person1.__proto__ === Person.prototype  //true
person instanceof Person  // true 
```

<span id='newtarget'/>

### __class new.target 属性__

在 ES6 中，我们可以使用 class 关键词创建一个 类，每一个 class 类都有一个 new.target 属性，返回 new 命令所作用的构造函数。如果构造函数不是通过 new 操作符调用的， 那么 new.target 会返回 undefined , 因此这个属性同样可以确保 构造函数必须是通过 new 调用的。

```js
function Person () {
	if(new.target !== Person){
		console.warn('should be called with the new !')
	}
}

class Person {
	constructor(){
		if(new.target !== Person){
			throw new Error('should be called with the new !')
		}
	}
}
```

---

<span id='hwnew'/>

## __用原生js实现一个new方法__

### __首先写一个父类方法(包含参数name,age)：__
```js
function Person(name,age){
    this.name = name;
    this.age = age;
}
```
### __new一个Person的实例p1做研究对比__
```js
var p1 = new Person("Richard", 22);
//此时p1包含name、age属性，同时p1的__proto__指向Person的prototype
p1.name;//Richard
p1.age;//22
```
### __自定义一个New函数：__
```js
//通过分析原生的new方法可以看出，在new一个函数的时候，
// 会返回一个func同时在这个func里面会返回一个对象Object，
// 这个对象包含父类func的属性以及隐藏的__proto__
function New(f) {
    //返回一个func
    return function () {
        var o = {"__proto__": f.prototype};
        f.apply(o, arguments);  //继承父类的属性

        return o; //返回一个Object
    }
}
```
### __通过自定义New方法创建一个实例对象p2:__
```js
var p2 = New(Person)("Jack",25);
p2.name;//Jack
p2.age;//25

p2 instanceof Person //返回的是true；

Person.prototype.gender ="male";
p1.gender//male
p2.gender//male
```