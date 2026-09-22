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
  const root: TreeNode = { name: '', path: '', count: 0, directCount: 0, children: [] };

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
        };
        cursor.children.push(next);
      }
      next.count++;
      cursor = next;
    }
    cursor.directCount++;
  }

  sortTree(root);
  return root;
}

/** 文件夹排序：有子目录的优先，再按笔记数降序，最后按名称 */
function sortTree(node: TreeNode): void {
  node.children.sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count;
    return a.name.localeCompare(b.name, 'zh-CN');
  });
  node.children.forEach(sortTree);
}

/** 扁平化树（用于渲染带缩进的列表） */
export interface FlatTreeNode extends TreeNode {
  depth: number;
}

export function flattenTree(node: TreeNode, depth = 0, out: FlatTreeNode[] = []): FlatTreeNode[] {
  for (const child of node.children) {
    out.push({ ...child, depth });
    flattenTree(child, depth + 1, out);
  }
  return out;
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
