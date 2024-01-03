# 发布-订阅模式

本模式又称为**观察者模式**，它定义**对象间的一种一对多的依赖关系**，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。在js中，我们一般用**事件模型**来替代传统的发布-订阅模式

> 关键步骤：
- 定义发布者，给发布者发布不同的回调函数，
- 订阅时，根据订阅的参数，发布者执行不同的函数
- 需要时，可以自己添加额外操作

### `DOM事件`
```js
document.body.addEventListener('click' , function(){
    console.log('clicked')
} , false)

document.body.click()
```
> 注意，手动触发事件更好的做法是IE下使用fireEvent，标准浏览器下使用dispatchEvent

### `自定义事件`
> 下面是一个最简单的发布订阅
```js
var Puber ={
    publist:[],
    listen(fn){
        this.publist.push(fn)
    },
    trigger(){
        this.publist.forEach((fn)=>{
            fn()
        })
    }
}

Puber.listen(function(){console.log(1)})
Puber.listen(function(){console.log(2)})
Puber.listen(function(){console.log(3)})
Puber.trigger()
```

> 上面没有做到事件区分，下面我们把它完善一下
```js
var Puber ={
    /**
     * 可以按名称进行个性化发布订阅
     * {name : publist}
     */
    pubMap:{},
    listen( name , fn){
        if(!this.pubMap[ name ] ){
            this.pubMap[ name ] =[];
        }
        this.pubMap[ name ].push(fn)
    },
    trigger(name){
        this.pubMap[ name ].forEach((fn)=>{
            fn()
        })
    }
}

Puber.listen('console' , function(){console.log(1)})
Puber.listen('console' , function(){console.log(2)})
Puber.listen('console' , function(){console.log(3)})
Puber.listen('fire' , function(){console.log('fire'+4)})
Puber.listen('fire' , function(){console.log('fire'+5)})
Puber.listen('fire' , function(){console.log('fire'+6)})
Puber.listen('fire' , function(){console.log('fire'+7)})
Puber.listen('fire' , function(){console.log('fire'+8)})

Puber.trigger('console')
Puber.trigger('fire')
/**
1
2
3
middle
fire4
fire5
fire6
fire7
fire8
*/
```

### `使用继承，构造可进行发布订阅的对象`
```js
//订阅类
class PubSub{
    /**
     * 可以按名称进行个性化发布订阅
     * {name : publist}
     */
    constructor(){
       this._pubMap = {}
    }
    /** 为了防止参数名冲突，使用_作为前缀，有规定只能用其他标识时，用其他标识*/
    _listen( name , fn){
        if(!this._pubMap[ name ] ){
            this._pubMap[ name ] =[];
        }
        this._pubMap[ name ].push(fn)
    }
    _trigger(name){
        this._pubMap[ name ].forEach((fn)=>{
            fn(this)
        })
    }
}
//Person类，继承订阅类
class Person extends PubSub{
    constructor(name="Person" , age=18){
        super()
        this.name = name
        this.age = age
    }
}

var wangsi = new Person("wangsi",19)

wangsi._listen('getName',function(instance){console.log('you got name',instance.name)})
wangsi._listen('getName',function(instance){console.log('you got name second'),instance.name})
wangsi._listen('getAge',function(instance){console.log('you got age',instance.age)})
wangsi._listen('getAge',function(instance){console.log('you got age second',instance.age)})

wangsi._trigger('getName')
wangsi._trigger('getAge')

/** 
you got name wangsi
you got name second wangsi
you got age 19
you got age second 19
*/
```