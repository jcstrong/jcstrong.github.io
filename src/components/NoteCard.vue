<template>
  <article class="note-card card-hover">
    <div class="card-header">
      <h3 class="note-title">
        <a :href="`/notes/${note.category}/${note.slug}`">{{ note.title }}</a>
      </h3>
      <span class="note-meta mono">{{ note.updated }} · {{ note.readingTime }} min</span>
    </div>
    <p class="note-summary">{{ note.summary }}</p>
    <div class="note-tags">
      <span v-for="tag in note.tags" :key="tag" class="tag mono">{{ tag }}</span>
      <span v-if="note.featured" class="tag tag-featured">精选</span>
    </div>
  </article>
</template>

<script setup lang="ts">
interface Note {
  title: string;
  slug: string;
  category: string;
  tags: string[];
  featured: boolean;
  updated: string;
  readingTime: number;
  summary: string;
}

defineProps<{ note: Note }>();
</script>

<style scoped>
.note-card {
  background: var(--bg-secondary);
  border: 0.5px solid var(--border-tertiary);
  border-left: 2px solid var(--accent);
  border-radius: var(--radius-md);
  padding: 16px 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 8px;
}

.note-title {
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
}

.note-title a {
  color: var(--text-primary);
}

.note-title a:hover {
  color: var(--accent);
  opacity: 1;
}

.note-meta {
  font-size: 11px;
  color: var(--text-tertiary);
  white-space: nowrap;
}

.note-summary {
  font-size: 12px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.note-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.tag {
  font-size: 10px;
  padding: 2px 7px;
  border-radius: 4px;
  background: var(--bg-tertiary);
  color: var(--text-secondary);
}

.tag-featured {
  background: var(--accent-light);
  color: var(--accent-text);
}
</style>
