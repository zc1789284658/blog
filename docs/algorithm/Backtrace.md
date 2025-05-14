# Backtrace(回溯)

## 实质

回溯 = dfs + 剪枝

## 样板代码

```js
function solution(...args) {
  const result = []; //结果数组
  const tmp = []; //临时回溯数组，需要多次操作（选中/不选中临时项）

  // 需要将tmp加入到result的判断函数
  const shouldAddToResult = () => {
    return Math.random() > 0.5;
  };

  const shouldReturn = () => {
    return Math.random() > 0.5;
  };

  const dfs = (curDepth) => {
    // 剪枝条件1
    if (shouldAddToResult()) {
      result.push([...tmp]);
      return;
    }

    // 其他剪枝条件
    if (shouldReturn()) {
      return;
    }

    // 选中当前项进行
    tmp.push(curDepth);
    dfs(curDepth + 1); //处理下一个选项
    // 不选中当前项
    tmp.pop();
    dfs(curDepth + 1); //处理下一个选项
  };

  dfs(0); // 起始条件，根据需求进行赋值0或者其他数值

  return result;
}
```

## 题例

### [leetcode77:组合](https://leetcode.cn/problems/combinations/description/)

```js
// 给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。

// 你可以按 任何顺序 返回答案。

// 示例 1：

// 输入：n = 4, k = 2
// 输出：
// [
//   [2,4],
//   [3,4],
//   [2,3],
//   [1,2],
//   [1,3],
//   [1,4],
// ]
// 示例 2：

// 输入：n = 1, k = 1
// 输出：[[1]]

/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
  const result = [];
  const tmp = [];

  const dfs = (curDepth) => {
    // 退出条件1
    if (tmp.length === k) {
      result.push([...tmp]);
      return;
    }
    // 退出条件2
    if (curDepth > n) return;

    // 选择curDepth
    tmp.push(curDepth);
    dfs(curDepth + 1);
    // 不选择curDepth
    tmp.pop();
    dfs(curDepth + 1);
  };

  dfs(1);
  return result;
};
```

### [leetcode78:子集](https://leetcode.cn/problems/subsets/)

```js
// 给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。

// 解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。

// 示例 1：
// 输入：nums = [1,2,3]
// 输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

// 示例 2：
// 输入：nums = [0]
// 输出：[[],[0]]

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  const result = [];
  const tmp = [];

  const l = nums.length;

  const dfs = (curDepth) => {
    // 符合结束条件，将tmp加入到result
    if (curDepth === l) {
      result.push([...tmp]);
      return;
    }

    // 选择nums[curDepth]
    tmp.push(nums[curDepth]);
    dfs(curDepth + 1);
    // 不选择nums[curDepth]
    tmp.pop();
    dfs(curDepth + 1);
  };

  dfs(0);

  return result;
};
```

### [leetcode79:单词搜索](https://leetcode.cn/problems/word-search/description/)

```js
// 给定一个 m x n 二维字符网格 board 和一个字符串单词 word 。如果 word 存在于网格中，返回 true ；否则，返回 false 。
// 单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。
// 输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
// 输出：true

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
  const offsets = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const wordL = word.length;

  /**
   * @param {number} x 当前字母x坐标
   * @param {number} y 当前字母y坐标
   * @param {number} s 当前匹配到了word的哪个下标
   */
  function dfs(x, y, s) {
    if (s === wordL) return true; //匹配到了word的最后一个下标，表示全部匹配完成
    if (s > wordL || outsideBoard(x, y)) return false; //越界，进行剪枝

    if (board[x][y] !== word[s]) return false; //当前字母不匹配，进行剪枝

    // 题目还有一个额外的要求，就是每个格子只能用一次，所以我们需要记录已经走过的格子。这一步可以用一个和 board 一比一的二维数组来记录，也可以直接修改 board 网格，把走过的格子用占位符替换，然后在回溯的时候再恢复。
    const char = board[x][y];
    board[x][y] = "-";

    const res = offsets.some(([ox, oy]) => dfs(x + ox, y + oy, s + 1));
    board[x][y] = char;
    return res;
  }

  // 剪枝条件1
  function outsideBoard(x, y) {
    return x < 0 || x >= board.length || y < 0 || y >= board[0].length;
  }

  // board中某行存在dfs为true
  return board.some((row, x) => row.some((cell, y) => dfs(x, y, 0)));
};
```

### [leetcode90:子集 II](https://leetcode.cn/problems/subsets-ii/)

```js
// 给你一个整数数组 nums ，其中可能包含重复元素，请你返回该数组所有可能的 子集（幂集）。
// 解集 不能 包含重复的子集。返回的解集中，子集可以按 任意顺序 排列。

// 示例 1：
// 输入：nums = [1,2,2]
// 输出：[[],[1],[1,2],[1,2,2],[2],[2,2]]

// 示例 2：
// 输入：nums = [0]
// 输出：[[],[0]]
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function (nums) {
  const result = [];
  const tmp = [];

  const numsL = nums.length;

  nums.sort();

  const dfs = (cur) => {
    if (cur === nums.length) {
      result.push([...tmp]);
      return;
    }

    tmp.push(nums[cur]);
    dfs(cur + 1);
    tmp.pop();

    while (cur + 1 < numsL && nums[cur + 1] == nums[cur]) cur++;

    dfs(cur + 1);
  };

  dfs(0);

  return result;
};
```
