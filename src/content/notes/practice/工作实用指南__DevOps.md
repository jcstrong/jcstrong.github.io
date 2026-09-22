---
title: "DevOps"
category: practice
tags: ["DevOps", "CI/CD"]
featured: false
source: "工作实用指南/DevOps.md"
updated: 2023-12-07
readingTime: 2
summary: "软件的生命周期 整体的软件开发流程包括：  PLAN：开发团队根据客户的目标制定开发计划  CODE：根据PLAN开始编码过程，需要将不同版本的代码存储在一个库中。  BUILD：编码完成后，需要将代码构建并且运行。  TEST：成功构建项..."
---
## 软件的生命周期

整体的软件开发流程包括：

- PLAN：开发团队根据客户的目标制定开发计划
- **CODE**：根据PLAN开始编码过程，需要将不同版本的代码存储在一个库中。
- **BUILD**：编码完成后，需要将代码构建并且运行。
- **TEST**：成功构建项目后，需要测试代码是否存在BUG或错误。
- DEPLOY：代码经过手动测试和自动化测试后，认定代码已经准备好部署并且交给运维团队。
- OPERATE：运维团队将代码部署到生产环境中。
- MONITOR：项目部署上线后，需要持续的监控产品。
- INTEGRATE：然后将监控阶段收到的反馈发送回PLAN阶段，整体反复的流程就是 Devops的核心，即持续集成、持续部署。

各个阶段较常见的工具，如下图：

*（图片缺失：截屏2023-07-13 21.20.45.png）*

Jenkins

## Docker安装Gitlab

```bash
docker search gitlab

docker pull gitlab/gitlab-ce

vi docker-compose.yml
```

```yml
version: '3.1'

services:
  gitlab:
    image: 'gitlab/gitlab-ce:latest'
    container_name: gitlab
    restart: always
    environment:
      TZ: 'Asia/Shanghai'       
      GITLAB_OMNIBUS_CONFIG: |
        external_url 'http://192.168.1.5:6506'  # web站点访问地址
        gitlab_rails['gitlab_shell_ssh_port'] = 2224
    ports:
      - '6506:6506' # 注意宿主机和容器内部的端口要一致，否则external_url无法访问
      - '2224:2224'
    volumes:
      - ./config:/etc/gitlab
      - ./data:/var/opt/gitlab
      - ./logs:/var/log/gitlab
    logging: 
      driver: "json-file"
      options: 
        max-size: "2g"
        max-file: "2"
```

```bash
docker-compose up -d # 运行gitlab Docker
# 要等久一点，可以看看日志滚动
docker-compose logs -f
```

访问 `http://192.168.1.5:6506/`

```bash
docker exec -it gitlab bash # 进入内部
cat /etc/gitlab/initial_root_password  # 查看密码
# username是root 登陆gitlab修改密码
```

⚠️ 初始密码可能无法顺利登陆，可以使用`gitlab-rake "gitlab:password:reset[root]"`重置

登陆成功去右上角preference改密码

## docker安装maven

`cd docker/maven/docker-compose.yml`

```yml
version: '3'
services:
  nexus:
    image: sonatype/nexus3
    hostname: rnexusedis
    networks:
      nexus:
        ipv4_address: 192.168.1.6
    ports:
      - "8258:8258"
    volumes:
      - nexus-data:/nexus-data

volumes:
  nexus-data:
```

`docker-compose up -d` 开始下载、启动



