# jcstrong.github.io

> Java 后端 / AI 智能体工程师的笔记档案 · 严肃 editorial 风格

## 技术栈

- **Astro 4** - SSG 框架，Islands Architecture，零 JS by default
- **Vue 3** - 交互组件（Hero 动效、笔记卡片、目录大纲）
- **UnoCSS** - 原子化 CSS + 设计 token 系统
- **Pagefind** - 静态全文搜索（构建期生成索引）
- **Shiki** - 代码高亮（VS Code 同款主题）
- **TypeScript** - 类型化 Content Collections frontmatter

## 笔记源

笔记源在 Typora 目录：`/Users/chenjun/Library/CloudStorage/OneDrive-个人/Typora`

通过构建期同步脚本 `scripts/sync-notes.mjs` 把 218 篇 markdown 按四维分类映射到 `src/content/notes/<category>/`，注入 frontmatter。

## 本地开发

```bash
# 安装依赖
npm install

# 同步 Typora 笔记 + 启动 dev server
npm run dev

# 构建生产版本（同步 + 构建 + 生成搜索索引）
npm run build

# 预览构建结果
npm run preview
```

## 目录结构

```
jcstrong.github.io/
├── .github/workflows/deploy.yml   # GitHub Actions 自动部署
├── astro.config.mjs               # Astro 配置
├── uno.config.ts                  # UnoCSS 设计 token
├── tsconfig.json                  # TS 配置
├── scripts/sync-notes.mjs         # Typora → content/notes 同步
├── src/
│   ├── components/                # Vue 组件
│   ├── content/notes/             # 笔记 markdown 源（同步生成，已入库供 CI 构建）
│   │   ├── projects/              # PART 01 项目实战
│   │   ├── skills/                # PART 02 技能图谱
│   │   ├── practice/              # PART 03 工程实践
│   │   └── study/                 # PART 04 学习笔记
│   ├── content.config.ts          # frontmatter schema 校验
│   ├── layouts/                   # 页面骨架
│   ├── pages/                     # 路由
│   └── styles/                    # 全局样式
└── public/                        # 静态资源
```

## 部署（当前已上线）

**线上地址**：https://jcstrong.github.io

| 项 | 值 |
|---|---|
| 仓库 | `jcstrong/jcstrong.github.io` |
| 部署分支 | `homepage`（源码分支） |
| 图床分支 | `master`（PicGo 图床，**不存放主页源码，保持零改动**） |
| Pages 模式 | GitHub Actions（`build_type: workflow`） |

### 仓库结构说明（重要）

这个仓库同时承担两个角色，因此分支是分开的：

- **`master` 分支** = PicGo 图床。图片在 `img/`（`https://jcstrong.github.io/img/xxx.png`），另有 `2021/`、`archives/`、`fonts/` 三个历史目录。**主页源码不放这里**，避免干扰 PicGo 上传。
- **`homepage` 分支** = 主页源码（Astro 项目）。

CI 构建时会**同时检出两个分支**：源码来自 `homepage`，图床目录从 `master` 拷进部署产物，因此：

1. 笔记里的图床图片 URL（`/img/...`）在主页上照常显示
2. PicGo 继续往 `master` 上传不受影响
3. 主页 URL 是根路径 `https://jcstrong.github.io/`

> 若 PicGo 又上传了新图片、想让新图也进部署产物，手动触发一次 Actions（Actions → Build and Deploy → Run workflow）即可。

### 日常更新流程

```bash
cd homepage

# 1. 只管在 Typora 写笔记

# 2. 同步笔记（会顺带做密钥脱敏）
npm run sync

# 3. 本地预览确认
npm run build && npm run preview

# 4. 发布
git add -A && git commit -m "notes: 更新笔记" && git push
# push 后 GitHub Actions 自动构建部署，约 2 分钟生效
```

### 密钥脱敏（安全机制）

`scripts/sync-notes.mjs` 内置 `redactSecrets()`，笔记里出现的真实密钥**不会**被发布到公开站点：

- 已知凭证前缀无条件脱敏：`LTAI*`（阿里云 AK）、`secret_*`（Notion）、`ghp_*` / `github_pat_*`（GitHub）、`ntn_*`、`sk-*`、`AKIA*`、`xox*`
- 上下文脱敏：`AccessKey / Secret / Token / 密码 / 密钥` 等关键词附近 6 行内的长随机串
- URL 内片段（如图床 CDN 的哈希文件名）自动跳过，避免图片裂开

**源笔记（Typora 目录）不受影响，仅同步副本被清洗。**


## 主题

跟随系统 `prefers-color-scheme`：
- 亮色：白底黑字 + 墨蓝强调色
- 暗色：深炭灰底 + 浅灰字 + 浅蓝强调色

## 视觉风格

editorial · monochrome · Swiss-style · 工程师感
- 配色：黑白灰为主 + 单一墨蓝 `#1F3568` 强调色
- 字体：等宽 JetBrains Mono（logo / 标签）+ 现代无衬线 Inter（正文）
- 布局：高信息密度、几何网格、克制留白
- 装饰：极简线条、0.5px 描边、纯色填充
