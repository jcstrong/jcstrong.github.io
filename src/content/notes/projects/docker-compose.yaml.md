---
title: "docker-compose.yaml"
category: projects
folderPath: ""
folderTop: ""
tags: ["Docker", "DevOps", "服务编排"]
featured: true
source: "docker-compose.yaml.md"
updated: 2026-07-07
readingTime: 6
summary: "如果你顺着这份 Compose 文件往下看，最值得先掌握的是下面几类配置：  image   表示直接使用现成镜像，例如 mysql:8.0、kibana:8.19.10、qdrant/qdrant:v1.16。  build   表示不是..."
---

如果你顺着这份 `Compose` 文件往下看，最值得先掌握的是下面几类配置：

- `image`
  表示直接使用现成镜像，例如 `mysql:8.0`、`kibana:8.19.10`、`qdrant/qdrant:v1.16`。

- `build`
  表示不是直接使用现成镜像，而是先根据当前目录中的 `Dockerfile` 自行构建镜像。这里的 `elasticsearch` 使用 `build: ./elasticsearch`，就是因为通常还需要额外安装中文分词插件。

- `container_name`
  用来给容器指定一个更直观的名字，后面在 `Docker Desktop` 或命令行里查看时会更方便。

- `restart: unless-stopped`
  表示容器如果因为异常原因停止，会自动重启；只有你手动停止它时，才不会继续自动拉起。

- `environment`
  用来给容器注入启动时所需的环境变量。例如：
  - MySQL 这里配置了 `MYSQL_ROOT_PASSWORD`、`MYSQL_USER`、`MYSQL_PASSWORD`，用于初始化数据库密码和普通用户。
  - Kibana 这里通过 `ELASTICSEARCH_HOSTS` 连接到 Elasticsearch。
  - Embedding 服务这里通过 `MODEL_ID` 指定加载的模型目录。

- `ports`
  用来做宿主机和容器之间的端口映射。比如：
  - `3306:3306` 表示本机通过 `3306` 访问 MySQL
  - `9200:9200` 表示本机通过 `9200` 访问 Elasticsearch
  - `5601:5601` 表示本机通过 `5601` 打开 Kibana
  - `6333:6333` 和 `6334:6334` 分别对应 Qdrant 的 HTTP 和 gRPC 端口
  - `8081:80` 表示本机通过 `8081` 访问 Embedding 服务

- `volumes`
  用来做数据持久化或目录挂载。这一项很重要，因为如果不挂载，容器删掉之后，里面的数据或文件通常也会一起丢失。

  这里先分清两种最常见的写法：
  - **命名卷（named volume）**
    形如 `mysql_data:/var/lib/mysql`。左边的 `mysql_data` 不是当前目录下的文件夹，而是 Docker 管理的一块持久化存储；右边的 `/var/lib/mysql` 是容器里的目录。

  - **目录挂载（bind mount）**
    形如 `./mysql:/docker-entrypoint-initdb.d`。左边的 `./mysql` 是你当前项目目录下的真实文件夹；右边的 `/docker-entrypoint-initdb.d` 是容器里的目录。

  这两种写法的核心区别可以记成一句话：
  - **命名卷**更适合存“容器运行后产生的数据”
  - **目录挂载**更适合把“宿主机现成的文件”交给容器使用

  也可以再补一个最直接的判断口诀：
  - 左边如果是 `./xxx`、`../xxx`、`/绝对路径/xxx`，通常就是**目录挂载**
  - 左边如果只是 `mysql_data`、`es_data`、`qdrant_data` 这种名字，通常就是**命名卷**

  这里还有一个很关键但也最容易混淆的点：
  - **删除容器**，不等于删除命名卷
  - **删除容器**，通常也不等于删除宿主机上的挂载目录

  也就是说，只要你删掉的是容器本身，而没有把对应的 volume 或宿主机目录一起删掉，那么数据通常还在。真正容易导致数据丢失的，往往不是“删容器”这一步，而是把 volume 一并删除，或者手动删掉宿主机上的挂载目录。

  结合当前这份 `docker-compose.yaml`，可以逐条这样理解：
  - `mysql_data:/var/lib/mysql`
    这是 MySQL 的数据目录持久化。MySQL 真正的数据文件会写到容器内的 `/var/lib/mysql`，而 `mysql_data` 负责把这份数据长期保存下来。这样即使把 MySQL 容器删掉，只要没有把这个 volume 一起删掉，数据库数据通常还在。

  - `./mysql:/docker-entrypoint-initdb.d`
    这是把项目里的初始化 SQL 脚本挂进 MySQL 容器。MySQL 官方镜像第一次启动时，会自动执行 `/docker-entrypoint-initdb.d` 目录下的脚本，所以这里的作用不是“保存数据”，而是“把建库建表和初始化数据脚本交给容器执行”。

  - `es_data:/usr/share/elasticsearch/data`
    这是 Elasticsearch 的数据持久化目录。如果不挂载，索引数据会跟着容器生命周期走；容器一删，全文检索的数据也容易丢。

  - `qdrant_data:/qdrant/storage`
    这是 Qdrant 的向量数据持久化目录。它和 MySQL、Elasticsearch 的思路一样，都是把检索所需的数据留在 Docker 的持久化存储里，而不是只留在容器内部。

  - `./embedding/bge-large-zh-v1.5:/models/bge-large-zh-v1.5`
    这是把宿主机上的本地 Embedding 模型目录挂进容器。这里挂载的不是数据库数据，而是模型文件本身。容器启动后，会从 `/models/bge-large-zh-v1.5` 读取模型权重。

  另外，底部这段：

  ```yaml
  volumes:
    mysql_data:
    es_data:
    qdrant_data:
  ```

  表示这份 Compose 文件额外声明了 3 个**命名卷**。它的含义是：上面各服务在使用这些 volume，这里则是统一把它们定义出来。

  如果把 `volumes` 再压缩成一句最容易记忆的话，可以这样理解：
  - 左边决定“数据或文件从哪里来”
  - 右边决定“容器到哪里去读或写”

