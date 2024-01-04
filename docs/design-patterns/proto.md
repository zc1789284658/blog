# 原型模式
> [以之前的构造器模式为例](https://github.com/zc1789284658/Code-Note/edit/master/design-pattern/constructor.md)，修改后
```js
function Person(name , age){
    this.name = name;
    this.age = age;
}
Person.prototype.getAge = function(){
    return 'my age is :'+ this.age
}
```
> ES6 class 为构造器模式和原型模式的结合
```js
//ES6 class
class Person {
    constructor((name , age , gender){
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
    getAge(){
         return 'my age is :'+ this.age
    }
}

```