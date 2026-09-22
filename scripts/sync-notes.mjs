#!/usr/bin/env node
/**
 * sync-notes.mjs - Typora 笔记 → Astro Content Collections 同步脚本
 *
 * 功能：
 * 1. 扫描 Typora 目录所有 .md 文件（排除简历目录）
 * 2. 按四维分类映射表归类到 src/content/notes/<category>/
 * 3. 注入 frontmatter（category / tags / featured / source / updated / summary）
 * 4. 处理图床绝对 URL（不本地化）
 *
 * 用法：node scripts/sync-notes.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, existsSync, copyFileSync } from 'node:fs';
import { join, relative, dirname, basename, extname, resolve, isAbsolute } from 'node:path';

const TYPORA_ROOT = '/Users/chenjun/Library/CloudStorage/OneDrive-个人/Typora';
const OUTPUT_ROOT = join(process.cwd(), 'src/content/notes');
const EXCLUDE_DIRS = ['简历'];

/**
 * 四维分类映射表
 * 单归属 + 多标签策略：每篇笔记主归一个一级分类，但可挂多个技术栈标签
 */
const CLASSIFICATION_MAP = [
  // PART 01 项目实战（精选 6 类）
  { pattern: '电商问数.md', category: 'projects', tags: ['AI Agent', 'LangGraph', '数据仓库', 'NL2SQL'], featured: true },
  { pattern: '毕业/', category: 'projects', tags: ['知识图谱', 'CRF', '学术'], featured: true },
  { pattern: 'Python/NLP-quark已备份/2.聊天机器人项目/', category: 'projects', tags: ['NLP', '聊天机器人', 'Seq2Seq'], featured: true },
  { pattern: 'Python/NLP-quark已备份/5.QA机器人/', category: 'projects', tags: ['NLP', 'QA', '召回排序'], featured: true },
  { pattern: 'Python/4. 人工智能/03 推荐系统.md', category: 'projects', tags: ['推荐系统', 'AI'], featured: true },
  { pattern: 'docker-compose.yaml.md', category: 'projects', tags: ['Docker', 'DevOps', '服务编排'], featured: true },

  // PART 03 工程实践（11 篇 Java 工程栈）
  { pattern: '工作实用指南/git.md', category: 'practice', tags: ['Git'] },
  { pattern: '工作实用指南/cherry-pick.md', category: 'practice', tags: ['Git', '团队协作'] },
  { pattern: '工作实用指南/maven.md', category: 'practice', tags: ['Maven', 'Java'] },
  { pattern: '工作实用指南/logback.md', category: 'practice', tags: ['Logback', '日志', 'Java'] },
  { pattern: '工作实用指南/拦截器过滤器.md', category: 'practice', tags: ['Spring', '拦截器', 'Java'] },
  { pattern: '工作实用指南/代码风格.md', category: 'practice', tags: ['代码规范', 'Java'] },
  { pattern: '工作实用指南/PlumeLog.md', category: 'practice', tags: ['PlumeLog', '日志聚合', 'Java'] },
  { pattern: '工作实用指南/DevOps.md', category: 'practice', tags: ['DevOps', 'CI/CD'] },
  { pattern: '工作实用指南/安装Home环境.md', category: 'practice', tags: ['环境配置'] },
  { pattern: '工作实用指南/红皮书.md', category: 'practice', tags: ['Java', '工程规范'] },
  { pattern: '工作实用指南/白嫖友子图床.md', category: 'practice', tags: ['图床', '工具'] },

  // PART 02 技能图谱（按技术域组织）
  { pattern: 'Python/Python语法/', category: 'skills', tags: ['Python', '语法基础'] },
  { pattern: 'Python/Python工具/', category: 'skills', tags: ['Python', '工具'] },
  { pattern: 'Python/Python_web/', category: 'skills', tags: ['Python', 'Web'] },
  { pattern: 'Python/NLP-quark已备份/0.pytorch/', category: 'skills', tags: ['PyTorch', 'AI 模型'] },
  { pattern: 'Python/NLP-quark已备份/1.RNN/', category: 'skills', tags: ['RNN', 'NLP'] },
  { pattern: 'Python/NLP-quark已备份/3.fasttext文本分类/', category: 'skills', tags: ['fastText', 'NLP'] },
  { pattern: 'Python/NLP-quark已备份/4.Seq2Seq模型/', category: 'skills', tags: ['Seq2Seq', 'Attention', 'NLP'] },
  { pattern: 'Python/NLP-quark已备份/6.其他算法/', category: 'skills', tags: ['HMM', 'CRF', 'NLP'] },
  { pattern: 'Python/4. 人工智能/01 准备.md', category: 'skills', tags: ['AI', '入门'] },
  { pattern: 'Python/4. 人工智能/02 机器学习.md', category: 'skills', tags: ['机器学习', 'AI'] },
  { pattern: 'Linux/', category: 'skills', tags: ['Linux', '运维'] },
  { pattern: '嵌入式/', category: 'skills', tags: ['嵌入式', '树莓派'] },
  { pattern: '工具/', category: 'skills', tags: ['开发工具', '效率'] },
  { pattern: '建站/', category: 'skills', tags: ['建站', 'Web'] },
  { pattern: 'AI/', category: 'skills', tags: ['AI', 'ChatGPT'] },
  { pattern: 'Python/Conda.md', category: 'skills', tags: ['Python', 'Conda'] },
  { pattern: 'Python/系统操作说明.md', category: 'skills', tags: ['Python', '系统操作'] },
  { pattern: 'Python/数据模型设计.md', category: 'skills', tags: ['数据模型', '设计'] },
  { pattern: 'Python/图神经GNN.md', category: 'skills', tags: ['GNN', '图神经网络'] },
  { pattern: 'Python/GCN+BiLSTM.md', category: 'skills', tags: ['GCN', 'BiLSTM', 'NLP'] },
  { pattern: '电脑ai及文件管家.md', category: 'skills', tags: ['AI', '工具'] },
  { pattern: '暂存.md', category: 'skills', tags: ['暂存'] },

  // PART 04 学习笔记（读书笔记 + 系统学习）
  { pattern: 'Python/PythonForDataAnalysis2nd/', category: 'study', tags: ['数据分析', '读书笔记', 'pandas'] },
  { pattern: 'Python/神经网络系统学习/', category: 'study', tags: ['神经网络', '系统学习'] },
  { pattern: 'Python/统计学习方法-李航.md', category: 'study', tags: ['统计学习', '读书笔记'] },
  { pattern: 'Python/深入浅出图神经网络.md', category: 'study', tags: ['图神经网络', '读书笔记'] },
];

