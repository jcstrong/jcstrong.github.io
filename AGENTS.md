# AGENTS.md — 接手指引（AI Agent / 新同事专用）

本文件面向**接手本项目的 AI Agent**。人类视角的项目概览见 [`README.md`](./README.md)。

> 阅读顺序建议：第 1 节（现状） → 第 6 节（不可破坏的约定） → 第 8 节（已知坑）。这三节读完即可安全动手。

---

## 1. 项目现状速览

| 项 | 值 |
|---|---|
| 线上地址 | https://jcstrong.github.io |
| 定位 | 个人笔记档案站（Java 后端简历配套），严肃 editorial 风格，**不放个人信息**（无姓名/经验/学校/公司） |
| 仓库 | `jcstrong/jcstrong.github.io` — 源码在 `homepage` 分支 |
| 图床分支 | `master`（PicGo 图床，`img/` 等，**任何情况下不要改动**） |
| 技术栈 | Astro 4 + Vue 3 + UnoCSS + Pagefind + Shiki + TypeScript |
| 规模 | 218 篇笔记 → 223 个静态页面，纯静态零后端 |
| 数据源 | 本地 Typora 目录（在 OneDrive 内，**不在仓库里**） |
| 部署 | GitHub Actions → Pages（`build_type: workflow`），push 后约 2 分钟生效 |

**核心特征**：笔记内容靠同步脚本从 Typora 目录搬运，**同步产物会提交进仓库**（CI 里没有 Typora 目录，不提交就构建不出来）。

---

## 2. 环境与工具（本机实测事实，非通用假设）

```bash
# Node / npm：必须用 managed 版本（系统 node 未验证）
NODE=/Users/chenjun/.workbuddy/binaries/node/versions/22.22.2-3/bin/node
NPM=/Users/chenjun/.workbuddy/binaries/node/versions/22.22.2-3/bin/npm

# gh CLI 不在 PATH，必须写绝对路径
GH=/Users/chenjun/.local/bin/gh

# git 凭证：首次推送前需要执行一次（把 gh 作为 credential helper）
$GH auth setup-git
```

- 工作目录：`/Users/chenjun/WorkBuddy/2026-09-21-15-50-29/homepage`
- 项目日志（append-only）：`/Users/chenjun/WorkBuddy/2026-09-21-15-50-29/.workbuddy/memory/YYYY-MM-DD.md`，动手前建议先读最近几天的日志
- **命令必须带 `cd`**：`cd <项目目录> && npm run xxx`。历史踩坑：多次只发 `npm install` 导致在 workspace 根目录执行、找不到 `package.json` 而失败

---

## 3. 部署拓扑（理解这个才不会误伤图床）

```
GitHub 仓库 jcstrong/jcstrong.github.io
├── master 分支      → PicGo 图床（img/ 172 张、2021/、archives/、fonts/，约 42MB）  ← 不要动
└── homepage 分支    → 本站源码（Astro 项目）                                      ← 在这里工作
```

CI（`.github/workflows/deploy.yml`）在 push 到 `homepage` 时执行：

1. `actions/checkout` 检源码（homepage 分支）
2. **再次 `actions/checkout` 检出 `master` 到 `imgbed/`**（图床图片进部署产物）
3. `npm ci` → `npm run build`（= `astro build && pagefind --site dist`）
4. 把 `imgbed/{img,2021,archives,fonts}` 拷进 `dist/`
5. `upload-pages-artifact` + `deploy-pages`

**为什么这么设计**：站点要挂在顶级域名 `jcstrong.github.io`，而该域名只能由名为 `jcstrong.github.io` 的仓库提供；这个仓库同时是用户的 PicGo 图床。双分支方案让图床零改动、主页 URL 无子路径、笔记里的 `https://jcstrong.github.io/img/...` 全部继续有效。

**Pages 环境策略**：`github-pages` environment 的 deployment branch policy 必须放行 `homepage`（`custom_branch_policies: true` + 分支策略 `homepage`），否则 deploy 阶段报 `Branch "homepage" is not allowed to deploy to github-pages`。这是仓库设置层的状态，不在代码里。

**PicGo 上传新图后**：新图在 `master`，不会自动进部署产物 → 手动跑一次 Actions（Actions → Build and Deploy → Run workflow）即可。

---

## 4. 数据流

