---
title: 组合模式
date: 2019-06-25
tags: [js]
categories: [设计模式]
---
# 组合模式
> 组合模式就是用小的子对象来构建更大的对象，如树结构。组合模式将对象组合成树形结构，以表示“部分--整体”的层次结构。除了用来表示树形结构外，另一个好处是通过多态使得用户对单个对象和组合对象的使用具有一致性。

如[宏命令](./command#macroCommand)中，macroCommand下包含了一组子命令，并且这些子命令都含有和macroCommand相同的函数excute。

例子：
- 文件夹，多个file组成一个fileFolder
```js
class Folder {
    constructor(name) {
        this.name = name
        this.parent = null
        this.files = []
    }
    add(file) { 
        file.parent = this
        this.files.push(file)
     }
    scan() {
        console.log(`scan folder -  ${this.name}`)
        //for循环扫描子文件夹以及文件
        this.files.forEach(e=>{
            e.scan()
        })
    }
}

class File {
    constructor(name) {
        this.name = name
        this.parent = null
    }
    scan(){
        console.log(`scaned file -  ${this.name}`)
    }
}

var top = new Folder('top')
var level1_folder = new Folder('1-folder')
level1_folder.add(new File('2-file'))

top.add(level1_folder)
top.add(new File('1-file'))

top.scan()
/** 
scan folder -  top
scan folder -  1-folder
scaned file -  2-file
scaned file -  1-file 
*/
```
注意点：
1. 组合模式不是父子关系
    - 组合模式是HAS-A（聚合）的关系，而不是IS-A。组合对象包括一组Leaf，但Leaf并不是Composite的子类。组合对象把请求委托给它所包含的所有Leaf，它们能够合作的关键是拥有统一的接口
2. 对Leaf操作的一致性
    - 需要一致的操作接口，以及一致的操作方式，不能说只有符合xxx条件才执行该Leaf的接口
3. 双向映射关系
    - 如果会有某些Leaf会同时归属多个Composite的情况，需要考虑重复执行该Leaf的情况
4. 用[职责链模式](./ChainOfResponsibility.md)提高组合模式性能
    - 添加归属标识，从而减轻进行完整遍历带来的性能压力