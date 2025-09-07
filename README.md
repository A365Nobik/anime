# Anime Hub App (Vite + React + Tailwind)

### [English](#english) | [Русский](#russian)

## English

### Anime Search & Information App

A small application to search for anime and view information/episodes.

Tech Stack: `React 19`, `Vite 6`, `React Router 7`, `Tailwind CSS 4`

### Quick Start

1.  Install dependencies:

```bash
npm i
```

2.  Create a `.env` file in the root directory and specify the [Kitsu API](https://kitsu.io/) service:
```bash
VITE_API_URL=https://kitsu.io/api/edge
```
3.  Run the application in development mode:
```bash
npm run dev
```
4.  Build and preview the production version:
```bash
npm run build
```
```bash
npm run preview
```

### Scripts

- Local development with Vite

```bash
npm run dev
```

- Production build

```bash
npm run build
```

- Local preview of the build

```bash
npm run preview
```

- Run ESLint

```bash
npm run lint
```

### Environment Variables

  `VITE_API_URL` Base API URL (used for requests to anime/episodes). Accessible via `import.meta.env.VITE_API_URL`.

### Main Pages/Routes

- `/home` - Homepage
- `/search?q=<query>` - Search anime by name
- `/info?q=<animeTitle>` - Anime information and list of episodes

  _Example:_ `/info?q=naruto` - Loads the anime card and a list of episodes with paginated loading ("Load More Episodes" button).

### Project Structure

```text
src/
  app/
    pages/
      anime-info/page.jsx      # Anime details screen with modals and episodes
      anime-search/page.jsx    # Search screen and result
      home/page.jsx            # Homepage
      NotFound.jsx
  assets/                      # Static images
  components/
    cards/
      anime/                   # Anime cards
      banner/                  # Banner and description
      episodes/                # Episode cards and their skeletons
      info/                    # Anime info card and skeleton
    layout/navigation/             # Header
    modals/                    # Modals: description, trailer, episode
  index.css                    # custom keyframes and @themes
  main.jsx                     # Entry point
  routes.jsx                   # Application routes
```

### UI/Styles

- Tailwind CSS v4 (via `@tailwindcss/vite` plugin)
- Custom animations (`slideToRight`, `slideToLeft`, `loaded`) and CSS theme variables are declared in `src/index.css`.

### Working with Episodes

- Episodes are loaded in batches of 20 via the `page[offset]` parameter.
- The "Load More Episodes" button is displayed when there are ≥ 20 episodes and the end of the list has not been reached.
- EpisodeCardLoading skeletons are displayed during loading.

### Deployment

- Suitable for deployment on Vercel/Netlify.
- For Vercel, add the `VITE_API_URL` variable in Project Settings → Environment Variables. For Netlify, add it in Project Configuration → Environment variables.
- `vercel.json` and `netlify.toml `configuration files for routing are already included.

### Troubleshooting

- Blank screen:
  - Make sure that VITE_API_URL is set and there is a query q in the URL for anime-info and anime-search.
  - Check the API response in DevTools Network.
- "Load More Episodes" button is not visible:
  - It is displayed only if at least 20 episodes have already been received and the API returns more episodes.

### License

Feel free to use and modify within your project.

## Russian

Небольшое приложение для поиска аниме и просмотра информации/эпизодов. Стек: `React 19`, `Vite 6`, `React Router 7`, `Tailwind CSS 4`.

### Быстрый старт

1. Установить зависимости:

```bash
npm i
```

2. Создать `.env` в корне и указать API сервиса [kitsu](https://kitsu.io/)`:

```bash
VITE_API_URL=https://kitsu.io/api/edge
```

3. Запустить приложение в режиме разработки:

```bash
npm run dev
```

4. Сборка и предпросмотр продакшн-версии:

```bash
npm run build
npm run preview
```

### Скрипты

- `npm run dev` — локальная разработка на Vite
- `npm run build` — продакшн-сборка
- `npm run preview` — локальный предпросмотр сборки
- `npm run lint` — запуск ESLint

### Переменные окружения

- `VITE_API_URL` — базовый URL API (используется для запросов к аниме/эпизодам). Доступ через `import.meta.env.VITE_API_URL`.

### Основные страницы/роуты

- `/home` — главная страница
- `/search?q=<query>` — поиск аниме по названию
- `/info?q=<animeTitle>` — информация об аниме и список эпизодов

Пример: `/info?q=naruto` — загрузит карточку аниме и список эпизодов с постраничной подгрузкой (кнопка Load More Episodes).

### Структура проекта

```text
src/
  app/
    pages/
      anime-info/page.jsx      # Экран с деталями аниме, модалками и эпизодами
      anime-search/page.jsx    # Экран поиска
      home/page.jsx            # Главная
      NotFound.jsx
  assets/                      # Статические изображения
  components/
    cards/
      anime/                   # Карточки аниме
      banner/                  # Баннер и описание
      episodes/                # Карточки эпизодов и их skeleton'ы
      info/                    # Инфо-карточка аниме и skeleton
    layout/navigation/             # Шапка
    modals/                    # Модальные окна: описание, трейлер, эпизод
  index.css                    # Tailwind 4, кастомные keyframes и темы
  main.jsx                     # Точка входа
  routes.jsx                   # Маршруты приложения
```

### UI/стили

- Tailwind CSS v4 (через `@tailwindcss/vite` плагин)
- Кастомные анимации (`slideToRight`, `slideToLeft`, `loaded`) и CSS-переменные темы объявлены в `src/index.css`.

### Работа с эпизодами

- Эпизоды подгружаются партиями по 20 штук через параметр `page[offset]`.
- Кнопка “Load More Episodes” отображается, когда эпизодов ≥ 20 и не достигнут конец списка.
- Во время загрузки отображаются скелетоны `EpisodeCardLoading`.

### Деплой

- Подходит для деплоя на Vercel/Netlify.
- Для Vercel добавьте переменную `VITE_API_URL` в Project Settings → Environment Variables, а для Netlify в Project Configuration → Environment variables.
  -Конфиги `vercel.json`, `netlify.toml` для роутинга уже присутствуют.

### Troubleshooting

- Пустой экран:
  - Убедитесь, что задан `VITE_API_URL` и есть query `q` в URL для `anime-info` и `anime-search`.
  - Проверьте ответ API в DevTools Network.
- Кнопка “Load More Episodes” не видна:
  - Отображается только если уже получено как минимум 20 эпизодов и API возвращает следующие епизоды.

### Лицензия

Свободно используйте и модифицируйте в рамках вашего проекта.