```
本地 Typora 目录（OneDrive，约 218 篇 .md）
    │  npm run sync  →  scripts/sync-notes.mjs
    │     ① 扫描（排除「简历」目录）② 四维分类映射 ③ 图片路径改写 ④ 密钥脱敏 ⑤ 注入 frontmatter
    ▼
src/content/notes/<板块>/<原始文件夹层级>/<文件>.md     ← 落盘镜像，已提交进仓库
    │  npm run build  →  astro build
    │     content.config.ts 校验 schema → src/lib/tree.ts 建树 → 页面/组件渲染
    ▼
dist/（223 个 HTML）+ dist/pagefind/（搜索索引）
    │  GitHub Actions：合并图床目录 → 部署
    ▼
https://jcstrong.github.io
```

---

## 5. 目录地图（每个文件干什么）

| 路径 | 职责 | 改动风险 |
|---|---|---|
| `scripts/sync-notes.mjs` | Typora → content 的唯一入口：分类映射表、图片处理、密钥脱敏、frontmatter 注入 | **高**（改错会污染 218 篇产物） |
| `src/content.config.ts` | 笔记 collection 的 zod schema + `CATEGORY_META`（四大板块的名称/顺序/描述） | **高**（schema 与 frontmatter 必须一致） |
| `src/lib/tree.ts` | 文件夹层级 → 树：`buildFolderTree`（递归计数）→ `toNavTree`（精简导航树）→ `flattenNav`（按展开态推导可见项） | 中 |
| `src/components/CategoryTree.vue` | 侧边栏：板块 + 文件夹 → 文件完整层级；文件夹点击筛选、文件点击进详情 | 中 |
| `src/components/NoteCard.vue` | 列表卡片：标题/摘要/标签/日期/`data-folder` 等筛选用 data 属性 | 中（`data-*` 是筛选脚本的接口） |
| `src/components/Hero.vue` | 首页四张板块卡片（`folders` = 顶层文件夹 chips） | 低 |
| `src/layouts/BaseLayout.astro` | 页面骨架：站点导航、主题变量、`<slot>` | 中 |
| `src/pages/index.astro` | 首页：板块卡片 + 精选项目 + 技能矩阵 | 低 |
| `src/pages/notes/[category]/index.astro` | 列表页：服务端建树 + 内联脚本做筛选/排序 | **高**（Vue island 与内联脚本靠 `document` 事件通信） |
| `src/pages/notes/[category]/[...slug].astro` | 详情页：markdown 渲染、H1-H3 目录、上下篇、相关笔记、层级面包屑 | 中 |
| `src/styles/global.css` | 设计 token（亮/暗两套 CSS 变量）+ 全局样式 | 低 |
| `uno.config.ts` | UnoCSS 配置（注意：web fonts 走 Google Fonts，国内网络会超时降级） | 低 |
| `.github/workflows/deploy.yml` | CI 构建 + 合并图床 + 部署 | **高** |
| `public/` | 静态资源（当前仅有 favicon.svg；`public/images/` 为本地相对图片的落点，当前为空） | 低 |

---

## 6. 不可破坏的约定（Invariants）

违反这些约定**不会立刻报错**，而是静默产生错误页面或泄露风险，务必逐条对照：

