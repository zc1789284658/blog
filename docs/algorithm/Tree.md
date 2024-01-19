# Tree

## 判断两棵树相等

::: code-group

```js [深度优先]
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
  if (p === null && q === null) return true;
  if (p === null || q === null) return false;
  if (p.val !== q.val) return false;

  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};
```

```js [广度优先]
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
  let queue1 = [p];
  let queue2 = [q];

  while (queue1.length > 0 && queue2.length > 0) {
    for (let i = 0; i < queue1.length; i++) {
      if (queue1[i] === null && queue2[i] === null) {
        continue;
      }
      if (queue1[i] === null || queue2[i] === null) return false;
      if (queue1[i].val !== queue2[i].val) return false;
    }
    queue1 = queue1.map((_) => (_ === null ? [] : [_.left, _.right])).flat();
    queue2 = queue2.map((_) => (_ === null ? [] : [_.left, _.right])).flat();
  }
  return true;
};
```

:::
