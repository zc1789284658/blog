## web 性能优化

### 资源方向

- 图片
    - 压缩
    - 小图片转 `base64` 嵌入页面, 如 [webpack/asset-modules](https://webpack.js.org/guides/asset-modules/)
    - 使用 `fontCss` 或者 `svg`（个人更习惯 svg）
    - ~~使用 css-spirit 整合图片资源~~
- 文件 `prefetch/preload`
  - prefetch : 将来可能会用到，空闲加载
  - preload : 关键资源，优先加载
- 懒加载 ：需要使用时再发请求加载
    - 图片懒加载[如IntersectionObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)
- `css/js` 合并压缩：看具体情况，单文件太大也不是好事
- 大文件根据需求设置 `<script src='XX' async />` `<script src='XX' defer />`
    - `defer` onload之后执行
    - `async` onload之前，`script load`后直接执行
- cdn
- 服务器开启 gzip 等压缩算法压缩资源文件
- 请求合并
    - BFF（backend-for-frontend）
    - [graphql](https://graphql.org/)
- 打包工具合理分包（如webpack的`chunk/external/dll`）
- 合理的[Cache-Control](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cache-Control)


### js 方向

- 使用[wasm](https://developer.mozilla.org/zh-CN/docs/WebAssembly)
    - [使用 wasm 提高前端20倍的 md5 计算速度](https://juejin.cn/post/7319541565318398003)
- 使用事件委托处理（现代框架很多都自带，如`React/Vue`）
  - 子元素数量很多，并且绑定事件很多时，事件绑定到父元素，
  - 父元素捕获后，根据子元素的属性进行函数处理，如绑定到 data-xxx
- [requestIdleCallback](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback)
- [requestAnimationFrame](https://developer.mozilla.org/zh-CN/docs/Web/API/window/requestAnimationFrame)
- 递归循环优化
    ::: details
    - js 递归拆分
    - 减少递归的使用，尤其是大流程
    - 递归的每一步堆栈信息都会保留，递归的深度太深时，会导致堆栈溢出
    - 换成尾递归，然而，并不是所有的 js 解释器都支持尾递归优化
    - **所有的递归都是可以优化成栈+循环的，将尾递归优化成栈+循环**。
    - 使用缓存，但并不是所有递归都可以使用缓存
        ::: details
        ```js
            function memorizer(fn, cache) {
                cache = cache || {};
                var shell = function(arg) {
                    if (!cache.hasOwnProperty(arg)) {
                    cache[arg] = fn(shell, arg);
                    }
                    return cache[arg];
                };
                return shell;
            }
        ```
        :::
    - 换成迭代,如[使用迭代优化归并排序](#merge)，但是迭代会引入大量循环，酌情使用
        ::: details
        ```js
        //优化前-------------------------------
        function merge(left, right) {
        var result = [];
        while (left.length > 0 && right.length > 0) {
            if (left[0] < right[0]) {
            result.push(left.shift());
            } else {
            result.push(right.shift());
            }
        }
        return result.concat(left).concat(right);
        }
        //采用递归实现的归并排序算法
        function mergeSort(items) {
        if (items.length == 1) {
            return items;
        }
        var middle = Math.floor(items.length / 2),
            left = items.slice(0, middle),
            right = items.slice(middle);
        return merge(mergeSort(left), mergeSort(right));
        }
        //使用迭代替代递归：引入大量循环-------------------------------
        function mergeSortOptimized(items) {
        if (items.length == 1) {
            return items;
        }
        var work = [];
        for (var i = 0, len = items.length; i < len; i++) {
            work.push([items[i]]);
        }
        work.push([]); //in case of odd number of items
        //是一个聚合的过程：总长度48，从48->25->13->7->3->3->1
        for (var lim = len; lim > 1; lim = (lim + 1) / 2) {
            for (var j = 0, k = 0; k < lim; j++, k += 2) {
            work[j] = merge(work[k], work[k + 1]);
            console.log(j,k,k+1)
            }
            work[j] = []; //in case of odd number of items
        }
        
        return work[0];
        }
        //TEST
        mergeSort([12, 125, 98, 6, 25, 123, 4, 25, 68, 8, 6, 1, 232, 4]);
        mergeSortOptimized([12, 125, 98, 6, 25, 123, 4, 25, 68, 8, 6, 1, 232, 4]);
        ```
        :::
    :::

### 包管理器
- [pnpm](https://pnpm.io/)

### 打包工具
- [Webpack5](https://webpack.js.org/)
- [Rspack](https://www.rspack.dev/zh/guide/introduction.html)
- [Vite](https://vitejs.dev/)
- [Rollup](https://rollupjs.org/)
- [Turbopack](https://turbo.build)
- Rolldown
- [Esbuild](https://esbuild.github.io/)
- [SWC](https://swc.rs/)
- [Farm](https://github.com/farm-fe/farm)
- [Biome](https://github.com/biomejs/biome)

### 工具方向
- tree-shaking（webpack5自带）
- 首屏分离/骨架屏
- 懒加载

### 框架方向
- vue : mixin/render/slot/  ->  setup/composition-api
- react: mixin/HOC/jsx      ->  hooks