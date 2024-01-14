# 希尔排序

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
