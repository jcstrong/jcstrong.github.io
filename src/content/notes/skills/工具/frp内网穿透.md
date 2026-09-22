---
title: "frp内网穿透"
category: skills
folderPath: "工具"
folderTop: "工具"
tags: ["开发工具", "效率"]
featured: false
source: "工具/frp内网穿透.md"
updated: 2026-04-02
readingTime: 10
summary: "frp内网穿透 get！！！ https://post.smzdm.com/p/adwlor3x/\\ frp_0.26.0_linux_amd64下载https://github.com/fatedier/frp/releases/tag/..."
---
# frp内网穿透 get！！！

https://post.smzdm.com/p/adwlor3x/\



[frp_0.26.0_linux_amd64下载](https://github.com/fatedier/frp/releases/tag/v0.26.0)

## 服务端

下载frp_0.26.0

```bash
cd ~
mkdir frp
curl -O https://github.com/fatedier/frp/releases/download/v0.26.0/frp_0.26.0_linux_amd64.tar.gz 
tar -xzf frp_0.26.0_linux_amd64.tar.gz
```


保持启动

```bash
nohup ./frps -c ./frps.ini &
```

开机自启

```bash
sudo vi /lib/systemd/system/frps.service
--------------------------------------

[Unit]
Description=frps daemon
After=syslog.target  network.target
Wants=network.target

[Service]
Type=simple
ExecStart=/root/frp/frp_0.26.0_7001/frps -c /root/frp/frp_0.26.0_7001/windows/frps.ini
Restart= always
RestartSec=1min

[Install]
WantedBy=multi-user.target

# ExecStart中要配置成自己的路径
--------------------------------------
```

启动🚀

```bash
#启动frps
systemctl start frps
#将frps设置为开机启动
systemctl enable frps
```


配置

[frp_releases](https://github.com/fatedier/frp/releases)

```bash
frps.ini
-------------------

[common]
bind_port = 7001
```

```bash
frpc.ini
-------------------

[common]
server_addr = 39.103.140.125
server_port = 7001

[web]
type = tcp
local_ip = 127.0.0.1
local_port = 5000
remote_port = 5000
```

注意访问端口5000⚠️http://39.103.140.125:5000 



保证

- 运行的frp版本一致(oldiy/frpc 0.26.0
- 服务端运行的确实是编写好的frps.ini文件！
- 防火墙设置7001端口确实开放了

上述配置就能成功





## 客户端

### docker安装frpc

群晖矿神套件源只能有一个frp

### windows开启frp映射端口外网远程访问remote desktop

- [下载frp](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Ffatedier%2Ffrp%2Freleases%2Ftag%2Fv0.29.1)

  - cpu支持64位就下`frp_xxx_amd64.zip`
  - 客户端和用户端必须同版本

- 在windows本地设置防火墙，开放remote desktop的端口

  - [参考链接](https://blog.csdn.net/michaelehome/article/details/79555799)

- 配置frpc.ini

  ```
  [common]
  server_addr = 39.云服.务器.125
  server_port = 7001
  
  [web]
  type = tcp
  local_ip = 127.0.0.1
  local_port = 3389
  remote_port = 3000
  ```

- 服务端后台运行 

  ```bash
  nohup ./frps -c ./frps.ini &
  ```

  如果出现报错`nohup: 忽略输入并把输出追加到"nohup.out"`，则在后面追加

  ```
  nohup 路径/frps -c 路径/frps.ini & > /text.log 2>&1 &
  ```

- windows后台运行frpc

  ```xml
  <service>
      <id>rdmfrpc</id>
      <name>rdm</name>
      <description>rdmfrpc</description>
      <executable>frpc</executable>
      <arguments>-c frpc.ini</arguments>
      <onfailure action="restart" delay="60 sec"/>
      <onfailure action="restart" delay="120 sec"/>
      <logmode>reset</logmode>
  </service>
  ```

  [参考](https://blog.csdn.net/qubernet/article/details/120290136)

  - 在搜索栏搜索 服务 ，打开Windows服务列表，找到刚刚设置的rdm服务，启动服务

    ![截屏2022-05-13 21.11.21](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/img/%E6%88%AA%E5%B1%8F2022-05-13%2021.11.21.jpg)



vbs启动

```bash
set ws=wscript.createobject("wscript.shell")
ws.run "cmd /c D:\Document\frp0.29.1\frpc.exe -c D:\Document\frp0.29.1\frpc.ini",0
```





## ~~其他配置含义~~

[服务端] frps.ini 配置

```ini
[common]
bind_port = 7000
#vhost_http_p1Wort               网站访问端口
vhost_http_port = 80
#vhost_https_port = 443
#dashboard_port               状态以及代理统计信息展示,网址:7500可查看详情
dashboard_port = 7500
log_file = ./frps.log
log_level = info
log_max_days = 3
#privilege_mode               特权模式,开通后web,ssh等使用都可以直接在客户端设置
privilege_mode = true
#特权连接密码
privilege_token = 12345678    这里的密码大家改复杂点
#max_pool_count               最大链接池,每个代理预先与后端服务器建立起指定数量的最大链接数
max_pool_count = 50
```

[客户端] frpc.ini 配置

~~~ini
[common]
#server_addr服务器ip
server_addr = 39.103.140.125
server_port = 7000
log_file = ./frpc.log
log_level = info
log_max_days = 3
#特权连接密码
privilege_token = 12345678

[Web]
#privilege_mode特权模式
privilege_mode = true
type = http
local_ip = 127.0.0.1
local_port = 80
#custom_domains域名
custom_domains = nas.1995115.xyz
pool_count = 10



[ssh]
privilege_mode = true
type = tcp
#remote_port外部端口
remote_port = 10086
local_ip = 127.0.0.1
#local_port内部端口
local_port = 22
use_gzip = true
use_encryption = true
pool_count = 2

```

- 让客服端与服务端常驻后台

```
#开启另一个子终端 任务名字 frp
root@hxyisme:~#screen -S frp
#分别运行 frp 服务端和客服端程序
root@hxyisme#./frpc -c ./frpc.ini

#如果需要关闭 frp
screen -S frp  后
ctrl+c  即可

- 查看连接情况

打开 youname.com:7500 就可以看见了。。。
~~~



## 报错

注意⚠️

Create server listener error, listen tcp 0.0.0.0:7001: bind: address already in use

\#注释文件需要去掉，新版本不支持注释文本了

Create server listener error, listen tcp 0.0.0.0:7001: bind: address already in use

这是启动成功了

停止frps

```bash
//先找到这个进程
ps -aux|grep frp| grep -v grep
root      3600  0.1  0.1 110188  9484 pts/0    Sl   15:04   0:00 ./frpc -c ./frpc.ini
//杀死进程
kill -9 3600
```

先在群晖中开启Drive的端口，再配置ini文件

```

## client 端配置
 
[common]
server_addr = xxxx  # 自己远端的服务器地址
server_port = 7000
auth_token = xxxxx # 可以设置这个进行auth_token认证, client也要配置相同
pool_count = 5
 
[ssh]
type = tcp
local_ip = xxxxxx
local_port = 22
remote_port = 6000
 
[nas]
#privilege_mode = true
type = tcp
local_port = 5000
remote_port = 5000
 
[drive]
#privilege_mode = true
type = tcp
local_port = 10002 # 这个端口是在群晖中开启的

```









# 网络唤醒

实施 WOL 需要知道设备的 IP 地址以及网卡的物理地址 （MAC）

- ip地址命令：`arp -a`

- 网卡的物理地址我们可以通过 `ipconfig /all` 命令来获得，一般是像 00-11-32-7B-0D-D3 的字符串。



# 添加摄像头

*（图片缺失：%E6%88%AA%E5%B1%8F2022-05-13%2001.03.59.png）*









山特UPS

![](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/img/截屏2022-05-13 17.49.24.png)







## HomeAssistans

https://imnks.com/4167.html

https://mp.weixin.qq.com/s/1y_EV6xcg17r743aV-2eRw

事实上，群晖无法连接到github下载东西，我也不知道为啥，需要整个路由器足够科学。。。

所以我现在github上下载下来，然后移动到指定的目录就ok了

至于目录地址，就在安不上的插件的下面有提示







# Unraid

## 无法连接

https://www.jianshu.com/p/11a210892dc1

https://zhuanlan.zhihu.com/p/609967222

安装APPS应用市场失败

默认系统没有安装APP应用市场，在APPS下点击install的时候由于网络原因会失败。需要你有一个魔法，在同个局域网内任意设备打开clash的"允许局域网连接"，clash默认 `http_proxy` 端口 ****7890****。

然后打开右上角的命令运行窗口，编辑 `/root/.wgetrc` 这个文件，写入以下代码：



```bash

use_proxy=yes

http_proxy=http://[你的clash设备IP]:[端口默认7890]

https_proxy=http://[你的clash设备IP]:[端口默认7890]

wait=10

```
因为unraid是从U盘启动的，重启后刚才编辑的 `root/.wgetrc` 文件就没了，所以要编辑 `/boot/config/go` 这个文件，写入以下代码：

```bash
echo "use_proxy=yes" >> /root/.wgetrc
echo "http_proxy=http://[你的clash设备IP]:[端口默认7890]" >> /root/.wgetrc
echo "https_proxy=http://[你的clash设备IP]:[端口默认7890]" >> /root/.wgetrc
echo "wait=10" >> /root/.wgetrc
```

APPS市场里无法显示内容（Download of appfeed failed）

安装完发现APPS市场里无法显示内容，`Download of appfeed failed`。这还是网络问题，因为之前只是设置了wget，是unraid安装下载插件用的，市场内容由市场插件本身获取，所以要给市场插件走一下代理。

编辑 `/boot/config/plugins/community.applications/proxy.cfg` 文件，没有就新建一个：

```
port=7890
tunnel=1
proxy=http://[你的clash设备IP]
```
Docker网络问题
- **推荐设置国内docker镜像源加速镜像拉取**

编辑 `/etc/docker/daemon.json` 文件，写入以下代码：

```json
{
  "registry-mirrors": [
    "https://hub-mirror.c.163.com",
    "https://你自己的.mirror.aliyuncs.com"
  ]
}
```

命令 `docker info` 查看有没有设置成功，会有个 `Registry Mirrors` 里面显示两个链接。

开机启用

同样修改 `/root/config/go` 文件：

```bash
mkdir -p /etc/docker
tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://hub-mirror.c.163.com","https://你自己的.mirror.aliyuncs.com"]
}
EOF
```
国内加速镜像源推荐

作者测试了多个镜像源，以下两个速度最好：

- 南京大学镜像：`https://docker.nju.edu.cn/`
- 上海交大镜像：`https://docker.mirrors.sjtug.sjtu.edu.cn`


在做完上面的操作后，在unraid下安装clash或者V2Ray，然后把上面的IP端口改成unraid这边的地址，这样就不用局域网的其他设备了。
## CA插件

```
https://gitee.com/BlueBuger/community.applications/raw/master/plugins/community.applications.plg
```



## 中文插件



## 商店加速



其实是docker源的问题，以及要登陆自己的docker账号

换源

```properties
# 创建或修改 /etc/docker/daemon.json 文件，修改为如下形式
{
    "registry-mirrors" : [
    "https://registry.docker-cn.com",
    "https://docker.mirrors.ustc.edu.cn",
    "http://hub-mirror.c.163.com",
    "https://cr.console.aliyun.com/"
  ]
}
# 重启docker服务使配置生效：在「设置」-「docker」-「停用」-「启用」
```

登陆docker帐号

```bash
$ docker login
# 输入用户名jcstrong
# 输入密码
```



## 更换硬盘

https://post.smzdm.com/p/ar6q8p7z/

unBALANCE转移数据、「新设置」保留当前分配换硬盘，重新设置阵列





## 群晖

安装 https://post.smzdm.com/p/az6552dr/

直通网卡、硬盘 https://post.smzdm.com/p/a45wpq28/



## 安装transmission

[安装教程](https://zhuanlan.zhihu.com/p/517308897)

[皮肤安装教程](https://post.smzdm.com/p/a5kq8dw3/)

[其他安装教程](https://post.smzdm.com/p/awx4888g/)

报错1:

![截屏2023-01-25 03.24.03](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/%E6%88%AA%E5%B1%8F2023-01-25%2003.24.03.png)

解决方法：

- 打开容器的控制台输入`transmission-daemon -a 192.168.50.*`

  

- ~~在控制台中打开transmission的设置json文件:`vi /config/settings.json`~~

- ~~修改settings.json里面的白名单设置~~

  ```bash
      "rpc-whitelist": "192.168.50.*",
      "rpc-whitelist-enabled": true,
  ```
  
  



报错2：

```bash
[2023-01-25 04:21:10.919] transmission-daemon Error loading config file -- exiting. (/home/buildozer/aports/community/transmission/src/transmission-3.00/daemon/daemon.c:825)

[2023-01-25 04:21:10.950] transmission-remote:  (http://localhost:9091/transmission/rpc/) Couldn't connect to server
tail: invalid PID: ‘’

[2023-01-25 04:21:11.920] JSON parse failed in /config/settings.json at pos 902: SPECIAL_EXPECTED -- remaining text "peerport,
    "p"
```

解决：

- 是PGID和PUID设置问题
- 打开unraid的终端，输入“id name（你登录的用户名）”，查询在设备上登录的用户的PUID和PGID



报错3:

```bash
[2023-01-25 04:47:00.297] transmission-daemon Error loading config file -- exiting. (/home/buildozer/aports/community/transmission/src/transmission-3.00/daemon/daemon.c:825)

Unexpected response: <h1>403: Forbidden</h1><p>Unauthorized IP Address.</p><p>Either disable the IP address whitelist or add your address to it.</p><p>If you're editing settings.json, see the 'rpc-whitelist' and 'rpc-whitelist-enabled' entries.</p><p>If you're still using ACLs, use a whitelist instead. See the transmission-daemon manpage for details.</p>
s6-supervise svc-transmission: warning: finish script lifetime reached maximum value - sending it a SIGKILL

[2023-01-25 04:47:05.331] JSON parse failed in /config/settings.json at pos 902: SPECIAL_EXPECTED -- remaining text "peerport,
    "p"
```

白名单的设置



### transmission没有速度？？？







# MacOS相关设置

## 挂载xfs

下载dmg：[fuse-xfs](https://sourceforge.net/projects/fusexfs/)

[挂载](https://sourceforge.net/projects/fusexfs/)

```jsx
fuse-xfs /dev/<您的驱动器名称> --  /Volumes/<您的挂载目录>

sudo fuse-xfs /dev/disk3s1 -- /mnt/my_xfs_hd -o
```





## 安装软件出现已损坏

- 关闭sip

- 运行命令开启`任何来源`：`sudo spctl --master-disable`





# [我的阿里云加速器地址](https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors)

`https://ng7hy9ut.mirror.aliyuncs.com`

```bash
tee /etc/docker/daemon.json <<-'EOF'
{
"registry-mirrors": ["https://ng7hy9ut.mirror.aliyuncs.com"]
}
EOF
```

![截屏2023-01-25 01.25.08](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/%E6%88%AA%E5%B1%8F2023-01-25%2001.25.08.png)

        "rpc-whitelist": "192.168.50.*",
        "rpc-whitelist-enabled": true,





## OpenWrt

[sibotu](https://www.bilibili.com/video/BV1WJ411D75z/?spm_id_from=333.999.0.0、&vd_source=53552bf3f6a82d7a12bfbf1949001f63)

https://post.smzdm.com/p/ax027g83/
