<template>
  <section class="hero">
    <div class="hero-grid">
      <a
        v-for="cat in categories"
        :key="cat.id"
        :href="`/notes/${cat.id}`"
        class="hero-card card-hover"
        :style="{ '--accent': cat.color }"
      >
        <div class="card-meta">
          <span class="card-index mono">{{ cat.index }}</span>
          <span class="card-count mono">{{ cat.count }}</span>
        </div>
        <div class="card-body">
          <h2 class="card-title">{{ cat.label }}</h2>
          <p class="card-desc">{{ cat.description }}</p>
        </div>
        <div class="card-tags">
          <span v-for="folder in cat.folders" :key="folder" class="card-tag mono">{{ folder }}</span>
        </div>
        <div class="card-foot mono">
          <span>{{ cat.folderCount }} 个文件夹 · {{ cat.count }} 篇</span>
        </div>
        <div class="card-arrow">→</div>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Category {
  id: string;
  index: string;
  label: string;
  description: string;
  folders: string[];
  folderCount: number;
  count: number;
  color: string;
}

defineProps<{ categories: Category[] }>();
</script>

<style scoped>
.hero {
  padding: 32px 0;
}

.hero-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.hero-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--bg-secondary);
  border: 0.5px solid var(--border-tertiary);
  border-radius: var(--radius-lg);
  padding: 20px;
  min-height: 200px;
  color: var(--text-primary);
  text-decoration: none;
  overflow: hidden;
}

.hero-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--accent);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.hero-card:hover::before {
  opacity: 1;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  color: var(--text-tertiary);
  margin-bottom: 12px;
  letter-spacing: 0.04em;
}

.card-index {
  text-transform: uppercase;
}

.card-count {
  color: var(--accent);
}

.card-body {
  flex: 1;
}

.card-title {
  font-size: 18px;
  font-weight: 500;
  letter-spacing: -0.01em;
  margin-bottom: 8px;
}

.card-desc {
  font-size: 12px;
  color: var(--text-secondary);
  line-height: 1.6;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 14px;
}

.card-tag {
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  background: var(--bg-tertiary);
  color: var(--text-secondary);
}

.card-foot {
  margin-top: 12px;
  padding-top: 10px;
  border-top: 0.5px solid var(--border-tertiary);
  font-size: 10px;
  color: var(--text-tertiary);
}

.card-arrow {
  position: absolute;
  bottom: 14px;
  right: 14px;
  font-size: 14px;
  color: var(--accent);
  opacity: 0;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.hero-card:hover .card-arrow {
  opacity: 1;
  transform: translateX(2px);
}

@media (max-width: 900px) {
  .hero-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 480px) {
  .hero-grid { grid-template-columns: 1fr; }
}
</style>
