/**
 * 文件夹层级 → 树状分区
 *
 * 把笔记的原始 Typora 文件夹路径（frontmatter.folderPath）还原成树，
 * 供侧边栏「树状分区」与首页分区卡片使用。
 */

export interface TreeNote {
  title: string;
  slug: string;
  folderPath: string;
  updated: string;
  readingTime: number;
  tags: string[];
  featured: boolean;
  summary: string;
  category: string;
}

export interface TreeNode {
  /** 节点显示名（文件夹名） */
  name: string;
  /** 完整文件夹路径，如 Python/Python_web/Django_web开发 */
  path: string;
  /** 该节点（含所有子节点）下的笔记总数 */
  count: number;
  /** 直接挂在该文件夹下的笔记数 */
  directCount: number;
  children: TreeNode[];
  /** 直接挂在该文件夹下的笔记（文件级节点） */
  notes: TreeNote[];
}

/** 剥离分类前缀：collection slug 形如 skills/Python/xxx.md */
export function stripCategory(slug: string): string {
  return slug.split('/').slice(1).join('/');
}

/**
 * 依据 folderPath 构建树
 * @param notes 同一板块下的笔记
 */
export function buildFolderTree(notes: TreeNote[]): TreeNode {
  const root: TreeNode = { name: '', path: '', count: 0, directCount: 0, children: [], notes: [] };

  for (const note of notes) {
    const segments = note.folderPath ? note.folderPath.split('/') : [];
    let cursor = root;
    cursor.count++;

    for (const segment of segments) {
      let next = cursor.children.find(c => c.name === segment);
      if (!next) {
        next = {
          name: segment,
          path: cursor.path ? `${cursor.path}/${segment}` : segment,
          count: 0,
          directCount: 0,
          children: [],
          notes: [],
        };
        cursor.children.push(next);
      }
      next.count++;
      cursor = next;
    }
    cursor.directCount++;
    cursor.notes.push(note);
  }

  sortTree(root);
  return root;
}

/** 根目录分组用的伪路径（notes 直接位于板块根下时使用） */
export const ROOT_FOLDER = '__root__';

/** 文件夹排序：有子目录的优先，再按笔记数降序，最后按名称 */
function sortTree(node: TreeNode): void {
  node.children.sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count;
    return a.name.localeCompare(b.name, 'zh-CN');
  });
  node.children.forEach(sortTree);
}

/**
 * 侧边栏导航项：文件夹节点 + 文件（笔记）节点
 * 文件夹在前、文件在后，形成完整的「文件夹 → 文件」层级导航
 */
export interface NavItem {
  kind: 'folder' | 'note';
  /** 显示名：文件夹名 / 笔记标题 */
  name: string;
  /** 文件夹：自身路径；笔记项：所属文件夹路径（用于祖先可见性判断） */
  path: string;
  depth: number;
  /** 文件夹：递归笔记数；笔记项固定 1 */
  count: number;
  /** 是否有可展开内容（子文件夹或直属笔记） */
  expandable: boolean;
  /** 笔记项专属：详情页链接 */
  href?: string;
  /** 笔记项专属：所属文件夹路径（篩选用） */
  folderPath?: string;
}

/** 精简导航树：只带侧边栏需要的字段，控制传给 island 的 props 体积 */
export interface NavFolder {
  name: string;
  path: string;
  count: number;
  children: NavFolder[];
  notes: { title: string; href: string }[];
}

/** 由完整树生成精简导航树（含根目录分组） */
export function toNavTree(tree: TreeNode): NavFolder[] {
  const folders: NavFolder[] = tree.children.map(convert);

  // 板块根目录下的散装笔记单独成组
  if (tree.notes.length) {
    folders.push({
      name: '根目录',
      path: ROOT_FOLDER,
      count: tree.notes.length,
      children: [],
      notes: tree.notes.map(n => ({ title: n.title, href: `/notes/${n.category}/${n.slug}` })),
    });
  }
  return folders;
}

function convert(node: TreeNode): NavFolder {
  return {
    name: node.name,
    path: node.path,
    count: node.count,
    children: node.children.map(convert),
    notes: node.notes.map(n => ({ title: n.title, href: `/notes/${n.category}/${n.slug}` })),
  };
}

/** 依据展开状态生成可见导航项（文件夹在前、文件在后） */
export function flattenNav(folders: NavFolder[], openPaths: Set<string>): NavItem[] {
  const items: NavItem[] = [];
  walkNav(folders, 0, openPaths, items);
  return items;
}

function walkNav(folders: NavFolder[], depth: number, openPaths: Set<string>, out: NavItem[]): void {
  for (const folder of folders) {
    const expandable = folder.children.length > 0 || folder.notes.length > 0;
    out.push({
      kind: 'folder',
      name: folder.name,
      path: folder.path,
      depth,
      count: folder.count,
      expandable,
    });

    if (!openPaths.has(folder.path)) continue;

    walkNav(folder.children, depth + 1, openPaths, out);

    for (const note of folder.notes) {
      out.push({
        kind: 'note',
        name: note.title,
        path: folder.path,
        folderPath: folder.path === ROOT_FOLDER ? '' : folder.path,
        depth: depth + 1,
        count: 1,
        expandable: false,
        href: note.href,
      });
    }
  }
}

/** 顶部文件夹（板块内的第一层），用于首页卡片展示技术域 */
export function topFolders(node: TreeNode, limit = 6): string[] {
  const names = node.children.map(c => (c.name ? c.name : '根目录'));
  if (names.length <= limit) return names;
  return [...names.slice(0, limit - 1), `+${names.length - limit + 1}`];
}

/** 判断某笔记是否属于某文件夹（含子孙文件夹） */
export function inFolder(note: TreeNote, folderPath: string): boolean {
  if (!folderPath) return true;
  return note.folderPath === folderPath || note.folderPath.startsWith(folderPath + '/');
}
