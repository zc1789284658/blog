---
title: vue
date: 2019-06-25
tags: [js,vue]
categories: [前端]
---
# vue

目录：
- [混入](#mixin)
- [自定义指令](#directive)

<!--more-->

## 组件中传参
- this.$attrs.data
- data={}
```
<ListItem :data='data' :plus='plus' :minus='minus'>
```
//传函数,优点没有，可以传，但是不建议，结构复杂时修改会死人

---

## v-model='checked'
可以监视checked属性（dom意义上以及vue-data意义上）
```js
{
    methods:{
        minus(){}
        plus(){}
    }
}
```

---

## axios
```
Vue.prototype.axios=axios;
new Vue({
    axios,
    xxxxx,
    xxxx,
    filters:{
        mktime(t){
            return t*100
        }
    },
    methods:{

    }
})
async mounted(){
    let res = (await this.axios(url)).data;
}
```

---

## filters
处理数据，一般将相对简单的数据处理函数由methods拆分到filters，使用方法：
```js
:title={{data.time|mktime}}
```

---

## [vuex](./vuex.md)
全局状态管理
---

## vue文件
```js
<template>
    <Header/>
</template>
<script>
import Header from './components/header'
export default{
    name:"xxx",
    components:{
        Header
    }
}
</script>
```
```js
import MainIndex from './src/main'
import MainIndex_inner from './src/main_inner'
var router = new VueRouter({
    routes:[
        {
            path:'',
            name:'',
            component:MainIndex,
            children:[
                path:'',
                name:'',
                component:MainIndex_inner
            ]
        },
        {}
    ]
})
```

---

## lazyload.
webpack检测到组件函数化写法时，将会把Header模块拆离主文件，当使用到Header时在进行加载

```js
export default{
    xxx,
    xxx,
    components:{
        Header(){return import  ('./src/components/header')},
        Footer:()=>require ('@/components/footer')
    }
}
```

几个命令

vue list 

vue init webpack test1


---

## vue transition 标签
假如动画class为animate则
```
.animate-enter{}
.animate-enter-active{}
.animate-enter-to{}
.animate-leave{}
.animate-leave-active{}
.animate-leave-to{}
```
```
<transition name='animate'></transition>
```
### 添加事件

- @before-enter        @before-leave
- @enter               @leave
- @after-enter         @after-leave
- @enter-cancelled     @leave-cancelled

### 强制添加 v-for以及:key属性
```
<transition-group>
</transition-group>
<transition :enter-class="" :enter-active-class="" :enter-to-class="" 
            :leave-class="" :leave-avtive-class="" :leave-to-class="">
</transition>
```
> 不使用规定的class名称限制时，需要手动添加

### tips:
>vue-animate.css直接使用name即可

---

## vue 无法监听基本元素组成的数组
如
```
[true,1,'1'],
```
>因为监听需要将对象修改为Obeserve对象，而基本类型无法转换
>当前vue使用的为Object.defineProperty进行【**对象属性监听**】，后续如果vue使用proxy进行【**对象监听**】，将解决此类问题（新添属性无法监听[由于是属性监听，新添加的属性自然未进行初始化Observe]，直接使用下标修改数组元素无法监听）

### 解决：
- 1.$set 
- 2.内部改成object形式

---

## router跳转时
- 可以监听route
    ```
    watch:{
        '$route'(){

        }
    }
    ```
- 可以通过添加beforeUpdateRoute(){}

---

## Render函数
new Vue({
    el:'#app',
    render:(mounte)=>{mounte(App)}
})

---

## 可复用性&组合 
<span id='mixin'/>

### [mixin](./mixin.md) 

<span id='directive'/>

### [自定义指令](./directive.md) 

### [渲染函数 & JSX](./render.md)