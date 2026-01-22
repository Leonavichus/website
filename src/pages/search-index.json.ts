import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  // Получаем все проекты и новости
  const projects = await getCollection('projects', ({ data }) => data.published === true);
  const news = await getCollection('news', ({ data }) => data.published === true);

  // Формируем индекс
  const searchIndex = [
    // Статичные страницы
    {
      title: 'Главная',
      description: 'Главная страница DARK NIGHT - инди-игры и приложения с открытым исходным кодом',
      url: '/',
      type: 'page',
    },
    {
      title: 'О команде',
      description: 'История, миссия и ценности команды DARK NIGHT',
      url: '/about',
      type: 'page',
    },
    {
      title: 'Дорожная карта',
      description: 'Планы развития проектов на 2026 год',
      url: '/roadmap',
      type: 'page',
    },
    {
      title: 'FAQ',
      description: 'Часто задаваемые вопросы о наших проектах',
      url: '/faq',
      type: 'page',
    },
    {
      title: 'Новости',
      description: 'Последние обновления, релизы и новости от команды',
      url: '/news',
      type: 'page',
    },

    // Проекты из Content Collection
    ...projects.map(project => ({
      title: project.data.title,
      description: project.data.description,
      url: `/projects/${project.id}`,
      type: 'project',
    })),

    // Новости из Content Collection
    ...news.map(post => ({
      title: post.data.title,
      description: post.data.description,
      url: `/news/${post.id}`,
      type: 'news',
    })),
  ];

  return new Response(JSON.stringify(searchIndex), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600', // Кэш на 1 час
    },
  });
};
