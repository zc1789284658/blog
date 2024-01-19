# Array

## 归并排序

分治策略：拆分为子序列，子序列排序完后合并为大序列

```js
let count1 = 0;
let count2 = 0;

let mergeSort = (arr) => {
  if (arr.length < 2) {
    return arr;
  }
  let middle = Math.floor(arr.length / 2);
  let left = arr.splice(0, middle);

  console.log("count1", count1++);
  return merge(mergeSort(left), mergeSort(arr));
};

let merge = (left, right) => {
  var result = [];

  while (left.length && right.length) {
    if (left[0] < right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }

  console.log("count2", count2++);
  return result.concat(left, right);
};

console.log(mergeSort([10, 5, 6, 8, 9, 7, 1, 5, 68, 9, 158, 8998, 9, 5456]));
```

## 快速排序

通过一趟排序将要排序的数据分割成独立的两部分，其中一部分的所有数据都比另外一部分的所有数据都要小，然后再按此方法对这两部分数据分别进行快速排序，整个排序过程可以递归进行，以此达到整个数据变成有序序列。

```js
let quickSort = (arr) => {
  if (arr.length === 0) {
    return [];
  }
  let left = [];
  let right = [];
  let pivot = arr[0];
  for (let i = 1, l = arr.length; i < l; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return quickSort(left).concat(pivot, quickSort(right));
};
console.log(
  quickSort([
    1, 0, 3, 6, 9, 454, 89, 56, 123, 54, 8789, 31, 21, 498788, 45, 23123, 456,
    897, 1231, 546548, 78994,
  ])
);
```

## 希尔排序

希尔排序是把记录按下标的一定增量分组，对每组使用直接插入排序算法排序；随着增量逐渐减少，每组包含的关键词越来越多，当增量减至 1 时，整个文件恰被分成一组，算法便终止

```js
let shallSort = (arr) => {
  let increment = arr.length;
  let tmp;
  do {
    increment = Math.floor(increment / 3) + 1;
    for (let i = increment, l = arr.length; i < l; i++) {
      if (arr[i] < arr[i - increment]) {
        tmp = arr[i];
        for (var j = i - increment; j >= 0 && tmp < arr[j]; j -= increment) {
          arr[j + increment] = arr[j];
        }
        arr[j + increment] = tmp;
      }
    }
    console.log(increment, arr);
  } while (increment > 1);

  return arr;
};

console.log(
  shallSort([2, 1, 5, 3, 4, 66, 213, 5121, 5, 12, 1, 5, 6, 78, 213, 15])
);
```
