// src/types/news.ts
/**
 * Типы для новостей и статей
 */

export type NewsCategory = 'announcement' | 'release' | 'update' | 'event' | 'blog';

export interface NewsAuthor {
  name: string;
  avatar?: string;
  url?: string;
}

export interface NewsArticle {
  /** Уникальный идентификатор (slug) */
  slug: string;

  /** Заголовок статьи */
  title: string;

  /** Дата публикации */
  date: Date;

  /** Автор статьи */
  author: NewsAuthor;

  /** Краткое описание */
  excerpt: string;

  /** Полный контент статьи */
  content: string;

  /** URL изображения */
  image?: string;

  /** Категория новости */
  category: NewsCategory;

  /** Теги */
  tags?: string[];

  /** Время чтения (в минутах) */
  readingTime?: number;

  /** Закрепленная новость */
  pinned?: boolean;
}

export interface NewsCardProps {
  article: NewsArticle;
  variant?: 'default' | 'compact' | 'featured';
}
