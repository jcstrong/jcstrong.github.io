---
title: "PlumeLog"
category: practice
folderPath: "工作实用指南"
folderTop: "工作实用指南"
tags: ["PlumeLog", "日志聚合", "Java"]
featured: false
source: "工作实用指南/PlumeLog.md"
updated: "2023-11-17"
readingTime: 1
summary: "dockercompose部署plumlog的dockerfilehttps://blog.csdn.net/qq_38225558/article/details/128655125 安装懒人包https://gitee.com/zhen..."
---
[docker-compose部署plumlog的dockerfile](https://blog.csdn.net/qq_38225558/article/details/128655125)



安装[懒人包](https://gitee.com/zhengqingya/docker-compose)

这个里面包含很多，其中plumelog里面包含redis和es

```bash
git clone https://gitee.com/zhengqingya/docker-compose.git
docker-compose -f docker-compose.yml -p plumelog up -d\n
chmod -R 777 ./app/elasticsearch
```

[客户端配置](https://gitee.com/plumeorg/plumelog/blob/master/FASTSTART.md#%E4%BA%8C%E5%AE%A2%E6%88%B7%E7%AB%AF%E4%BD%BF%E7%94%A8)

- 下载非maven项目[依赖](https://gitee.com/plumeorg/plumelog/releases)



按照文档弄	

