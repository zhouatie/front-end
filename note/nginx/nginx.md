# nginx

前端开发者进阶之路不得不学nginx。

## 本文内容涉及

- nginx命令
- 配置文件、配置解释
- 变量
- 日志
- 跨域
- 代理请求
- location拦截详解
- 静态资源
- gzip
- 防盗链
- 反向代理、正向代理
- 负载均衡
- 缓存
- rewrite

### 命令

- nginx -T 查看当前nginx最终的配置
- nginx -t 检查配置文件是否有语法错误
- nginx -s reload 向主进程发送信号，重新加载配置文件
- nginx -s stop 快速关闭
- nginx -s quit 等待工作进程处理完成后关闭

### 配置文件

```shell
user  nginx; # 定义 Nginx 运行的用户
worker_processes  1; # 设置工作进程的数量

error_log  /var/log/nginx/error.log warn; #nginx 错误日志
pid        /var/run/nginx.pid; # nginx.pid存放的是nginx的master进程的进程号

# events模块中包含nginx中所有处理连接的设置
events {
    #工作进程的最大连接数量 理论上每台nginx服务器的最大连接数为worker_processes*worker_connections worker_processes为我们再main中开启的进程数
    worker_connections  1024;
}

# 提供http服务相关的一些配置参数
http {
    # include 是个主模块指令，可以将配置文件拆分并引用，可以减少主配置文件的复杂度, 这里是加载一些文件类型
    include       /etc/nginx/mime.types;
    # default_type 属于HTTP核心模块指令，这里设定默认类型为二进制流，也就是当文件类型未定义时使用这种方式
    default_type  application/octet-stream;

    # 定义日志格式
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    # 定义本虚拟主机的访问日志
    access_log  /var/log/nginx/access.log  main;
    sendfile on; #开启高效文件传输模式，sendfile指令指定nginx是否调用sendfile函数来输出文件，对于普通应用设为 on，如果用来进行下载等应用磁盘IO重负载应用，可设置为off，以平衡磁盘与网络I/O处理速度，降低系统的负载。注意：如果图片显示不正常把这个改 成off
    sendfile        on;
    tcp_nopush     on;

    keepalive_timeout  65;

    #gzip模块设置
    gzip on; #开启gzip压缩输出
    gzip_min_length 1k; #最小压缩文件大小
    gzip_buffers 4 16k; #压缩缓冲区
    gzip_http_version 1.0; #压缩版本（默认1.1，前端如果是squid2.5请使用1.0）
    gzip_comp_level 2; #压缩等级

    limit_zone crawler $binary_remote_addr 10m; #开启限制IP连接数的时候需要使用

    server {
        listen       80; # 表示http监听的端口
        server_name  localhost; # 域名可以有多个，用空格隔开  当出现多个server监听的端口一样时，可通过server_name 做区分
        # 有些指令可以支持正则表达式
        location / { # 用于匹配URI，这里也可以用正则的方式匹配 ~ 表示大小写敏感  ~*表示大小写不敏感
            root   html; # 指定了静态文件的根目录
            index  index.html index.htm;
        }
        error_page   500 502 503 504  /50x.html; # 表示当在500 502 503 504 错误码的时候重定向到 /50x.html
        location = /50x.html {
            root   html;
        }
    }
    include /etc/nginx/conf.d/*.conf; # 用于加载其他配置文件进来
}
```

### 变量

$arg_PARAMETER 这个变量值为：GET请求中变量名PARAMETER参数的值。

$args 这个变量等于GET请求中的参数。例如，foo=123&bar=blahblah;这个变量只可以被修改

$binary_remote_addr 二进制码形式的客户端地址。

$body_bytes_sent 传送页面的字节数

$content_length 请求头中的Content-length字段。

$content_type 请求头中的Content-Type字段。

$cookie_COOKIE cookie COOKIE的值。

$document_root 当前请求在root指令中指定的值。

$document_uri 与$uri相同。

$host 请求中的主机头(Host)字段，如果请求中的主机头不可用或者空，则为处理请求的server名称(处理请求的server的server_name指令的值)。值为小写，不包含端口。

$hostname  机器名使用 gethostname系统调用的值

$http_HEADER   HTTP请求头中的内容，HEADER为HTTP请求中的内容转为小写，-变为_(破折号变为下划线)，例如：$http_user_agent(Uaer-Agent的值), $http_referer...;

