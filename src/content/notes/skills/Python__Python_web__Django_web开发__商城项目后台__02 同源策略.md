---
title: "02 同源策略"
category: skills
tags: ["Python", "Web"]
featured: false
source: "Python/Python_web/Django_web开发/商城项目后台/02 同源策略.md"
updated: 2022-07-09
readingTime: 12
summary: "toc  同源策略  同源：协议、端口、主机相同 不同源的客户端脚本js文件在没有明确授权的情况下，不能读写对方资源。只有同一个源的脚本赋予dom、读写cookie、session、ajax等操作的权限  跨域CORS 前端与后端分别是不同..."
---
[toc]

# 同源策略 

同源：协议、端口、主机相同

不同源的客户端脚本(js文件)在没有明确授权的情况下，不能读写对方资源。只有同一个源的脚本赋予dom、读写cookie、session、ajax等操作的权限

# 跨域CORS

前端与后端分别是不同的端口，这就涉及到跨域访问数据的问题，因为浏览器的同源策略，默认是不支持两个不同域名间相互访问数据，而我们需要在两个域名间相互传递数据，这时我们就要为后端添加跨域访问的支持。



## 使用django-cors-headers扩展

[django-cors-headers](https://github.com/adamchainz/django-cors-headers)

```python
# CORS
CORS_ORIGIN_WHITELIST = (
    '127.0.0.1:8080',
    'localhost:8080',
    'www.meiduo.site:8080',
    'api.meiduo.site:8000'
)
CORS_ALLOW_CREDENTIALS = True  # 指明后端是否支持对cookie的操作。
```

1、浏览器会第一次先发送options请求询问后端是否允许跨域，后端查询白名单中是否有这两个域名

2、如过域名在白名单中则在响应结果中告知浏览器允许跨域

3、浏览器第二次发送post请求，携带用户登录数据到后端，完成登录验证操作













# Json Web Token 认证机制

Json web token (JWT), 是为了在网络应用环境间传递声明而执行的一种**基于JSON**的开放标准。特别适用于分布式站点的单点登录（SSO）场景。JWT的声明一般被用来**在身份提供者和服务提供者间传递被认证的用户身份信息**，以便于从资源服务器获取资源，也可以增加一些额外的其它业务逻辑所必须的声明信息，该token也可直接被用于认证，也可被加密。



## 传统的session认证

我们知道，http协议本身是一种无状态的协议，这就意味着用户每一次请求都要向我们的应用提供用户名和密码来进行用户认证。所以为了让我们的应用能识别是哪个用户发出的请求，我们只能**在服务器存储**一份用户登录的信息，这份登录信息会**在响应时传递给浏览器**，告诉其保存为cookie，以便下次请求时发送给我们的应用，这样我们的应用就能识别请求来自哪个用户了,这就是传统的基于session认证。



### 基于session认证所显露的问题

这种基于session的认证使应用本身**很难扩展**，随着不同客户端用户的增加，独立的服务器已无法承载更多的用户，而这时候基于session认证应用的问题就会暴露出来.

**Session**: 每个用户经过我们的应用认证之后，我们的应用都要在服务端做一次记录，以方便用户下次请求的鉴别，**通常而言session都是保存在内存中**，而随着认证用户的增多，服务端的开销会明显增大。

**扩展性**: 用户认证之后，服务端做认证记录，如果认证的记录被保存在内存中的话，**这意味着用户下次请求还必须要在这台服务器上请求才能拿到授权的资源**，这样在分布式的应用上，相应的限制了负载均衡器的能力。这也意味着限制了应用的扩展能力。

**CSRF**: 因为是基于cookie来进行用户识别的, cookie如果被截获，用户就会很容易受到跨站请求伪造的攻击。



## 基于token的鉴权机制

基于token的鉴权机制类似于http协议也是无状态的，它**不需要在服务端保留用户的认证信息或者会话信息**。这就意味着基于token认证机制的应用不需要去考虑用户在哪一台服务器登录了，这就为应用的扩展提供了便利。

流程上是这样的：

- 用户使用用户名密码来请求服务器
- 服务器进行验证用户的信息
- 服务器通过验证发送给用户一个token
- **客户端存储token，并在每次请求时附送上这个token值**
- 服务端验证token值，并返回数据

这个token必须要在每次请求时传递给服务端，它应该保存在请求头里， 另外，服务端要支持`CORS(跨来源资源共享)`策略，一般我们在服务端这么做就可以了`Access-Control-Allow-Origin: *`。

那么我们现在回到JWT的主题上。

## JWT长什么样？

JWT是由三段信息构成的，将这三段信息文本用`.`链接一起就构成了Jwt字符串。就像这样:

```bash
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ
```

头部（header)、载荷（payload)、签证（signature).

- A：Header，{"type":"JWT","alg":"HS256"} 固定
- B：playload，存放信息，比如，用户id，过期时间等等，可以被解密，不能存放敏感信息
- C:  签证，A和B加上秘钥 加密而成，只要秘钥不丢失，可以认为是安全的。jwt 验证，主要就是验证C部分 是否合法。

### header

