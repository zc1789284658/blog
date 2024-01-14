# LazyMan

## Expect

```js
LazyMan('Hank');
// output:
// Hi! This is Hank!

LazyMan('Hank').sleep(3).eat('dinner')
// output:
// Hi! This is Hank!
// //wait 3 seconds..
// Wake up after 3
// Eat dinner~

LazyMan('Hank').eat('dinner').eat('supper')
// output:
// Hi This is Hank!
// Eat dinner~
// Eat supper~

LazyMan('Hank').sleepFirst(2).eat('dinner').sleep(3).eat('supper')
// output:
// //wait 2 seconds..
// Wake up after 2
// Hi This is Hank!
// Eat dinner~
// //wait 3 seconds..
// Wake up after 2
// Eat supper~

// etc...
```

## Ideas

- Maintain a task queue, when calls api, will `prepend/append` task to the task queue, and run tasks at next `macro task circle`
- For support chain call, should return `this` after call any api


## SourceCode

```js
class LazyMan{
    private tasks: (()=>void)[] = []

    private next(){
        this.tasks.shift()?.()
    }

    constructor(private name:string){
        this.tasks.push(()=>{
            console.log(`Hi! This is ${name}!`);
            this.next()
        })

        setTimeout(()=>{
            this.next()
        })
    }

    sleepFirst(seconds: number){
        this.tasks.unshift(()=>{
            let start = Date.now()
            setTimeout(()=>{
                console.log(`wait ${seconds} seconds...`, Date.now() - start)
                this.next()
            }, seconds*1000)
        })
        return this
    }

    sleep(seconds: number){
        this.tasks.push(()=>{
            let start = Date.now()
            setTimeout(()=>{
                console.log(`wait ${seconds} seconds...`, Date.now() - start)
                this.next()
            }, seconds*1000)
        })
        return this
    }

    eat(food: string){
        this.tasks.push(()=>{
            console.log(`Eat ${food}~`)
            this.next()
        })

        return this
    }
}

LazyMan('Hank').sleepFirst(2).eat('dinner').sleep(3).eat('supper')

```

