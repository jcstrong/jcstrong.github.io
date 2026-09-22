---
title: "02pytorch"
category: skills
tags: ["PyTorch", "AI 模型"]
featured: false
source: "Python/NLP-quark已备份/0.pytorch/02pytorch.md"
updated: 2023-02-03
readingTime: 1
summary: "pytorch  Pytorch安装地址https://pytorch.org/getstarted/locally/ 带GPU安装步骤： conda install pytorch torchvision cudatoolkit=9.0 ..."
---
# pytorch

#### [Pytorch安装地址](https://pytorch.org/get-started/locally/)

带GPU安装步骤：

`conda install pytorch torchvision cudatoolkit=9.0 -c pytorch`

不带GPU安装步骤

`conda install pytorch-cpu torchvision-cpu -c pytorch`

安装之后打开ipython

输入：

```python
In [1]:import torch
In [2]: torch.__version__
Out[2]: '1.0.1'
```

注意：安装模块的时候安装的是`pytorch` ，但是在代码中都是使用`torch`