/**
 * 匹配笔记的分类
 */
function classifyNote(relativePath) {
  for (const rule of CLASSIFICATION_MAP) {
    if (relativePath.includes(rule.pattern)) {
      return rule;
    }
  }
  // 默认归学习笔记
  return { category: 'study', tags: ['未分类'], featured: false };
}

/**
 * 递归扫描目录所有 .md 文件
 */
function scanMarkdownFiles(dir, baseDir = dir) {
  const results = [];
  const entries = readdirSync(dir);

  for (const entry of entries) {
    // 跳过隐藏文件 / 简历目录
    if (entry.startsWith('.') || EXCLUDE_DIRS.includes(entry)) continue;

    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      results.push(...scanMarkdownFiles(fullPath, baseDir));
    } else if (extname(entry) === '.md') {
      const relPath = relative(baseDir, fullPath);
      results.push({ fullPath, relPath, mtime: stat.mtime });
    }
  }
  return results;
}

/**
 * 估算阅读时长（中文按 400 字/分钟，英文按 200 词/分钟）
 */
function estimateReadingTime(content) {
  const chineseChars = (content.match(/[\u4e00-\u9fa5]/g) || []).length;
  const englishWords = (content.match(/[a-zA-Z]+/g) || []).length;
  const minutes = Math.ceil(chineseChars / 400 + englishWords / 200);
  return Math.max(1, minutes);
}

/**
 * 提取摘要（取正文前 100 字，去除 markdown 标记）
 */
