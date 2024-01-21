# Promise

## withResolvers

`Promise.withResolvers()` 静态方法返回一个对象，其包含一个新的 `Promise` 对象和两个函数，用于解决或拒绝它，对应于传入给 `Promise()` 构造函数执行器的两个参数。

### 示例

```js
async function* readableToAsyncIterable(stream) {
  let { promise, resolve, reject } = Promise.withResolvers(); // [!code focus]
  stream.on("error", (error) => reject(error));
  stream.on("end", () => resolve());
  stream.on("readable", () => resolve());

  while (stream.readable) {
    await promise;
    let chunk;
    while ((chunk = stream.read())) {
      yield chunk;
    }
    ({ promise, resolve, reject } = Promise.withResolvers());
  }
}
```

### 手写

```js
Promise.prototype.withResolvers = () => {
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
};
```

#### polyfill(core-js)

[core-js](https://github.com/tc39/proposal-promise-with-resolvers/blob/main/polyfills.js)

```js
export function withResolvers() {
  if (!this) throw new TypeError("Promise.withResolvers called on non-object");
  const out = {};
  out.promise = new this((resolve_, reject_) => {
    out.resolve = resolve_;
    out.reject = reject_;
  });
  return out;
}
```

### 可适用非 Promise 构造函数

```js
class NotPromise {
  constructor(executor) {
    // “resolve”和“reject”函数和原生的 promise 的行为完全不同
    // 但 Promise.withResolvers() 只是返回它们，就像是原生的 promise 一样
    executor(
      (value) => console.log("以", value, "解决"),
      (reason) => console.log("以", reason, "拒绝")
    );
  }
}

const { promise, resolve, reject } = Promise.withResolvers.call(NotPromise);
resolve("hello");
// 输出：以 hello 解决
```

## race

Creates a `Promise` that is `resolved` or `rejected` when `any` of the provided Promises are `resolved` or `rejected`.

### 手写

```js
const race = (promises) => {
  return new Promise((r, rj) => {
    promises.forEach((_promise) => {
      _promise.then((_r) => r(_r)).catch((e) => rj(e));
    });
  });
};
```

### 使用 Promise.race() 实现请求超时

```js
const data = Promise.race([
  fetch("/api"),
  new Promise((resolve, reject) => {
    // 5 秒后拒绝
    setTimeout(() => reject(new Error("请求超时")), 5000);
  }),
])
  .then((res) => res.json())
  .catch((err) => displayError(err));
```

### 使用 race() 来确定一个已存在的 promise 状态

```js
function promiseState(promise) {
  const pendingState = { status: "pending" };

  return Promise.race([promise, pendingState]).then(
    (value) =>
      value === pendingState ? value : { status: "fulfilled", value },
    (reason) => ({ status: "rejected", reason })
  );
}
// if promise is pending, then return pending
// if promise is fulfilled or rejected, return fulfilled or rejected
```

## all

Creates a `Promise` that is resolved with an array of results when `all of the provided Promises resolve`, or rejected when `any Promise is rejected`.

::: warning Return value
if the `iterable` passed is empty, return already `fulfilled`
:::

```js
const all = (promises) => {
  let fulfilledCount = 0;
  const maxFulfilledCount = promises.length;
  const results = [];
  return new Promise((r, rj) => {
    if (promises.length === 0) r(results); // [!code warning]

    promises.forEach((_promise, index) => {
      Promise.resolve(_promise)
        .then((v) => {
          fulfilledCount++;
          results[index] = v;
          if (fulfilledCount === maxFulfilledCount) {
            r(results);
          }
        })
        .catch((e) => {
          rj(e);
        });
    });
  });
};
```

## allSettled

::: warning Return value

- Already fulfilled, if the `iterable` passed is empty.
- Asynchronously fulfilled, when **_all promises_** in the given `iterable` have settled (either fulfilled or rejected). The fulfillment value is an array of objects, each describing the outcome of one promise in the `iterable`, in the order of the promises passed, regardless of completion order. Each outcome object has the following properties:
  status
  :::

```js
Promise.allSettled([
  Promise.resolve(33),
  new Promise((resolve) => setTimeout(() => resolve(66), 0)),
  99,
  Promise.reject(new Error("an error")),
]).then((values) => console.log(values));

// [
//   { status: 'fulfilled', value: 33 }, // [!code focus]
//   { status: 'fulfilled', value: 66 }, // [!code focus]
//   { status: 'fulfilled', value: 99 }, // [!code focus]
//   { status: 'rejected', reason: Error: an error } // [!code focus]
// ]
```

### 手写

```js
const allSettled = (promises) => {
  let completedCount = 0;
  const maxCompleteCount = promises.length;
  const results = [];
  return new Promise((r) => {
    if (promises.length === 0) r(results);

    promises.forEach((_promise, index) => {
      Promise.resolve(_promise)
        .then((r) => {
          results[index] = { status: "fulfilled", value: r };
        })
        .catch((e) => {
          results[index] = { status: "rejected", reason: e };
        })
        .finally(() => {
          completedCount++;
          if (completedCount === maxCompleteCount) {
            r(results);
          }
        });
    });
  });
};
```

## any

The `Promise.any()` static method takes an `iterable` of promises as input and returns a single `Promise`. This returned promise fulfills when `any of the input's promises fulfills`, with this first fulfillment value. It rejects when `all of the input's promises reject` (including when an empty iterable is passed), with an AggregateError containing an array of rejection reasons.

::: warning Return value

- Already rejected, if the iterable passed is empty.
- Asynchronously fulfilled, when `any` of the promises in the given iterable `fulfills`. The fulfillment value is the fulfillment value of the first promise that was fulfilled.
- Asynchronously rejected, when `all` of the promises in the given iterable `reject`. The rejection reason is an `AggregateError` containing an array of rejection reasons in its errors property. The errors are in the order of the promises passed, regardless of completion order. If the iterable passed is non-empty but contains no pending promises, the returned promise is still asynchronously (instead of synchronously) rejected.
  :::

### 手写

```js
class AggregateError extends Error {
  constructor(props) {
    this.message = "AggregateError";
    this.name = "AggregateError";
    Object.assign(this, props);
  }
}

const any = (promises) => {
  let rejectedCount = 0;
  const maxRejectCount = promises.length;
  const errors = [];
  return new Promise((r, rj) => {
    if (promises.length === 0) rj(errors);

    promises.forEach((_promise, index) => {
      Promise.resolve(_promise)
        .then((v) => r(v))
        .catch((e) => {
          rejectedCount++;
          errors[index] = e;
        })
        .finally(() => {
          if (rejectedCount === maxRejectCount) {
            rj(
              new AggregateError({
                errors,
              })
            );
          }
        });
    });
  });
};
```
