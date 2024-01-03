---
title: 命令模式
date: 2019-06-25
tags: [js]
categories: [设计模式]
---
# 命令模式
目录：
- [定义](#difine)
- [案例](#example)
- [添加撤销](#undo)
- [dom发起者](#dom)
- [重做](#reply)
- [宏命令](#macroCommand)

<span id="difine"><span>
### 定义
> 命令模式是一种松耦合的方式，将发布者和执行者分离，命令模式中的命令指的是一个执行某些特定事情的指令。

大概流程如下：

对象|动作|对象|动作|对象
--|--|--|--|--
发送者->|发出命令，调用命令对象|命令对象->|接受命令，调用接收者对应接口|接收者

> 应用场景：有时候需要向某些对象发送请求，但是并不知道请求的接收者是谁，也不知道被请求的操作是什么，此时希望用一种松耦合的方式来设计软件，使得请求发送者和请求接收者能够消除彼此之间的耦合关系

- 在实际情况中，发起者可能是个dom非正常class元素，封装可能不同，不要太诧异即可。
- 由上可以得知，操作需要被封装，接收者需要被封装，如下例：

<span id="example"><span>
### 案例
```js
//接收者
class Receiver{
    constructor(){
        this.fire = false
    }
    exec(){
        console.log('执行')
    }
    setExec(fn){
        this.exec = fn
    }
}
//命令对象
class Command{
    constructor(receiver){
        this.receiver = receiver
    }
    cmd(){
        this.receiver.exec()
    }
}
//发起者
class Invoker{
    constructor(command){
        this.command = command
    }
    invoke(){
        console.log('开始');
        this.command.cmd()
    }
}

var soldier =new Receiver()

var trumpeter = new Command(soldier)

var general = new Invoker(trumpeter)

soldier.setExec(function(){
    this.fire = true
    console.log(this)
})

general.invoke()//Receiver { fire: true, exec: [Function] }
```


<span id="undo"><span>
### 添加撤销
> 在每次执行excute之前，记录上一个或者上几个状态，以便于undo时进行撤销
```js

//接收者
class Receiver{
    constructor(){
        this.fire = false
    }
    exec(){
        console.log('执行')
    }
    setExec(fn){
        this.exec = fn
    }
}
//命令对象
class Command{
    constructor(receiver){
        this.receiver = receiver
    }
    cmd(){
+       this.undoFireStatus = this.receiver.fire;
        this.receiver.exec()
    }
+   undo(){
+       this.receiver.fire = this.undoFireStatus
+       console.log(this.receiver)
+   }
}
//发起者
class Invoker{
    constructor(command){
        this.command = command
    }
    invoke(){
        console.log('开始');
        this.command.cmd()
    }
+   undo(){
+       console.log('撤销')
+       this.command.undo()
+   }
}

var soldier =new Receiver()

var trumpeter = new Command(soldier)

var general = new Invoker(trumpeter)

soldier.setExec(function(){
    this.fire = true
    + console.log(this)
})

general.invoke()//开始 Receiver { name: 'soldier', exec: [Function] }
+ general.undo()//撤销 Receiver { fire: false, exec: [Function] }

```

<span id="dom"><span>
> dom元素代替上述发起者，下例出自 【曾探】的《Javascript设计模式与开发实践》
```js
var ball = document.getElementById('ball')
var pos = document.getElementById('pos')
var moveBtn = document.getElementById('moveBtn');
var cancelBtn = document.getElementById('cancelBtn');

class MoveCommand{
    constructor(receiver , pos){
        this.receiver = receiver
        this.pos = pos
        this.oldPos = null
    }
    excute(){
        this.receiver.start('left' , this.pos ,1000 ,'strongEaseOut')
        this.oldPos = this.receiver.dom.getBoundingClientRect()[this.receiver.propertyName]
        //记录小球开始移动前的位置
    }
    undo(){
        this.receiver.start('left' , this.oldPos , 1000 , 'strongEaseOut')
    }
}

var moveCommand
moveBtn.onclick=()=>{
    var animate = new Animate(ball)
    moveCommand = new MoveCommand( animate , pos.value)
    moveCommand.excute()
}
cancelBtn.onclick = ()=>{
    moveCommand.undo();
}

```

<span id="reply"><span>
### 重做
> 当撤销操作不可逆时，可以将历史操作记录在数组等有序列表中，然后清楚已有的对象，重新执行一遍历史操作。

```js
//主要代码
var Ryu = {
    jump:function(){
        console.log('jump')
    },
    crouch:function(){
        console.log('crouch')
    },
    defence:function(){
        console.log('defence')
    },
    attack:function(){
        console.log('attack')
    }
}
var commands ={
    '119':'jump',
    '115':'crouch',
    '97':'defence',
    '100':'attack'
}

var makeCommand = function(receiver , state){
    return function(){
        receiver[ state ]();
    }
}

var commandStack = []

document.onkeypress = function(ev){
    var keyCode = ev.keyCode;
        command = makeCommand(Ryu , commands[keyCode]);

    if(command){
        command()
        commandStack.push(command);
    }
}


function reply(){
    var command;
    while(command = commandStack.unshift()){
        command()
    }
}
``` 
<span id="macroCommand"><span>
### 宏命令
> 宏命令是一组命令的集合，可以一次执行一批命令。宏命令是组合模式和命令模式的组合产物
    
关键点:
- 一组命令（都实现命令的接口，如都含有excute函数）
- 一次执行一批（从命令集合中，遍历命令，执行excute函数）
```js
var Command1 = {
    excute(){console.log('this is command1')}
}
var Command2 = {
    excute(){console.log('this is command2')}
}
var Command3 = {
    excute(){console.log('this is command3')}
}
var MacroCommand =()=>{
    return {
        commandList:[],
        add(command){
            this.commandList.push(command)
        },
        excute(){
            this.commandList.forEach((command)=>{
                command.excute()
            })
        }
    }
}

var macroCommand = MacroCommand()
macroCommand.add(Command1)
macroCommand.add(Command2)
macroCommand.add(Command3)
macroCommand.add(Command3)
macroCommand.add(Command2)
macroCommand.add(Command1)
macroCommand.excute()
/** 
this is command1
this is command2
this is command3
this is command3
this is command2
this is command1
*/
```

> 查看[宏命令](#macroCommand)中的命令，可以发现
- 其中的Command1/2/3中并未包含任何receiver的信息，这种完全将接收者和发送者解耦的命令可以认为是`傻瓜式`的，
- 其与[策略模式](https://github.com/zc1789284658/Code-Note/edit/master/design-pattern/Strategy.md)非常接近，从代码结构上无法区分，只能从意图上进行区分