1. **四大板块 id 固定**：`projects` / `skills` / `practice` / `study`。它们同时出现在 schema enum、`CATEGORY_META`、同步脚本映射表、导航数据里，四处必须同步改。
2. **落盘路径镜像原始文件夹层级**：`src/content/notes/<板块>/<folderPath>/<文件名>.md`，且 frontmatter 的 `folderPath` 必须与该磁盘层级一致。侧边栏树、`data-folder` 筛选、面包屑全都依赖它。
3. **`note.slug` 自带板块前缀**（content collection 相对路径，如 `skills/Python/xxx`）。所有链接与 `getStaticPaths` 的 params 都必须 `stripCategory()` 剥离一次，否则会出现 `/notes/skills/skills/...` 双重分类。
4. **详情页路由必须是通配参数 `[...slug].astro`**，不能改回 `[slug].astro`——slug 含 `/` 时单段参数会报 `Missing parameter: category`。
5. **frontmatter 的日期必须加引号**：`updated: "2026-09-14"`。不加引号会被 YAML 解析成 `Date` 对象，页面渲染出 `Mon Sep 14 2026 08:00:00 GMT+0800` 长串，且本地构建（+8）与 CI（UTC）产物不一致。
6. **根目录散装笔记的伪路径约定**：`ROOT_FOLDER = '__root__'`（`src/lib/tree.ts`）。侧边栏「根目录」分组点击后广播的值是 `__root__`，列表页筛选脚本需转成 `folderPath === ''` 来匹配。
7. **密钥脱敏必须保留**：`redactSecrets()` 是防止个人密钥被发布到公开站点的唯一防线。新增任何同步/发布路径都必须过这一层。
8. **`master` 分支（图床）零改动**，图床目录不要拷进源码树（只在 CI 的 `dist/` 合并）。
9. **不要向仓库写入真实密钥**：GitHub Push Protection 会直接拒绝 push，且在公开仓库里等于泄露。历史事故见第 8 节。
10. **导航数据不要构建期静态化**：侧边栏可见项必须由组件内 `computed` + `openSet` 推导（展开/收起是客户端响应式状态）。构建期生成静态列表会导致展开收起失效。
11. **island props 只传精简数据**：用 `NavFolder`（只有 `name/path/count/children/notes[{title,href}]`），不要把完整 `TreeNode`（含 summary/tags 等）塞进 props——那会让页面体积成倍膨胀。

---

## 7. 常见任务 SOP

### 7.1 新增笔记分类规则（笔记归类不对时）

编辑 `scripts/sync-notes.mjs` 的 `CLASSIFICATION_MAP`：

```js
{ pattern: 'Python/爬虫/', category: 'skills', tags: ['Python', '爬虫'] },
```

- **顺序即优先级**：`classifyNote()` 返回首个命中项。泛匹配（如 `Python/NLP-quark已备份/`）必须排在具体规则（如 `.../2.聊天机器人项目/`）之后，否则具体规则永远不会生效。
- 未命中任何规则的笔记会落到默认 `study` + tag `未分类`。验证方式：

```bash
cd /Users/chenjun/WorkBuddy/2026-09-21-15-50-29/homepage
npm run sync
grep -rl '"未分类"' src/content/notes | head   # 期望：无输出
```

### 7.2 笔记更新后发布（最常用）

```bash
cd /Users/chenjun/WorkBuddy/2026-09-21-15-50-29/homepage
npm run sync          # 同步 + 脱敏
npm run build         # 构建 + Pagefind 索引（build 已含 pagefind，不要再手动跑一次）
git add -A && git commit -m "notes: 更新笔记" && git push
$GH run watch $($GH run list --repo jcstrong/jcstrong.github.io --limit 1 --json databaseId --jq '.[0].databaseId') --repo jcstrong/jcstrong.github.io
```

### 7.3 本地预览

```bash
cd /Users/chenjun/WorkBuddy/2026-09-21-15-50-29/homepage
$NPM run build && $NPM run preview -- --port 4321     # 预览构建产物（推荐，与线上一致）
# 或 npm run dev（会先 sync 再起 dev server）
```

### 7.4 改导航树行为

- 树结构/计数逻辑 → `src/lib/tree.ts`
- 视觉与交互（缩进、展开箭头、文件行样式） → `src/components/CategoryTree.vue`
- 事件协议：组件通过 `document.dispatchEvent(new CustomEvent('select-folder' | 'select-sort', { detail }))` 通知页面内联脚本，页面脚本在 `src/pages/notes/[category]/index.astro` 底部的 `<script>` 里监听。**Vue island 与页面内联脚本是两个独立运行时，不要试图共享变量。**

### 7.5 改视觉

- 颜色/间距/圆角 → `src/styles/global.css` 的 CSS 变量（`--accent`、`--bg-secondary`、`--border-tertiary`…），亮暗两套都要改
- 原子类 → `uno.config.ts`
- 风格基线：黑白灰 + 单一墨蓝 `#1F3568`，等宽字体（JetBrains Mono）用于 logo/标签/数字，克制留白，禁花哨动效

### 7.6 手动触发部署（PicGo 上传新图后）

```bash
$GH workflow run deploy.yml --repo jcstrong/jcstrong.github.io --ref homepage
```

### 7.7 用户改了本地文件夹层级，怎么同步到网页

