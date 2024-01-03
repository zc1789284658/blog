# 希尔排序

```js
let shallSort = (arr) => {
    let increment = arr.length;
    let tmp;
    do {
        increment = Math.floor(increment / 3) + 1;
        for (let i = increment, l = arr.length; i < l; i++) {
            if (arr[i] < arr[i - increment]) {
                tmp = arr[i]
                for (var j = i - increment; j >= 0 && tmp < arr[j]; j -= increment) {
                    arr[j + increment] = arr[j];
                }
                arr[j + increment] = tmp
            }

        }
        console.log(increment,arr)
    } while (increment > 1)
    
    return arr;
}

console.log(shallSort([2, 1, 5, 3, 4, 66, 213, 5121, 5, 12, 1, 5, 6, 78, 213,15]))
```