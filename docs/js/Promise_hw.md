---
title: 手写Promise(部分功能)
date: 2019-06-25
tags: [js]
categories: [前端]
---
# 手写Promise(部分功能)
```js
function Promise(fn) {
    var state = 'pending',
        value = null,
        callbacks = [];

    this.then = function (onFulfilled, onRejected) {
        return new Promise(function (resolve, reject) {
            handle({
                onFulfilled: onFulfilled || null,
                onRejected: onRejected || null,
                resolve: resolve,
                reject: reject
            });
        });
    };

    function handle(callback) {
        if (state === 'pending') {
            callbacks.push(callback);
            return;
        }

        var cb = state === 'fulfilled' ? callback.onFulfilled : callback.onRejected,
            ret;
        if (cb === null) {
            cb = state === 'fulfilled' ? callback.resolve : callback.reject;
            cb(value);
            return;
        }
        try {
            ret = cb(value);
            callback.resolve(ret);
        } catch (e) {
            callback.reject(e);
        }
    }

    function resolve(newValue) {
        if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
            var then = newValue.then;
            if (typeof then === 'function') {
                then.call(newValue, resolve, reject);
                return;
            }
        }
        state = 'fulfilled';
        value = newValue;
        execute();
    }

    function reject(reason) {
        state = 'rejected';
        value = reason;
        execute();
    }

    function execute() {
        setTimeout(function () {
            callbacks.forEach(function (callback) {
                handle(callback);
            });
        }, 0);
    }

    fn(resolve, reject);
}


new Promise(function (resolve, reject) {
    console.log('start')
    setTimeout(() => {
        reject(200)
    }, 2000)

}).then((res) => {
    console.log('then resolve', res)
    return ++res

}, (rej) => {
    console.log('then reject', rej)
    return ++rej

}).then((res) => {
    console.log('then2 resolve', res)
    return ++res

}, (rej) => {
    console.log('then2 reject', rej)
    return ++rej

})
```