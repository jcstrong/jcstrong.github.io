import { defineCollection, z } from 'astro:content';

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.enum(['projects', 'skills', 'practice', 'study']),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    source: z.string(),
    updated: z.string(),
    readingTime: z.number().default(1),
    summary: z.string().default(''),
  }),
});

export const collections = { notes };

export const CATEGORY_META = {
  projects: { label: '项目实战', order: 1, description: '真实落地的项目笔记，覆盖 AI Agent / NLP / 知识图谱等实战' },
  skills: { label: '技能图谱', order: 2, description: '按技术栈组织的知识体系，体现知识广度' },
  practice: { label: '工程实践', order: 3, description: '工作中的踩坑与规范，Java 工程栈核心实践' },
  study: { label: '学习笔记', order: 4, description: '系统化学习路径与读书笔记' },
} as const;

export type Category = keyof typeof CATEGORY_META;
