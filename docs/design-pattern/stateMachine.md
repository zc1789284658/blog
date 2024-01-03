# 状态机模式

> 状态模式是一种非同寻常的优秀模式。虽然状态模式并不是一种简单到一目了然的模式（它往往还会带来代码量的增加），但掌握它的精髓后，将带来很多好处

- 状态模式的关键是区分事物内部的状态，事物内部状态的改变往往会带来事物的行为改变
举例：电灯
    - 电灯有两种状态：开和关
    - 状态只在开和关中进行切换
    - 状态改变时，电灯执行不同的动作（开灯/关灯）

## **不使用状态模式**时
### 代码可能会是这样的:
```js
class Light{
    constructor(){
        this.state ='off'      
    }
    press(){
        if(this.state==='off'){
            console.log('open light')
            this.state = 'on'
        }else{
            console.log('close light')
            this.state = 'off'
        }
    }
}

const light = new Light()
light.press()   //open light
light.press()   //close light
light.press()   //open light
light.press()   //close light
```

当需要在on 和off之间添加一个 weakOn的状态时，需要修改的地方很多，press函数需要修改，需要在open函数与close函数之间添加一个处理weakOn状态的函数，

我们梳理一下上述程序的缺点：

- press函数时违反开放-封闭原则的，每次新增或者修改light状态，都需要修改press中代码，这使得press函数非常不稳定
- 所有跟状态有关的行为封装在press函数中，如果以后状态增加，那么press函数将变大，特别时业务复杂的时候
-  状态的切换不明显，仅仅表现为对state变量赋值。这种操作在实际工作中（this.state = 'off'...），容易遗漏。同时也无法一目了然地了解电灯一共有多少种状态，除非阅读完press函数，当状态种类增多时，很难阅读
- 状态之间的切换关系，只是if else语句，增加或者维护困难。

---

## 使用状态模式

```js
class Light{
    constructor(){
        this.currFsm = FSM.on
    }
    press(){
        //交由状态机管理状态
        this.currFsm.press(this)
    }   
}

var FSM = {
    off:{
        press(light){
            console.log('关灯')
            light.currFsm = FSM.on
            //执行业务动作以及切换状态机
        }
    },
    on:{
        press(light){
            console.log('开灯')
            light.currFsm = FSM.off
        }
    }
}

const light = new Light()

light.press()//开灯
light.press()//关灯
light.press()//开灯
light.press()//关灯
```
## 通用的状态机模型：
参考[jakesgordon的StateMachine的参数规范](https://github.com/jakesgordon/javascript-state-machine)，自己编的一个小型状态机，只实现了部分API，参数检验以及错误处理需要完善
```js
class StateMachine{
    /**
     * @param config:{}
     * @param config.init:初始状态
     * @param config.transitions:[{name:'',from:'',to:''}]状态转移数组
     * @param config.methods:{onXxxx(){},onYyyy(){}} 状态转移时执行的函数
     */ 
    constructor(config){
        this.config = config
        this.state = config.init
        this.transitions = config.transitions
        this.methods = config.methods

        this.transitions.forEach((transition)=>{
            var name = transition.name;
            //从transition中取出name挂载成本体的函数，触发methods中的onX
            this[transition.name] = ()=>{
                var fnName = 'on'+name.charAt(0).toUpperCase() + name.slice(1)
                
                this.state = transition.to  //状态从from切换为to
                
                console.log('当前状态：'+this.state)

                this.methods[fnName]()  //执行状态转移时需要进行的业务函数
            }
        })
    }
    /** 
     * @param state 用来判断当前状态与state是否一致
     */
    is(state){
        return this.state===state
    }
}

const fsm = new StateMachine({
    init:'收藏',
    transitions:[
        {name:'doStore',from:'收藏',to:'取消收藏'},
        {name:'deleteStore',from:'取消收藏',to:'收藏'},
    ],
    methods:{
        onDoStore(){
            console.log('excute 收藏')
        },
        onDeleteStore(){
            console.log('excute 取消收藏')
        }
    }
})

var i = 5
while(i>0){
    console.log('--------')
    if(fsm.is('收藏')){
        fsm.doStore()
    }else{
        fsm.deleteStore()
    }

    i --;
}
/**
 * 
--------
当前状态：取消收藏
excute 收藏
--------
当前状态：收藏
excute 取消收藏
--------
当前状态：取消收藏
excute 收藏
--------
当前状态：收藏
excute 取消收藏
--------
当前状态：取消收藏
excute 收藏
*/
```
---

## 状态模式的优缺点

优点：
- 定义了状态与行为之间的关系，并将他们封装在一个类里。通过增加新的状态类，很容易增加新的状态和转换
- 避免Context无限膨胀，状态切换的逻辑分布在状态类中，也去掉了Context中的大量if else分支
- 用对象代替字符串来记录当前状态，使得状态的切换更加一目了然
- Context中的请求动作和状态类中封装的行为可以非常容易地独立变化而互不影响 
缺点：
- 会在系统中定义非常多地类，会造成逻辑分散。无法在一个地方看出整个状态机的逻辑

## 状态模式与策略模式

状态模式与[策略模式](https://github.com/zc1789284658/Code-Note/edit/master/design-pattern/Strategy.md)像一堆双胞胎，它们都封装了一系列的算法或行为，它们的类图看起来拒户一模一样，但在意图上有很大不同，因此他们是两种截然不同的模式

相同点：

- 它们都有一个上下文、一些策略或者状态类，上下文把请求委托给这些类来执行

区别：

- 策略模式中各个策略平等有平行，没有任何关系，所以使用者必须很熟悉每一个策略
- 状态模式中，状态与对应的行为是封装好的，状态之间的切换逻辑也固定，使用者无需知道具体细节，只要改变状态就行。  