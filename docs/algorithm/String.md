# String

## 重复的子字符串

::: code-group

```js [split to child string]
// 计算s是否
function check(s) {
  const l = s.length;
  if (s.length < 2) return false;

  let duplicateCount = 1;  //重复的次数，最少重复2次

  while (duplicateCount++ < l) {
    if (l % duplicateCount !== 0) {
        continue
    }; 
    let childLength = l / duplicateCount; //单个被重复的子串的长度

    const childs = Array(duplicateCount).fill(1).map((_v,i)=> s.substring(i*childLength, (i+1)*childLength))

    if(childs.every((child)=> child === childs[0])){
        return true
    }
  }

  return false
}

console.log(check("a"));
console.log(check("abab"));
console.log(check("abcabcabc"));
console.log(check("abba"));
console.log(check("ababab"));
console.log(check("abcab"));

// a=xx and b=xx and c>xx  order by d
```

```js [indexOf]

// 原理  n -> n'n'n'  ->  n' |n'n'n' n'n' , 重复的字符串  ，竖线地方为indexOf下标，必然在n.length之前
//       n -> n'a'b'  ->  n'a'b' |n'a'b'  ，不重复的字符串，竖线地方为indexOf下标，必然在n.length
function check(s){
    return (s+s).indexOf(s,1)!==s.length
}


console.log(check("a"));
console.log(check("abab"));
console.log(check("abcabcabc"));
console.log(check("abba"));
console.log(check("ababab"));
console.log(check("abcab"));
```

:::

