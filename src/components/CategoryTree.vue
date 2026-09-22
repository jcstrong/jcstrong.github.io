<template>
  <aside class="category-tree">
    <div class="tree-section">
      <div class="tree-head">
        <span class="tree-title">分区导航</span>
        <button v-if="activeFolder" class="tree-reset mono" @click="select('')">重置</button>
      </div>

      <!-- 四大板块 -->
      <div v-for="cat in categories" :key="cat.id" class="tree-group">
        <div class="tree-row">
          <a
            :href="`/notes/${cat.id}/`"
            class="tree-node"
            :class="{ active: currentCategory === cat.id && !activeFolder }"
          >
            <span class="node-label">{{ cat.label }}</span>
            <span class="node-count mono">{{ cat.count }}</span>
          </a>
          <button
            v-if="cat.id === currentCategory && tree.length"
            class="tree-caret"
            :title="expanded ? '收起' : '展开'"
            @click="expanded = !expanded"
          >
            {{ expanded ? '▾' : '▸' }}
          </button>
        </div>

        <!-- 当前板块的文件夹层级树 -->
        <div v-if="cat.id === currentCategory && expanded && tree.length" class="tree-children">
          <div
            v-for="node in visibleTree"
            :key="node.path"
            class="tree-row"
          >
            <button
              class="tree-leaf"
              :class="{ active: activeFolder === node.path }"
              :style="{ paddingLeft: `${8 + node.depth * 12}px` }"
              @click="select(node.path)"
            >
              <span class="leaf-name">
                <span class="leaf-icon">{{ node.children.length ? (isOpen(node.path) ? '▾' : '▸') : '·' }}</span>
                {{ node.name || '根目录' }}
              </span>
              <span class="node-count mono">{{ node.count }}</span>
            </button>
            <button
              v-if="node.children.length"
              class="tree-caret"
              :title="isOpen(node.path) ? '收起' : '展开'"
              @click="toggleNode(node.path)"
            >
              {{ isOpen(node.path) ? '−' : '+' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="tree-divider"></div>

    <div class="tree-section">
      <div class="tree-title">排序</div>
      <button
        v-for="opt in sortOptions"
        :key="opt.id"
        class="tree-leaf"
        :class="{ active: sortBy === opt.id }"
        :style="{ paddingLeft: '8px' }"
        @click="selectSort(opt.id)"
      >
        <span class="leaf-name">{{ opt.label }}</span>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

interface Category {
  id: string;
  label: string;
  count: number;
}

interface FlatNode {
  name: string;
  path: string;
  count: number;
  directCount: number;
  depth: number;
  children: { path: string }[];
}

const props = defineProps<{
  categories: Category[];
  currentCategory?: string;
  /** 扁平化后的文件夹树（仅当前板块） */
  tree?: FlatNode[];
  activeFolder?: string;
}>();

const emit = defineEmits<{
  (e: 'select-folder', path: string): void;
  (e: 'select-sort', id: string): void;
}>();

const expanded = ref(true);
const sortBy = ref('updated');
const sortOptions = [
  { id: 'updated', label: '最近更新' },
  { id: 'title', label: '按标题' },
  { id: 'readingTime', label: '按篇幅' },
];

// 已展开的文件夹路径集合（切换板块时重置，默认展开第一层）
const openSet = ref<Set<string>>(new Set());
watch(
  () => [props.currentCategory, props.tree] as const,
  () => {
    openSet.value = new Set((props.tree || []).filter(n => n.depth === 0).map(n => n.path));
  },
  { immediate: true }
);

function isOpen(path: string): boolean {
  return openSet.value.has(path);
}

function toggleNode(path: string) {
  const next = new Set(openSet.value);
  if (next.has(path)) next.delete(path);
  else next.add(path);
  openSet.value = next;
}

/** 只渲染祖先链全部展开的节点 */
const visibleTree = computed(() => {
  return (props.tree || []).filter(node => {
    const segments = node.path.split('/');
    for (let i = 1; i < segments.length; i++) {
      const ancestor = segments.slice(0, i).join('/');
      if (!openSet.value.has(ancestor)) return false;
    }
    return true;
  });
});

function select(path: string) {
  const next = path === props.activeFolder ? '' : path;
  emit('select-folder', next);
  // 广播给 Astro 侧脚本（Vue island 与页面脚本无法直接共享状态）
  document.dispatchEvent(new CustomEvent('select-folder', { detail: next }));
}

function selectSort(id: string) {
  sortBy.value = id;
  emit('select-sort', id);
  document.dispatchEvent(new CustomEvent('select-sort', { detail: id }));
}
</script>

<style scoped>
.category-tree {
  width: 220px;
  flex-shrink: 0;
  padding: 16px 12px;
  background: var(--bg-secondary);
  border-right: 0.5px solid var(--border-tertiary);
}

.tree-section {
  margin-bottom: 14px;
}

.tree-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  margin-bottom: 6px;
}

.tree-title {
  font-size: 11px;
  color: var(--text-tertiary);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.tree-reset {
  font-size: 10px;
  background: none;
  border: none;
  color: var(--accent);
  cursor: pointer;
  padding: 0;
}

.tree-group {
  margin-bottom: 2px;
}

.tree-row {
  display: flex;
  align-items: center;
}

.tree-node {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1;
  padding: 6px 8px;
  color: var(--text-secondary);
  font-size: 12px;
  text-decoration: none;
  border-radius: var(--radius-sm);
}

.tree-node:hover {
  background: var(--bg-tertiary);
  opacity: 1;
}

.tree-node.active {
  background: var(--accent-light);
  color: var(--accent-text);
  font-weight: 500;
}

.tree-caret {
  width: 20px;
  border: none;
  background: none;
  color: var(--text-tertiary);
  cursor: pointer;
  font-size: 10px;
}

.node-label {
  flex: 1;
}

.node-count {
  font-size: 11px;
  color: var(--text-tertiary);
}

.tree-node.active .node-count {
  color: var(--accent);
}

.tree-children {
  padding: 3px 0 6px;
}

.tree-leaf {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  padding: 4px 8px;
  font-size: 11px;
  color: var(--text-tertiary);
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  border-radius: var(--radius-sm);
  line-height: 1.5;
}

.tree-leaf:hover {
  color: var(--accent);
  background: var(--bg-tertiary);
}

.tree-leaf.active {
  color: var(--accent-text);
  background: var(--accent-light);
  font-weight: 500;
}

.leaf-name {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.leaf-icon {
  width: 8px;
  flex-shrink: 0;
  color: var(--text-tertiary);
  font-size: 8px;
}

.tree-divider {
  height: 0.5px;
  background: var(--border-tertiary);
  margin: 12px 0;
}
</style>
