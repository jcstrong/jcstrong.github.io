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
│   ├── content/notes/             # 笔记 markdown 源（同步生成，不入库）
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

## 部署

GitHub Actions 在 push 时自动构建并部署到 GitHub Pages。

**仓库命名要求**：必须使用 `<username>.github.io` 命名（即 `jcstrong.github.io`）才能用顶级域名 `https://jcstrong.github.io`。当前仓库名 `jc.github.io` 走子路径部署，建议改名。

### 改名步骤

1. GitHub 仓库 Settings → General → Repository name 改为 `jcstrong.github.io`
2. Settings → Pages → Source 选 `GitHub Actions`
3. push 代码触发 workflow 自动部署
4. 访问 https://jcstrong.github.io 验证

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