**原理**：站点内容 = 仓库里的 `src/content/notes/**`（CI 里没有 Typora 目录），所以本地改完必须 `sync → commit → push`。同步会**先整目录删除四个板块再重建**，因此移动/重命名后不会残留旧层级。

分场景对照：

| 用户改了什么 | 需要做什么 |
|---|---|
| 在已有文件夹之间移动笔记 | 直接 `npm run sync` → push，分类与树自动更新 |
| **重命名文件夹** | ⚠️ 必须同步修改 `CLASSIFICATION_MAP` 里的 `pattern`，否则该目录所有笔记会掉进兜底「学习笔记 + `未分类`」 |
| 新建文件夹 | 加一条映射规则指定板块；不加则兜底 `study` |
| 新增/删除笔记文件 | sync → push，导航计数与页面数自动更新 |
| 重命名笔记文件 | URL 随之变化（无重定向，旧链接 404），导航/面包屑自动更新 |
| 搬迁整个 Typora 根目录 | 改 `scripts/sync-notes.mjs` 顶部的 `TYPORA_ROOT` 常量 |
| 文件夹内新增本地相对图片 | 自动复制到 `public/images/<folderPath>/` 并改写路径；⚠️ **旧图片文件不会被自动清理**（同步只清理 `src/content/notes` 四个板块目录），需要时手动删 `public/images` 下的孤儿目录 |

标准流程（改完文件夹层级后）：

```bash
cd /Users/chenjun/WorkBuddy/2026-09-21-15-50-29/homepage
npm run sync                                   # 重建 content，旧层级自动清除
grep -rl '"未分类"' src/content/notes | head    # 有输出 = 有笔记没命中规则，需按 7.1 补映射
npm run build && npm run preview               # 本地确认树形、计数、导航
git add -A && git commit -m "notes: 调整文件夹层级" && git push
# Actions 自动部署，约 2 分钟；随后 curl 抽查列表页与树
```


---

## 8. 已知坑与报错对照表

| 报错 / 现象 | 原因 | 解法 |
|---|---|---|
| `Missing parameter: category` | 动态路由 `[slug]` 单段参数收到含 `/` 的 slug | 用 `[...slug].astro` 通配参数；检查 `stripCategory` 是否漏用 |
| `push declined due to repository rule violations` / `GITHUB PUSH PROTECTION` | 提交里含真实密钥（本项目的笔记里确实有：Notion Token、GitHub PAT、阿里云 AK/SK、PicGo Token） | 已由 `redactSecrets()` 处理；若报新密钥，扩充 `KNOWN_SECRET_PATTERNS` 后重新 `npm run sync` 并 `git commit --amend` 替换提交（未 push 前 amend 即可） |
| `Branch "homepage" is not allowed to deploy to github-pages` | `github-pages` environment 的分支策略未放行 homepage | 在仓库 Settings → Environments 或 API 放开 `custom_branch_policies` 并添加 `homepage` |
| `Could not resolve "../images/xxx.png"` | 笔记里相对路径图片在源目录不存在（OneDrive 未同步 / 旧电脑绝对路径） | 同步脚本已把缺失图片替换成「（图片缺失：文件名）」占位，不会中断构建；想彻底修需补图源 |
| `[unocss] Fetch web fonts timeout` | 构建机拉不到 Google Fonts（国内网络） | 无害，字体降级；若要根治可自托管字体或用字体栈兜底 |
| `Cannot read properties of undefined (reading 'reduce')`（build:done 阶段） | `@astrojs/sitemap@3.2` 与 `astro@4.16` 组合不兼容 | 已移除该集成；如需 sitemap 请先验证版本组合 |
| 页面日期显示 `Mon Sep 14 2026 08:00:00 GMT+0800` | frontmatter 日期未加引号 | 见 Invariant 5 |
| `[Shiki] The language "mysql"/"PYTHON"/"undefined" doesn't exist` | 笔记代码块语言标识不规范 | 无害，回退 plaintext；可用同步脚本做语言别名归一（尚未实现） |
| 无头 Chrome 校验页面时被 SIGTERM | 本机环境限制 Chrome headless 启动 | 改用「产物静态校验」：解析 HTML 里的 island props（见第 9 节）、curl 状态码、`node --experimental-strip-types` 直接 import `src/lib/tree.ts` 做逻辑单测 |
| `gh auth refresh` 报 `unexpected EOF` | 本机到 GitHub 设备授权接口的网络不稳定 | 重试；若持续失败，改由用户在网页端手动操作（如删除仓库） |

