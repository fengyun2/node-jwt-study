# node-jwt-study

>http请求凭证

## 说明

一个`JWT`被周期(period)分成了三部分。`JWT`是URL-safe, 意味着可以用来查询字符参数。(也就是可以脱离URL, 不用考虑URL的信息)

### `JWT` 的第一部分是一个 js 对象, 表明 `JWT` 的加密方法。默认使用 `HS256`

```js
{
  "typ": "JWT",
  "alg": "HS256"
}
```

在加密之后，这个对象变成了一个字符串：

```js
eyJ0eXAiOiJKV1QiLA0KICJhbGciOiJIUzI1NiJ9
```

### `JWT` 的第二部分是 token 的核心, 他也是一个 js 对象, 包含了一些信息。有些是必须,有一些是选择性的。

```js
{
  "iss": "ly",
  "exp": 1479660947,
  "http://example.com/is_root": true
}
```

这被称为JWT Claims Set。因为这篇文章的目的，我们将忽视第三个参数。但是你可以阅读这篇文章.这个iss是issuer的简写，表明请求的实体。通常意味着请求API的用户。exp是expires的简写，是用来限制token的生命周期。一旦加密，JSON token就像这样：

```js
eyJpc3MiOiJqb2UiLA0KICJleHAiOjEzMDA4MTkzODAsDQogImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ
```

整个的JWT是这样的

```js
eyJ0eXAiOiJKV1QiLA0KICJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJqb2UiLA0KICJleHAiOjEzMDA4MTkzODAsDQogImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ.dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk
```

在规范中，有一些选择性的附加属性。有iat表明什么时候token被半吧，nbf去验证在什么时间之前token无效，和aud去指明这个token的收件人是谁。

##BUG

### 2016/11/21

- 1. 不明白为啥 `fetch` 方法中的 `post` 请求会无法在 chrome 中查看。