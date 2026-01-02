import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://darknight.dev',
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['ru', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
      sitemap({
        filter: (page) => !page.includes('/admin/'),
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date(),
        i18n: {
        defaultLocale: 'en',
        locales: {
          ru: 'ru-RU',
          en: 'en-US',
        },
      },
     })
  ],
});
