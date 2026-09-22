---
title: "maven"
category: practice
folderPath: "工作实用指南"
folderTop: "工作实用指南"
tags: ["Maven", "Java"]
featured: false
source: "工作实用指南/maven.md"
updated: "2023-07-21"
readingTime: 2
summary: "IDEA中的Maven指令https://blog.csdn.net/qq_40547893/article/details/110091275\r \r  clean命令\r \r 清除由项目编译创建的target\r \r  validate命令\r..."
---
### [IDEA中的Maven指令](https://blog.csdn.net/qq_40547893/article/details/110091275)

##### clean命令

清除由项目编译创建的target

##### validate命令

验证项目是否正确并且所有必要的信息均可用

##### compile命令

编译项目的源代码

##### test命令

使用合适的单元测试框架来测试编译的源代码。 这些测试不应要求将代码打包或部署

##### verify命令

对集成测试的结果进行任何检查，以确保符合质量标准

##### package命令

完成了项目编译、单元测试、==打包==功能，但没有把打好的可执行jar包（war包或其它形式的包）布署到本地maven仓库和远程maven私服仓库

##### install命令

完成了项目编译、单元测试、打包功能，同时把打好的可执行jar包（war包或其它形式的包）==布署到本地maven仓库==，但没有布署到远程maven私服仓库

##### deploy命令

完成了项目编译、单元测试、打包功能，同时把打好的可执行jar包（war包或其它形式的包）==布署到本地maven仓库和远程maven私服仓库==

#### package,install,deploy三者关联

`mvn clean package` 依次执行了clean、resources、compile、testResources、testCompile、test、jar(打包)等７个阶段。

`mvn clean install`依次执行了clean、resources、compile、testResources、testCompile、test、jar(打包)、install等8个阶段。

`mvn clean deploy`依次执行了clean、resources、compile、testResources、testCompile、test、jar(打包)、install、deploy等９个阶段。

`site`命令，用于为Maven项目生成站点（用以生成HTML页面的模块等文档）