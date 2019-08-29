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
        server_name  localhost; # 域名可以有多个，用空格隔开
        # 有些指令可以支持正则表达式
        location / {
            root   html;
            index  index.html index.htm;
        }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
    include /etc/nginx/conf.d/*.conf;
}
```
