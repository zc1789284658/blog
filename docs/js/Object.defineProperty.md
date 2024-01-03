---
title: Object.defineProperty && Object.defineProperties
date: 2019-06-25
tags: [js]
categories: [前端,原生js]
---
# Object.defineProperty && Object.defineProperties
- value/writable 不能与 get/set 同时被定义，因为一旦可以设置 get/set，那么 get/set 会篡改 value 以及 writable，引起预料之外的问题
- 意思大概就是不可能定一个属性即可以对它进行正常读写，又可以在它上面架设一层 getter/setter 来进行访问改写。

<!--more-->

### Object.defineProperty
```js
var obj = {name:"i'm obj"};

Object.defineProperty(obj , 'name' ,{
    get(){
        return this.name
    },
    set(newVal){
        this.name = newVal
    }
})
```


### Object.defineProperties
```js
var obj = {};
var property2;  //中间变量，防止get/set死循环
Object.defineProperties(obj, {
  property1: {
    configurable: true,
    enumerable: true,
    value: "this is property1",
    writable: true
    // get:function(){ console.log(arguments);return this.property1;},
    // set:function(){console.log(arguments);this.property1 = '666'}
  },
  property2: {
    configurable: true,
    enumerable: true,
    // value:"this is property1",
    // writable:true,
    get: function() {
      console.log("you got property2",this);
      return property2;     //get中不要使用obj.property2，否则会死循环，使用中间变量或者标识
    },
    set: function(newVal) {
      console.log("you set property2",this);
      property2 = newVal;  //set中不要用this.property2 =xxx,否则会死循环，使用中间变量或者标识
    }
  }
});
```