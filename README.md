# Фронтенд проекта «Я Помогаю»

## Описание

Проект для волонтерской организации ЯПомогаю. Цель, создать удобное веб-приложение поиска волонтёров для помощи реципиентам. От выгула собак, до помощи людям с ограниченными возможностями.

[Бриф проекта](https://narrow-mountain-bc1.notion.site/3-13-1880e7396a9c4bbda3d1f33103fd01af)

[Макет в figma](<https://www.figma.com/file/xYLbl9kLmcAwYCbAhCFMCy/%D0%AF%D0%9F%D0%BE%D0%BC%D0%BE%D0%B3%D0%B0%D1%8E-(Web)?type=design&node-id=179-1699&mode=design&t=CfyAFh2ogb8PkPuy-0>)

### Технологии

- NodeJS v18.15.0 (build)
- React v18.2
- TypeScript v4.9.5
- React Router v6.11.1
- Redux Toolkit 1.9.5
- RTK Query

### Визуализация UI компонентов

- Storybook v8

## Локальная разработка БЕЗ докера

Должен быть установлен NodeJS v18.15

1. Склонировать [репозиторий фронтенда](https://github.com/ya-pomogau/frontend)
   ```shell
   git clone git@github.com:ya-pomogau/frontend.git
   ```
2. Установить зависимости **именно** `npm ci`

   ```shell
   npm ci
   ```

3. Скопировать `.env.development.example` в `.env.development` - `vite` по такому имени будет искать файл с переменными окружения для локальной разработки
4. Запустить скрипт фронтенда и storybook в concurrent режиме

   ```shell
   npm run dev
   ```

5. Фронтенд доступен на `PORT` из `.env.development` (по умолчанию http://localhost:3000)
6. Storybook доступен на http://localhost:6007

## Локальная разработка c докером

1. Склонировать [репозиторий фронтенда](https://github.com/ya-pomogau/frontend)
   ```shell
   git clone git@github.com:ya-pomogau/frontend.git
   ```
2. Скопировать `.env.dev.example` в `.env.dev`
3. Запустить контейнер фронта

   ```shell
   docker compose -f docker-compose.dev.yml --env-file=.env.dev up --build

   # или с помощью Makefile
   make run-dev
   ```

   Фронтенд по дефолту будет доступен на http://localhost:3000/
