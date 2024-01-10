# JWT

[JSON Web Token](https://jwt.io/) (`JWT`, suggested pronunciation `/dʒɒt/`, same as the word "jot") is a proposed Internet standard for creating data with optional signature and/or optional encryption whose payload holds `JSON` that asserts some number of claims. The tokens are signed either using a private secret or a `public/private` key.

## Structure

### Header

Identifies which `algorithm` is used to generate the signature. In the below example, `HS256` indicates that this token is signed using `HMAC-SHA256`.

Typical cryptographic algorithms used are [HMAC](https://en.wikipedia.org/wiki/HMAC) with [SHA-256](https://en.wikipedia.org/wiki/SHA-2) (HS256) and [RSA signature](https://en.wikipedia.org/wiki/Digital_signature) with SHA-256 (RS256). JWA (JSON Web Algorithms) RFC 7518 introduces many more for both authentication and encryption.

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

### Payload

Contains a set of claims. The JWT specification defines seven Registered Claim Names, which are the [standard fields](https://en.wikipedia.org/wiki/JSON_Web_Token#Standard_fields) commonly included in tokens. Custom claims are usually also included, depending on the purpose of the token.

This example has the standard Issued At Time claim (**iat**) and a custom claim (**loggedInAs**).

```json
{
  "loggedInAs": "admin",
  "iat": 1422779638
}
```

### Signature

Securely validates the token. The signature is calculated by encoding the header and payload using [Base64url Encoding](https://en.wikipedia.org/wiki/Base64#URL_applications) [RFC](https://en.wikipedia.org/wiki/Request_for_Comments) [4648](https://datatracker.ietf.org/doc/html/rfc4648) and concatenating the two together with a period separator. That string is then run through the cryptographic algorithm specified in the header. 

This example uses HMAC-SHA256 with a shared secret (public key algorithms are also defined). The Base64url Encoding is similar to base64, but uses different non-alphanumeric characters and omits padding.

```json
HMAC_SHA256(
  secret,
  base64urlEncoding(header) + '.' +
  base64urlEncoding(payload)
)
```

```js
const token = base64urlEncoding(header) + '.' + base64urlEncoding(payload) + '.' + base64urlEncoding(signature)
```

The above data and the secret of "secretkey" creates the token:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dnZWRJbkFzIjoiYWRtaW4iLCJpYXQiOjE0MjI3Nzk2Mzh9.gzSraSYS8EXBxLN_oWnFSRgCzcmJmMjLiuyu5CSpyHI
```

::: warning 注意
1. Header 和 Payload 可逆的，不要在 Payload 中存储敏感信息\
2. Signature不可逆，但是可以被暴力破解(可以定期更换密钥/使用强密钥)，用于校验 Token 有没有被篡改\
3. 尽量避免 JWT 过大
:::

## Compare with Cookie

1. 支持跨域访问：cookie 是不支持跨域的，而 Token 可以放在请求头中传输
2. 无状态：Token 自身包含了用户登录的信息，无需在服务器端存储 session
3. 移动端支持更好：当客户端不是浏览器时，cookie 不被支持，采用 Token 无疑更好
4. 无需考虑 CRSF：不使用 cookie，也就无需考虑 CRSF 的防御