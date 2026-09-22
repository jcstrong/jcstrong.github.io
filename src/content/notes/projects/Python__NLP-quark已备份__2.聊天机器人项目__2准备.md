---
title: "2准备"
category: projects
tags: ["NLP", "聊天机器人", "Seq2Seq"]
featured: true
source: "Python/NLP-quark已备份/2.聊天机器人项目/2准备.md"
updated: 2023-03-05
readingTime: 6
summary: "环境准备\r \r 1. 能够使用anaconda创建虚拟环境\r 2. 能够安装fasttext\r 3. 能够安装pysparnn\r \r \r \r  1. Anaconda环境准备\r \r 1. 下载地址：https://mirror.tuna.t..."
---
## 环境准备

1. 能够使用anaconda创建虚拟环境
2. 能够安装fasttext
3. 能够安装pysparnn



### 1. Anaconda环境准备

1. 下载地址：`https://mirror.tuna.tsinghua.edu.cn/help/anaconda/`

2. 下载对应电脑版本软件，安装
   1. windows ：双击exe文件
   2. unix：给sh文件添加可执行权限，执行sh文件
3. 添加到环境变量
   1. windows安装过程中勾选
   2. unix：`export PATH="/root/miniconda3/bin:$PATH"`
4. 创建虚拟环境
   1. `conda create -n 名字 python=3.6(版本)`
   2. 查看所有虚拟环境： `conda env list`
5. 切换到虚拟环境
   1. `conda activate 名字`
6. 退出虚拟环境
   1. `conda deactivate 名字`

### 2. fasttext安装

文档地址：`https://fasttext.cc/docs/en/support.html`

github地址：`<https://github.com/facebookresearch/fastText`

安装步骤：
1. 下载 `git clone https://github.com/facebookresearch/fastText.git`
2. cd `cd fastText`
3. 安装 `python setup.py install`

### 3. pysparnn安装

文档地址：`https://github.com/facebookresearch/pysparnn`

安装步骤：

1. 下载：`git clone https://github.com/facebookresearch/pysparnn.git`
2. 安装：`python setupy.py install`



## 语料准备

1. 准备分词词典
2. 准备停用词
3. 准备问答对
4. 爬虫采集相似问题

### 1. 分词词典

最终词典的格式：

> 词语   词性(不要和jieba默认的词性重复)

![](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/%E8%AF%8D%E5%85%B8.png)



#### 1.1 词典来源

1. 各种输入法的词典

   例如：`https://pinyin.sogou.com/dict/cate/index/97?rf=dictindex`

   例如：`https://shurufa.baidu.com/dict_list?cid=211`

2. 手动收集，根据目前的需求，我们可以手动收集如下词典

   1. 机构名称，例如：`传智`，`传智播客`,`黑马程序员`
   2. 课程名词，例如：`python`,`人工智能+python`，`c++`等

#### 1.2 词典处理

输入法的词典都是特殊格式，需要使用特殊的工具才能够把它转化为文本格式

工具名称：`深蓝词库转换.exe`

下载地址：`https://github.com/studyzy/imewlconverter`

#### 1.3 对多个词典文件内容进行合并

下载使用不同平台的多个词典之后,把所有的txt文件合并到一起供之后使用



### 2. 准备停用词

#### 2.1 什么是停用词？

对句子进行分词之后，句子中不重要的词

#### 2.2 停用词的准备

常用停用词下载地址：`https://github.com/goto456/stopwords`

#### 2.3 手动筛选和合并

对于停用词的具体内容，不同场景下可能需要保留和去除的词语不一样

比如：词语`哪个`，很多场景可以删除，但是在判断语义的时候则不行



### 3. 问答对的准备

#### 3.1 现有问答对的样式

问答对有两部分，一部分是咨询老师整理的问答对，一部分是excel中的问答对，

最终我们需要把问答对分别整理到两个txt文档中，如下图（左边是问题，右边是答案）：

![](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/%E9%97%AE%E7%AD%94%E5%AF%B9.png)

Excel中的问答对如下图：

![](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/excel%E4%B8%AD%E7%9A%84%E9%97%AE%E9%A2%98.png)



#### 3.2 excel中问答对的处理

Excel中的问答对直接使用pandas就能够处理

```python
python_qa_path = "./data/Python短问答-11月汇总.xlsx"
def load_duanwenda():
    import pandas as pd
    ret = pd.read_excel(python_qa_path)
    column_list = ret.columns
    assert '问题' in column_list and "答案" in column_list,"excel 中必须包含问题和答案"
    for q,a in zip(ret["问题"],ret["答案"]):
        q = re.sub("\s+"," ",q)
        q = q.strip()
        print(q,a)
```

### 4. 相似问答对的采集

