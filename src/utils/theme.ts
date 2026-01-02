// src/utils/theme.ts
/**
 * Управление темой приложения
 */

import type { Theme } from '../types/common';

const THEME_KEY = 'theme';
const THEME_ATTRIBUTE = 'data-theme';

/**
 * Получение сохраненной темы
 */
export function getSavedTheme(): Theme | null {
  if (typeof localStorage === 'undefined') return null;
  return localStorage.getItem(THEME_KEY) as Theme | null;
}

/**
 * Получение системной темы
 */
export function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Получение текущей темы
 */
export function getCurrentTheme(): Theme {
  const saved = getSavedTheme();
  if (saved && saved !== 'system') return saved;
  return getSystemTheme();
}

/**
 * Применение темы
 */
export function applyTheme(theme: Theme): void {
  if (typeof document === 'undefined') return;

  const actualTheme = theme === 'system' ? getSystemTheme() : theme;
  document.documentElement.setAttribute(THEME_ATTRIBUTE, actualTheme);
}

/**
 * Сохранение темы
 */
export function saveTheme(theme: Theme): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(THEME_KEY, theme);
  applyTheme(theme);
}

/**
 * Переключение темы
 */
export function toggleTheme(): void {
  const current = getCurrentTheme();
  const next: Theme = current === 'light' ? 'dark' : 'light';
  saveTheme(next);
}

/**
 * Инициализация темы
 */
export function initTheme(): void {
  // Применяем сохраненную тему или системную
  const theme = getSavedTheme() || 'system';
  applyTheme(theme);

  // Слушаем изменения системной темы
  if (typeof window !== 'undefined') {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    mediaQuery.addEventListener('change', (e) => {
      // Применяем только если выбрана системная тема
      if (getSavedTheme() === 'system' || !getSavedTheme()) {
        applyTheme('system');
      }
    });
  }
}

/**
 * Предотвращение мигания темы при загрузке
 * Используйте этот код в <head> страницы как inline script
 */
export function getThemeInitScript(): string {
  return `
    (function() {
      const theme = localStorage.getItem('${THEME_KEY}') || 'system';
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      const actualTheme = theme === 'system' ? systemTheme : theme;
      document.documentElement.setAttribute('${THEME_ATTRIBUTE}', actualTheme);
    })();
  `;
}

/**
 * CSS переменные для темы
 */
export function getThemeVariables(theme: 'light' | 'dark'): Record<string, string> {
  // Это можно использовать для динамического применения тем
  // если не используете CSS переменные
  const themes = {
    light: {
      'primary': '#0061A6',
      'on-primary': '#FFFFFF',
      'background': '#F9F9FF',
      'on-background': '#191C20',
      // ... остальные цвета
    },
    dark: {
      'primary': '#A6C4FF',
      'on-primary': '#003062',
      'background': '#1B1B1F',
      'on-background': '#E4E1E6',
      // ... остальные цвета
    },
  };

  return themes[theme];
}
