---
title: "redis&python交互"
category: skills
folderPath: "Python/Python_web/Django_web开发/Django"
folderTop: "Python"
tags: ["Python", "Web"]
featured: false
source: "Python/Python_web/Django_web开发/Django/redis&python交互.md"
updated: 2022-05-23
readingTime: 9
summary: "toc  redis官方文档https://github.com/andymccurdy/redispy/readme  安装Redis的有3种方式https://github.com/andymccurdy/redispy    第一种：..."
---
[toc]



- [redis官方文档](https://github.com/andymccurdy/redis-py/#readme)

- 安装Redis的有3种方式https://github.com/andymccurdy/redis-py

  - 第一种：进⼊虚拟环境，联⽹安装包redis

    > pip install redis

  - 第二种：进⼊虚拟环境，联⽹安装包redis

    > easy_install redis

  - 第三种：到中⽂官⽹-客户端下载redis包的源码，使⽤源码安装

    > 一步步执行 wget https://github.com/andymccurdy/redis-py/archive/master.zip
    > unzip master.zip
    > cd redis-py-master
    > sudo python setup.py install

- 调⽤模块

  - 引⼊模块

    > from redis import StrictRedis

  - 这个模块中提供了`StrictRedis对象`，⽤于连接redis服务器，并按照不同类型提供 了不同⽅法，进⾏交互操作

- 开启远程访问：设置配置文件，注释绑定ip、重启redis

```python
import redis

if __name__ == '__main__':
    try:
        rs = redis.Redis(host='192.168.64.10',password=None)
    except Exception as e:
        print(e)

    print(rs.set('name', 'jun'))
    print(rs.get('name'))
```



## StrictRedis对象⽅法

- 通过init创建对象，指定参数host、port与指定的服务器和端⼝连接，host默认为localhost，port默认为6379，db默认为0

  `sr = StrictRedis(host='localhost', port=6379, db=0)`

  简写`sr=StrictRedis()`

- 根据不同的类型，拥有不同的实例⽅法可以调⽤，与前⾯学的redis命令对应，⽅法需要的参数与命令的参数⼀致

**string**

set、setex、mset、append、get、mget、key

**keys**

exists、type、delete、expire、getrange、ttl

**hash**

hset、hmset、hkeys、hget、hmget、hvals、hdel

**list**

lpush、rpush、linsert、lrange、lset、lrem

**set**

sadd、smembers、srem

**zset**

zadd、zrange、zrangebyscore、zscore、zrem、zremrangebyscore

Redis操作

- 在桌面上创建redis目录
- 使用pycharm打开 redis目录
- 创建redis_string.py文件

```python
from redis import *
if __name__=="__main__":
    try:
        #创建StrictRedis对象，与redis服务器建⽴连接
        sr=StrictRedis()

    except Exception as e:
        print(e)
```

**string-增加**

- ⽅法set，添加键、值，如果添加成功则返回True，如果添加失败则返回False
- 编写代码如下

```python
from redis import *
if __name__=="__main__":
    try:
        #创建StrictRedis对象，与redis服务器建⽴连接
        sr=StrictRedis()
        #添加键name，值为itheima
        result=sr.set('name','itheima')
        #输出响应结果，如果添加成功则返回True，否则返回False
        print(result)
    except Exception as e:
        print(e)
```

**string-获取**

- ⽅法get，添加键对应的值，如果键存在则返回对应的值，如果键不存在则返回None
- 编写代码如下

```python
from redis import *
if __name__=="__main__":
    try:
        #创建StrictRedis对象，与redis服务器建⽴连接
        sr=StrictRedis()
        #获取键name的值
        result = sr.get('name')
        #输出键的值，如果键不存在则返回None
        print(result)
    except Exception as e:
        print(e)
```

**string-修改**

- ⽅法set，如果键已经存在则进⾏修改，如果键不存在则进⾏添加
- 编写代码如下

```python
from redis import *
if __name__=="__main__":
    try:
        #创建StrictRedis对象，与redis服务器建⽴连接
        sr=StrictRedis()
        #设置键name的值，如果键已经存在则进⾏修改，如果键不存在则进⾏添加
        result = sr.set('name','itcast')
        #输出响应结果，如果操作成功则返回True，否则返回False
        print(result)
    except Exception as e:
        print(e)
```

**string-删除**

- ⽅法delete，删除键及对应的值，如果删除成功则返回受影响的键数，否则则返 回0
- 编写代码如下

```python
from redis import *
if __name__=="__main__":
    try:
        #创建StrictRedis对象，与redis服务器建⽴连接
        sr=StrictRedis()
        #设置键name的值，如果键已经存在则进⾏修改，如果键不存在则进⾏添加
        result = sr.delete('name')
        #输出响应结果，如果删除成功则返回受影响的键数，否则则返回0
        print(result)
    except Exception as e:
        print(e)
```

**获取键**

- ⽅法keys，根据正则表达式获取键
- 编写代码如下

```python
from redis import *
if __name__=="__main__":
    try:
        #创建StrictRedis对象，与redis服务器建⽴连接
        sr=StrictRedis()
        #获取所有的键
        result=sr.keys()
        #输出响应结果，所有的键构成⼀个列表，如果没有键则返回空列表
        print(result)
    except Exception as e:
        print(e)
```

## 主从

![redis-master-slave](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/img/20210824105540.png)

- ⼀个master可以拥有多个slave，⼀个slave⼜可以拥有多个slave，如此下去，形成了强⼤的多级服务器集群架构

- master用来写数据，slave用来读数据，经统计：网站的读写比率是10:1

- 通过主从配置可以实现读写分离

- master和slave都是一个redis实例(redis服务)

  ![ifconfig](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/img/20210823211358.png)

  

### 主从配置

**配置主**

- 查看当前主机的ip地址

  > ifconfig

- 修改`/etc/redis/redis.conf`文件

  > sudo vi redis.conf
  > bind 192.168.64.10

- 重启redis服务

  > sudo service redis stop
  > sudo redis-server redis.conf

**配置从**

- 复制`/etc/redis/redis.conf`文件

  > sudo cp redis.conf ./slave.conf

- 修改`redis/slave.conf`文件

  > sudo vi slave.conf

- 编辑内容

  > bind 192.168.64.10
  > slaveof 192.168.64.10 6379
  > port 6378

- redis服务

  > sudo redis-server slave.conf

- 查看主从关系

  > redis-cli -h 192.168.64.10 info Replication
  
  ![Screenshot 2021-08-24 at 11.44.03 AM](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/img/20210824114417.png)
  
  

**数据操作**

- 在master和slave分别执⾏info命令，查看输出信息 进入主客户端

  > redis-cli -h 192.168.64.10 -p 6379

- 进入从的客户端

  > redis-cli -h 192.168.64.10 -p 6378

- 在master上写数据

  > set aa aa

- 在slave上读数据

  > get aa

```powershell
chenjun@ubuntu:/etc/redis$ redis-cli -h 192.168.64.10 -p 6379
192.168.64.10:6379> set name junjun
OK
192.168.64.10:6379> get name
"junjun"

chenjun@ubuntu:/etc/redis$ redis-cli -h 192.168.64.10 -p 6378
192.168.64.10:6378> get name
"junjun"
192.168.64.10:6378> set name chaochao
(error) READONLY You can't write against a read only replica.
```

## 集群

集群是一组相互独立的、通过高速网络互联的计算机，它们构成了一个组，并以单一系统的模式加以管理。一个客户与集群相互作用时，集群像是一个独立的服务器。集群配置是用于提高可用性和可缩放性。

![p1_58](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/img/20210824115355.png)

当请求到来首先由负载均衡服务器处理，把请求转发到另外的一台服务器上。

- 为什么要有集群
  - 之前我们已经讲了主从的概念，一主可以多从，如果同时的访问量过大(1000w),主服务肯定就会挂掉，数据服务就挂掉了或者为了防止发生自然灾难，大公司都会有很多的服务器
    (华东地区、华南地区、华中地区、华北地区、西北地区、西南地区、东北地区、台港澳地区机房)

- 分类：软件层面、硬件层面
  - 软件层面：一台电脑上启动了多个redis服务。

  - 硬件层面：多台电脑上都启动了一个redis或者多个redis服务。

**参考阅读**

- [redis集群搭建]( http://www.cnblogs.com/wuxl360/p/5920330.html)
- [[Python]搭建redis集群](http://blog.5ibc.net/p/51020.html) 





### 搭建集群

<img src="https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/img/20210824135852.png" alt="image-20210824135852810" style="zoom:67%;" />

- **配置机器1**
  - 在演示中，172.16.179.130为当前ubuntu机器的ip

  - 在172.16.179.130上进⼊Desktop⽬录，创建conf⽬录

  - 在conf⽬录下创建⽂件7000.conf、7001.conf、7002.conf，编辑内容如下，三个⽂件的配置区别在**port、pidfile、cluster-config-file**三项

  ```
  port 7000
  bind 172.16.179.130
  daemonize yes
  pidfile 7000.pid
  cluster-enabled yes
  cluster-config-file 7000_node.conf
  cluster-node-timeout 15000
  appendonly yes
  ```

  - 使⽤配置⽂件启动redis服务`redis-server 7001.conf`

  - 查看进程如下图

- **配置机器2**
  - 在演示中，172.16.179.131为当前ubuntu机器的ip

  - 在172.16.179.131上进⼊Desktop⽬录，创建conf⽬录

  - 在conf⽬录下创建⽂件7003.conf，编辑内容如下,三个⽂件的配置区别在**port、pidfile、cluster-config-file**三项

  ```
  port 7003
  bind 172.16.179.131
  daemonize yes
  pidfile 7003.pid
  cluster-enabled yes
  cluster-config-file 7003_node.conf
  cluster-node-timeout 15000
  appendonly yes
  ```

  - 使⽤配置⽂件启动redis服务`sudo redis-server 7003.conf`
    - ==**如果没有sudo可能造成connection refused**==

  - 查看进程如下图

- **创建集群**                   [集群教程](http://doc.redisfans.com/topic/cluster-tutorial.html)
  - redis的安装包中包含了redis-trib.rb，⽤于创建集群

  - 接下来的操作在172.16.179.130机器上进⾏

  - 将命令复制到local，这样可以在任何⽬录下调⽤此命令

  ```powershell
  sudo cp /usr/share/doc/redis-tools/examples/redis-trib.rb /usr/local/bin/
  ```

  - 安装ruby环境，因为redis-trib.rb是⽤ruby开发的

  > sudo apt-get install ruby

  - 运⾏如下命令创建集群

  ```powershell
  redis-trib.rb create --replicas 1 172.16.179.130:7000 172.16.179.130:7001 172.16.179.130:7002 172.16.179.131:7003 172.16.179.131:7004 172.16.179.131:7005
  ```

  执⾏上⾯这个指令在某些机器上可能会报错,主要原因是由于安装的 ruby 不是最新版本，所以需要设置 gem 的源

  - 设置 gem 的源

  ```sql
  -- 先查看⾃⼰的 gem 源是什么地址，如果是https://rubygems.org/ 就需要更换
  gem source -l
  
  -- 更换指令为
  gem sources --add https://gems.ruby-china.com/ --remove https://rubygems.org/
  
  -- 通过 gem 安装 redis 的相关依赖
  sudo gem install redis
  ```

  - 重新执⾏指令

  ```powershell
  redis-trib.rb create --replicas 1 172.16.179.130:7000 172.16.179.130:7001 172.16.179.130:7002 172.16.179.131:7003 172.16.179.131:7004 172.16.179.131:7005
  ```

  


- 数据验证
  - 根据上图可以看出，当前搭建的主服务器为7000、7001、7003，对应的从服务器是7004、7005、7002

  - 在172.16.179.131机器上连接7002，加参数-c表示连接到集群

    > redis-cli -h 192.168.64.10 -c -p 7002

  - 写⼊数据

    > set name itheima

  - ⾃动跳到了7003服务器，并写⼊数据成功

  - 在7003可以获取数据，如果写入数据又重定向到7000(负载均衡)

### 在哪个服务器上写数据：CRC16算法

- redis cluster在设计的时候，就考虑到了**去中⼼化，去中间件**，也就是说，集群中的每个节点都是平等的关系，都是对等的，每个节点都保存各⾃的数据和整个集群的状态。每个节点都和其他所有节点连接，⽽且这些连接保持活跃，这样就保证了我们只需要连接集群中的任意⼀个节点，就可以获取到其他节点的数据
- Redis集群没有并使⽤传统的**⼀致性哈希**来分配数据，⽽是采⽤另外⼀种叫做**==哈希槽 (hash slot)==**的⽅式来分配的。redis cluster 默认分配了 16384 个slot，当我们 set⼀个key 时，会⽤CRC16算法来取模得到所属的slot，然后将这个key 分到哈 希槽区间的节点上，具体算法就是：**==CRC16(key) % 16384==**。所以我们在测试的 时候看到set 和 get 的时候，直接跳转到了7000端⼝的节点
- Redis 集群会把数据存在⼀个 master 节点，然后在这个 master 和其对应的salve 之间进⾏数据同步。当读取数据时，也根据⼀致性哈希算法到对应的 master 节点获取数据。只有当⼀个master 挂掉之后，才会启动⼀个对应的 salve 节点，充当 master
- 需要注意的是：==**必须要3个或以上的主节点**==，否则在创建集群时会失败，并且**当存活的主节点数⼩于总节点数的⼀半时，整个集群就⽆法提供服务了**





## Python交互

- 安装包如下

  > pip install redis-py-cluster

- redis-py-cluster源码地址https://github.com/Grokzen/redis-py-cluster

- 创建⽂件redis_cluster.py，示例码如下

```python
from rediscluster import *
if __name__ == '__main__':
  try:
    # 构建所有的节点，Redis会使⽤CRC16算法，将键和值写到某个节点上
    startup_nodes = [
        {'host': '192.168.137.169', 'port': '7000'},
        {'host': '192.168.137.169', 'port': '7003'},
        {'host': '192.168.137.169', 'port': '7001'},
    ]
    # 构建StrictRedisCluster对象
    src=StrictRedisCluster(startup_nodes=startup_nodes,decode_responses=True)
    # 设置键为name、值为itheima的数据
    result=src.set('name','itheima')
    print(result)
    # 获取键为name
    name = src.get('name')
    print(name)
  except Exception as e:
    print(e)
```
