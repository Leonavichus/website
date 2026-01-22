// src/types/project.ts
/**
 * Типы для проектов DARK NIGHT
 */

export type ProjectStatus = 'active' | 'archived' | 'planned' | 'beta';

export type ProjectTag = 
  | 'flutter' 
  | 'game' 
  | 'app' 
  | 'web' 
  | 'desktop' 
  | 'mobile'
  | 'open-source'
  | 'android'
  | 'ios'
  | 'windows'
  | 'linux'
  | 'macos';

export interface ProjectLink {
  type: 'github' | 'demo' | 'download' | 'docs' | 'website';
  url: string;
  label?: string;
}

export interface Project {
  /** Уникальный идентификатор (slug) */
  slug: string;

  /** Название проекта */
  title: string;

  /** Краткое описание */
  description: string;

  /** Полное описание (опционально, для страницы проекта) */
  fullDescription?: string;

  /** URL изображения */
  image?: string;

  /** Теги проекта */
  tags: ProjectTag[];

  /** Статус проекта */
  status: ProjectStatus;

  /** Ссылки на ресурсы */
  links: ProjectLink[];

  /** Дата создания */
  createdAt: Date;

  /** Дата последнего обновления */
  updatedAt: Date;

  /** Избранный проект */
  featured?: boolean;

  /** GitHub статистика */
  github?: {
    stars: number;
    forks: number;
    issues: number;
  };
}

export interface ProjectCardProps {
  project: Project;
  variant?: 'default' | 'compact' | 'detailed';
  showStats?: boolean;
}