---

## 9. 验收清单（改完必跑）

```bash
cd /Users/chenjun/WorkBuddy/2026-09-21-15-50-29/homepage

# 1) 数量对齐：218 篇，四个板块
npm run sync | tail -8                      # 期望：项目 18 / 技能 160 / 实践 11 / 学习 29

# 2) 无未分类兜底
grep -rl '"未分类"' src/content/notes | head    # 期望：无输出

# 3) 无密钥残留
grep -rEn "(LTAI[A-Za-z0-9]{8,}|secret_[A-Za-z0-9]{16,}|ghp_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,})" src/content/notes | head   # 期望：无输出

# 4) 构建通过 + 页面数
npm run build | tail -5
find dist -name "*.html" | wc -l            # 期望：223

# 5) 导航树含文件级节点（以 projects 的「毕业」为例，期望 5 个文件）
python3 - <<'PY'
import re, html, json
h = open('dist/notes/projects/index.html', encoding='utf-8').read()
d = json.loads(html.unescape(re.search(r'props="(.*?)"\s', h, re.S).group(1)))
def ub(v):
    if isinstance(v, dict): return {k: ub(x) for k, x in v.items()}
    if isinstance(v, list):
        if len(v) == 2 and isinstance(v[0], int) and v[0] in (0, 1):
            t, val = v
            return ub(val) if t == 0 else [ub(x) for x in val]
        return [ub(x) for x in v]
    return v
nav = ub(d['navTree'])
for f in nav:
    print('DIR', f['name'], f['count'])
    for n in f['notes']: print('   FILE', n['title'], '->', n['href'])
PY

# 6) 线上验证（push 并等 Actions 成功后）
curl -sL -o /dev/null -w "%{http_code}\n" https://jcstrong.github.io/notes/skills/
curl -sL -o /dev/null -w "%{http_code}\n" https://jcstrong.github.io/img/20210405232411.png   # 图床未受影响
```

---

## 10. 未完成 / 已知瑕疵

- **列表页搜索框未接线**：`#search` 输入框与 `⌘K` 提示是静态摆设，Pagefind 索引已生成（`dist/pagefind/`），只差接 Pagefind UI
- **部分笔记图片缺失**：源图不在 OneDrive（旧电脑绝对路径），页面显示「（图片缺失：xxx）」占位
- **代码块语言标识不规范**：`mysql`（小写）、`PYTHON`（大写）等导致 Shiki 回退纯文本
- **公网密钥轮换建议**：历史上 4 组密钥曾被 GitHub 拦截，虽未真正上传，仍建议用户轮换
- **无自动化测试**：只有第 9 节的手工验收清单，`src/lib/tree.ts` 可用 `node --experimental-strip-types` 直接单测

### 已解决（留档，勿重复处理）

- ~~`jcstrong/jc.github.io` 闲置仓库~~：早期误建的空仓库，已于 **2026-09-22** 由用户在网页端 Settings → Danger Zone 删除 ✅
  - 注意：**不要**把 `jcstrong/jc.github.io` 与 `jcstrong/jcstrong.github.io` 搞混。前者已不存在；后者是唯一在用的仓库（`master` = 图床，`homepage` = 站点源码）
  - 当时 `gh auth` 拿不到 `delete_repo` scope、刷新授权时设备码握手超时，故改由网页端手工执行；后续若需删仓库，先确认 scope：`gh auth status` 应显示 `delete_repo`

---

## 11. 协作约定

- **提交信息前缀**：`feat:` / `fix:` / `docs:` / `notes:`（更新笔记内容）
- **工作日志**：完成实质改动后追加到 `/Users/chenjun/WorkBuddy/2026-09-21-15-50-29/.workbuddy/memory/YYYY-MM-DD.md`（该文件 append-only，不要覆盖）
- **改动前后都看一眼 Git 状态**：同步产物（`src/content/notes/**`）是提交内容的一部分，`dist/`、`node_modules/`、`public/pagefind/` 已在 `.gitignore` 中
- **不要擅自扩大范围**：风格定位是「严肃」，新增 UI 元素前先确认是否符合 editorial / monochrome / Swiss-style 基线