jwt的头部承载两部分信息：

- 声明类型：这里是jwt
- 声明加密的算法： 通常直接使用 **HMAC SHA256**

完整的头部就像下面这样的JSON：

```json
{
  'typ': 'JWT',
  'alg': 'HS256'
}
```

然后将头部进行**base64**加密（该加密是可以对称解密的),构成了第一部分.

```
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9
```

### payload

载荷就是存放有效信息的地方。这个名字像是特指飞机上承载的货品，这些有效信息包含三个部分

- 标准中注册的声明
- 公共的声明
- 私有的声明

**标准中注册的声明** (建议但不强制使用) ：

- **iss**: jwt签发者
- **sub**: jwt所面向的用户
- **aud**: 接收jwt的一方
- **exp**: jwt的过期时间，这个过期时间必须要大于签发时间
- **nbf**: 定义在什么时间之前，该jwt都是不可用的.
- **iat**: jwt的签发时间
- **jti**: jwt的唯一身份标识，主要用来作为一次性token,从而回避重放攻击。

**公共的声明** ： 公共的声明可以添加任何的信息，一般添加用户的相关信息或其他业务需要的必要信息。但不建议添加敏感信息，因为该部分在客户端可解密.

**私有的声明** ： 私有声明是提供者和消费者所共同定义的声明，一般不建议存放敏感信息，因为base64是对称解密的，意味着该部分信息可以归类为明文信息。

定义一个payload:

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
}
```

然后将其进行base64加密，得到JWT的第二部分。

```
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9
```

### signature

JWT的第三部分是一个签证信息，这个签证信息由三部分组成：

- header (base64后的)
- payload (base64后的)
- secret

这个部分需要base64加密后的header和base64加密后的payload使用`.`连接组成的字符串，然后通过header中声明的加密方式进行加盐`secret`组合加密，然后就构成了jwt的第三部分。

```javascript
// javascript
var encodedString = base64UrlEncode(header) + '.' + base64UrlEncode(payload);
var signature = HMACSHA256(encodedString, 'secret'); 
// TJVA[REDACTED]
```

将这三部分用`.`连接成一个完整的字符串,构成了最终的jwt:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ
```

**注意：secret是保存在服务器端的，jwt的签发生成也是在服务器端的，secret就是用来进行jwt的签发和jwt的验证，所以，它就是你服务端的私钥，在任何场景都不应该流露出去。一旦客户端得知这个secret, 那就意味着客户端是可以自我签发jwt了。**



一般是在请求头里加入`Authorization`，并加上`Bearer`标注：

```javascript
fetch('api/user/1', {
  headers: {
    'Authorization': 'Bearer ' + token
  }
})
```

服务端会验证token，如果验证通过就会返回相应的资源。整个流程就是这样的:

![jwt](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/img/20211022213459.png)

## 优点

- 因为json的通用性，所以JWT是可以进行跨语言支持的，像JAVA,JavaScript,NodeJS,PHP等很多语言都可以使用。
- 因为有了payload部分，所以JWT可以在自身存储一些其他业务逻辑所必要的非敏感信息。
- 便于传输，jwt的构成非常简单，字节占用很小，所以它是非常便于传输的。
- 它不需要在服务端保存会话信息, 所以它易于应用的扩展

## 安全相关

- 不应该在jwt的payload部分存放敏感信息，因为该部分是客户端可解密的部分。
- 保护好secret私钥，该私钥非常重要。
- 如果可以，请使用https协议

## springboot和JWT

依赖包:

~~~xml
  <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt</artifactId>
        <version>0.9.1</version>
    </dependency>
~~~



JWT工具类:

~~~java
package com.jun.blog.utils;

