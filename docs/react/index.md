---
title: React相关
date: 2019-06-25
tags: [react,js]
categories: [前端]
---
# REACT

## 基础概念
```
babel ->browser.js  //浏览器端使用的，而非说明这是browserjs
react.js            //react核心库
react-dom.js        //react操作dom库

jsx支持es6语法，当年大多浏览器不支持es6时，jsx语法支持，jsx是为了推广es6语法而出的，而目前大多浏览器都支持es6，因此jsx有些没落

react是组件化的先驱
```

<!--more-->

---

## 使用(原始写法)

ReactDom.render(有顶级父级的element,element)
1. 添加class需要使用className
2. 元素必须闭合（jsx比html5标准还早，所以不支持）
3. for->htmlFor
4. class和for是关键字，因此需要进行修改

```
<body>
    <div id='div1'></div>
</body>
<script type='text/jsx';>

    let oDiv=document.getElementBy('div1');

    ReactDom.render(<span className='abc'>
        <label htmlFor='user'></label>
        <input id='user'></input>
    </span>,oDiv)
</script>
```

----

## React组件
1. react组件必须是可以渲染出来的，由此需要继承组件类
2. 必须具有render方法
3. 类名必须首字母大写
4. jsx传变量参 
```
title={index} 
title='index'       //这种穿的是index字符串
title=`${index}`    //模板字符串这种待测试
```
5. for循环需要有唯一key
```
class ComponentA extents React.Component{
    constructor(...args){
        super(...args)
        this.a=12
        this.arr=[1,2,3,4,5,6]
    }
    render(){
        return <ul>
            <li>{this.a}</li>
            {   
                this.arr.filter(num=>num%2)
                    .map((num,index)=>{
                            <li title={index} name=index key={index}>num</li>
                        })
            }
        </ul> 
    
    }
}

ReactDom.render(<ComponentA></ComponentA>,oDiv)
```

---

## 组件传参
1. 父组件
```
<div data={arr}></div>
```
2. 子组件
```
console.log(this.props.data)        //arr
```

---

## 组件通信(父子级)
1. 父组件到子组件：
    子组件暴露修改属性的方法到父组件
    父组件通过refs调用子组件方法
    ```
    <Child ref='child'></Child>
    this.refs.child.fn()
    ```
2. 子组件到父组件：
    父组件暴露修改属性的方法到子组件
    子组件通过props调用父组件方法
    ```
    <Child fn={this.fn.bind(this)}><Child/>
    ```

---
## 事件
1. 事件this的指向需要修正
 ```
onClick={this.fn.bind(this)}
```
---

## style/属性
1. style中需要json格式
    ```
    style={{color:'green'}}
    ```
2. 修改component的属性时，不会自动刷新，需要修改state或者props
- this.普通属性       //无效
- this.props          //只读，重新赋值时，会报错 can not xxx only read，push等操作时无法监听
- this.state          //自动重新渲染,由于当时无Observable,故设置时需要使用this.setState
```

class Component extends React.Component {
    constructor(...args){
        super(args)
        this.state={xxx};
    }

    fn(){
        this.setState({xxx})
    }
}
```
---

## state
- 类似于vue的data，修改时需要setState

---

## 生命周期
1. componentWillMount
2. componentDidMount

3. componentWillReceiveProps

4. shouldComponentUpdate
5. componentWillUpdate
6. componentDidUpdate

7. componentWillUnmount

2个 挂载前后
1个 属性加载
3个 更新前后
1个 卸载前

---

## Router
```
npm i react-router react-router-dom -D

import {BrowserRouter,Router,Switch,Route,Link} from 'react-router-dom'

...return (<BrowserRouter>
        //内部单一父级
        <div>
            <a href='/'></a>
            <a href='/b'></a>
            <Link to="{}"/>
            <Link to="{}"/> 
            <Switch>
                <Route path='/' component={Cmp1} exact/>
                <Route path='/b/:id' component={Cmp2}/>
            <Switch/>
        </div>
    </BrowserRouter>)

```

//Cmp2获取路由参数 : this.props.match.params.id
- exact : 匹配到了就不对后进行匹配
- history模式

---

## Redux
```
//安装
npm i react-redux redux -D

//引入
import {createStore} from 'redux'

let store = createStore(function(state={},action){
    switch(action){
        case 'addcount':
        state.count++
        return state;
    }
    return state
})

console.log(store.getState());

store.dispatch({type:'addcount',xxx})


//组件使用redux，Cmp1
import store from '/store/store'
class Cmp1 extends Component{
    constructor(...args){
        super(args)
        this.state={
            count:store.getState().count;
        }
    }
    //箭头函数修改this指向为当前组件
    store.subscribe(()=>{
        this.setState({
            count:store.getState().count
        })
    })

    render(){
        return (
            <li>{this.state.count}</li>
        )
    }
}
```

- redux,每次修改state时都会进入function,最好state设置默认值{}
- action：操作类型，主要参数有type，根据action修改state，最后必须return state，否则将会默认return undefined,此时store内state将被修改为undefined
- state必须是唯一的，中间不能修改地址
- 读取state：store.getState()

- 修改state：store.dispatch({type:'xxx',...args})            //dispatch一个json/Object形式的action，action中取type取args等进行操作（也可以不适用type进行state操作区分的吧）
- 订阅state：store.subscribe(function(){}),修改了store中state时，通知到组件，组件再进行组件内state的set，

## tips
页面重新渲染只有在state变的时候，redux中修改时，还需要在组件中设置方法追踪









