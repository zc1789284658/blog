# 工厂模式
> ES5
```js
function Student(name,subjects){
    this.name =  name;
    this.subjects = subjects;
}
function  StudentFactory(name,type){
    switch(type){
        case "LIBERALARTS":
            return new Student(name,['政治','历史','地理']);
            break;
        case "SCIENCE":
            return new Student(name,['物理','化学','生物'])
            break;
        default:
            throw 'StudentFactory arguments error: not valid argument `type`:'+type 
    }
}
var whh = StudentFactory('王花花','LIBERALARTS')
var lsd = StudentFactory('李双但','SCIENCE')
console.log(whh,lsd)
//Student { name: '王花花', subjects: [ '政治', '历史', '地理' ] } Student { name: '李双但', subjects: [ '物理', '化学', '生物' ] }
```
>ES6
```js
class Student{
    constructor(name , subjects){
        this.name =  name
        this.subjects = subjects
    }
}
const StudentFactory(name , type) =>{
     switch(type){
        case "LIBERALARTS":
            return new Student(name,['政治','历史','地理']);
            break;
        case "SCIENCE":
            return new Student(name,['物理','化学','生物'])
            break;
        default:
            throw `StudentFactory arguments error: not valid argument 'type':${type}`
    }
}

const whh = StudentFactory('王花花','LIBERALARTS')
const lsd = StudentFactory('李双但','SCIENCE')
const error = StudentFactory('李双但','error')
console.log(whh,lsd)
//StudentFactory arguments error: not valid argument 'type':error
```