---
title: "GCN+BiLSTM"
category: skills
folderPath: "Python"
folderTop: "Python"
tags: ["GCN", "BiLSTM", "NLP"]
featured: false
source: "Python/GCN+BiLSTM.md"
updated: 2023-03-23
readingTime: 2
summary: "导师要求必须用平台的数据做毕设，不过可以在实验部分用自己标注的数据  平台数据：售后维修单、索赔单这些，大概就是这些数据。（图片缺失：image20230312204536026.png）  其中包含故障信息的是索赔单里面的文本描述  （图..."
---
导师要求必须用平台的数据做毕设，不过可以在实验部分用自己标注的数据

> 平台数据：售后维修单、索赔单这些，大概就是这些数据。*（图片缺失：image-20230312204536026.png）*
>
> 其中包含故障信息的是索赔单里面的文本描述
>
> *（图片缺失：图片 1.jpg）*



我想做的就是构建一个知识图谱，然后用GNN系的算法来进行知识推理 

为什么非要用GNN这类的，因为要和前几届不同。。。

我读到一篇文章，GCN可以直接对文本进行关系抽取，实际上就是在很常见的NER模型里面加GCN但是我不会实现



- 我打算的就是做个Bi-LSTM+ CRF + GCN的==实验==，和Bi-LSTM+ CRF一对比，搞清楚这个算法写在第四章

- 不知道是否可行

  - 输入文字，输出是实体和关系吗？

  - 这个==输出的实体和关系怎么导入neo4j==？

  - 这里的GCN是起到什么作用？

    

🙏



论文[Graph Convolutional Networks for Named Entity Recognition](https://arxiv.org/pdf/1709.10053.pdf)

<img src="/Users/chenjun/Library/Application Support/typora-user-images/image-20230312211102270.png" alt="image-20230312211102270" style="zoom: 25%;" />

[BERT-BILSTM-GCN-CRF-for-NER代码](https://github.com/ttttong/BERT-BILSTM-GCN-CRF-for-NER)

[BiLSTM+GCN情感分析](https://github.com/Captain-F/BiLSTM-GCN-for-Sentiment-Analysis)

[一篇用到GCN抽取关系+实体的论文](https://www.czsun.site/publications/thesis/thesis.pdf)



[Bert论文 ](https://www.cnblogs.com/guoyaohua/p/bert.html)





图搜索

