---
title: 快速排序
date: 2019-06-25
tags: [js]
categories: [算法]
---
# 快速排序

```js
let quickSort=(arr)=>{
    if(arr.length ===0){
        return []
    }
    let left = [];
    let right = [];
    let pivot = arr[0];
    for(let i=1,l=arr.length; i<l; i++){
        if( arr[i] < pivot ){
            left.push(arr[i])
        }else{
            right.push(arr[i])
        }
    }

    return quickSort(left).concat(pivot,quickSort(right))
}
console.log(quickSort([1,0,3,6,9,454,89,56,123,54,8789,31,21,498788,45,23123,456,897,1231,546548,78994]))
```