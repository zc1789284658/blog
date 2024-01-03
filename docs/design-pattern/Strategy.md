# 策略模式
```js
var stratygies = {
    'S':function(salary){
        return salary *4
    },
    'A':function(salary){
        return salary *3
    },
    'B':function(salary){
        return salary *2
    }
}

var CalcBonus = function(level , salary){
    return stratygies[level](salary)
}

console.log(CalcBonus('S',1000),CalcBonus('A',1000),CalcBonus('B',1000)) //4000 3000 2000
```