// src/utils/constants.ts
/**
 * Константы приложения
 */

import type { SiteConfig } from '../types/common';

export const SITE_CONFIG: SiteConfig = {
  name: 'DARK NIGHT',
  description: 'Команда разработчиков, создающая инди-игры и приложения с открытым исходным кодом',
  url: 'https://darkmoonight.org',
  locale: 'ru',
  author: 'DARK NIGHT Team',
  socialLinks: {
    github: 'https://github.com/Leonavichus',
    telegram: 'https://t.me/darkmoonight',
    // Добавьте другие соцсети по необходимости
  },
};

export const NAVIGATION_ITEMS = [
  { label: 'Главная', href: '/', icon: 'home' },
  { label: 'Проекты', href: '/projects', icon: 'folder' },
  { label: 'Новости', href: '/news', icon: 'article' },
  { label: 'О нас', href: '/about', icon: 'info' },
  { label: 'FAQ', href: '/faq', icon: 'help' },
  { label: 'Roadmap', href: '/roadmap', icon: 'map' },
] as const;

export const LANGUAGES = {
  ru: {
    code: 'ru',
    name: 'Русский',
    flag: '🇷🇺',
  },
  en: {
    code: 'en',
    name: 'English',
    flag: '🇬🇧',
  },
} as const;

export const BREAKPOINTS = {
  compact: 600,
  medium: 840,
  expanded: 1240,
  large: 1440,
  extraLarge: 1920,
} as const;

export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

export const PROJECT_STATUSES = {
  active: {
    label: 'Активный',
    color: 'success',
    icon: 'check_circle',
  },
  beta: {
    label: 'Бета',
    color: 'warning',
    icon: 'science',
  },
  archived: {
    label: 'Архив',
    color: 'neutral',
    icon: 'archive',
  },
  planned: {
    label: 'Планируется',
    color: 'info',
    icon: 'schedule',
  },
} as const;

export const NEWS_CATEGORIES = {
  announcement: {
    label: 'Анонс',
    icon: 'campaign',
    color: 'primary',
  },
  release: {
    label: 'Релиз',
    icon: 'rocket_launch',
    color: 'success',
  },
  update: {
    label: 'Обновление',
    icon: 'update',
    color: 'info',
  },
  event: {
    label: 'Событие',
    icon: 'event',
    color: 'secondary',
  },
  blog: {
    label: 'Блог',
    icon: 'edit',
    color: 'tertiary',
  },
} as const;

// SEO
export const DEFAULT_OG_IMAGE = '/og-image.png';
export const DEFAULT_DESCRIPTION = SITE_CONFIG.description;

// Limits
export const MAX_NEWS_PER_PAGE = 12;
export const MAX_PROJECTS_PER_PAGE = 9;
export const MAX_SEARCH_RESULTS = 50;

// Cache
export const CACHE_VERSION = 'v1';
export const CACHE_DURATION = {
  static: 86400, // 1 день
  dynamic: 3600, // 1 час
  api: 300, // 5 минут
} as const;
