// src/middleware/index.ts
import { defineMiddleware } from 'astro:middleware';
import { defaultLang, languages } from '../i18n/config';

export const onRequest = defineMiddleware(async (context, next) => {
  const url = context.url;
  const pathname = url.pathname;

  // Пропускаем статические файлы и API
  if (
    pathname.startsWith('/api/') ||
    pathname.includes('.') // файлы с расширением
  ) {
    return next();
  }

  // Проверяем язык в URL
  const pathnameHasLang = Object.keys(languages).some(
    lang => pathname.startsWith(`/\${lang}/`) || pathname === `/\${lang}`
  );

  // Если нет языка, редиректим на дефолтный (только не русский, его оставляем без префикса)
  if (!pathnameHasLang && pathname !== '/') {
    // Для русского языка не добавляем префикс
    // Для других языков - добавляем
    const acceptLanguage = context.request.headers.get('accept-language');
    const preferredLang = acceptLanguage?.split(',')[0].split('-')[0];

    if (preferredLang && preferredLang !== defaultLang && preferredLang in languages) {
      return context.redirect(`/\${preferredLang}\${pathname}`);
    }
  }

  return next();
});
