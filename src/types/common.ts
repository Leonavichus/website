// src/types/common.ts
/**
 * Общие типы для всего приложения
 */

export type Language = 'ru' | 'en';

export type Theme = 'light' | 'dark' | 'system';

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  locale: Language;
  author: string;
  socialLinks: SocialLinks;
}

export interface SocialLinks {
  github?: string;
  telegram?: string;
  discord?: string;
  twitter?: string;
  youtube?: string;
  email?: string;
}

export interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  article?: boolean;
  noindex?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  icon?: string;
  external?: boolean;
  children?: NavigationItem[];
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}
