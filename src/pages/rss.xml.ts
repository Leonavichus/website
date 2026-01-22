import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {
  const news = await getCollection('news', ({ data }) => {
    return data.published === true;
  });

  const sortedNews = news.sort((a, b) => 
    b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: 'DARK NIGHT - Новости',
    description: 'Последние обновления проектов, релизы и новости от команды DARK NIGHT',
    site: context.site!,
    items: sortedNews.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/news/${post.id}/`,
      categories: [post.data.category],
      author: post.data.author,
    })),
    customData: '<language>ru-ru</language>',
    stylesheet: '/rss-styles.xsl',
  });
};
