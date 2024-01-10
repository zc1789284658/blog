# Cookie

HTTP Cookie（也叫 Web Cookie 或浏览器 Cookie）是服务器发送到用户浏览器并保存在本地的一小块数据。浏览器会存储 cookie 并在下次向同一服务器再发起请求时携带并发送到服务器上。

通常，它用于告知服务端两个请求是否来自同一浏览器——如保持用户的登录状态。Cookie 使基于无状态的 HTTP 协议记录稳定的状态信息成为了可能。

Cookie 曾一度用于客户端数据的存储，因当时并没有其他合适的存储办法而作为唯一的存储手段，但现在推荐使用现代存储 API。
由于服务器指定 Cookie 后，浏览器的**每次请求都会携带 Cookie 数据**，会带来额外的性能开销（尤其是在移动环境下）。
新的浏览器 API 已经允许开发者直接将数据存储到本地，如使用 Web storage API（localStorage 和 sessionStorage）或 IndexedDB 。

## 创建 Cookie

服务器收到 HTTP 请求后，服务器可以在响应标头里面添加一个或多个 Set-Cookie 选项。浏览器收到响应后通常会保存下 Cookie，并将其放在 HTTP Cookie 标头内，向同一服务器发出请求时一起发送。你可以指定一个过期日期或者时间段之后，不能发送 cookie。你也可以对指定的域和路径设置额外的限制，以限制 cookie 发送的位置。

```xml
<!-- http response header -->
<!-- Set-Cookie: <cookie-name>=<cookie-value> -->
HTTP/1.0 200 OK
Content-type: text/html
Set-Cookie: yummy_cookie=choco       // [!code ++]
Set-Cookie: tasty_cookie=strawberry  // [!code ++]

```

```xml
<!-- http request header while has cookie -->
GET /sample_page.html HTTP/1.1
Host: www.example.org
Cookie: yummy_cookie=choco; tasty_cookie=strawberry  // [!code ++]
```

## 定义 Cookie 的生命周期

Cookie 的生命周期可以通过两种方式定义：

- 会话期 Cookie 会在当前的会话结束之后删除。浏览器定义了`当前会话`结束的时间，一些浏览器重启时会使用会话恢复。这可能导致会话 cookie 无限延长。
- 持久性 Cookie 在过期时间（Expires）指定的日期或有效期（Max-Age）指定的一段时间后被删除。

例如：

```xml
<!-- response header -->
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT;
```

## 限制访问 Cookie

有两种方法可以确保 `Cookie` 被安全发送，并且不会被意外的参与者或脚本访问：`Secure` 属性和 `HttpOnly` 属性。

标记为 `Secure` 的 Cookie 只应通过被 HTTPS 协议加密过的请求发送给服务端。它永远不会使用不安全的 HTTP 发送（本地主机除外），这意味着[中间人](https://developer.mozilla.org/zh-CN/docs/Glossary/MitM)攻击者无法轻松访问它。不安全的站点（在 URL 中带有 http:）无法使用 `Secure` 属性设置 cookie。但是，`Secure` 不会阻止对 cookie 中敏感信息的访问。例如，有权访问客户端硬盘（或，如果未设置 `HttpOnly` 属性，则为 JavaScript）的人可以读取和修改它。

JavaScript `Document.cookie` API 无法访问带有 `HttpOnly` 属性的 cookie；此类 Cookie 仅作用于服务器。例如，持久化服务器端会话的 Cookie 不需要对 JavaScript 可用，而应具有 `HttpOnly` 属性。此预防措施有助于缓解跨站点脚本（XSS） (en-US)攻击。

示例：

```xml
<!-- response header -->
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly
```

## CSRF(Cross-site request forgery)

[https://developer.mozilla.org/en-US/docs/Web/Security/Types_of_attacks](https://developer.mozilla.org/en-US/docs/Web/Security/Types_of_attacks)

CSRF（有时也称为 XSRF）是一类相关的攻击。攻击者在未经用户同意或不知情的情况下，导致用户的浏览器向网站后端执行请求。攻击者可以使用 XSS 有效负载发起 CSRF 攻击。

维基百科提到了CSRF的一个很好的例子。在这种情况下，有人包含的图片并不是真正的图片（例如，在未经过滤的聊天或论坛中），而是向银行的服务器发出取款请求：

```html
<img src="https://bank.example.com/withdraw?account=bob&amount=1000000&for=mallory" />
```

现在，如果您已登录您的银行帐户并且您的 cookie 仍然有效（并且没有其他验证），您将在加载包含此图像的 HTML 后立即转账。对于需要 POST 请求的终结点，可以在加载页面时以编程方式触发 `<form>` 提交（可能在不可见的 `<iframe>` 中）：

```html
<form action="https://bank.example.com/withdraw" method="POST">
  <input type="hidden" name="account" value="bob" />
  <input type="hidden" name="amount" value="1000000" />
  <input type="hidden" name="for" value="mallory" />
</form>
<script>
  window.addEventListener("DOMContentLoaded", () => {
    document.querySelector("form").submit();
  });
</script>

```

应该使用一些技术来防止这种情况发生：

- GET 端点应是幂等的 - 执行更改且不检索数据的操作应需要发送 POST（或其他 HTTP 方法）请求。POST 端点不应互换接受查询字符串中带有参数的 GET 请求。
- 服务器应向浏览器提供会话唯一的 CSRF 令牌。然后，每当浏览器发布表单时（在元素的隐藏输入字段中），都可以包含此令牌。对于所有可能执行操作的非 GET 请求，服务器会将发送的令牌与其存储的会话值进行比较。如果存在不匹配，则中止请求。
- 这种保护方法依赖于攻击者无法预测用户分配的 CSRF 令牌。应在登录时重新生成令牌。
- 用于敏感操作的 Cookie（如会话 Cookie）的生存期应较短，并将 SameSite 属性设置为 Strict 或 Lax。（请参阅上面的 SameSite Cookie）。在支持的浏览器中，这将确保会话 cookie 不会与跨站点请求一起发送，因此该请求实际上未经应用程序服务器的身份验证。
- 应部署 CSRF 令牌和 SameSite Cookie。这可确保所有浏览器都受到保护，并在 SameSite Cookie 无法提供帮助时提供保护（例如，来自单独子域的攻击）。
- 各种验证码/2FA等其他验证手段