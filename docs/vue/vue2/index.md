# vue2

## [官网](https://v2.vuejs.org/)

::: warning
不建议花费精力学习，建议直接学习[vue3](../vue3/)
:::

## 组件中传参

```html
<ListItem :data="data" :plus="plus" :minus="minus"></ListItem>
```

## filters

处理数据，一般将相对简单的数据处理函数由 methods 拆分到 filters，使用方法：

```js
<!-- 在双花括号中 -->
{{ message | capitalize }}

<!-- 在 `v-bind` 中 -->
<div v-bind:id="rawId | formatId"></div>
```

## [vuex](./vuex.md)
全局状态管理

## vue文件

```js
import Header from './components/header'
export default{
    components:{
        Header
    }
}
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

## lazyload.
webpack检测到组件函数化写法时，将会把Header模块拆离主文件，当使用到Header时在进行加载

```js
export default{
    components:{
        Header(){ return import('./src/components/header') }, // [!code ++]
        Footer: ()=> require('@/components/footer')// [!code ++]
    }
}
```

## vue transition 标签

假如动画class为`animate`，则

```css
.animate-enter{}
.animate-enter-active{}
.animate-enter-to{}
.animate-leave{}
.animate-leave-active{}
.animate-leave-to{}
```

```html
<transition name='animate'></transition>
```

### 添加事件

- @before-enter        @before-leave
- @enter               @leave
- @after-enter         @after-leave
- @enter-cancelled     @leave-cancelled

### 强制添加 v-for以及:key属性

```html
<transition-group>
</transition-group>
<transition :enter-class="" :enter-active-class="" :enter-to-class="" 
            :leave-class="" :leave-avtive-class="" :leave-to-class="">
</transition>
```
> 不使用规定的class名称限制时，需要手动添加

## vue2数据监听的缺点

1. 基本类型无法监听，在vue3中是通过`ref`将基本类型数据包装至`.value`属性下
2. 只能监听已有属性：当前vue使用`Object.defineProperty`对已有`属性`进行`监听`，vue3使用Proxy进行`对象监听`，将解决此类问题
3. `Object.defineProperty`监听数组时的性能非常差，迫不得已不支持对数组的监听，改为对数组原型的函数进行监听

### 解决：
- 1. `$set` 
- 2. 内部改成`object`形式
- 3. 使用数组原型支持的函数（`push/pop/unshift/shift/splice`）


## router跳转时
- 可以监听route

```js
watch:{
    '$route'(){}
}
```

- 可以通过添加`beforeUpdateRoute(){}`

## Render函数

```js
new Vue({
    el:'#app',
    render:(mounte)=>{mounte(App)}
})
```

## 可复用性&组合 

### [自定义指令](./directive.md) 

### [渲染函数 & JSX](./render.md)

### [mixin](./mixin.md)

::: warning
不建议，建议直接使用[composition](https://www.npmjs.com/package/@vue/composition-api)

原因：
1. mixin多个时，受优先策略影响，优先级无法保证，且优先级策略可手动配置，更加不稳定
2. mixin有重名属性时，会互相覆盖
3. mixin代码跟踪调试困难，代码结构不清晰
:::
