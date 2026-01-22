// src/i18n/config.ts

export const languages = {
  ru: 'Русский',
  en: 'English',
};

export const defaultLang = 'ru';

export const ui = {
  ru: {
    'nav.home': 'Главная',
    'nav.about': 'О команде',
    'nav.projects': 'Проекты',
    'nav.news': 'Новости',
    'nav.roadmap': 'Roadmap',
    'nav.faq': 'FAQ',

    'hero.title': 'DARK NIGHT',
    'hero.subtitle': 'Команда разработчиков, создающая инди-игры и приложения с открытым исходным кодом. Превращаем идеи в реальность и делимся с миром.',
    'hero.projects': 'Наши проекты',
    'hero.join': 'Присоединиться',

    'mission.title': 'Наша миссия',
    'mission.subtitle': 'Открытость, сотрудничество и свобода в технологиях',

    'projects.title': 'Наши проекты',
    'projects.subtitle': 'Игры и приложения, созданные с любовью к коду',

    'join.title': 'Присоединяйтесь',
    'join.subtitle': 'Мы приветствуем всех, кто разделяет нашу страсть к open-source',
    'join.developers': 'Разработчики',
    'join.designers': 'Дизайнеры',
    'join.translators': 'Переводчики',
    'join.enthusiasts': 'Энтузиасты',

    'contact.title': 'Связаться с нами',
    'contact.subtitle': 'Присоединяйтесь к сообществу на различных платформах',

    'footer.rights': 'Все права защищены',
    'footer.opensource': 'Open Source проекты',

    'search.placeholder': 'Поиск по сайту...',
    'search.empty': 'Начните вводить для поиска',
    'search.notfound': 'Ничего не найдено',

    'theme.toggle': 'Переключить тему',

    'common.learnmore': 'Подробнее',
    'common.download': 'Скачать',
    'common.github': 'GitHub',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.news': 'News',
    'nav.roadmap': 'Roadmap',
    'nav.faq': 'FAQ',

    'hero.title': 'DARK NIGHT',
    'hero.subtitle': 'A team of developers creating indie games and open-source applications. We turn ideas into reality and share them with the world.',
    'hero.projects': 'Our Projects',
    'hero.join': 'Join Us',

    'mission.title': 'Our Mission',
    'mission.subtitle': 'Openness, collaboration, and freedom in technology',

    'projects.title': 'Our Projects',
    'projects.subtitle': 'Games and apps created with love for code',

    'join.title': 'Join Us',
    'join.subtitle': 'We welcome everyone who shares our passion for open-source',
    'join.developers': 'Developers',
    'join.designers': 'Designers',
    'join.translators': 'Translators',
    'join.enthusiasts': 'Enthusiasts',

    'contact.title': 'Contact Us',
    'contact.subtitle': 'Join the community on various platforms',

    'footer.rights': 'All rights reserved',
    'footer.opensource': 'Open Source Projects',

    'search.placeholder': 'Search the site...',
    'search.empty': 'Start typing to search',
    'search.notfound': 'Nothing found',

    'theme.toggle': 'Toggle theme',

    'common.learnmore': 'Learn More',
    'common.download': 'Download',
    'common.github': 'GitHub',
  },
} as const;

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as keyof typeof languages;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof languages) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}
