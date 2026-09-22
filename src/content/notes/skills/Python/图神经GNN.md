---
title: "图神经GNN"
category: skills
folderPath: "Python"
folderTop: "Python"
tags: ["GNN", "图神经网络"]
featured: false
source: "Python/图神经GNN.md"
updated: "2023-03-12"
readingTime: 26
summary: "关系抽取 https://blog.csdn.net/weixin_42691585/article/details/108061271  GNN 【带你快速理解RGCN（relationalGCN）哔哩哔哩】 https://b23.tv..."
---


关系抽取

https://blog.csdn.net/weixin_42691585/article/details/108061271







## GNN

【带你快速理解R-GCN（relational-GCN）-哔哩哔哩】 https://b23.tv/7q6RTvH

GNN流程：

1.聚合

![image-20230305140121836](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/image-20230305140121836.png)

2.更新

![image-20230305140111717](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/image-20230305140111717.png)

3.循环

![image-20230305140149413](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/image-20230305140149413.png)

GNN能干嘛？

通过聚合更新，到最后，我们能够得到每个结点的表达，也就是特征feature，此时：

- 结点分类就可以直接拿去分类，算loss，优化前面提到的w
- 关联预测就最简单的方法两个节点的特征一拼，拿去做分类，一样的算loss，优化。x 
- 

归根到底，==GNN就是个提取特征的方法==！！！！

### GCN

和GNN的流程一样，但是在聚合的步骤，对a\b\c这些邻居节点的参数的确定提供了方法

GNN只是一种对邻居的平均，而GCN提供了一个公式，防止邻居差异过大

![image-20230305140605668](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/image-20230305140605668.png)

> H是每一层的特征
> D矩阵的加入使得B对A的影响更准确（分母开根号的大小来控制）

具体理解上就是下图中， A节点只和B节点相连，但是毕节点和很多节点相连，所以 如果采用平均法，B对A的影响就会不准确， 因为B不应该对这么多节点，同时有同样的影响， 通过前面这个分数， 把B对A的影响给平均掉， 这样就不会对A造成太大的偏差的影响

<img src="https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/image-20230305140838529.png" alt="image-20230305140838529" style="zoom:33%;" />

### R-GCN

GCN中对不同的关系的邻居没有不同的操作，R-GCN提供了公式来表现不同关系的邻居对节点的影响![7351CCA2-6AC0-4489-AEE1-30548D1BAD87](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/7351CCA2-6AC0-4489-AEE1-30548D1BAD87.jpeg)

> r：某种关系的 N：邻居；i：关注的节点
> R：所有关系
> <img src="https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/image-20230305141725903.png" alt="image-20230305141725903" style="zoom:50%;" />：i节点的（上一层）特征
> <img src="https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/image-20230305141813972.png" alt="image-20230305141813972" style="zoom:50%;" />：分开计算不同关系的邻居特征，$W_r$就是不同的参数





<img src="https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/image-20230305142222998.png" alt="image-20230305142222998" style="zoom:50%;" />

> in/out：关系的方向
> 绿色：regulazition（正则化）
> 红色：自己的表达

![image-20230305142434652](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/image-20230305142434652.png)

> Entity classification：比如已知A、B、C、D的性别推测E的性别
>
> - 通过R-GCN学习得到最终的h（特征）
> - 比较Node loss
>
> Link prediction：如已知A-C、A-B、C-E的关系，推测B-E之间的关系
>
> - 一般是B和E的特征拼起来做分类，但是这里是BE特征向量乘起来（DistMult），算出Edge loss



### GAT

自动学习节点之间互相的影响度

![image-20230305152554262](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/image-20230305152554262.png)

> W：transform装置向量，通过W把节点A、B计算后拼接 
> a：向量a可以通过网络训练得到
> *：向量内积得到一个值

A和所有邻居节点的之间的重要性相加起来等于1，这样能保证相对的重要性是准确的。那A、B之间的重要性就是所有邻居**分之**AB

在论文中就是这个公式。$e_{ij}$就是拼起来的的向量， softmax激活，最后计算邻居平均就是

![12D1C66F-C528-4BBD-B09E-924AE96D1706_1_102_o](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/12D1C66F-C528-4BBD-B09E-924AE96D1706_1_102_o.jpeg)

多头注意力机制

确保GAT更加稳定：

- 注意力机制中，接近状况越相似，影响力越高。但是接近状况不能完全决定影响值
- 多头就是给出三套 W、a的值，下图每种颜色都是一套W、a

![1ED0A3FE-9CCD-4C91-A2FC-5C6426DCF623_1_102_a](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/1ED0A3FE-9CCD-4C91-A2FC-5C6426DCF623_1_102_a.jpeg)























## R-GCN 

