import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    description: z.string(),
    icon: z.string(),
    tech: z.string(),
    version: z.string().optional(),
    badges: z.array(z.string()),
    github: z.string().url().optional(),
    downloadLink: z.string().url().optional(),
    demoLink: z.string().url().optional(),
    order: z.number().default(0),
    published: z.boolean().default(true),
    stats: z.object({
      downloads: z.string().optional(),
      rating: z.string().optional(),
      stars: z.string().optional(),
      contributors: z.string().optional(),
    }).optional(),
    features: z.array(z.object({
      icon: z.string(),
      title: z.string(),
      description: z.string(),
    })).optional(),
    techStack: z.array(z.object({
      emoji: z.string(),
      title: z.string(),
      subtitle: z.string(),
    })).optional(),
  }),
});

const news = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string().default('DARK NIGHT Team'),
    category: z.enum(['Релиз', 'Игры', 'Разработка', 'Дизайн', 'Сообщество', 'Обучение']),
    emoji: z.string(),
    readTime: z.string().optional(),
    featured: z.boolean().default(false),
    published: z.boolean().default(true),
  }),
});

export const collections = {
  projects,
  news,
};
