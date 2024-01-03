---
title: 归并排序
date: 2019-06-25
tags: [js]
categories: [算法]
---
# 归并排序

```js
let count1=0
let count2=0

let mergeSort = (arr) => {
    if (arr.length < 2) {
        return arr;
    }
    let middle = Math.floor(arr.length / 2)
    let left = arr.splice(0, middle)

    console.log('count1',count1++)
    return merge(mergeSort(left),mergeSort(arr))
}

let merge = (left, right) => {
    var result = [];

    while(left.length && right.length){
        if(left[0] < right[0]){
            result.push(left.shift())
        }else{
            result.push(right.shift())
        }
    }

    
    console.log('count2',count2++)
   return result.concat(left,right)

}

console.log(mergeSort([10,5,6,8,9,7,1,5,68,9,158,8998,9,5456]))

```