import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JWTUtils {

//    密钥，不能暴露！
    private static final String jwtToken = "123456junC!@#$$";

    public static String createToken(Long userId){
        Map<String,Object> claims = new HashMap<>();
        claims.put("userId",userId);
        JwtBuilder jwtBuilder = Jwts.builder()
                .signWith(SignatureAlgorithm.HS256, jwtToken) // 签发算法，秘钥为jwtToken
                .setClaims(claims) // body数据，要唯一，自行设置
                .setIssuedAt(new Date()) // 设置签发时间
                .setExpiration(new Date(System.currentTimeMillis() + 24 * 60 * 60 * 60 * 1000));// 一天的有效时间
        String token = jwtBuilder.compact();
        return token;
    }

    public static Map<String, Object> checkToken(String token){
        try {
            Jwt parse = Jwts.parser().setSigningKey(jwtToken).parse(token);
            return (Map<String, Object>) parse.getBody();
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;

    }

}
~~~

测试类

```java
public static void main(String[] args) {
    BasicTextEncryptor textEncryptor = new BasicTextEncryptor();
    //加密所需的salt
    textEncryptor.setPassword("mszlu_blog_$#@wzb_&^%$#");
    //要加密的数据（数据库的用户名或密码）
    String username = textEncryptor.encrypt("root");
    String password = textEncryptor.encrypt("root");
    // 每次加密后都不一样
    System.out.println("username:"+username);
    System.out.println("password:"+password);
    System.out.println(textEncryptor.decrypt("66W1[REDACTED]=="));
}
```

# [还分不清 Cookie、Session、Token、JWT?](https://www.sohu.com/a/401054307_744669)

# cookie

- 存储在客户端

- **不可跨域**，一级域名和二级域名之间是允许共享使用的（靠的是 domain）。
- name=value键值对，设置 Cookie 的名称及相对应的值，都必须是**字符串类型**
- **maxAge**cookie 失效的时间，单位秒。
  - 如果为负数，该 cookie 为临时 cookie ，关闭浏览器即失效，浏览器也不会以任何形式保存该 cookie 。
  - 如果为 0，表示删除该 cookie 。
  - 默认为 -1。

## session

- 基于 cookie 实现

- **session 存储在服务器端，sessionId 会被存储到客户端的cookie 中**

- 认证流程

  <img src="https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/img13b1d97ca8ee466aa8eacdbada0d83f5.jpeg" alt="img"  />

- Session 比 Cookie 安全

- Session 可以存任意数据类型

- Session 一般失效时间较短，客户端关闭（默认情况下）或者 Session 超时都会失效。

- 单个 Cookie 保存的数据不能超过 4K，Session 可存储数据远高于 Cookie，但是当访问量过多，会占用过多的服务器资

## Token（令牌） Acesss Token

- 组成
  - uid(用户唯一的身份标识)
  - time(当前时间的时间戳)
  - sign（签名，token 的前几位以哈希算法压缩成的一定长度的十六进制字符串）
  
- 支持移动端

- token身份验证流程
  ![img](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/img9197b9d31cae48c58dd70b6c68c897b7.jpeg)
  
  - > 客户端使用用户名跟密码请求登录
    > 服务端收到请求，去验证用户名与密码
    > 验证成功后，服务端会签发一个 token 并把这个 token 发送给客户端
    > 客户端收到 token 以后，会把它存储起来，比如放在 cookie 里或者 localStorage 里
    > 客户端每次向服务端请求资源的时候需要带着服务端签发的 token
    > 服务端收到请求，然后去验证客户端请求里面带着的 token ，如果验证成功，就向客户端返回请求的数据
    > 链接：http://events.jianshu.io/p/cab856c32222

- 每一次请求都需要携带 token，需要把 token 放到 HTTP 的 Header 里
- 基于 token 的用户认证是一种服务端无状态的认证方式，服务端不用存放 token 数据。用解析 token 的计算时间换取 session 的存储空间，从而减轻服务器的压力，减少频繁的查询数据库
- token 完全由应用管理，所以它可以避开同源策略

### refresh token 

- refresh token 专用于刷新 access token 的 token。

  - 如果没有 refresh token，但每次刷新access token都要用户输入登录用户名与密码

  - 有了 refresh token，客户端直接用 refresh token 去更新 access token，无需用户进行额外的操作。

    <img src="https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/img099d73853cb14f64ba3f023de601c95e.jpeg" alt="img"  />

- Refresh Token 及过期时间是存储在服务器的数据库中，只有在申请新的 Acesss Token 时才会验证，不会对业务接口响应时间造成影响，也不需要向 Session 一样一直保持在内存中以应对大量的请求。

### Token 和 Session 的区别

- Session 记录服务器和客户端会话状态的机制
  Session 使服务端有状态化，可以记录会话信息。
- Token 是 令牌， 用来访问资源接口（API）时所需要的资源凭证。
  Token 使服务端无状态化，不会存储会话信息。

- 作为身份认证 Token 安全性比 Session 好
  因为每一个请求都有签名还能防止监听以及重放攻击，而 Session 就必须依赖**链路层**来保障通讯安全了。
-  Session 和 Token 并不矛盾，如果你需要实现有状态的会话，仍然可以增加 Session 来在服务器端保存一些状态。
- 所谓 Session 认证只是简单的把 User 信息存储到 Session 里，因为 SessionID 的不可预测性，暂且认为是安全的。但是只要有此 SessionID ，即认为有此 User 的全部权利。是需要严格保密的，这个数据应该只保存在站方，不应该共享给其它网站或者第三方 App。
- 而 Token ，如果指的是 OAuth Token 或类似的机制的话，提供的是 认证（针对用户）和 授权 （针对 App），其目的是让某 App 有权利访问某用户的信息。
  这里的 Token 是唯一的。**不可以转移**到其它 App上，也不可以转到其它用户上。
- **如果你的用户数据可能需要和第三方共享，或者允许第三方调用 API 接口，用 Token 。**
- **如果永远只是自己的网站，自己的 App，用什么就无所谓了。**





## Django REST framework JWT









# Django 修改模版

在 External Libraries --> site-packages --> django 中修改指定的文件

# pycharm远程开发

Tools --> Development --> configuration --> + --> SFTP

# Vue单文件组件

![Snip20190404_1](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/img/20211025141953.png)



启动服务调试

```bash
./node_modules/.bin/webpack-dev-server
```



## 使用Element-ui

[单文件组件网站](https://element.eleme.cn/#/zh-CN/component/installation)

