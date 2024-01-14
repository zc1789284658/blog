# 快速排序

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
