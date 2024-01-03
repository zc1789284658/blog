---
title: 模板方法
date: 2019-06-25
tags: [js]
categories: [设计模式]
---
# 模板方法
目录
- [定义](#define)
- [例子](#example)
- [模板方法界定](#template)
- [js中模板方法的缺点](#weak)
- [js高阶函数替代原型链完成模板方法](#function)

<span id="difine" />

### 1. 定义
 
> 模板方法模式由两部分结构组成，第一部分是抽象父类，第二部分是具体的实现子类。`通常在抽象父类中封装了子类的算法框架`。在模板方法模式中，子类实现中的相同的部分被上移到父类中，而将不同的部分留待子类来实现。体现了泛化的思想。

<span id="example" />

### 2. 例子：咖啡和茶的冲泡过程如下

泡咖啡|泡茶
---|---
烧热水|烧热水
`热水泡咖啡`|`热水泡茶叶`
`倒咖啡进杯子`|`倒茶水进杯子`
`加糖/牛奶`|`加柠檬`

```js
//抽象父类Drink：
class Drink{
    constructor(){
        this.init()
    }
    boilWater(){
        console.log('烧热水')
    }
    brew(){}
    pourInCup(){}
    addCondiments(){}
    init(){
        this.boilWater()
        this.brew()
        this.pourInCup()
        this.addCondiments()
    }
}
//咖啡
class Coffee extends Drink{
    brew(){console.log('冲咖啡')}
    pourInCup(){console.log('倒咖啡')}
    addCondiments(){console.log('加糖/牛奶')}
}
//茶
class Tea extends Drink{
    brew(){console.log('冲茶叶')}
    pourInCup(){console.log('倒茶水')}
    addCondiments(){console.log('加柠檬')}
}

new Coffee()
/*烧热水
冲咖啡
倒咖啡
加糖/牛奶*/
new Tea()
/*烧热水
冲茶叶
倒茶水
加柠檬*/
```

<span id="template" />

### 3. 模板方法界定
其中，`Drink.prototype.init`才是模板方法,因为该方法中封装了子类的算法框架，作为一个算法的模板，指导子类以何种顺序去执行哪些方法

<span id="weak" />

### 4. js中模板方法的缺点

- 1.java等静态语言编译器可以保证子类重写父类中的抽象方法。而js不能静态检验，会导致某些情况下忘记在子类中实现函数，可通过一下手段进行预防
    - × 手动进行接口检查
    - √ 父类抽象函数直接抛出异常（只有运行时才能通过异常发现问题）
        ```js
        class Drink{
            <!-- 其他相同代码 -->

            brew(){throw new Error('子类必须重写brew方法')}
            pourInCup(){throw new Error('子类必须重写pourInCup方法')}
            addCondiments(){throw new Error('子类必须重写addCondiments方法')}

            <!-- 其他相同代码 -->
        }
        ```

<span id="hook" />

### 5. 钩子方法（hook）

上述例子中，init中的流程很死板，如果需要灵活处理的话，则需要添加额外的变量/函数将变化进行隔离。如
```js
class Drink{
    <!-- 其他相同代码 -->
    needCondiments(){
        return true; //默认需要
    }
    init(){
        this.boilWater()
        this.brew()
        this.pourInCup()
        if(this.needCondiments()){
            this.addCondiments()
        }
    }
}

class Coffee{
    <!-- 其他相同代码 -->
    needCondiments(){
        return false; //不需要
    }
}

class Tea{
    <!-- 其他相同代码 -->
    needCondiments(){
        return true; //需要
    }
}
```


<span id="function" />

### 6. js高阶函数替代原型链完成模板方法
```js
var Drink = function (param) {
    var boilWater = param.boilWater || function () {
        console.log('烧热水 BY Drink')
    }
    var brew = param.brew || function () {

    }
    var pourInCup = param.pourInCup || function () {

    }
    var addCondiments = param.addCondiments || function () {

    }
    var needCondiments = param.needCondiments || function () {
        return true
    }

    var F = function () {
        this.init()
    }
    F.prototype.init = function () {
        boilWater();
        brew();
        pourInCup();
        if (needCondiments()) {
            addCondiments();
        }
    }
    return F
}
/* 实例 */
var Coffee = Drink({
    brew() {
        console.log('brew BY Coffee')
    },
    pourInCup() {
        console.log('pourInCup BY Coffee')
    },
    addCondiments() {
        console.log('addCondiments BY Coffee')
    },
    needCondiments() {
        console.log("Coffee Don't Need Condiments");
        return true;
    }
})

/* 实例 */
var Tea = Drink({
    brew() {
        console.log('brew BY Tea')
    },
    pourInCup() {
        console.log('pourInCup BY Tea')
    },
    addCondiments() {
        console.log('addCondiments BY Tea')
    },
    needCondiments() {
        console.log("Tea Do Need Condiments");
        return false
    }
})

new Coffee();
new Tea();
```