- `depends_on`
  用来表达服务之间的依赖关系。比如 `kibana` 依赖 `elasticsearch`，它的意思不是“等 Elasticsearch 一切业务状态都完全正常后再启动”，而是“先把依赖服务启动起来，再启动当前服务”。

你可以按这个顺序去读一份 `Compose` 文件：

1. 看 `services` 里一共定义了哪些服务
2. 看每个服务是 `image` 还是 `build`
3. 看 `ports`，确认本机通过哪些端口访问
4. 看 `volumes`，确认哪些数据会落到宿主机
5. 看 `environment`，确认这个服务启动时依赖什么配置
6. 看 `depends_on`，确认服务之间的依赖关系

### 4.4 工程思路具体分析

再结合各服务本身来看，这份 `Compose` 文件还体现了几个很重要的工程思路：

- **MySQL 不只是启动了一个数据库容器**
  它还通过 `./mysql:/docker-entrypoint-initdb.d` 挂载了初始化脚本目录。这样容器第一次启动时，就会自动执行其中的 SQL 文件，把 `meta` 数据库、`dw` 数据库、相关表结构以及模拟数据一起初始化好。

- **MySQL 的数据目录被单独持久化了**
  `mysql_data:/var/lib/mysql` 的作用，是把 MySQL 真正存数据的目录挂载出来。这样即使容器被删除，数据也不会因为容器消失而丢失。

- **Elasticsearch 使用 `build` 而不是 `image`**
  这是因为项目里的全文检索是中文场景，通常需要额外安装 `IK` 分词器，所以不能直接拿一个原生镜像就结束。

- **Kibana 本质上是 Elasticsearch 的调试界面**
  它不是必需的核心存储服务，但在开发阶段非常有用，因为可以直接通过 Web 页面观察索引、执行查询和验证检索结果。

- **Qdrant 同时开放了两类端口**
  一个是更常用的 HTTP 端口，一个是 gRPC 端口。教学项目里通常优先使用 HTTP 即可，但把两个端口都开放出来，后续扩展会更方便。

- **Embedding 服务被单独部署成了一个独立容器**
  这意味着“文本转向量”这件事不是耦合在业务代码里完成的，而是通过一个单独的推理服务来提供接口，这样后端代码只需要调用服务即可。

  这里也可以补充理解一下：Embedding 并不是只能用这种“独立服务”的方式来部署。它也可以直接耦合在业务代码里，也就是由后端程序自己加载模型、自己完成文本转向量的过程。只是当前这套教程为了让工程结构更清晰、服务职责更独立，选择了“单独部署成推理服务”这条方案。

  这里的容器里运行的，也不是我们平时理解的那种“对话大模型”，而是一个专门负责把文本转换成向量的 Embedding 模型。它的职责不是生成回答，而是把字段说明、指标说明、用户问题等文本编码成向量，供后续的向量检索使用。

- **Embedding 服务挂载了本地模型目录**
  `./embedding/bge-large-zh-v1.5:/models/bge-large-zh-v1.5` 的作用，是把本地模型权重映射到容器中，再通过 `MODEL_ID` 告诉服务从哪里加载模型。

- **教学环境使用的是 CPU 版本的 Embedding 服务**
  这样做主要是为了降低本地部署门槛。真实生产环境中，如果追求更高性能，通常会改用 GPU 版本。

如果把这一整段压缩成一句更容易记忆的话，可以这样理解：

> **这份 `Compose` 文件的价值，不只是启动容器，而是把“数据库、检索、向量化”这一整套基础能力一次性准备好。**



