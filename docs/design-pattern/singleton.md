---
title: 单例模式
date: 2019-06-25
tags: [js]
categories: [设计模式]
---
# 单例模式
> 方法1：将instance挂载到函数本身
```js
function Resource(){
    if(Resource.instance){
        return Resource.instance
    }else{
        this.number = 100;
        Resource.instance = this
    }
}
var a =new Resource();
a.number = 90;
console.log(a);//Resource { number: 90 }

var b = new Resource()
b.number = 80
console.log(b);//Resource { number: 80 }

var c = new Resource()
console.log(c);//Resource { number: 80 }
console.log(new Resource());//Resource { number: 80 }
```
> 方法2：闭包
```js
var Resource =(function (){
    var instance;
    return function(){
        this.number = 100
        if(!instance){
            instance = this;
        }
        return instance 
    }
})()
var a = new Resource();
a.number = 50
var b = new Resource();
var c = new Resource();
var d = new Resource();
var e = new Resource();
var f = new Resource();
console.log(a,b,c,d,e,f)
//{ number: 50 } { number: 50 } { number: 50 } { number: 50 } { number: 50 } { number: 50 }
```
> 3.单例代理(将单例行为和类拆分开)
```js
var Resource = function(){
    this.number = 100 ;
}
var ProxyResourceSingleton = (function(){
    var instance;

    return function(){
        if(!instance){
            instance = new Resource()
        }
        return instance;
    }
})()

var a =new ProxyResourceSingleton()
var b =new ProxyResourceSingleton()
console.log(a==b)  //true
```

>由于上面单例代理和类之间只能一对一，所以可以使用下面方法完成单例代理一对多个类，不过eval函数貌似有性能问题，如果能解决利用字符串new对象，那么可以将下面代码完善下

```js
var Resource = function(){
    this.number =100
}
var Tool = function(){
    this.name ='tool'
}
var Singleton =(function (){

    var instanceMap={};

    return function(name){
        if(!instanceMap[name]){
            instanceMap[name] = eval('new '+name+'()');
        }
        return instanceMap[name] 
    }
})()

var a = new Singleton('Resource')
a.numebr =  90

var b = new Singleton('Resource')

console.log(a==b,a,b)//true Resource { number: 100, numebr: 90 } Resource { number: 100, numebr: 90 }

var c = new Singleton('Tool');
var d = new Singleton('Tool');
console.log(c==d)//Tool { name: 'tool' } Tool { name: 'tool' }
```