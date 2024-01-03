---
title: 抽象工厂模式
date: 2019-06-25
tags: [js]
categories: [设计模式]
---
# 抽象工厂模式
> 工厂的聚合
```js
function Student(name , age) {
    this.name = name;
    this.age = age;
}
function Teacher(name , major) {
    this.name = name;
    this.major = major;
}
function StudentFactory(name , age) {
    return new Student(name , age)
}
function TeacherFactory(name , major) {
    return new Teacher(name , major)
}
function UserProducer(factory) {
    switch (factory) {
        case "student":
            return StudentFactory;
            break;
        case "teacher":
            return TeacherFactory
            break;
        default:
            throw 'error factory type'
    }
}

var whh = UserProducer('student')('王花花',18)
var leg = UserProducer('teacher')('李二狗','物理老师')
console.log(whh,leg)
//Student { name: '王花花', age: 18 } Teacher { name: '李二狗', major: '物理老师' }
```