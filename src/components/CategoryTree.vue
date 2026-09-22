<template>
  <aside class="category-tree">
    <div class="tree-section">
      <div class="tree-title">分区</div>
      <div v-for="cat in categories" :key="cat.id" class="tree-group">
        <button
          class="tree-node"
          :class="{ active: currentCategory === cat.id }"
          @click="toggle(cat.id)"
        >
          <span class="toggle">{{ expanded === cat.id ? '▾' : '▸' }}</span>
          <span class="node-label">{{ cat.label }}</span>
          <span class="node-count mono">{{ cat.count }}</span>
        </button>
        <div v-if="expanded === cat.id" class="tree-children">
          <a
            v-for="tag in cat.tags"
            :key="tag"
            :href="`/notes/${cat.id}?tag=${encodeURIComponent(tag)}`"
            class="tree-leaf"
          >
            · {{ tag }}
          </a>
        </div>
      </div>
    </div>

    <div class="tree-divider"></div>

    <div class="tree-section">
      <div class="tree-title">筛选</div>
      <div class="tree-leaf">按技术栈</div>
      <div class="tree-leaf">按更新时间</div>
      <div class="tree-leaf">仅显示精选</div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Category {
  id: string;
  label: string;
  count: number;
  tags: string[];
}

const props = defineProps<{
  categories: Category[];
  currentCategory?: string;
}>();

const expanded = ref(props.currentCategory || 'skills');

function toggle(id: string) {
  expanded.value = expanded.value === id ? '' : id;
}
</script>

<style scoped>
.category-tree {
  width: 200px;
  flex-shrink: 0;
  padding: 16px 12px;
  background: var(--bg-secondary);
  border-right: 0.5px solid var(--border-tertiary);
}

.tree-section {
  margin-bottom: 12px;
}

.tree-title {
  font-size: 11px;
  color: var(--text-tertiary);
  padding: 4px 8px;
  margin-bottom: 6px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.tree-group {
  margin-bottom: 2px;
}

.tree-node {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  padding: 6px 8px;
  border: none;
  background: transparent;
  color: var(--text-secondary);
  font-size: 12px;
  cursor: pointer;
  border-radius: var(--radius-sm);
  text-align: left;
}

.tree-node:hover {
  background: var(--bg-tertiary);
}

.tree-node.active {
  background: var(--accent-light);
  color: var(--accent-text);
  font-weight: 500;
}

.toggle {
  width: 12px;
  color: var(--text-tertiary);
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
  padding: 4px 0 4px 22px;
}

.tree-leaf {
  display: block;
  padding: 4px 8px;
  font-size: 11px;
  color: var(--text-tertiary);
  text-decoration: none;
  border-radius: var(--radius-sm);
}

.tree-leaf:hover {
  color: var(--accent);
  background: var(--bg-tertiary);
  opacity: 1;
}

.tree-divider {
  height: 0.5px;
  background: var(--border-tertiary);
  margin: 12px 0;
}
</style>
