---
title: "安装Home环境"
category: practice
folderPath: "工作实用指南"
folderTop: "工作实用指南"
tags: ["环境配置"]
featured: false
source: "工作实用指南/安装Home环境.md"
updated: "2023-12-07"
readingTime: 6
summary: "Mac环境安装Home OpenJDK下载地址https://www.azul.com/downloads/?version=java8lts&os=macos&package=jdkzulu  安装Home环境 按照下图修改setup.s..."
---
# Mac环境安装Home

[OpenJDK下载地址](https://www.azul.com/downloads/?version=java-8-lts&os=macos&package=jdk#zulu)



## 安装Home环境

按照下图修改setup.sh文件

如果已经配置了javahome就不需要在文件中重复声明

![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=ZTU9lLSHTyc&fid=362980571110172&width=1200&height=800&type=min)



![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=qe1CjsQRTIk&fid=362980571110174&width=1200&height=800&type=min)

运行setup.sh开始安装

![image-20231107141037782](https://nccdev.yonyou.com/shareThumbnail?shareId=L2yEqXQiSBQ&fid=362980571110336&width=1200&height=800&type=min%22%7D)

经过测试发现，安装使用oracle的jdk和OpenJdk都可以



## 启动sysConfigf

修改sysConfig.sh ，删除下方DISPLAY部分

![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=3TaagCRdc&fid=362980571110173&width=1200&height=800&type=min)

运行

![image.png](https://nccdev.yonyou.com/shareThumbnail?shareId=E1NyBnkgTcU&fid=362980571110181&width=1200&height=800&type=min)

运行sysConfig时要使用OpenJdk，oracle的也能运行，但是有可能会点击不了



## 调试sysConfig项目

**配置idea**：配置Home、jdk、Working directory

![image-20231104142148373](https://nccdev.yonyou.com/shareThumbnail?shareId=fZFamZPRRs&fid=362980571110293&width=1200&height=800&type=min%22%7D)

#### 运行报错

**大坑**：通过配置Boot后成功运行sysConfig界面，但是只能点击一下，然后就开始彩虹转圈，整个java程序界面就卡死动不了，再也点击不了了

解决：更换jdk。我以为自己的是intel芯片就没更换jdk才出现这个问题，更换成OpenJdk就流程运行了！



报错："Times" is not available, so "Lucida Bright" 

下载“Times”字体，下载地址：https://www.freebestfonts.com/download?fn=1911；安装到mac的字体册中

> Warning: the font "Times" is not available, so "Lucida Bright" has been substituted, but may have unexpected appearance or behavor. Re-enable the "Times" font to remove this warning.



当前输入法是中文的会报下面这个错，忽略之

> 2023-11-01 13:58:32.562 java[20183:297558] _TIPropertyValueIsValid called with 11 on nil context!
> 2023-11-01 13:58:32.562 java[20183:297558] imkxpc_setApplicationProperty:value:reply: called with incorrect property value 11, bailing.
> 2023-11-01 13:58:32.562 java[20183:297558] _TIPropertyValueIsValid called with 12 on nil context!
> 2023-11-01 13:58:32.562 java[20183:297558] imkxpc_setApplicationProperty:value:reply: called with incorrect property value 12, bailing.
> 2023-11-01 13:58:33.643 java[20183:297558] _TIPropertyValueIsValid called with 11 on nil context!
> 2023-11-01 13:58:33.643 java[20183:297558] imkxpc_setApplicationProperty:value:reply: called with incorrect property value 11, bailing.
> 2023-11-01 13:58:33.644 java[20183:297558] _TIPropertyValueIsValid called with 12 on nil context!
> 2023-11-01 13:58:33.644 java[20183:297558] imkxpc_setApplicationProperty:value:reply: called with incorrect property value 12, bailing.



下面的错误使用OpenJdk后也可以解决

> Exception in thread "main" java.lang.NullPointerException
> 	at java.awt.Window.init(Window.java:497)
> 	at java.awt.Window.<init>(Window.java:537)
> 	at java.awt.Frame.<init>(Frame.java:420)
> 	at java.awt.Frame.<init>(Frame.java:385)
> 	at javax.swing.SwingUtilities$SharedOwnerFrame.<init>(SwingUtilities.java:1763)
> 	at javax.swing.SwingUtilities.getSharedOwnerFrame(SwingUtilities.java:1838)
> 	at javax.swing.JOptionPane.getRootFrame(JOptionPane.java:1696)
> 	at org.java.plugin.boot.ErrorDialog.showError(ErrorDialog.java:143)
> 	at org.java.plugin.boot.ErrorDialog.showError(ErrorDialog.java:127)
> 	at org.java.plugin.boot.BootErrorHandlerGui.handleFatalError(BootErrorHandlerGui.java:49)
> 	at org.java.plugin.boot.Boot.main(Boot.java:250)









### 启动中间件

idea控制台中乱码，要在配置中把 -Dfile.encoding 改为 GBK

*（图片缺失：image-20231102115449880.png）*

报错：前言中不允许有内容。

> ```
> 2023-11-02 14:16:40,155 Thread-4 ERROR Unrecognized format specifier [A]
> 2023-11-02 14:16:40,156 Thread-4 ERROR Unrecognized conversion specifier [A] starting at position 119 in conversion pattern.
> startup error:Business server is not inited
> [Fatal Error] :1:1: 文件提前结束。
> [Fatal Error] :1:1: 前言中不允许有内容。
> [Fatal Error] :1:1: 前言中不允许有内容。
> [Fatal Error] :1:1: 前言中不允许有内容。
> [Fatal Error] :1:1: 前言中不允许有内容。
> ESA Server stopping 
> ESA Server stopped 
> ```

[解决](https://nccdev.yonyou.com/qa/detail/5500)：把HOME\bin\licnese这个文件，删了重启服务

参考：https://nccdev.yonyou.com/qa/detail/5500

这种方法在我这没用，因为根本没这个文件。。。





报错：

> 十一月 06, 2023 1:35:29 下午 org.apache.tomcat.granite.BrightTomcat start
> 信息: Server startup in 87063 ms
> 十一月 06, 2023 1:35:30 下午 org.apache.coyote.AbstractProtocol pause
> 信息: 暂停ProtocolHandler["http-nio-80"]
> 十一月 06, 2023 1:35:30 下午 org.apache.catalina.core.StandardService stopInternal
> 信息: 正在停止服务[base server]
> ESA Server stopping 
> ESA Server stopped 
> 十一月 06, 2023 1:35:31 下午 org.apache.catalina.core.ApplicationContext log
> 信息: Destroying Spring FrameworkServlet 'spring-opm'
> 十一月 06, 2023 1:35:31 下午 org.apache.catalina.core.ApplicationContext log
> 信息: Closing Spring root WebApplicationContext
> 十一月 06, 2023 1:35:31 下午 org.apache.coyote.AbstractProtocol stop
> 信息: 正在停止ProtocolHandler ["http-nio-80"]

解决：参考 https://www.jianshu.com/p/b011a6dd9e1c 修改mac最大文件数







报错：org.slf4j.LoggerFactory

[解决](https://nccdev.yonyou.com/article/detail/993)：版本冲突。删除 ncchome/external/lib/slf4j-api-1.7.36.jar 文件，重新启动服务

详细请参考：https://nccdev.yonyou.com/article/detail/993

> 十一月 06, 2023 11:29:05 上午 org.apache.catalina.core.StandardContext filterStart
>
> 严重: 启动过滤器异常
>
> java.lang.ExceptionInInitializerError
>
> ​    *at io.github.resilience4j.circuitbreaker.CircuitBreaker.of(CircuitBreaker.java:683)*
>
> ​    *at nccloud.ws.opm.core.filter.CircuitBreakerHandler.<init>(CircuitBreakerHandler.java:81)*
>
> ​    *at nccloud.ws.opm.core.filter.CircuitBreakerHandler.<init>(CircuitBreakerHandler.java:27)*
>
> ​    *at nccloud.ws.opm.core.filter.CircuitBreakerHandler$Builder.build(CircuitBreakerHandler.java:276)*
>
> ​    *at nccloud.ws.opm.core.filter.CircuitBreakerHandler.createHandler(CircuitBreakerHandler.java:123)*
>
> ​    *at nccloud.ws.opm.core.filter.OpenCloudSecurityFilter.<init>(OpenCloudSecurityFilter.java:81)*
>
> ​    ... 43 more
>
> sun.reflect.DelegatingConstructorAccessorImpl.newInstance(DelegatingConstructorAccessorImpl.java:45)*
>
> ​    *at java.lang.reflect.Constructor.newInstance(Constructor.java:423)*
>
> ​    *at org.apache.catalina.core.DefaultInstanceManager.newInstance(DefaultInstanceManager.java:151)*
>
> ​    *at org.apache.catalina.core.ApplicationFilterConfig.getFilter(ApplicationFilterConfig.java:250)*
>
> ​    *at org.apache.catalina.core.ApplicationFilterConfig.<init>(ApplicationFilterConfig.java:102)*
>
> ​    *at org.apache.catalina.core.StandardContext.filterStart(StandardContext.java:4613)*
>
> ​    *at org.apache.catalina.core.StandardContext.startInternal(StandardContext.java:5256)*
>
> ​    ... 43 more
>
> Caused by: *java.lang.IllegalStateException*: org.slf4j.LoggerFactory in failed state. Original exception was thrown EARLIER. See also http://www.slf4j.org/codes.html#unsuccessfulInit
>
> ​    *at org.slf4j.LoggerFactory.getILoggerFactory(LoggerFactory.java:427)*
>
> ​    *at org.slf4j.LoggerFactory.getLogger(LoggerFactory.java:362)*
>
> ​    *at org.slf4j.LoggerFactory.getLogger(LoggerFactory.java:388)*
>
> ​    *at io.github.resilience4j.circuitbreaker.internal.CircuitBreakerStateMachine.<clinit>(CircuitBreakerStateMachine.java:53)*
>
> ​    ... 43 more





解决上述问题后，中间件启动成功

![image-20231107134309306](https://nccdev.yonyou.com/shareThumbnail?shareId=EU49zOEORWY&fid=362980571110334&width=1200&height=800&type=min%22%7D)

sysConfig代码启动成功

![image-20231107134729497](https://nccdev.yonyou.com/shareThumbnail?shareId=wFEQC0oaQ3w&fid=362980571110335&width=1200&height=800&type=min%22%7D)











点击保存后sysConfig报错

> WARNING: /Library/Java/JavaVirtualMachines/zulu-8.jdk/Contents/Home/bin/java is loading libcrypto in an unsafe way



中间件启动了但是用不了

![image-20231107151045601](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/image-20231107151045601.png)



服务器名称要改成server

![image-20231207201808734](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/image-20231207201808734.png)





