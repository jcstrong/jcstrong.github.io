<template>
  <article
    class="note-card card-hover"
    :data-folder="note.folderPath || ''"
    :data-title="note.title"
    :data-updated="note.updated"
    :data-reading="note.readingTime"
  >
    <div class="card-header">
      <h3 class="note-title">
        <a :href="`/notes/${note.category}/${note.slug}`">{{ note.title }}</a>
      </h3>
      <span class="note-meta mono">{{ note.updated }} · {{ note.readingTime }} min</span>
    </div>
    <div v-if="note.folderPath" class="note-folder mono">
      <template v-for="(seg, i) in folderSegments" :key="i">
        <span v-if="i > 0" class="folder-sep">/</span>{{ seg }}
      </template>
    </div>
    <p class="note-summary">{{ note.summary }}</p>
    <div class="note-tags">
      <span v-for="tag in note.tags" :key="tag" class="tag mono">{{ tag }}</span>
      <span v-if="note.featured" class="tag tag-featured">精选</span>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Note {
  title: string;
  slug: string;
  category: string;
  folderPath?: string;
  tags: string[];
  featured: boolean;
  updated: string;
  readingTime: number;
  summary: string;
}

const props = defineProps<{ note: Note }>();

const folderSegments = computed(() => (props.note.folderPath || '').split('/').filter(Boolean));
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

.note-folder {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  font-size: 10px;
  color: var(--accent);
  margin-bottom: 8px;
  opacity: 0.85;
}

.folder-sep {
  margin: 0 5px;
  color: var(--text-tertiary);
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
