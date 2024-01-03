---
title: 构建者/创建者/创造者 模式
date: 2019-06-25
tags: [js]
categories: [设计模式]
---
# 构建者/创建者/创造者 模式
```js
//ES5
function Student(){}

function StudentBuilder(){
    this.student = new Student();
}
StudentBuilder.prototype.setName = function(name){
    //可以添加中间层，例如统计/验证规则/入口管理等，防止出现在其他地方设置属性，导致出现难以查找的bug
    this.student.name = name;
}
StudentBuilder.prototype.setAge = function(age){
    this.student.age = age;
}
StudentBuilder.prototype.setGender = function(gender){
    this.student.gender = gender;
}
StudentBuilder.prototype.build = function(){
    return this.student;
}

var studentBuilder =new StudentBuilder();
studentBuilder.setName('wangsi');
studentBuilder.setAge(99);
studentBuilder.setGender('男');
studentBuilder.build();

//ES6
var StudentCreatedCount = 0;
var StudentBuiltCount = 0;
class Student{
    constructor(){

    }
}
class StudentBuilder{
    constructor(){
        StudentCount ++;
        this.student = new Student()
    }
    setName(name){ 
        this.student.name = name 
    }
    setAge(age){ 
        this.student.age = age; 
    }
    setGender(gender){ 
        this.student.gender = gender;
    }
    build(){
        console.log(`has created ${StudentCreatedCount} student , has built {StudentBuiltCount} student`)
        return this.student
    }
}

var a = new StudentBuilder();
var b = new StudentBuilder();
var c = new StudentBuilder();
var d = new StudentBuilder();
var e = new StudentBuilder();
var f = new StudentBuilder();
var g = new StudentBuilder();
a.build();
b.build();
c.build();
d.build();
e.build();
f.build();
g.build();
//has created 7 student , has built 1 student
//...
//has created 7 student , has built 7 student

```