#### 4.1 采集相似问答对的目的

后续在判断问题相似度的时候，需要有语料用来进行模型的训练，输入两个句子，输出相似度，这个语料不好获取，所以决定从百度知道入手，采集百度知道上面的相似问题，如下图所示：

![](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/%E7%99%BE%E5%BA%A6%E7%9B%B8%E4%BC%BC%E9%97%AE%E9%A2%98%E6%90%9C%E7%B4%A2.png)

上面采集的数据会存在部分噪声，部分问题搜索到的结果语义上并不是太相似

#### 4.2 手动构造数据

根据前面的问答对的内容，把问题大致分为了若干类型，对不同类型的问题设计模板，然后构造问题，问题模块如下：

```
templete = [
#概念
["{kc}","什么是{kc}","{kc}是什么","给我介绍一下{kc}","{kc}可以干什么","能简单说下什么是{kc}吗","我想了解{kc}"],

#课程优势
["{kc}课程有什么特点","{jgmc}的{kc}课程有什么特点","{jgmc}的{kc}课程有什么优势","为什么我要来{jgmc}学习{kc}","{jgmc}的{kc}课程有什么优势","为什么要到{jgmc}学习{kc}","{jgmc}的{kc}跟其他机构有什么区别？","为什么选择{jgmc}来学习{kc}？"],

#语言优势
#["{kc}","什么是{kc}","{kc}是什么","给我介绍一下{kc}","{kc}可以干什么","能简单说下什么是{kc}吗"], 
#特点
["{kc}有什么特点","{kc}有什么优势","{kc}有什么亮点","{kc}有那些亮点","{kc}有那些优势","{kc}有那些特点","{kc}的亮点是什么","{kc}的优势是什么","{kc}的特点是什么"],
#发展前景
["{kc}的发展怎么样？","{kc}的前景怎么样？","{kc}的发展前景如何？","{kc}的未来怎样","{kc}的前景好么" ],
#就业
["{kc}好就业么","{kc}就业机会多么","{kc}的岗位多吗","{kc}工作好找吗","{kc}的市场需求怎么样","{kc}的就业环境怎么样"],
#就业方向
["{kc}学完以后能具体从事哪方面工作?","{kc}的就业岗位有哪些？","{kc}课程学完应聘哪方面工作？","{kc}可以从事哪方面工作？",],
#用途
["{kc}学完可以做什么","{kc}能干什么","学{kc}能干什么","能举例说下{kc}能做什么吗？","{kc}毕业了能干什么","{kc}主要应用在什么领域"],
#就业薪资
["{kc}学完工资多少","学完{kc}能拿多少钱","{kc}的就业薪资多少","{kc}就业的平均是工资多少"],
#学习难度
["{kc}简单么","{kc}容易么","{kc}课程容易么","{kc}上手快么","{kc}课程难么"],
#校区
["在那些城市开设了{kc}","哪里可以学习{kc}","学习{kc}可以去那些城市","{kc}在哪里开班了"],
#学费
["{kc}学费","{kc}多少钱","{kc}的学费多少","{kc}是怎么收费的？","学习{kc}要花多少钱","{kc}是怎么收费的","{kc}课程的价格","{kc}课程的价格是多少"],
#适合人群
["什么人可以学{kc}","哪些人可以学{kc}","学习{kc}有什么要求","学习{kc}需要那些条件","没有基础可以学{kc}吗","学历低可以学习{kc}吗？","成绩不好可以学习{kc}吗？","什么样的人适合学习{kc}?"],
#学习时间
["{kc}需要学多久","{kc}需要多久才能就业","{kc}需要学习多长时间","{kc}的学时是多少","{kc}的课时是多少","{kc}课时","{kc}课时长度","{kc}的课程周期？","0基础学{kc}多久能才就业"],
#学习内容
["{kc}学什么","{kc}学习那些内容","我们在{kc}中学习那些内容","在{kc}中大致都学习什么内容"],
#项目内容
["{kc}的项目有哪些","{kc}有哪些项目","{kc}上课都有哪些实战","{kc}做什么项目？","{kc}项目有多少个？","{kc}课程中有项目吗？"],
#学习某课程的好处
["为什么要学习{kc}？","学习{kc}有哪些好处？","学习{kc}的理由？","为什么我要来学习{kc}"],
#上课时间
["上课时间","你们那边每天的上课时间是怎样的呢？"],
#英语要求
["学习{kc}对英语有要求么","来{jgmc}学习对英语有要求吗？"]
]
```

其中大括号的内容`kc`表示课程，`jgmc`表示机构名称

接下来，需要完成两件事

1. 最终我们会把前面准备好的课程字典和机构名称字典中的词语放入大括号中
2. 把kc相同的内容构造成相似问题
