---
title: "jupyter notebook"
category: skills
tags: ["开发工具", "效率"]
featured: false
source: "工具/jupyter notebook.md"
updated: 2021-11-19
readingTime: 2
summary: "toc  快捷键操作  两种模式通用快捷键    Shift+Enter，执行本单元代码，并跳转到下一单元    Ctrl+Enter，执行本单元代码，留在本单元  命令模式：按ESC进入    Y，cell切换到Code模式    M，c..."
---
[toc]

#### 快捷键操作

- 两种模式通用快捷键
  - **`Shift+Enter`，执行本单元代码，并跳转到下一单元**
  - **`Ctrl+Enter`，执行本单元代码，留在本单元**

- **命令模式**：按ESC进入
  - `Y`，cell切换到Code模式
  - `M`，cell切换到Markdown模式
  - `A`，在当前cell的上面添加cell
  - `B`，在当前cell的下面添加cell

- 其他(了解)
  - `双击D`：删除当前cell
  - `Z`，回退
  - `L`，为当前cell加上行号 <!--
  - `Ctrl+Shift+P`，对话框输入命令直接运行
  - 快速跳转到首个cell，`Crtl+Home`
  - 快速跳转到最后一个cell，`Crtl+End` -->

- **编辑模式**：按Enter进入
  - 补全代码：变量、方法后跟`Tab键`
  - 为一行或多行代码添加/取消注释：`Ctrl+/`（Mac:CMD+/）

- 其他(了解)：
  - 多光标操作：`Ctrl键点击鼠标`（Mac:CMD+点击鼠标）
  - 回退：`Ctrl+Z`（Mac:CMD+Z）
  - 重做：`Ctrl+Y`（Mac:CMD+Y)

# jupyter + 群晖

[群辉、Docker 和 Jupyter](https://zhuanlan.zhihu.com/p/62588290)

`jun:x:1026:100::/var/services/homes/jun:/bin/sh`

`sha1（azjzqz）= 40b3cb53b3bb92af2a2e0a911faa72aaae4b4a80`

sha1

```
sudo /var/packages/Docker/target/usr/bin/docker run --name 'jupyter-test' -u root -it -p 8888:8888 -e NB_UID=1026 -e NB_GID=100 -v /volume1/JupyterNotebook :/home/jovyan/work jupyter/datascience-notebook start-notebook.sh --NotebookApp.password='sha1:40b3[REDACTED]
```

