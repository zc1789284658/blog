# User Behavior

用户行为记录对于产品来说至关重要，下面就让我们来看看有哪些方式可供我们录制web用户的行为吧

## 方案

### rrweb

[https://www.rrweb.io/](https://www.rrweb.io/)
Sentry的回放功能基于此

### 页面截图

如`html2canvas`
存在的问题
- 部分场景无法截图/样式等问题
- 图片体积大
- 图片无法二次加工

### webrtc 录制

存在问题：
- 需要用户允许
- 视频体积大
- 只有视频，无法操作

### clarity

[https://clarity.microsoft.com/](https://clarity.microsoft.com/)
基于开放源代码做的，很可能就是基于rrweb做的，要确定的话需要进一步确定

主要api：
- `getDisplayMedia()`
- `MediaRecorder()`
- `ondataavailable`

## 方案对比

| 对比内容   | 视频录制                | 页面截图             | Dom 快照录制              |
| ---------- | ----------------------- | -------------------- | ------------------------- |
| 开源库     | WebRTC 原生支持         | html2canvas          | rrweb                     |
| 用户感知   | 录制有感                | 录制无感             | 录制无感                  |
| 产物大小   | 大                      | 大                   | 相对较小                  |
| 兼容性     | 详见相关 API 兼容性部分 | 场景内容截图无法显示 | 兼容性相对较好            |
| 可操作性   | 弱                      | 弱                   | 强（支持数据脱敏/加密等） |
| 回放清晰度 | 录制时决定，有损录制    | 录制时决定，有损录制 | 高保真                    |
