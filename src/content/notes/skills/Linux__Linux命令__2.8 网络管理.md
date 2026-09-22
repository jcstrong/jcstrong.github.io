---
title: "2.8 网络管理"
category: skills
tags: ["Linux", "运维"]
featured: false
source: "Linux/Linux命令/2.8 网络管理.md"
updated: 2021-03-02
readingTime: 2
summary: "toc  ifconfig命令2.8.5 ifconfig命令.md   查看网络接口信息  查看所有活动网络接口的信息  \t执行 ifconfig 查看指定网络接口信息查看  \t格式:ifconfig 网络接口名  设置网络接口参数 设置..."
---
[toc]

#### [ifconfig命令](2.8.5 ifconfig命令.md) 

##### 查看网络接口信息 

查看所有活动网络接口的信息 
	执行 ifconfig

查看指定网络接口信息查看 
	格式:ifconfig 网络接口名

##### 设置网络接口参数

设置网络接口的ip地址、子网掩码
	格式: ifconfig 接口名 ip地址 [netmask 子网掩码]
			 ifconfig 网络接口 ip地址[/掩码长度]

禁用或者重新激活网卡 
	格式: ifconfig up
			 ifconfig down

设置虚拟网络接口
	格式: ifconfig 接口名:序号 IP地址

#### hostname命令

##### 查看或设置当前主机名 

格式:hostname

#### [route命令](2.8.3 route命令.md)  

##### 查看路由表条目

查看或设置主机中路由表信息 
格式:route [-n]

##### 设置路由记录

删除路由表中的默认网关记录 
	格式: route del default gw IP地址

向路由表中添加默认网关记录 
	格式: route add default gw IP地址

添加到指定网段的路由记录 
	格式: route add -net 网段地址

#### [netstat命令](2.8.1 netstat命令.md) 

#### 

#### [free命令](2.8.4 free命令.md)  

#### [网络管理常见命令](http://blog.sina.com.cn/s/blog_672b409101012vpo.html)

##### [ping命令](2.8.2 ping命令.md)  

##### ipconfig

##### arp

##### traceroute

用来显示数据包到达目的主机所经过的路径

```
“tracert host_name”或“tracert ip_address”
```

##### nslookup

查询任何一台机器的IP地址和其对应的域名

```
[root@localhost ~]# nslookup
> ？
Server:		192.168.64.1
Address:	192.168.64.1#53

** server can't find ?: NXDOMAIN
> exit
```

#####  [netstat命令](2.8.1 netstat命令.md) 

了解网络当前的状态

##### net命令

在命令行键入net help command，可以在命令行获得net命令的语法帮助

| 命令           | 例子                            | 作用                               |
| -------------- | ------------------------------- | ---------------------------------- |
| NET ACCOUNTS   | NET ACCOUNTS                    | 查阅当前账号设置                   |
| NET CONFIG     | NET CONFIG SERVER               | 查阅本网络配置信息统计             |
| NET GROUP      | NET GROUP                       | 查阅域组（在域控制器上）           |
| NET PRINT      | NET PRINT\\printserver\printer1 | 查阅或修改打印机映射               |
| NET SEND       | NET SEND server1 “test message” | 向别的计算机发送消息或广播消息     |
| NET SHARE      | NET SHARE                       | 查阅本地计算机上共享文件           |
| NET START      | NET START Messenger             | 启动服务                           |
| NET STATISTICS | NET STATISTICS SERVER           | 查阅网络流量统计值                 |
| NET STOP       | NET STOP Messenger              | 停止服务                           |
| NET USE        | NET USE x:\\server1\admin       | 将网络共享文件映射到一个驱动器字母 |
| NET USER       | NET USER                        | 查阅本地用户账号                   |
| NET VIEW       | NET VIEW                        | 查阅网络上可用计算机               |

#### [网络监视工具](https://linux.cn/article-9153-1.html)