先按照关系类型进行区分，再用传统的GCN对节点的特征进行聚合

R-GCN 关系图卷积神经网络链路预测任务论文复现总结 - 沧海一粟的文章 - 知乎 https://zhuanlan.zhihu.com/p/367721297

https://github.com/lixuanhng/NLP_related_projects



## [BertGCN](https://arxiv.org/pdf/2105.05727.pdf)

图网络：聊聊文本图模型TextGCN、BertGCN - 眼睛里进砖头了的文章 - 知乎 https://zhuanlan.zhihu.com/p/411167711

[项目](https://github.com/ZeroRin/BertGCN)

[b+c](https://arxiv.org/pdf/2110.00171.pdf)

### Bert复现 https://zhuanlan.zhihu.com/p/502554832

中文预训练模型[chinese_L-12_H-768_A-12.zip](https://storage.googleapis.com/bert_models/2018_11_03/chinese_L-12_H-768_A-12.zip)

[哈工大预训练模型](https://github.com/iflytek/HFL-Anthology#Pre-trained-Language-Model)

https://blog.csdn.net/Jerryzhangjy/article/details/110209984

“知识图谱+”系列：知识图谱+图神经网络 - 泽宇的文章 - 知乎 https://zhuanlan.zhihu.com/p/358119044

[必读论文|知识图谱必读论文10篇](https://blog.csdn.net/Arnetminer/article/details/105892948)

[必读论文|知识图谱必读论文10篇](https://zhuanlan.zhihu.com/p/137749570)

https://www.bilibili.com/video/BV1ir4y1m7YF?p=20&vd_source=53552bf3f6a82d7a12bfbf1949001f63

[知识图谱综述（五）：应用、总结和展望](https://zhuanlan.zhihu.com/p/135439627)

概念：嵌入、Node-level Attention、 Semantic-level Attention、节点特征、特征空间、线性映射、heterogeneous graph 、  meta-path.、softmax



## 图注意力GAT

[GAN论文](https://arxiv.org/pdf/1710.10903.pdf)

【图神经网络系列讲解及代码实现-GAT 1】https://www.bilibili.com/video/BV1wP411T7dr?vd_source=a0e656664bc844a2e78e70d57714df7d



![image-20230228165615786](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/image-20230228165615786.png)

得到一个经过GAT之后的$h_i$



softmax、LeakyReLU 激活函数（玄学无法验证）、

![](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/%E6%88%AA%E5%B1%8F2023-02-28%2016.08.04.png)

这里的forward函数中红框部分就是下图的公式

![截屏2023-02-28 16.09.55](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/%E6%88%AA%E5%B1%8F2023-02-28%2016.09.55.png)

 红框以外是softmax的过程



GAT实践的细节问题 - April的文章 - 知乎 https://zhuanlan.zhihu.com/p/363730410

## 异质图HGAN Heterogeneous Graph Attention Network

[异质图实验](https://github.com/Jhy1993/HAN.git)

[论文](https://arxiv.org/pdf/1903.07293)

[教程](https://github.com/Jhy1993/HAN)

[实验](https://zhuanlan.zhihu.com/p/456044980)

How to find some meaningful meta-paths?

[HGANの論文解説](https://qiita.com/maomao/items/a0fd2e16a7d33c62604b)

[论文解说](https://cloud.tencent.com/developer/article/1665874)

【图神经网络系列讲解及代码实现-异质图注意力网络 HAN 1】https://www.bilibili.com/video/BV1qv4y147GT?vd_source=a0e656664bc844a2e78e70d57714df7d

HAN详解（Heterogeneous graph attention network） - 大师兄的文章 - 知乎 https://zhuanlan.zhihu.com/p/346658317

[异质图神经网络学习笔记-相关论文](https://zhuanlan.zhihu.com/p/113242299)

**图神经网络的图聚类** （CS）. 图神经网络 (GNN)已经在许多图分析任务上取得了最前沿的进展，如节点分类和链接预测。. 然而，事实证明，图中重要的无监督问题，如图的聚类，限制着GNN的进一步发展。. 在本文中，我们从聚类能力的角度研究了GNN池的无监督训练。. 我们从绘制图集群和图池之间的联系开始：直观来说，良好的图集群是GNN池层所期望的；与直觉相反，结果表明对于最先进的合并方法（例如MinCut合并）情况并非如此。. 为了解决这些缺陷，我们引入了深度模块化网络（DMoN），这是一种无监督的池化方法，其灵感来自于聚类质量的模块化度量，并展示了其如何解决现实世界中具有挑战性的聚...

[HAN文本分类的代码](https://github.com/yanyusong/HAN)

Study on Time-sharing Reservation Recommendation System of Scenic Spots Based on Relationship Graph







异构图注意力网络（HAN）是一种可以处理不同类型的边和节点的图神经网络模型，它使用了节点级别的注意力和语义级别的注意力来学习异构图的表示。²

HAN可以应用在生产环境中，例如：

- 滴滴AI Labs团队使用HAN来做出租车订单预测，利用了订单数据中包含的多种实体类型和实体关系，如用户、司机、地点、时间等。¹
- 京东AI团队使用HAN来做商品推荐，利用了商品数据中包含的多种实体类型和实体关系，如用户、商品、品牌、类别等。³

这些应用实例都表明了HAN在处理异构信息网络方面的优势和效果。

异构图注意力网络 - 知乎. https://zhuanlan.zhihu.com/p/94503695 访问时间 2023/2/27.
滴滴自主提出基于注意力机制的异构图神经网络 .... https://zhuanlan.zhihu.com/p/108266284 访问时间 2023/2/27.
【GNN】HAN：异构图注意力网络 - 腾讯云开发者社区-腾讯云. https://cloud.tencent.com/developer/article/1665874 访问时间 2023/2/27.



[Heterogeneous Graph Attention Network论文](https://arxiv.org/pdf/1903.07293.pdf)



[arXiv 最新速递]异配图上的结构学习GCN - 图子的文章 - 知乎 https://zhuanlan.zhihu.com/p/382110881



异质图的名词

metapath：根据不同的条件规则可以抽取出不同的子图。这个条件规则就叫meetpath。如：演员-电影-演员、导演-电影-导演

不同类型的节点有不同的特征空间

特征空间：（相当于机器学习中的不同维度，不过更高维）



文章中的第一个公式：<img src="https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/image-20230228164932617.png" alt="image-20230228164932617" style="zoom:20%;" />相当于对所有节点的特征进行了变换。这个变换M可以类比为对特征的归一化，这个M是可以训练的参数，让网络自己计算变化的矩阵、



通过不同的metapath的到不同的子图，然后对这个子图进行同质图GAT（见上）得到一个经过GAT之后的 $Z_i$

![image-20230228165854626](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/image-20230228165854626.png)

最后把不同的子图得到的结果（都是关于电影2的。）进行加权求和。

用矩阵表示，就是论文中的公式（9）<img src="https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/image-20230228171755502.png" alt="image-20230228171755502" style="zoom:0%;" />





加权求和的系数<img src="https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/image-20230228170516864.png" alt="image-20230228170516864" style="zoom:20%;" />和<img src="https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/image-20230228170536572.png" alt="image-20230228170536572" style="zoom:20%;" />该如何计算呢？

- 引入一个概念q：语义级注意力向量（一个可训练的参数）

计算<img src="https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/image-20230228170516864.png" alt="image-20230228170516864" style="zoom:20%;" /> 

![image-20230228170159563](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/image-20230228170159563.png)

- step1 使用了相似度计算的公式
- step2 所有节点对q进行相似度的计算，求和后平均，得到每条==元路径==的重要性
- step3 把不同元路径的 结果做一个softmax，得到不同的权重



> 直接用gat是可以的，指标比han差点，han更充分考虑不同元路径的丰富语义，，所以效果更好点





## [Cluster-GCN](https://zhuanlan.zhihu.com/p/404687517#:~:text=%E8%81%9A%E7%B1%BBGCN%EF%BC%9A%E9%9D%A2%E5%90%91,%E7%BB%9C%E7%9A%84%E9%AB%98%E6%95%88%E8%AE%AD%E7%BB%83%E7%AE%97%E6%B3%95)

[异构图GCN-图子](https://cloud.tencent.com/developer/article/1665874)

## hetsann

[论文](https://arxiv.org/abs/1912.10832)：An Attention-based Graph Neural Network for Heterogeneous Structural Learning

[论文解读](http://t.csdn.cn/GIgve)

*（图片缺失：截屏2023-02-27 15.20.49.png）*

[hetsann实现Simple代码](https://github.com/didi/hetsann)









您好，这是Bing。😊

han和hetsann两种算法都是基于图神经网络的方法，用于处理异构信息网络（HIN）中的结构和语义信息。⁴⁵⁶

han算法是一种基于元路径的方法，它需要预先定义元路径来指导不同类型的节点之间的信息传播。⁴

hetsann算法是一种无需元路径的方法，它使用了类型感知的注意力层来自动学习不同类型节点之间的重要性，并使用任务导向的目标函数来训练模型。⁵⁶

han和hetsann两种算法的区别在于是否需要人工定义元路径，以及是否使用注意力机制来捕捉异构网络中的语义信息。

源: 与必应的对话， 2023/2/27(1) 【论文解读|AAAI2020】HetSANN-An Attention-based Graph .... https://blog.csdn.net/qq_36291847/article/details/116495890 访问时间 2023/2/27.
(2) 【论文解读 AAAI 2020 | HetSANN】An Attention-based GNN .... https://blog.csdn.net/byn12345/article/details/105146171 访问时间 2023/2/27.
(3) HetSANN：基于注意力模型，自动挖掘异质网络语义信息 .... https://blog.csdn.net/u013602059/article/details/105144860 访问时间 2023/2/27.
(4) 优化算法Optimizer比较和总结 - 知乎. https://zhuanlan.zhihu.com/p/55150256 访问时间 2023/2/27.
(5) 算法工程师面试问答_文本分类_suli77的博客-CSDN博客. https://blog.csdn.net/suli77/article/details/129217948 访问时间 2023/2/27.
(6) 决策树三种算法比较(ID3、C4.5、CART)_若只如初見~~的 .... https://blog.csdn.net/qq_43468807/article/details/105969232 访问时间 2023/2/27.



[han算法需要根据不同的任务和数据集选择合适的元路径，而hetsann算法可以自适应地学习不同类型节点之间的关系，因此更灵活和通用。](https://blog.csdn.net/byn12345/article/details/105146171)[1](https://blog.csdn.net/byn12345/article/details/105146171)[3](https://blog.csdn.net/u013602059/article/details/105144860)







分类与聚类的比较 

分类：有训练数据，且训练数据包含输入和输出（有监督学习），已知分类的类别（即训练数据的输出）。 学习出一个模型，用该模型对未分好类（预测数据）的数据进行预测分类（已知的类别中）。 

聚类：训练数据只有输入（无监督学习）



分类主要的表示方法有：分类规则、决策树、数学公式和神经网络。另外，最近又兴起了一种新的方法—粗糙集，其知识表示采用产生式规则。



聚类技术主要是以统计方法、机器学习、神经网络等方法；代表性的聚类技术是基于几何距离的聚类方法，如欧氏距离、曼哈坦距离、明考斯基距离等



![v2-13bbc8a9f1a146ca28d20646262ecd41_1440w](https://pic2.zhimg.com/80/v2-13bbc8a9f1a146ca28d20646262ecd41_1440w.webp)

这篇文章的主要内容是提出了一种新的基于图神经网络的无监督图聚类方法，称为**Graph Neural Clustering (GNC)**¹³。该方法利用图神经网络学习节点的表示，然后使用一个聚类层将节点分配到不同的簇中。该方法可以自动确定最佳的簇数，并且可以处理不同类型和规模的图数据。该方法在几个基准数据集上超越了现有的图聚类方法¹³。

https://arxiv.org/pdf/2006.16904.pdf 伍建辉

图神经网络(GNN)已经在许多图分析任务上取得了最前沿的进展，如节点分类和链接预测。然而，事实证明，图中重要的无监督问题，如图的聚类，限制着GNN的进一步发展。在本文中，我们从聚类能力的角度研究了GNN池的无监督训练。我们从绘制图集群和图池之间的联系开始：直观来说，良好的图集群是GNN池层所期望的；与直觉相反，结果表明对于最先进的合并方法（例如MinCut合并）情况并非如此。为了解决这些缺陷，我们引入了深度模块化网络（DMoN），这是一种无监督的池化方法，其灵感来自于聚类质量的模块化度量，并展示了其如何解决现实世界中具有挑战性的聚类结构的恢复。为了阐明现有方法失败的原因，我们精心设计了一组综合数据实验，这些实验表明DMoN能够共同利用图结构和节点属性的信号。同样地，在真实数据中，DMoN产生了高质量的聚类，这些聚类与地面真实值标签紧密相关，达到了前沿的结果。

其他GNC：https://arxiv.org/pdf/1905.07953.pdf

聚类GCN：面向大而深图卷积网络的高效训练算法 - 知明的文章 - 知乎 https://zhuanlan.zhihu.com/p/404687517

引入卷积的GNN就是GCN

GNN】Cluster-GCN：一个简单又有效的 Trick  https://cloud.tencent.com/developer/article/1665684?shareByChannel=link#2.2



转载 | 一文遍览GNN卷积与池化的代表模型 - Chris Tian的文章 - 知乎 https://zhuanlan.zhihu.com/p/161853672



[2103.00742.pdf (arxiv.org)](https://arxiv.org/pdf/2103.00742.pdf)

《Automated Machine Learning on Graphs: A Survey》



它是一篇关于图形机器学习的综述，主要介绍了自动化机器学习（AutoML）在图形数据上的应用和挑战。

文章的结构如下：

- 引言：介绍了图形数据的特点和重要性，以及AutoML的定义和目标。
- 图形机器学习中的超参数优化（HPO）：回顾了HPO在图形机器学习中的方法和技术，包括基于贝叶斯优化、元学习和神经架构搜索的方法。
- 图形神经网络（GNN）架构搜索（NAS）：回顾了GNN NAS在图形机器学习中的方法和技术，主要分为基于强化学习的方法、基于进化算法的方法、基于梯度的方法和其他方法。
- AutoML for Graph Data Preprocessing and Augmentation: 回顾了AutoML在图形数据预处理和增强中的方法和技术，主要分为基于子图采样、节点采样、边采样、节点特征转换、边特征转换、拓扑变换等方面。
- AutoML for Graph Data Generation and Synthesis: 回顾了AutoML在图形数据生成和合成中的方法和技术，主要分为基于生成对抗网络（GAN）、变分自编码器（VAE）、正则化自编码器（RAE）、流模型等方面。
- AutoML for Graph Data Analysis: 回顾了AutoML在图形数据分析中的应用领域，主要包括社交网络分析、生物医学网络分析、知识图谱推理、推荐系统等。
- 未来展望：总结了目前AutoML在图形数据上存在的挑战和未来发展方向。

文章的主要内容是：

- 图形数据是一种复杂且高维度的非欧几里得结构化数据，它可以表示实际世界中各种类型的实体之间复杂且多样化地关系。因此，如何有效地处理并从图形数据中提取有价值信息是一个重要且具有挑战性问题。
  - 图形数据增强：介绍了图形数据增强的概念、技术和应用，以及如何自动选择合适的数据增强策略。
  - 图形表示学习：讨论了图形表示学习的定义、目标和评估指标，以及如何自动设计有效的图形表示模型。

- AutoML是一种利用机器学习技术自动完成机器学习任务流程各个环节（例如数据预处理、模型选择与优化、结果评估与解释等）并提高效率与性能质量目标。它可以帮助用户减少人工干预，并解决专业知识不足或资源有限等问题。
- AutoML在图形数据上具有广泛且重要意义。它可以帮助用户更好地理解并利用复杂且多样化地关系信息，并提供更高效且可靠地解决方案。然而，在实现这一目标时也面临着许多困难与挑战，例如计算成本高昂、搜索空间巨大、评估指标缺失等。
- 文章从四个方面回顾了近年来AutoML在图形数据上所做出地进展与贡献：HPO for Graph Machine Learning, GNN NAS, AutoML for Graph Data Preprocessing and Augmentation, 和 AutoML for Graph Data Generation and Synthesis. 文章还

2023/2/22(1) Automated Machine Learning on Graphs: A Survey. https://arxiv.org/pdf/2103.00742.pdf 访问时间 2023/2/22.
(2) [2103.09177] Deep learning: a statistical viewpoint - arXiv.org. https://arxiv.org/abs/2103.09177 访问时间 2023/2/22.
(3) arXiv.org e-Print archive. https://arxiv.org/pdf/2103.02907.pdf 访问时间 2023/2/22.
(4) Online Summarization Tool | PDF Summarizer | Summarize .... https://www.intellippt.com/ 访问时间 2023/2/22.
(5) SMMRY - Summarize articles, text, websites, essays and .... https://smmry.com/ 访问时间 2023/2/22.
(6) Summarize a document online – Resoomer. https://resoomer.com/assistance/en/articles/summarize-a-document-online/ 访问时间 2023/2/22.





文章的主要贡献和创新点是：

- 文章是第一篇对AutoML在图形数据上的应用进行全面且系统地综述的文章，它涵盖了图形机器学习中各个重要环节，包括HPO、GNN NAS、数据预处理与增强、数据生成与合成以及数据分析等。
- 文章提出了一个统一且通用地框架来描述AutoML在图形数据上的任务流程，它包括四个主要组件：搜索空间、搜索策略、评估指标和评估策略。文章还根据这个框架对各种方法进行了分类和比较，并总结了它们的优缺点和适用场景。
- 文章从多个角度分析了AutoML在图形数据上所面临地挑战和未来发展方向，例如如何提高计算效率、如何扩大搜索空间、如何设计更合理地评估指标和评估策略等。文章还提出了一些有待探索地研究问题，例如如何结合多模态信息、如何利用迁移学习和元学习等。
- 文章收集并整理了大量地相关文献，并提供了一个详细且完整地参考列表，方便读者进一步深入学习。文章还给出了一些公开可用地代码库和数据集，以促进AutoML在图形数据上的实践与应用。
  - 其中一些代码库和数据集的例子是：[异质图上的节点分类 — AutoGL v0.3.0rc0 documentation (tsinghua.edu.cn)](http://mn.cs.tsinghua.edu.cn/AutoGL/docfile/tutorial_cn/t_hetero_node_clf.html)
    - AutoGL[2](https://arxiv.org/abs/2103.09177)：一个基于PyTorch的AutoML框架，支持HPO、GNN NAS、数据预处理与增强等功能。
    - AutoGNN[3](https://arxiv.org/pdf/2103.07579.pdf)：一个基于TensorFlow的AutoML框架，支持HPO、GNN NAS等功能。


这就是我对这篇文章的总结。希望对你有帮助。👍

源: 与必应的对话， 2023/2/22(1) Automated Machine Learning on Graphs: A Survey. https://arxiv.org/pdf/2103.00742.pdf 访问时间 2023/2/22.
(2) [2103.09177] Deep learning: a statistical viewpoint - arXiv.org. https://arxiv.org/abs/2103.09177 访问时间 2023/2/22.
(3) arXiv.org e-Print archive. https://arxiv.org/pdf/2103.02907.pdf 访问时间 2023/2/22.
(4) Online Summarization Tool | PDF Summarizer | Summarize .... https://www.intellippt.com/ 访问时间 2023/2/22.
(5) SMMRY - Summarize articles, text, websites, essays and .... https://smmry.com/ 访问时间 2023/2/22.
(6) Summarize a document online – Resoomer. https://resoomer.com/assistance/en/articles/summarize-a-document-online/ 访问时间 2023/2/22.











[2103.00137.pdf (arxiv.org)](https://arxiv.org/pdf/2103.00137.pdf)

您好，这是Bing。我已经阅读了您提供的三篇文章，现在我可以为您生成一篇更详细的关于gnn的综述，但是由于屏幕空间有限，我仍然会尽量简洁地介绍gnn的基本概念、模型原理和应用领域。如果您想了解更多细节，请点击搜索结果中的链接。

gnn是一种用于处理图结构数据的神经网络模型³。图结构数据是由节点和边组成的数据结构，可以表示各种复杂的关系¹²。例如，社交网络、知识图谱、分子结构等都可以用图来表示。

gnn的核心思想是通过在图上进行信息传递和聚合来更新节点和边的状态²⁴。不同的gnn模型有不同的信息传递和聚合机制，例如GCN、GAT、GraphSAGE等⁵。gnn可以用于节点分类、边预测、图生成等任务³。

- GCN（Graph Convolutional Network）是一种基于谱域方法的gnn模型，它将卷积运算从欧式空间推广到非欧式空间，利用拉普拉斯矩阵对图进行傅里叶变换，并通过近似和正则化来降低计算复杂度⁷。
- GAT（Graph Attention Network）是一种基于空域方法的gnn模型，它引入了注意力机制来动态地计算每个节点对其邻居节点的重要性，并通过多头注意力来增强模型表达能力和稳定性⁸。
- GraphSAGE（Graph Sampling and Aggregation）是一种基于邻居采样和聚合方法的gnn模型，它可以处理动态增长或大规模的图数据，并且可以自适应地学习不同类型或大小的邻居子集对中心节点状态更新所做出贡献⁹。 

gnn在近年来受到了广泛的关注和应用，主要有以下几个原因：

- gnn可以有效地捕捉图结构数据中的拓扑信息和特征信息，提高了模型的表达能力和泛化能力³。
- gnn可以处理不同大小和形状的图数据，具有很强的灵活性和可扩展性³。
- gnn可以与其他深度学习模型相结合，例如CNN、RNN、Transformer等，实现跨领域和跨模态的学习⁴。

gnn在各个领域都有着广泛的应用前景，例如：

- 在自然语言处理领域，gnn可以用于文本分类、文本摘要、机器翻译等任务，利用知识图谱或语法树等图结构来增强文本理解²。
- 在计算机视觉领域，gnn可以用于目标检测、场景分割、人脸识别等任务，利用像素或区域之间的关系来增强视觉感知²。
- 在推荐系统领域，gnn可以用于用户画像、商品推荐、广告投放等任务，利用用户或商品之间

源: 与必应的对话， 2023/2/22(1) Abstract arXiv:2103.07579v1 [cs.CV] 13 Mar 2021. https://arxiv.org/pdf/2103.07579.pdf 访问时间 2023/2/22.
(2) Automated Machine Learning on Graphs: A Survey. https://arxiv.org/pdf/2103.00742.pdf 访问时间 2023/2/22.
(3) [2103.09177] Deep learning: a statistical viewpoint - arXiv.org. https://arxiv.org/abs/2103.09177 访问时间 2023/2/22.
(4) arXiv:2103.00137v3 [cs.LG] 6 Nov 2021. https://arxiv.org/pdf/2103.00137 访问时间 2023/2/22.
(5) Title: Meta-Learning with Graph Neural Networks: Methods .... https://arxiv.org/abs/2103.00137 访问时间 2023/2/22.
(6) [2103.00111] Graph Self-Supervised Learning: A Survey - arXiv.org. https://arxiv.org/abs/2103.00111 访问时间 2023/2/22.
(7) arXiv.org e-Print archive. https://arxiv.org/pdf/2103.00111.pdf 访问时间 2023/2/22.
(8) ABSTRACT arXiv:2103.00110v1 [cs.SD] 27 Feb 2021. https://arxiv.org/pdf/2103.00110.pdf 访问时间 2023/2/22.
(9) [2103.00550] A Survey on Deep Semi-supervised Learning .... https://arxiv.org/abs/2103.00550 访问时间 2023/2/22.





## GNN的应用

机器学习=数据挖掘 =人工智能

深度学习：使用深度神经网络进行机器学习

图深度学习：使用深度学习对图进行机器学习

图深度学习=图神经网络=图表示学习=几何深度学习



图中的节点映射成一个512维的向量，该向量包含所有节点的信息。只需要对向量进行预测即可

这个f就是神经网络，用于映射



*（图片缺失：image-20230312123631227.png）*

表示学习：从数据中提取最少必要信息

图嵌入、节点表示学习：把节点映射为低维连续稠密向量







![image-20230312120809447](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/image-20230312120809447.png)





节点分类

- 通过查看其邻居的标签来确定样本（以节点表示）的标签。
- 通常，此类问题以半监督的方式进行训练，只有部分图表被标记。
- 如：已知欺诈用户节点，推测还有哪些节点是欺诈用户

图表分类

- 将整个图表分类为不同的类别。这就像图像分类，但目标会变成图形域。
- 如：从确定蛋白质是否是生物信息学中的酶，到NLP中的文档分类或社交网络分析。



图形可视化：是数学和计算机科学的一个领域，位于几何图形理论和信息可视化的交汇处。它关注图形的可视化表示，这些图形揭示了数据中可能存在的结构和异常，并帮助用户理解图表。



链接预测

- 该算法必须了解图中实体之间的关系，它还试图预测两个实体之间是否存在联系。
- 如：在社交网络中，推断社交互动或向用户推荐可能的朋友至关重要。它还被用于推荐人系统问题和预测犯罪团伙。

计算节点的重要度

- 如：page rank

图聚类：指以图形式对数据进行聚类。在图形数据上执行有两种不同的聚类形式。顶点聚类试图根据边缘权重或边缘距离将图的节点分组为密集连接的区域组。第二种形式的图形聚类将图视为要聚类的对象，并根据相似性对这些对象进行聚类。

 computer vision、Natural Language Processing（文本分类，GNN利用文档或单词的相互关系来推断文档标签。应用GCN和GAT模型来解决这个问题。他们将文本转换为单词图，然后使用图卷积操作卷积单词图。他们通过实验表明，文本的字形表示具有捕获非连续和远程语义的优势）、traffic、chemistry（研究分子或化合物的图结构。在这些图中，节点是原子，边缘是化学键。）、如程序验证、程序推理、社会影响预测、推荐系统、电气健康记录建模、大脑网络和对抗性攻击预防。





关系提取

| Graph LSTM/ graph convolutional network | Relation Extraction is the task of extracting semantic relations from the text, which usually occur between two or more entities. Traditional systems treat this task as a pipeline of two separated tasks, i.e., named entity recognition (NER) and relation extraction, but new studies show that end-to-end modeling of entity and relation is important for high performance since relations interact closely with entity information |
| --------------------------------------- | ------------------------------------------------------------ |
|                                         | 关系提取是从文本中提取语义关系的任务，通常发生在两个或多个实体之间。传统系统将此任务视为由两个独立任务（即命名实体识别（NER）和关系提取）的管道，但新的研究表明，实体和关系的端到端建模对高性能很重要，因为关系与实体信息密切相关 |





**图注意力网络**(Graph ATtention network，GAT)

[以GCN的节点嵌入均值为起点，阐述如何一步步演化成GAT](https://zhuanlan.zhihu.com/p/505448792)

[图注意力网络的应用领域包括：节点分类、边分类、链接预测、实体关系抽取、知识图谱补全等](https://blog.csdn.net/sdu_hao/article/details/104478492)[4](https://blog.csdn.net/sdu_hao/article/details/104478492)[5](https://zhuanlan.zhihu.com/p/353726754)。

[a i a y n ](https://arxiv.org/pdf/1706.03762.pdf)

CNN主要用于图像；

| GNN  |      |                                                              |
| ---- | ---- | ------------------------------------------------------------ |
| CNN  |      | CNN只适用于张量数据，例如二维图像或一维文本序列。即由顶点（vertex）和边（edge）表示的图 |
| GCN  |      |                                                              |
| RNN  |      | RNN主要用于时序和NLP                                         |

图嵌入（graph embedding）：对图的顶点数据、边数据和子图数据进行降维（如DeepWalk：但是新增节点需要重新训练，不适合动态图）

图形可以是:

- 异构--由不同类型的节点组成
- 同构--由相同类型的节点组成

要么是:

- 静态--节点和边不会改变，不会添加或删除任何东西
- 动态--节点和边的变化，添加，删除，移动等。









Word2Vec效果这么明显，以至于之后类似的思想被扩展到句向量，段向量，文章向量，甚至很多和NLP无关的领域，之前我的两个工业界项目中分别将病人和学生分别以向量来表示，创造了patient2vec 和 student2vec

⚠️🏁https://zhuanlan.zhihu.com/p/463666907





数据集

### Collaboration networks

| Name                                                         | [Type](https://snap.stanford.edu/data/#netTypes) | Nodes  | Edges   | Description                                               |
| :----------------------------------------------------------- | :----------------------------------------------- | :----- | :------ | :-------------------------------------------------------- |
| [ca-AstroPh](https://snap.stanford.edu/data/ca-AstroPh.html) | Undirected                                       | 18,772 | 198,110 | Collaboration network of Arxiv Astro Physics              |
| [ca-CondMat](https://snap.stanford.edu/data/ca-CondMat.html) | Undirected                                       | 23,133 | 93,497  | Collaboration network of Arxiv Condensed Matter           |
| [ca-GrQc](https://snap.stanford.edu/data/ca-GrQc.html)       | Undirected                                       | 5,242  | 14,496  | Collaboration network of Arxiv General Relativity         |
| [ca-HepPh](https://snap.stanford.edu/data/ca-HepPh.html)     | Undirected                                       | 12,008 | 118,521 | Collaboration network of Arxiv High Energy Physics        |
| [ca-HepTh](https://snap.stanford.edu/data/ca-HepTh.html)     | Undirected                                       | 9,877  | 25,998  | Collaboration network of Arxiv High Energy Physics Theory |

https://neptune.ai/blog/graph-neural-network-and-some-of-gnn-applications







阅读这篇文章：https://arxiv.org/pdf/2103.00111.pdf 

提到的图自监督学习方法

这篇文章²提到了以下几种图自监督学习的方法：

- 基于图论和经典图数据分析的方法，如DeepWalk、Node2vec、GraphSAGE等，它们通过随机游走或采样来生成节点序列或子图，然后用距离函数或神经网络来学习节点或子图的表示。
- 基于对比学习的方法，如InfoGraph、GRACE、GraphCL等，它们通过对原始图进行不同的扰动或增强，然后用对比损失函数来学习保持一致性的图表示。
- 基于生成模型的方法，如VGAE、ARGA、Graphite等，它们通过使用变分自编码器（VAE）或生成对抗网络（GAN）来重构输入图或其属性，然后用重构误差或判别器损失来学习隐变量的表示。
- 基于其他预训练任务的方法，如GPT-GNN、GROVER、GLM等，它们通过使用自回归模型或语言模型来预测节点属性或边关系，然后用交叉熵损失来学习条件概率分布的表示。

源: 与必应的对话， 2023/2/22(1) arXiv.org e-Print archive. https://arxiv.org/pdf/2103.00111.pdf 访问时间 2023/2/22.
(2) [2103.00111] Graph Self-Supervised Learning: A Survey - arXiv.org. https://arxiv.org/abs/2103.00111 访问时间 2023/2/22.
(3) ABSTRACT arXiv:2103.00110v1 [cs.SD] 27 Feb 2021. https://arxiv.org/pdf/2103.00110.pdf 访问时间 2023/2/22.











### [How to Organize Deep Learning Projects – Examples of Best Practices](https://neptune.ai/blog/how-to-organize-deep-learning-projects-best-practices)





图神经网络的问题

如何把图输入到神经网络里？

*（图片缺失：image-20230312125352652.png）*







全链接神经网络

要求维度一样，全链接的要求导致参数爆炸，会造成过拟合；无法泛化到新节点；不具备变换不变性，不同的节点编号方式导致不同的特征

所以直接把向量直接放进去是不可行的

卷积神经网络

*（图片缺失：image-20230312130348911.png）*

但是我们的图谱是这样的，无法输入

*（图片缺失：image-20230312130530136.png）*

消息传递神经网络

消息传递：广泛收取邻居节点

*（图片缺失：image-20230312130842305.png）*

每层共用同一个神经网络

*（图片缺失：image-20230312131040371.png）*

图神经网络的层数是计算图的层数，而不是神经网络的层数

一般层数为2就够了，过深会导致输出都是同一个









Trans-E是把三元祖变成一个向量，而GCN这些是把一个节点变成一个向量
