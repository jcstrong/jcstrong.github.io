---
title: "logback"
category: practice
folderPath: "工作实用指南"
folderTop: "工作实用指南"
tags: ["Logback", "日志", "Java"]
featured: false
source: "工作实用指南/logback.md"
updated: "2023-11-18"
readingTime: 1
summary: "https://zhuanlan.zhihu.com/p/535100067 SLF4J（Simple Logging Facade for Java）是一个为各种日志框架（如 Log4j、Logback 等）提供统一接口的库。它允许你在运..."
---
https://zhuanlan.zhihu.com/p/535100067



SLF4J（Simple Logging Facade for Java）是一个为各种日志框架（如 Log4j、Logback 等）提供统一接口的库。它允许你在运行时切换日志框架，而无需修改代码。

Logback 是 Log4j 的作者设计的另一个日志框架，它被认为是 Log4j 的改进版。Logback 提供了更多的配置选项和更好的性能。



配置文件格式

```xml
<configuration scan="true" scanPeriod="60 seconds" debug="false">  
    		// scan:当此属性设置为true时，配置文件如果发生改变，将会被重新加载，默认值为true。
				// scanPeriod:设置监测配置文件是否有修改的时间间隔，如果没有给出时间单位，默认单位是毫秒。当scan为true时，此属性生效。默认的时间间隔为1分钟。
				// debug:当此属性设置为true时，将打印出logback内部日志信息，实时查看logback运行状态。默认值为false。
    <property name="glmapper-name" value="glmapper-demo" /> 
    <contextName>${glmapper-name}</contextName> 
    
    <appender>
        //xxxx
    </appender>   
    
    <logger>
        //xxxx
    </logger>
    
    <root>             
       //xxxx
    </root>  
</configuration>  
```

[idea建立索引](https://www.jetbrains.com/help/idea/shared-indexes.html#project-index-command-line-without-server)