function extractSummary(content) {
  const cleaned = content
    .replace(/^---[\s\S]*?---/, '')  // 去除 frontmatter
    .replace(/[#*`>\-\[\]\(\)!]/g, '')  // 去除 markdown 标记
    .replace(/\n+/g, ' ')
    .trim();
  return cleaned.slice(0, 120) + (cleaned.length > 120 ? '...' : '');
}

/**
 * 脱敏：公开站点上绝不能出现真实密钥
 * 1. 已知凭证前缀直接脱敏（LTAI 阿里云 AK / secret_ Notion / ghp_ & github_pat_ GitHub PAT / ntn_ Notion / sk- OpenAI 等）
 * 2. 上下文脱敏：密钥关键词（AccessKey/Secret/Token/密码...）附近 2 行内的长随机串一并脱敏
 */
const KNOWN_SECRET_PATTERNS = [
  /\bLTAI[A-Za-z0-9]{8,}/g,
  /\bsecret_[A-Za-z0-9]{16,}/g,
  /\bghp_[A-Za-z0-9]{20,}/g,
  /\bgithub_pat_[A-Za-z0-9_]{20,}/g,
  /\bntn_[A-Za-z0-9]{16,}/g,
  /\bsk-[A-Za-z0-9]{20,}/g,
  /\bAKIA[A-Z0-9]{12,}/g,
  /\bxox[baprs]-[A-Za-z0-9-]{10,}/g,
];

const CONTEXT_KEYWORDS = /(accesskey|access_key|accessKeyId|secret|token|password|passwd|credential|密钥|密码|授权码|api[_-]?key)/i;
// 只匹配纯字母数字+下划线+加号的长串（不含 / 和 -），避免误伤 URL 路径、文件路径、版本号
const TOKEN_LIKE = /[A-Za-z0-9+_]{20,}/g;
// 关键词后紧跟冒号/等号的值（如「密钥：Fsl2yA1Y...」），长度须 ≥16 且含数字才判定为凭证
const KEY_VALUE_INLINE = /((?:密钥|密码|secret|token|password|apikey|api[_-]?key)\s*[:：=]\s*[`"']?)([A-Za-z0-9+_]{16,})/gi;

function redactSecrets(content) {
  const lines = content.split('\n');
  let keywordRecent = 0; // 距最近关键词的行数窗口

  const cleaned = lines.map(line => {
    // 关键：本行自身含关键词，或处于关键词附近的敏感窗口
    const selfSensitive = CONTEXT_KEYWORDS.test(line);
    const sensitive = selfSensitive || keywordRecent > 0;
    if (selfSensitive) keywordRecent = 6;
    else if (keywordRecent > 0) keywordRecent--;

    let out = line;
    // 规则 1：已知凭证前缀，无条件脱敏
    for (const re of KNOWN_SECRET_PATTERNS) {
      out = out.replace(re, m => m.slice(0, 6) + '[REDACTED]');
    }
    // 规则 2：关键词 + 冒号/等号 的行内值（须含数字）
    out = out.replace(KEY_VALUE_INLINE, (m, prefix, value) =>
      /\d/.test(value) ? prefix + value.slice(0, 4) + '[REDACTED]' : m
    );
    // 规则 3：敏感范围内的长随机串（须同时含字母和数字，避免误伤普通单词）
    if (sensitive) {
      out = out.replace(TOKEN_LIKE, (m, offset) => {
        if (!(/[A-Za-z]/.test(m) && /\d/.test(m))) return m;
        // URL 内的片段（如图床 CDN 的哈希文件名）不脱敏，否则图片会裂
        const before = out.slice(0, offset);
        if (/https?:\/\/\S*$/.test(before)) return m;
        return m.slice(0, 4) + '[REDACTED]';
      });
    }
    return out;
  });
  return cleaned.join('\n');
}

/**
 * 注入或更新 frontmatter
 */
function injectFrontmatter(content, rule, relPath, mtime) {
  const summary = extractSummary(content);
  const readingTime = estimateReadingTime(content);
  const updated = mtime.toISOString().split('T')[0];

  const frontmatter = [
    '---',
    `title: ${JSON.stringify(basename(relPath, '.md'))}`,
    `category: ${rule.category}`,
    `tags: [${rule.tags.map(t => JSON.stringify(t)).join(', ')}]`,
    `featured: ${rule.featured || false}`,
    `source: ${JSON.stringify(relPath)}`,
    `updated: ${updated}`,
    `readingTime: ${readingTime}`,
    `summary: ${JSON.stringify(summary)}`,
    '---',
    '',
  ].join('\n');

  // 去除原有 frontmatter（如有）
  const body = content.replace(/^---[\s\S]*?---\s*/, '');
  return frontmatter + body;
}

/**
 * 处理 markdown 里的相对图片路径
 * 1. 解析相对路径为绝对路径（基于源文件位置）
 * 2. 复制图片到 public/images/<noteSlug>/
 * 3. 改写 markdown 里的路径为 /images/<noteSlug>/<filename>
 */
function processImages(content, sourceFullPath, noteSlug) {
  const PUBLIC_IMAGES = join(process.cwd(), 'public/images', noteSlug);
  const sourceDir = dirname(sourceFullPath);

  // 匹配 ![alt](path) - 不匹配 http/https 绝对 URL
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;

  return content.replace(imageRegex, (match, alt, path) => {
    // 跳过绝对 URL（图床）
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return match;
    }

    // 解析相对路径为绝对路径
    const absImagePath = resolve(sourceDir, path);
    if (!existsSync(absImagePath)) {
      console.warn(`  ⚠️ 图片不存在，替换为占位符: ${path}`);
      return `*（图片缺失：${basename(path)}）*`;
    }

    // 复制到 public/images/<noteSlug>/<filename>
    const filename = basename(path);
    const destDir = PUBLIC_IMAGES;
    mkdirSync(destDir, { recursive: true });
    const destPath = join(destDir, filename);
    copyFileSync(absImagePath, destPath);

    // 改写 markdown 路径
    return `![${alt}](/images/${noteSlug}/${filename})`;
  });
}

/**
 * 主流程
 */
function main() {
  console.log('🔄 开始同步 Typora 笔记...\n');
  console.log(`源目录: ${TYPORA_ROOT}`);
  console.log(`输出目录: ${OUTPUT_ROOT}\n`);

  if (!existsSync(TYPORA_ROOT)) {
    console.error('❌ Typora 目录不存在');
    process.exit(1);
  }

  // 清空输出目录
  for (const cat of ['projects', 'skills', 'practice', 'study']) {
    const catDir = join(OUTPUT_ROOT, cat);
    if (existsSync(catDir)) {
      // 保留目录结构，只清空 .md 文件
      const files = readdirSync(catDir).filter(f => f.endsWith('.md'));
      // 递归清空
    }
  }

  // 扫描所有 markdown
  const notes = scanMarkdownFiles(TYPORA_ROOT);
  console.log(`📋 扫描到 ${notes.length} 篇 markdown 笔记\n`);

  const stats = { projects: 0, skills: 0, practice: 0, study: 0 };

  for (const note of notes) {
    const rule = classifyNote(note.relPath);
    const category = rule.category;
    stats[category]++;

    // 构建输出路径（保留嵌套结构，但 category 作为根）
    const noteSlug = note.relPath.replace(/\//g, '__').replace(/\.md$/, '');
    const outputPath = join(OUTPUT_ROOT, category, noteSlug + '.md');
    mkdirSync(dirname(outputPath), { recursive: true });

    // 读取并处理：图片路径改写 → 密钥脱敏 → 注入 frontmatter
    const content = readFileSync(note.fullPath, 'utf-8');
    const processedContent = processImages(content, note.fullPath, noteSlug);
    const redactedContent = redactSecrets(processedContent);
    const newContent = injectFrontmatter(redactedContent, rule, note.relPath, note.mtime);

    writeFileSync(outputPath, newContent, 'utf-8');
  }

  console.log('✅ 同步完成\n');
  console.log('📊 分类统计：');
  console.log(`   项目实战: ${stats.projects} 篇`);
  console.log(`   技能图谱: ${stats.skills} 篇`);
  console.log(`   工程实践: ${stats.practice} 篇`);
  console.log(`   学习笔记: ${stats.study} 篇`);
  console.log(`   合计: ${notes.length} 篇\n`);
}

main();