$sent_http_HEADER  HTTP响应头中的内容，HEADER为HTTP响应中的内容转为小写，-变为_(破折号变为下划线)，例如： $sent_http_cache_control, $sent_http_content_type...;

$is_args 如果$args设置，值为"?"，否则为""。

$limit_rate 这个变量可以限制连接速率。

$nginx_version 当前运行的nginx版本号。

$query_string 与$args相同。

$remote_addr 客户端的IP地址。

$remote_port 客户端的端口。

$remote_user 已经经过Auth Basic Module验证的用户名。

$request_filename 当前连接请求的文件路径，由root或alias指令与URI请求生成。

$request_body 这个变量（0.7.58+）包含请求的主要信息。在使用proxy_pass或fastcgi_pass指令的location中比较有意义。

$request_body_file 客户端请求主体信息的临时文件名。

$request_completion 如果请求成功，设为"OK"；如果请求未完成或者不是一系列请求中最后一部分则设为空。

$request_method 这个变量是客户端请求的动作，通常为GET或POST。
包括0.8.20及之前的版本中，这个变量总为main request中的动作，如果当前请求是一个子请求，并不使用这个当前请求的动作。

$request_uri 这个变量等于包含一些客户端请求参数的原始URI，它无法修改，请查看$uri更改或重写URI。

$scheme 所用的协议，比如http或者是https，比如rewrite ^(.+)$ $scheme://example.com$1 redirect;

$server_addr 服务器地址，在完成一次系统调用后可以确定这个值，如果要绕开系统调用，则必须在listen中指定地址并且使用bind参数。

$server_name 服务器名称。

$server_port 请求到达服务器的端口号。

$server_protocol 请求使用的协议，通常是HTTP/1.0或HTTP/1.1。

### 日志

#### error_log

表示错误日志。`error_log /var/log/nginx/error.log warn;` 。错误日志记录了访问出错的信息。有利于我们排查错误。

#### access_log

表示访问日志。需要指定日志格式 `log_format`。通过访问日志我们可以得到用户的IP地址、浏览器的信息，请求的处理时间等信息

#### log_format

日志格式可以结合上面的变量，来指定访问日志的输出格式。

如：

```shell
log_format main '$host $document_uri $server_addr $remote_addr $remote_port';
server {
  listen 5002;
  access_log /usr/local/etc/nginx/servers/access.log main;
  location / {
    root /usr/local/etc/nginx/servers;
    index index.html;
  }
}
```

定义了个日志格式 main

然后在将`access_log`绑定日志`main`

输出：

```shell
localhost /index.html 127.0.0.1 127.0.0.1 61517
```

可以看到，access_log 按照我的main日志格式输出了。

### 跨域

相信作为前端开发者，你肯定知道CORS。

- Access-Control-Allow-Origin <origin> | *;
其中，origin 参数的值指定了允许访问该资源的外域 URI。对于不需要携带身份凭证的请求，服务器可以指定该字段的值为通配符，表示允许来自所有域的请求。

- Access-Control-Expose-Headers: X-My-Custom-Header, X-Another-Custom-Header

在跨域访问时，XMLHttpRequest对象的getResponseHeader()方法只能拿到一些最基本的响应头，Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma，如果要访问其他头，则需要服务器设置本响应头。

- Access-Control-Max-Age
Access-Control-Max-Age 头指定了preflight请求的结果能够被缓存多久;Access-Control-Max-Age: 86400

- Access-Control-Allow-Credentials

指定了当浏览器的credentials设置为true时是否允许浏览器读取response的内容。当用在对preflight预检测请求的响应中时，它指定了实际的请求是否可以使用credentials。请注意：简单 GET 请求不会被预检；如果对此类请求的响应中不包含该字段，这个响应将被忽略掉，并且浏览器也不会将相应内容返回给网页

话不多少，下面就直接贴代码：

```javascript
// index.js
import axios from 'axios'

axios.get('http://127.0.0.1:5556/api/abc').then(res => {
    console.log(res, 'res')
    document.write(res)
})
```

```shell
server {
    listen 5556;
    location /api {
        proxy_pass http://localhost:5000;
        add_header Access-Control-Allow-Origin *;
    }
}
```

将5556端口的请求路径 /api 开头的 转发到 5000 端口的node服务上。添加上`Access-Control-Allow-Origin *`就可解决跨域问题。

### 代理请求

代理请求可以看下上面的跨域。把5556端口的请求转发到5000端口的服务上。

### location拦截详解

