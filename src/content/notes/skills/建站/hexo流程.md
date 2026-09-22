---
title: "hexo流程"
category: skills
folderPath: "建站"
folderTop: "建站"
tags: ["建站", "Web"]
featured: false
source: "建站/hexo流程.md"
updated: "2022-07-06"
readingTime: 8
summary: "toc  什么都不如官方文档  Hexohttps://hexo.io/zhcn/docs/ 官方文档  Materyhttp://blinkfox.com/2018/09/28/qianduan/hexobokezhutizhihexot..."
---
[[toc]]

> 什么都不如官方文档
>
> [Hexo](https://hexo.io/zh-cn/docs/) 官方文档
>
> [Matery](http://blinkfox.com/2018/09/28/qian-duan/hexo-bo-ke-zhu-ti-zhi-hexo-theme-matery-de-jie-shao/#toc-heading-6) 主题
>
> 其他参考链接
> https://developer.aliyun.com/article/775005
> https://www.jianshu.com/p/cf9730925b5c
> https://www.jianshu.com/p/fb0b0258362f

## 本地安装hexo-cli

[安装Node.js](https://www.runoob.com/nodejs/nodejs-install-setup.html)、git、hexo-cli

```shell
yum -y update
yum install nodejs
yum install git
npm install hexo-cli -g
```

#### WARN：Unsupported engine for hexo-util@2.5.0

版本过低，升级nodejs

```nginx
安装n模块：
npm install -g n
升级node.js到最新稳定版
n stable
升级node.js到最新版
n latest
升级node.js到制定版本
n v12.16.1
```

升级后的新版和旧版同时存在

![Screenshot 2021-11-06 at 8.24.45 PM](https://img-blog.csdnimg.cn/img_convert/c163ff37e6a78f4366cbfe73f2f4f56b.png)

软连接到目录下：

```bash
[root@chenjun ~] node -v
v10.24.0
[root@chenjun ~] echo $?
0
[root@chenjun ~] node -v
v10.24.0
[root@chenjun ~] /usr/local/bin/node -v
v12.16.1
[root@chenjun ~] ln -s /usr/local/bin/node /usr/bin/node
ln: 无法创建符号链接'/usr/bin/node': 文件已存在
[root@chenjun ~] rm -fr /usr/bin/node
[root@chenjun ~] ln -s /usr/local/bin/node /usr/bin/node
[root@chenjun ~] node -v
v12.16.1
[root@chenjun ~]
```



选择博客存放的位置

```bash
mkdir myblog
hexo init myblog
cd myblog
npm install
```

```bash
## 本地预览
hexo s	
## 更新
hexo g	#生成
hexo d	#部署命令还无法执行，因为还没设置要部署的位置
```





## hexo & aliyun 部署上线
如果没有买服务器，可以部署到gitee或者github上：[hexo & gitee](https://segmentfault.com/a/1190000018662692) 托管本地资源到gitee

有服务器可以直接部署到服务器，相当于把服务器当作git服务器

### 新建git用户作为git服务器

Hexo可以使用Git来部署，这样每次写完之后就都可以使用git来一键部署了，比较方便。

注意：如果本地没有配置ssh，先配一个ssh

开始前先切到root用户，然后执行：

```shell
useradd git ## 添加一个新用户
passwd git ## 设置git用户密码
su git ## 切换用户进行后续操作
cd /home/git/
mkdir -p projects/blog ## 把项目目录建立起来
mkdir repos && cd repos
git init --bare blog.git ## 创建仓库
cd blog.git/hooks
vim post-receive ## 创建一个钩子
```

`post-receive`内容

```bash
#!/bin/sh
git --work-tree=/home/git/projects/blog --git-dir=/home/git/repos/blog.git checkout -f
```

给权限

```bash
chmod +x post-receive ## 添加可执行权限
exit ## 返回到root用户
chown -R git:git /home/git/repos/blog.git ## 给git用户添加权限
```

这样Git仓库就配好了。在本地试一下能不能把空仓库拉下来：

```bash
git clone git@server_ip:/home/git/repos/blog.git
```

如果能拉下来，就说明配置成功了。

#### 本机免密码链接git用户

目前每次对git仓库进行操作都需要输入密码，但是我们已经配置了SSH，就可以通过**在本地**建立SSH信任关系来免去输入密码的步骤

```bash
ssh-copy-id -i ~/.ssh/id_rsa.pub git@server_ip ## 建立信任关系
ssh git@server_ip ## 试一下能不能登录
```

如果不能登录或者还是要输入密码，就说明前面的操作有误，再检查一下吧。

#### 禁用git用户ssh功能

为了安全起见，这个部署用的git用户最好只能用git clone等操作，所以需要更改它默认的shell：

```
cat /etc/shells ## 查看 git-shell 是否在登录方式里面
which git-shell ## 找到git-shell的路径，记下来
vim /etc/shells
```

然后把刚才记下来的路径添加进去，保存，然后`vim /etc/passwd`，把`git:x:1000:1000::/home/git:/bin/bash`

修改为`git:x:1000:1000:,,,:/home/git:/usr/bin/git-shell`。

**这样本地再用ssh就没法登录了，只能进行git操作。**

#### 本地部署

`vim _config.yml`：

```bash
deploy:
  type: git
  repo: git@your_ip:/home/git/repos/blog.git
  branch: master
```

然后在blog目录下执行安装`hexo-deployer-git`，否则没法使用git部署：

```
sudo npm install --save hexo-deployer-git
```

编辑`package.json`文件，添加部署脚本：

```bash
"scripts": {
    "build": "hexo generate",
    "clean": "hexo clean",
    "deploy": "hexo clean && hexo g -d",
    "server": "hexo server"
}
```

本地命令行输入 `hexo d` 即可实现部署。如果没有报错，就可以去服务器的 `/home/git/projects/blog` 目录下看看是不是正常生成了网页。



### 配置Nginx反向代理

##### 安装nginx
```bash
sudo yum -y install nginx
nginx ## 启动nginx试一下
```

配置Nginx反向代理

```
cd /etc/nginx
cp nginx.conf nginx_backup.conf ## 备份配置文件
vim nginx.conf
```

主要是开头的:`user root;`、

服务器部分:

```bash
  server {
    listen 80;
    server_name 39.103.140.125;

    ## Load configuration files for the default server block.
    include /etc/nginx/default.d/*.conf;

    location / {
      root /home/git/projects/blog;
      index index.html index.htm;
    }

    error_page 500 502 503 504 /50x.html;
    location &#61; /50x.html {
      root html;
  }
}
```

然后重新加载一下配置：

```
nginx -s reload
```

浏览器访问ip，就能看到hexo了！

也可以配置域名解析，把`自己的域名`绑定到现在的ip上，更改nginx配置，访问域名就能访问网站

## hexo卸载

```bnf
npm uninstall hexo-cli -g
```





## hexo优化

### [hexo目录结构](https://segmentfault.com/a/1190000018237272)

将markdown文件放在`_post`文件夹

```bash
hexo clean
hexo generate		## 生成文件
hexo server			## 本地查看
hexo deploy			## 部署上线
```

也可以执行`npm run deploy`部署上线



### 阿里cnpm速度优化

npm的默认仓库地址是 `https://registry.npmjs.org/`
可以使用以下命令查看当前npm的仓库地址

  ```sh
  npm config get registry
  ```

可以使用以下命令来改变默认下载地址，从而达到不安装`cnpm`就能采用淘宝镜像的目的，然后使用上面的get命令查看是否设置成功。

  ```sh
  npm config set registry https://registry.npm.taobao.org
  ```

- 安装cnpm，命令：

  ```bash
  npm install -g cnpm --registry=https://registry.npm.taobao.org
  ```

- 成功后，就可以使用 `cnpm` 代替以前 `npm` 来执行命令！






### 使用matery主题美化
refer：

http://blinkfox.com/2018/09/28/qian-duan/hexo-bo-ke-zhu-ti-zhi-hexo-theme-matery-de-jie-shao/#toc-heading-10

https://www.jianshu.com/p/cf9730925b5c



[Valine - 一款快速、简洁且高效的无后端评论系统](https://valine.js.org)



### favicon.ico

所以如果你的网站favicon.ico 不起作用，或者是想要让favicon.ico 的兼容性更好，要使用下面几个步骤：

1：检查网站根目录下面的favicon.ico,也就是：http://host/favicon.ico.，而不是http://host/some/favicon.ico.

2：确保<link rel="icon" href="http://host/favicon.ico" type="image/x-icon" />

 <link rel="shortcut icon" href="http://host/favicon.ico" type="image/x-icon" />

使用的是http://host/favicon.ico

3：如果你的网站带端口，或者是测试版本的话，那么尤其要注意360等浏览器，它们在请求favicon.ico 的时候会忽略端口号的。



另外，favicon.ico这个请求是浏览器自动发送的请求，我们过滤不了的。当我们访问网页的时候，浏览器默认会发送favicon.ico这个请求来查找网页的图标文件，这就是为什么我们设置网页图标的时候，只要把favicon.ico这个文件放到目录里去就行了的原因



### Hexo归档

比如，在一个博客应用中，你可能会创建如下几个视图：

- 博客首页——展示最近的几项内容。
- 内容“详情”页——详细展示某项内容。
- 以年为单位的归档页——展示选中的年份里各个月份创建的内容。
- 以月为单位的归档页——展示选中的月份里各天创建的内容。
- 以天为单位的归档页——展示选中天里创建的所有内容。
- 评论处理器——用于响应为一项内容添加评论的操作。



### Hexo & CSDN 爬虫同步

refer：[Hexo博客同步至CSDN](https://blog.csdn.net/wenjianmuran/article/details/90669920)

### hexo-插件

refer:[hexo-admin](https://blog.csdn.net/nineya_com/article/details/103380243)

`cnpm install hexo-admin --save`

访问`http://localhost:4000/admin`

## 其他优化

> [Hexo中插入mermaid diagrams_Yu's Notes-CSDN博客_hexo支持mermaid](https://blog.csdn.net/Olivia_Vang/article/details/92987859)
>
> [10+个很酷的Vue.js组件，模板和demo示例](https://zhuanlan.zhihu.com/p/146545046)
>
> [vue模版vue-starter](https://baijiahao.baidu.com/s?id=1606305883663025122&wfr=spider&for=pc)
>
> [matery修改](https://blog.csdn.net/victoryxa/article/details/105841440)
>
> [matery基本信息修改](https://blog.csdn.net/victoryxa/article/details/105841309)
>
> [html内嵌markdown](https://blog.csdn.net/qq_34705562/article/details/79653177)
>
> 内嵌：http://editor.md.ipandao.com
>
> [给自己的网页添加MarkDown编辑器_小墨鱼的网络博客，不随大流的程序员世界...-CSDN博客_网页markdown编辑器](https://blog.csdn.net/wq2323/article/details/107170754)
>
> [页面访问次数](https://www.cnblogs.com/zhaojinhui/p/5511545.html)
>
> [SEO优化](https://blog.sky03.cn/posts/42790.html#toc-heading-29)

## 一些好的设计案例

> 首页动态、随机欢迎语[Typora — a markdown editor, markdown reader.](https://www.typora.io/)
>
> [从零开始的Wordpress个人博客搭建](https://www.cnblogs.com/sijidou/p/11099787.html)
>
> [CoDesign - 设计协作，自动标注切图 - 腾讯自研设计协作平台 (qq.com)](https://codesign.qq.com/?utm_source=cdc&utm_medium=banner)
>
> bing图片[的地址](https://blog.csdn.net/facebook47/article/details/88077982)
>
> https://cn.bing.com/th?id=OHR.PortoFlavia_ZH-CN0573894597_UHD.jpg&rf=LaDigue_UHD.jpg
>
> _UHD是高清



