---
title: "cherry-pick"
category: practice
folderPath: "工作实用指南"
folderTop: "工作实用指南"
tags: ["Git", "团队协作"]
featured: false
source: "工作实用指南/cherry-pick.md"
updated: 2024-03-23
readingTime: 1
summary: "我怎么把develop分支上的某次conmmit合并到daily分支上\r \r bash\r  查看commit的历史记录\r git log\r \r  切换到daily分支\r git checkout daily\r \r  将commit合并到da..."
---
### 我怎么把develop分支上的某次conmmit合并到daily分支上

```bash
# 查看commit的历史记录
git log

# 切换到daily分支
git checkout daily

# 将commit合并到daily分支
git cherry-pick <commit-hash>
```

## merge和rebase我选择哪个