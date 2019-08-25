# nginx

前端开发者进阶之路不得不学nginx。

## 本文内容涉及

- nginx命令
- 配置文件、配置解释
- 日志
- 变量
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
user  nginx;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    include /etc/nginx/conf.d/*.conf;
}
```