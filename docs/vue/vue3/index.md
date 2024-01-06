# Vue3

## [Official Home](https://vuejs.org/)

## [VueUse](https://vueuse.org/)

## [State Library：Pinia](https://pinia.vuejs.org/zh/)

## [LifeCycleHooks](https://vuejs.org/api/composition-api-lifecycle.html)

```JS
onMounted()
onUpdated()
onUnmounted()
onBeforeMount()
onBeforeUpdate()
onBeforeUnmount()
onErrorCaptured()
onRenderTracked()
onRenderTriggered()
onActivated()
onDeactivated()
onServerPrefetch()
```

## CustomRef

可利用CustomRef实现自定义ref，如自带debounce的Ref

```js
import { customRef } from 'vue'

export function useDebouncedRef(value, delay = 200) {
  let timeout
  return customRef((track, trigger) => {
    return {
      get() {
        track() // [!code focus] //收集依赖
        return value // [!code focus] //返回数据
      },
      set(newValue) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue // [!code focus] //赋值
          trigger() // [!code focus]  //触发依赖更新
        }, delay)
      }
    }
  })
}
```

## Provide/Inject

### App-level Provide​

```js
import { createApp } from 'vue'

const app = createApp({})

app.provide(/* key */ 'message', /* value */ 'hello!')
```

### provide

```vue
<script setup>
import { provide } from 'vue'

provide(/* key */ 'message', /* value */ 'hello!')
</script>
```

### inject

```vue
<script setup>
import { inject } from 'vue'

const message = inject('message')

// `value` will be "default value"
// if no data matching "message" was provided
const value = inject('message', 'default value')

// In some cases, the default value may need to be created by calling a function or instantiating a new class. 
//To avoid unnecessary computation or side effects in case the optional value is not used,
// we can use a factory function for creating the default value:
//The third parameter indicates the default value should be treated as a factory function.
const value = inject('key', () => new ExpensiveClass(), true)

</script>
```


## SFC CSS Features

### \<script setup\>

```vue
<script setup>
import MyComponent from './MyComponent.vue'
import Foo from './Foo.vue'
import Bar from './Bar.vue'
import { ref } from 'vue'

const count = ref(0)

const vMyDirective = {
  beforeMount: (el) => {
    // do something with the element
  }
}

</script>

<template>
  <MyComponent />
  <button @click="count++">{{ count }}</button>
  <component :is="Foo" />
  <component :is="someCondition ? Foo : Bar" />
  <h1 v-my-directive>This is a Heading</h1>
</template>
```

```js
// APIs
defineProps() & defineEmits()
defineModel() 
defineExpose()
defineOptions()
defineSlots()
useSlots() & useAttrs()
```

### CSS Modules​

```vue
<template>
  <p :class="$style.red">This should be red</p> <!-- // [!code ++] 3.use as $style.red -->
</template>

<style module> /* // [!code ++] 1.specified as module */
.red { /* // [!code ++] 2.equals $style.red */
  color: red;
}
</style>
```

#### Custom Inject Name​

```vue
<template>
  <p :class="classes.red">red</p>  <!-- // [!code ++] 2.use as classes.red -->
</template>

<style module="classes"> /* // [!code ++] 1.specified as module named classes */
.red {
  color: red;
}
</style>
```

### v-bind() in CSS

```vue
<script setup>
const theme = { // [!code ++]
  color: 'red' // [!code ++]
} // [!code ++]
</script>

<template>
  <p>hello</p>
</template>

<style scoped>
p {
  color: v-bind('theme.color');  /*// [!code ++] 通过v-bind绑定字符串形式属性名：'theme.color' */ 
}
</style>
```

## Warning

::: warning

1. `watchEffect` could only `collect` variables in `sync codes`

:::