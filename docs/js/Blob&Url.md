# Blob & Url

[引发场景](./index.md)

拓展
- File​Reader
- MediaSource
- Data URI

<!--more-->

## URL.create​ObjectURL()
URL.createObjectURL() 静态方法会创建一个 DOMString，其中包含一个表示参数中给出的对象的URL。这个 URL 的生命周期和创建它的窗口中的 document 绑定。这个新的URL 对象表示指定的 File 对象或 Blob 对象。

Note: 此特性在 Web Worker 中可用。

注意：此特性在 Service Worker 中不可用，因为它有可能导致内存泄漏。

### **内存管理**
在每次调用 createObjectURL() 方法时，都会创建一个新的 URL 对象，即使你已经用相同的对象作为参数创建过。当不再需要这些 URL 对象时，每个对象必须通过调用 URL.revokeObjectURL() 方法来释放。浏览器会在文档退出的时候自动释放它们，但是为了获得最佳性能和内存使用状况，你应该在安全的时机主动释放掉它们。

---

## URL.revoke​ObjectURL()
静态方法用来释放一个之前已经存在的、通过调用 URL.createObjectURL() 创建的 URL 对象。当你结束使用某个 URL 对象之后，应该通过调用这个方法来让浏览器知道不用在内存中继续保留对这个文件的引用了。

你可以在 sourceopen 被处理之后的任何时候调用 revokeObjectURL()。这是因为 createObjectURL() 仅仅意味着将一个媒体元素的 src 属性关联到一个 MediaSource 对象上去。调用revokeObjectURL() 使这个潜在的对象回到原来的地方，允许平台在合适的时机进行垃圾收集。

此特性在 [Web Worker](./WebWorker.md) 中可用。