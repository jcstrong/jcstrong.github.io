---
title: "Conda"
category: skills
folderPath: "Python"
folderTop: "Python"
tags: ["Python", "Conda"]
featured: false
source: "Python/Conda.md"
updated: 2026-06-29
readingTime: 6
summary: "Conda 安装 condahttps://repo.anaconda.com/miniconda/  查看是否成功： conda version 卸载conda： rm rf ~/anaconda3  添加镜像源永久添加\t\t conda ..."
---
## Conda

安装 [conda](https://repo.anaconda.com/miniconda/) 

查看是否成功： conda --version

卸载conda： rm -rf ~/anaconda3

### 添加镜像源(永久添加)		



```
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/bioconda/

----------过期👇容易报错，直接用上面这俩----------
----------CondaHTTPError: HTTP 403 FORBIDDEN for url <https://mirrors.tuna.tsinghua.edu----------
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/

conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/

conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
```

查看anaconda中已经存在的镜像源

```
conda config --show channels
```

[出错解决](https://blog.csdn.net/ebzxw/article/details/80702506)：将代码中default选项删除，不走国外镜像

```
vim ~/.condarc
# 删除-defaults
```



### 取消base字样

```text
conda config --set auto_activate_base False
```



### 环境命令

创建环境 conda create --name <env_name> <package_names>

```bash
conda create -n py37 python=3.7
```

切换环境 

source activate <env_name>		（已弃用）

conda activate <env_name>		(这种更方便mac用户)

退出环境至root    source deactivatey

显示已创建环境 conda info -e 或者 conda info --envs 或 conda env list

复制环境 conda create --name <new_env_name> --clone <copied_env_name>



删除环境 conda remove --name <env_name> --all

conda remove -n env_name --all # env_name

卸载某个包 conda remove package_name # package_name

https://blog.csdn.net/weixin_41794514/article/details/126815710



## 安装torch_geometric

安装python

```
conda update -n base -c defaults conda

conda install python==3.9
```

安装pytorch（换pip源）

https://pytorch.org/get-started/locally/

```
pip3 install torch torchvision torchaudio
```

查看pytorch版本

```
import torch
print(torch.__version__)  #注意是双下划线
```



教程：[torch-geometric(PYG) 环境配置](https://betheme.net/qianduan/10517.html?action=onClick)

https://github.com/pyg-team/pytorch_geometric

找到适合的版本：scatter、sparse、spline、cluster

注意torch版本、cuda版本、python版本

```
pip install https://data.pyg.org/whl/torch-1.13.0%2Bcpu/torch_scatter-2.0.9-cp39-cp39-macosx_10_15_x86_64.whl

pip install https://data.pyg.org/whl/torch-1.13.0%2Bcpu/torch_sparse-0.6.15-cp39-cp39-macosx_10_15_x86_64.whl

pip install https://data.pyg.org/whl/torch-1.13.0%2Bcpu/torch_spline_conv-1.2.1-cp39-cp39-macosx_10_15_x86_64.whl

pip install https://data.pyg.org/whl/torch-1.13.0%2Bcpu/torch_cluster-1.6.0-cp39-cp39-macosx_10_15_x86_64.whl

pip install torch-geometric
```





测试

```python
from torch_geometric.datasets import KarateClub

dataset = KarateClub()
print(f'Dataset: {dataset}:')
print('======================')
print(f'Number of graphs: {len(dataset)}')
print(f'Number of features: {dataset.num_features}')
print(f'Number of classes: {dataset.num_classes}')
```

[PyTorch Geometric代码教程](https://zhuanlan.zhihu.com/p/476754252)



## [安装TensorFlow](https://www.tensorflow.org/install?hl=zh-cn)

注意下面是直接下载最新的

[虚拟环境安装](https://www.tensorflow.org/install/pip?hl=zh-cn#%E8%99%9A%E6%8B%9F%E7%8E%AF%E5%A2%83%E5%AE%89%E8%A3%85)

pip install --upgrade tensorflow

验证安装效果：

```
python -c "import tensorflow as tf;print(tf.reduce_sum(tf.random.normal([1000, 1000])))"
```

**成功**：如果系统返回了张量，则意味着您已成功安装 TensorFlow



### tensoflow2和1不通

If you have this error after an upgrade to TensorFlow 2.0, you can still use 1.X API by replacing:

```py
import tensorflow as tf
```

by


```py
import tensorflow.compat.v1 as tf
tf.disable_v2_behavior()
```

卸载tf



### 下载指定版本tf

macos

```
pip install --ignore-installed --upgrade http://storage.googleapis.com/tensorflow/mac/cpu/tensorflow-1.14.0-py3-none-any.whl
```

windows

```py
pip install --upgrade https://storage.googleapis.com/tensorflow/windows/cpu/tensorflow-0.14.0rc0-cp37-cp37m-win_amd64.whl
```



==**[tf和python的对应](https://tensorflow.google.cn/install/source_windows?hl=zh-cn#cpu)**==



[Share](https://stackoverflow.com/a/55573434)

[Improve this answer](https://stackoverflow.com/posts/55573434/edit)

### 卸载重装





## Neo4j



gdsp可以直接使用各种算法

要事先在DBMS中安装APOC、GDSL插件







## pip换源

### 临时换源

指定安装镜像加快安装:(以opencv为例)

```
pip install #opencv# -i https://mirrors.aliyun.com/pypi/simple/
```

国内常用pip安装镜像：

```
清华：https://pypi.tuna.tsinghua.edu.cn/simple
阿里云：https://mirrors.aliyun.com/pypi/simple/
中国科技大学: https://pypi.mirrors.ustc.edu.cn/simple/
华中理工大学：https://pypi.hustunique.com/
山东理工大学：https://pypi.sdutlinux.org/
豆瓣：https://pypi.douban.com/simple/
```

开代理导致Retrying

```bash
pip install 包名 -i http://pypi.douban.com/simple/ --trusted-host pypi.douban.com
```



### 永久换源

1、在用户根目录下 ~ 下创建 .pip 隐藏文件夹，如果已经有了可以跳过

```
-- mkdir ~/.pip
```

2、进入 .pip 隐藏文件夹并创建 pip.conf 配置文件

```
-- cd ~/.pip && touch pip.conf
```

3、启动 Finder(访达) 按 cmd+shift+g 来的进入，输入 ~/.pip 回车进入

4、新增 pip.conf 配置文件内容

```bash
[global]
index-url = http://localhost:8080/simple/ 
#指定可信任的主机名，用于避免 SSL 证书验证失败的问题
trusted-host = localhost
```





## [iterm2](https://juejin.cn/post/7176624950285959205)

### powerline

```
export PATH=/Users/chenjun/opt/anaconda3/envs/iterm/lib/python3.8/site-packages/powerline/bindings/zsh/powerline.zsh:$PATH

./Users/chenjun/opt/anaconda3/envs/iterm/lib/python3.8/site-packages/powerline/bindings/zsh/powerline.zsh
```





---

## conda-pack 离线环境迁移

> 整理自 `conda.md`（2025-12-03），与 `Conda.md` 合并

### 准备环境

* 安装`conda-pack`
  ```bash
  conda install conda-pack
  复制代码
  ```
  
* 使用`conda-pack`工具导出离线环境包
  ```bash
  conda pack -n my_env -o my_env.tar.gz
  # my_env 环境名称
  # my_env.tar.gz 导出的文件名称 也可以指定到具体路径
  ```
  
* 将离线包拷贝至内网，解压到Anaconda的`envs`目录

* **重现环境：**

  ```bash
  # Unpack environment into directory `my_env`
  mkdir -p my_env
  tar -xzf my_env.tar.gz -C my_env
  
  # Use Python without activating or fixing the prefixes. Most Python
  # libraries will work fine, but things that require prefix cleanups
  # will fail.
  ./my_env/bin/python
  
  # Activate the environment. This adds `my_env/bin` to your path
  source my_env/bin/activate
  
  # Run Python from in the environment
  (my_env) $ python
  
  # Cleanup prefixes from in the active environment.
  # Note that this command can also be run without activating the environment
  # as long as some version of Python is already installed on the machine.
  (my_env) $ conda-unpack
  ```

* 验证
  ```bash
  # 查看环境列表 正常显示 说明成功了
  conda list
  ```

---

## 其它备忘

> 整理自 `conda.md`（2025-12-03），与 `Conda.md` 合并

### 启动模型服务

```bash
conda activate tf

pip install -U bert-serving-server bert-serving-client

bert-serving-start -model_dir C:\Users\cjunc\Desktop\faultserve\flaskProject\es_kb_bs_env\chinese_macbert_base -ckpt_name chinese_macbert_base.ckpt -config_name macbert_base_config.json -max_seq_len 128 -port 5555 -port_out  5556 -num_work 1 -max_batch_size 32

bert-serving-start -model_dir C:\Users\cjunc\Documents\一个环境\bertServer\ chinese_macbert_base -ckpt_name chinese_macbert_base.ckpt -config_name macbert_base_config.json -max_seq_len 100 -port 5555 -port_out  5556 -num_work 1 -max_batch_size 32
```

### 启动ES

存入历史案例的向量

### 启动server.py

```bash
python server.py
```

### 调用



提取更新
皮卡-提取-异步
唐骏-单条

提取日志：
3.14-4.14

分类

D 1875040
变速器总成  后桥壳  后桥总成 

C 刹车油 柴油滤芯 差减

角齿油封  777平板 搜索



搜索 
唐骏 赛菱
挂不上档  评分4
车辆抛锚  
车辆漏油  
