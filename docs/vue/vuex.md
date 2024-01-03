---
title: vue中的状态管理
date: 2019-06-25
tags: [vue,js]
categories: [前端]
---
# vuex | 全局状态管理
### 5.1 状态管理
- 1.state
    - 全局唯一
    - 拆分module

- 2.getter
    
- 3.mutation
    - 修改状态操作
    - 进行追溯

- 4.action
    - 提交mutation
    - 官方说法 mutaion同步 action异步
- 5.modules
    - state拆分
    - 进行数据分割
    - 父子集action和mutation可重名，执行时将从父级到子集一并执行，便于将操作拆分

<!--more-->

### 5.2 创建store
```js
const store = new Vuex.Store({
    strict:true,
    state:{
        count:0
    },
    mutations:{
        add_count(state,arg){
                xxxx
        },
        minus_count(state,arg){
                xxxx
        }
    },
    actions:{
        add_count(store,arg){
            console.log(store)
            store.commit('add_count',arg)
        },
        minus_count({commit},arg){
            commit('minus_count',arg)
        }
    },
    getters:{
        getCount(state,){

        }
    }
})

this.$store.dispatch('add_count',参数)

this.$store.state.a;    
this.$store.getters.a;  //相比于state，可以添加中间层，如缓存，重复判断，节流防抖等
```

### 5.3 注册
```js
Vue.use(Vuex)

new Vue({
    xxx,
    xxx,
    router,
    store
})
```

### 5.4 流程
> 组件 dispath -> action ->commit ->mutation state.xxx-> state

### 5.5 注意事项
- vuex需要与computed交互使用，否则会出现在mutation中直接赋值时，监听失效的情况，需要computed做中间层进行监听
如 
```js
let a=12,
let b =a,
a=15,   //b=12
```

### 5.6 手动触发action
1. 如mouted内进行this.$store.dispatch,适合异步操作
2. 通过getters
    computed进行监听处理，但是如果是异步的话，会很麻烦，async与await与computed兼容差，但是computed还需要触发，导致两难，适合通过不操作

> async可以添加到任何方法上，除非无法使用，async方法的父级function也必须是async方法
