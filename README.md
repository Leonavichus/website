# DARK NIGHT Website

Сайт команды разработчиков инди-игр и приложений.

## 🚀 Быстрый старт

### 1. Установка зависимостей

```bash
npm install
```

### 2. Запуск dev сервера

```bash
npm run dev
```

Откройте браузер по адресу `http://localhost:4321`

### 3. Сборка для продакшена

```bash
npm run build
```

### 4. Превью продакшен сборки

```bash
npm run preview
```

## 📁 Структура проекта

```
/
├── public/              # Статические файлы
├── src/
│   ├── components/      # Astro компоненты
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Button.astro
│   │   └── ProjectCard.astro
│   ├── layouts/         # Шаблоны страниц
│   │   └── Layout.astro
│   └── pages/           # Страницы сайта
│       ├── index.astro
│       ├── news/
│       │   └── index.astro
│       └── projects/
│           └── [slug].astro
├── astro.config.mjs     # Конфигурация Astro
└── package.json
```

## 🎨 Технологии

- **Astro** - Статический генератор сайтов
- **Material Design 3** - Дизайн система
- **Google Fonts** - Roboto font
- **Material Icons** - Иконки

## 🔗 Ссылки

- [Astro документация](https://docs.astro.build)
- [Material Design 3](https://m3.material.io)
